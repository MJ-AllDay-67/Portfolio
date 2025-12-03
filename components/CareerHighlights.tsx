import React, { useEffect, useState, useRef } from 'react';

const highlights = [
  {
    title: 'NPD / Circana',
    color: 'purple' as const,
    points: [
      { text: 'The custom program I built for the Analytics team saved the company 100s of thousands of dollars via licensing costs and MASSIVE time savings for the team of 10 analysts that still use this program today' },
      { text: 'Enhanced data classification coverage and accuracy by implementing CV + LLMs to classify incoming CPG Receipt-based data into our hierarchy' },
      { text: 'Managed a team of three analysts' }
    ]
  },
  {
    title: 'Levee',
    color: 'blue' as const,
    points: [
      { 
        text: 'Awarded Top Travel and Hospitality Startup (Seed) in North America by PhocusWright 2025',
        linkText: '(Press Release)',
        url: 'https://d5hd8n04.na1.hs-sales-engage.com/Ctc/Y+23284/d5hD8N04/Jl22-6qcW7lCdLW6lZ3nfN13_n4GT9sWBN2KZ8-Jqy5-9W8KQ5jp4nYzkhN6FQbZYmQfLbW2xtwK45d-vLGW48Nnz44bNXh2W85KWR42KVHJwVnJjdc4PTZt2W1lg16Y4Kh7T1N81jdX_9cyQYVnXVyv63bq7cW1d9cxj6v4sK6W2Xr6FT7_DjwJW1gByDV3hblYrW58sQ1M3C2R1kW8vlXb748jYC4N3kcXVV70TygW3HfgPz35mdQHW4QK0c65VgZQGW5MyPPk95nWR2W3Ny0HH5smgd-W4VGxwp6SHV_6W6BtVST2QZ79YW8nkjpS8N3FvTf1j86Ms04'
      },
      { 
        text: 'Won both “Judge’s Choice” and “People’s Choice” Awards at HITEC’s E20X',
        linkText: '(Press Release)',
        url: 'https://www.hitectech.com/press-releases/levee-wins-both-judge-s-choice-and-people-s-choice-awards-at-hitec-s-e20x/'
      },
      { text: 'Built initial object detection model and implemented end-to-end CV pipeline, from annotation to deployment' },
      { text: 'Implemented multi-agent systems and frontend apps for internal/external use' },
      { text: 'First employee outside of the two Co-Founders' }
    ]
  }
];

const colorClasses = {
  purple: {
    border: 'border-purple-500/50 hover:border-purple-400',
    bg: 'bg-purple-950/20',
    title: 'text-purple-400',
    glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]',
    branch: 'bg-purple-500',
    branchGlow: 'shadow-[0_0_8px_rgba(168,85,247,0.6)]'
  },
  blue: {
    border: 'border-blue-500/50 hover:border-blue-400',
    bg: 'bg-blue-950/20',
    title: 'text-blue-400',
    glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]',
    branch: 'bg-blue-500',
    branchGlow: 'shadow-[0_0_8px_rgba(59,130,246,0.6)]'
  }
};

const CareerHighlights: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [branchesFilled, setBranchesFilled] = useState([false, false]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setBranchesFilled(prev => [true, prev[1]]), 300);
            setTimeout(() => setBranchesFilled(prev => [prev[0], true]), 600);
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
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto pt-0 pb-10 px-4">
      {/* Continuing Trunk from CareerTree */}
      <div className="absolute left-1/2 top-0 h-24 w-1 -translate-x-1/2">
        <div className="absolute inset-0 bg-slate-700/50 rounded-full"></div>
        <div 
          className="absolute top-0 left-0 right-0 bg-blue-500 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
          style={{ height: isVisible ? '100%' : '0%' }}
        ></div>
      </div>

      {/* Junction Point */}
      <div className="absolute left-1/2 top-24 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10"></div>

      {/* Two Highlight Boxes */}
      <div className="pt-32 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Horizontal connector line */}
        <div className="hidden md:block absolute top-24 left-[25%] right-[25%] h-1">
          <div className="absolute inset-0 bg-slate-700/50 rounded-full"></div>
          <div 
            className="absolute top-0 bottom-0 left-1/2 bg-blue-500 rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
            style={{ 
              width: isVisible ? '100%' : '0%',
              transform: 'translateX(-50%)'
            }}
          ></div>
        </div>

        {highlights.map((item, index) => {
          const colors = colorClasses[item.color];
          
          return (
            <div key={item.title} className="relative">
              {/* Vertical branch down to box */}
              <div className="hidden md:block absolute left-1/2 -top-8 h-8 w-1 -translate-x-1/2">
                <div className="absolute inset-0 bg-slate-700/50 rounded-full"></div>
                <div 
                  className={`absolute top-0 left-0 right-0 ${colors.branch} rounded-full transition-all duration-500 ${colors.branchGlow}`}
                  style={{ height: branchesFilled[index] ? '100%' : '0%' }}
                ></div>
              </div>

              {/* Highlight Box */}
              <div 
                className={`p-8 ${colors.bg} border ${colors.border} rounded-lg backdrop-blur-sm transition-all duration-700 ${colors.glow} hover:scale-[1.02] h-full
                  ${isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                  }
                `}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <h3 className={`text-2xl font-bold ${colors.title} mb-6 tracking-wide text-center`}>{item.title}</h3>
                <ul className="list-disc list-inside space-y-3 text-left">
                  {item.points.map((point, i) => (
                    <li key={i} className="text-gray-300 text-sm leading-relaxed pl-2">
                      <span className="-ml-2">
                        {point.text}
                        {point.linkText && point.url && (
                          <>
                            {' '}
                            <a 
                              href={point.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-400/50 hover:decoration-blue-300"
                            >
                              {point.linkText}
                            </a>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CareerHighlights;

