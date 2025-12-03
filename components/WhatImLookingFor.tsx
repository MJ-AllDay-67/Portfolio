import React, { useEffect, useState, useRef } from 'react';

const WhatImLookingFor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto pt-0 pb-10 px-4">
      {/* Continuing Trunk from CareerHighlights */}
      <div className="absolute left-1/2 top-0 h-24 w-1 -translate-x-1/2">
        <div className="absolute inset-0 bg-slate-700/50 rounded-full"></div>
        <div 
          className="absolute top-0 left-0 right-0 bg-blue-500 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
          style={{ height: isVisible ? '100%' : '0%' }}
        ></div>
      </div>

      {/* Junction Point */}
      <div className="absolute left-1/2 top-24 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10"></div>

      {/* Content Box */}
      <div className="pt-32 relative">
         {/* Vertical connector to box */}
         <div className="hidden md:block absolute left-1/2 top-24 h-8 w-1 -translate-x-1/2">
            <div className="absolute inset-0 bg-slate-700/50 rounded-full"></div>
            <div 
              className="absolute top-0 left-0 right-0 bg-blue-500 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
              style={{ height: isVisible ? '100%' : '0%', transitionDelay: '300ms' }}
            ></div>
         </div>

         <div 
            className={`p-8 bg-slate-900/40 border border-blue-500/50 hover:border-blue-400 rounded-lg backdrop-blur-sm transition-all duration-700 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:scale-[1.01]
              ${isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
              }
            `}
            style={{ transitionDelay: '500ms' }}
          >
            <ul className="list-disc list-inside space-y-4 text-left max-w-2xl mx-auto">
              <li className="text-gray-300 text-lg leading-relaxed pl-2">
                <span className="-ml-2">A team of A-players solving real-world problems with the latest technology.</span>
              </li>
              <li className="text-gray-300 text-lg leading-relaxed pl-2">
                <span className="-ml-2">Full-time | Part-time | Consulting</span>
              </li>
            </ul>
          </div>
      </div>
    </div>
  );
};

export default WhatImLookingFor;

