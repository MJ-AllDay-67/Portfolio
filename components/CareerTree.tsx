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
      const scrolled = viewportHeight - containerTop;
      const progress = Math.min(Math.max(scrolled / containerHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-10 px-4">
      {/* Central Axis - Background (unfilled) */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-700/50 md:-translate-x-1/2 rounded-full"></div>
      
      {/* Central Axis - Foreground (fills on scroll) */}
      <div 
        className="absolute left-4 md:left-1/2 top-0 w-1 bg-blue-500 md:-translate-x-1/2 rounded-full transition-all duration-100 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
        style={{ height: `${scrollProgress * 100}%` }}
      ></div>
      
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