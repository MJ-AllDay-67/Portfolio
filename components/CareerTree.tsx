import React, { useEffect, useState, useRef } from 'react';
import { CareerItem } from '../types';

interface CareerTreeProps {
  items: CareerItem[];
}

const CareerTree: React.FC<CareerTreeProps> = ({ items }) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'));
            setVisibleItems((prev) => Array.from(new Set([...prev, id])));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    document.querySelectorAll('.career-node').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items]);

  // Track scroll progress for filling the trunk
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the container has been scrolled through
      // Position the rocket at 70% of the viewport height
      const scrolled = (viewportHeight * 0.7) - containerTop;
      const progress = Math.min(Math.max(scrolled / containerHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine flame intensity based on progress
  // Bootcamp is roughly 4th item (approx 35-40%), Lead AI is 9th (approx 85-90%)
  // Adjusted thresholds to trigger slightly earlier and persist
  const isBootcamp = scrollProgress > 0.35;
  const isLeadAI = scrollProgress > 0.82;

  // Flame Colors & Shadows
  const flameColor = isLeadAI ? 'text-red-500' : isBootcamp ? 'text-orange-500' : 'text-orange-500/80'; // Outer
  const midFlameColor = isLeadAI ? 'text-yellow-400' : 'text-transparent'; // Middle (New)
  const innerFlameColor = isLeadAI ? 'text-cyan-300' : isBootcamp ? 'text-yellow-200' : 'text-yellow-300/80'; // Core
  
  const flameShadow = isLeadAI ? 'drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]' : isBootcamp ? 'drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]' : 'drop-shadow-[0_0_5px_rgba(249,115,22,0.6)]';

  // Flame Sizes (Scaling)
  const flameScale = isLeadAI ? 'scale-[2.5]' : isBootcamp ? 'scale-[1.8]' : 'scale-100';

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-10 px-4">
      {/* Central Axis - Background (unfilled) */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-700/50 md:-translate-x-1/2 rounded-full"></div>
      
      {/* Central Axis - Foreground (fills on scroll) */}
      <div 
        className="absolute left-4 md:left-1/2 top-0 w-1 bg-blue-500 md:-translate-x-1/2 rounded-full transition-all duration-100 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
        style={{ height: `${scrollProgress * 100}%` }}
      >
        {/* Mini Space Rocket */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 z-20">
          {/* Flame Effect Container - Rotated 180deg to point UP (behind rocket) */}
          <div className={`absolute -top-6 left-1/2 -translate-x-1/2 origin-bottom transition-all duration-700 ease-out ${flameScale} ${flameShadow}`}>
             {/* Animated SVG Flame */}
             <svg width="20" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
                {/* Outer Flame (Red/Orange) */}
                <path d="M10 0C10 0 0 15 0 28C0 34.6274 4.47715 40 10 40C15.5228 40 20 34.6274 20 28C20 15 10 0 10 0Z" className={`fill-current ${flameColor} transition-colors duration-700`} />
                
                {/* Middle Flame Layer (Yellow - Only visible for Lead AI) */}
                <path d="M10 5C10 5 2 18 2 28C2 33 5 38 10 38C15 38 18 33 18 28C18 18 10 5 10 5Z" className={`fill-current ${midFlameColor} transition-colors duration-700 opacity-90`} />

                {/* Inner Core (Ice Blue / Yellow) */}
                <path d="M10 10C10 10 4 20 4 28C4 32 6.68629 36 10 36C13.3137 36 16 32 16 28C16 20 10 10 10 10Z" className={`fill-current ${innerFlameColor} transition-colors duration-700 opacity-90`} />
             </svg>
          </div>

          {/* Rocket Icon */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-full h-full drop-shadow-lg rotate-180 relative z-10"
          >
            {/* Rocket Body */}
            <path 
              d="M12 2C12 2 19 8 19 14C19 19 16 22 12 22C8 22 5 19 5 14C5 8 12 2 12 2Z" 
              className="fill-slate-100 stroke-slate-300" 
              strokeWidth="1"
            />
            {/* Window */}
            <circle cx="12" cy="14" r="3" className="fill-blue-500/80 stroke-blue-300" strokeWidth="1" />
            <circle cx="12" cy="14" r="1" className="fill-white" />
            {/* Fins */}
            <path d="M5 14L2 19" stroke="currentColor" strokeWidth="2" className="stroke-slate-400" strokeLinecap="round" />
            <path d="M19 14L22 19" stroke="currentColor" strokeWidth="2" className="stroke-slate-400" strokeLinecap="round" />
            <path d="M12 22V24" stroke="currentColor" strokeWidth="2" className="stroke-orange-500" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      
      {items.map((item, index) => {
        const isEven = index % 2 === 0;
        const isVisible = visibleItems.includes(item.id);
        
        // Calculate if this item should have its branch filled
        const itemIndex = items.findIndex(i => i.id === item.id);
        const itemProgress = (itemIndex + 1) / items.length;
        const isBranchFilled = scrollProgress >= itemProgress * 0.8;
        
        // Special styling for Data Science Bootcamp (id: 4) and Got Married (id: 7)
        const isSpecialEvent = item.id === 4 || item.id === 7;
        const cardBorderClass = isSpecialEvent 
          ? 'border-pink-400/50 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(244,114,182,0.2)]' 
          : 'border-slate-700/50 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]';
        const cardBgClass = isSpecialEvent ? 'bg-pink-950/20' : 'bg-slate-900/40';
        const cardHoverBgClass = isSpecialEvent ? 'hover:bg-pink-900/30' : 'hover:bg-slate-800/60';
        
        return (
          <div 
            key={item.id}
            data-id={item.id}
            className={`career-node flex flex-col md:flex-row items-center mb-20 relative ${isEven ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Empty space for opposite side to keep balance */}
            <div className="flex-1 hidden md:block"></div>

            {/* Content Card */}
            <div className={`flex-1 w-full pl-12 md:pl-0 ${isEven ? 'md:pr-12 text-right' : 'md:pl-12 text-left'}`}>
               <div 
                 className={`relative p-6 ${cardBgClass} border ${cardBorderClass} rounded-lg backdrop-blur-sm transition-all duration-700 transform ${cardHoverBgClass} hover:scale-[1.01]
                   ${isVisible 
                     ? 'opacity-100 translate-y-0 translate-x-0' 
                     : `opacity-0 translate-y-10 ${isEven ? '-translate-x-10' : 'translate-x-10'}`
                   }
                 `}
               >
                 {/* Horizontal Branch Connector (Desktop) */}
                 <div className={`hidden md:block absolute top-8 h-1 pointer-events-none transition-all duration-500
                    ${isEven 
                        ? 'right-[-3rem] w-12' 
                        : 'left-[-3rem] w-12'
                    }
                 `}>
                    {/* Background (unfilled) */}
                    <div className="absolute inset-0 bg-slate-700/50 rounded-full"></div>
                    {/* Foreground (fills on scroll) */}
                    <div 
                      className={`absolute top-0 bottom-0 bg-blue-500 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]
                        ${isEven ? 'right-0' : 'left-0'}
                      `}
                      style={{ width: isBranchFilled ? '100%' : '0%' }}
                    ></div>
                 </div>

                 <div className={`flex flex-col ${isEven ? 'items-end' : 'items-start'}`}>
                   <span className="text-blue-400 font-Orbitron text-xs tracking-widest mb-2 px-2 py-0.5 rounded bg-blue-900/20 border border-blue-500/20 inline-block">
                     {item.period}
                   </span>
                   <h3 className="text-2xl font-bold text-white mb-1">{item.role}</h3>
                   {item.company && (
                     <h4 className="text-lg text-purple-400 font-mono font-medium">{item.company}</h4>
                   )}
                   {item.companyNote && (
                     <p className="text-sm text-purple-400 font-mono mb-4">{item.companyNote}</p>
                   )}
                   {!item.companyNote && item.company && <div className="mb-4"></div>}
                   {item.description && (
                     <p 
                       className="text-gray-400 text-sm leading-relaxed mb-4 text-left"
                       dangerouslySetInnerHTML={{ __html: item.description }}
                     />
                   )}
                   {item.technologies && item.technologies.length > 0 && (
                     <div className={`flex flex-wrap gap-2 ${isEven ? 'justify-end' : 'justify-start'}`}>
                       {item.technologies.map(tech => (
                         <span key={tech} className="text-[10px] uppercase tracking-wider bg-black/40 text-gray-300 px-2 py-1 rounded-sm border border-slate-800 hover:border-blue-500/50 transition-colors cursor-default">
                           {tech}
                         </span>
                       ))}
                     </div>
                   )}
                 </div>
               </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CareerTree;