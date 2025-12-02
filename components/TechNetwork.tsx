import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { D3Node, D3Link } from '../types';

const TechNetwork: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;

    const data: { nodes: D3Node[]; links: D3Link[] } = {
      nodes: [
        { id: "React", group: 1 },
        { id: "TypeScript", group: 1 },
        { id: "Gemini API", group: 2 },
        { id: "Node.js", group: 3 },
        { id: "D3.js", group: 4 },
        { id: "Tailwind", group: 1 },
        { id: "Next.js", group: 1 },
        { id: "GraphQL", group: 3 },
        { id: "PostgreSQL", group: 3 },
        { id: "Python", group: 2 },
        { id: "TensorFlow", group: 2 },
        { id: "Three.js", group: 4 },
      ],
      links: [
        { source: "React", target: "TypeScript", value: 1 },
        { source: "React", target: "Tailwind", value: 1 },
        { source: "React", target: "Next.js", value: 1 },
        { source: "React", target: "D3.js", value: 1 },
        { source: "TypeScript", target: "Node.js", value: 1 },
        { source: "Node.js", target: "GraphQL", value: 1 },
        { source: "Node.js", target: "PostgreSQL", value: 1 },
        { source: "Gemini API", target: "Python", value: 1 },
        { source: "Gemini API", target: "React", value: 1 },
        { source: "Python", target: "TensorFlow", value: 1 },
        { source: "Three.js", target: "React", value: 1 },
      ]
    };

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("class", "w-full h-full opacity-60 hover:opacity-100 transition-opacity duration-500");

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink<D3Node, D3Link>(data.links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("r", 8)
      .attr("fill", d => color(String(d.group)))
      .call(d3.drag<SVGCircleElement, D3Node>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

    const label = svg.append("g")
      .selectAll("text")
      .data(data.nodes)
      .join("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(d => d.id)
      .attr("fill", "#ccc")
      .style("font-family", "Rajdhani")
      .style("font-size", "14px")
      .style("pointer-events", "none");

    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as D3Node).x!)
        .attr("y1", d => (d.source as D3Node).y!)
        .attr("x2", d => (d.target as D3Node).x!)
        .attr("y2", d => (d.target as D3Node).y!);

      node
        .attr("cx", d => d.x!)
        .attr("cy", d => d.y!);
      
      label
        .attr("x", d => d.x!)
        .attr("y", d => d.y!);
    });

    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, D3Node, D3Node>, d: D3Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, D3Node, D3Node>, d: D3Node) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, D3Node, D3Node>, d: D3Node) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="w-full h-[400px] border border-blue-500/20 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default TechNetwork;
