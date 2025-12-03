import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import AIChat from './components/AIChat';
import SkillChart from './components/SkillChart';
import TechNetwork from './components/TechNetwork';
import CareerTree from './components/CareerTree';
import CareerHighlights from './components/CareerHighlights';
import { Project, ViewState, CareerItem } from './types';

const projects: Project[] = [
  {
    id: 1,
    title: "Project Aether",
    description: "A decentralized autonomous organization dashboard visualizing real-time blockchain metrics.",
    technologies: ["React", "Web3.js", "D3.js", "Tailwind"],
    imageUrl: "https://picsum.photos/600/400?random=1",
    link: "#"
  },
  {
    id: 2,
    title: "Neon Commerce",
    description: "Next-gen e-commerce platform with AI-driven product recommendations and AR previews.",
    technologies: ["Next.js", "Gemini API", "Three.js", "Stripe"],
    imageUrl: "https://picsum.photos/600/400?random=2",
    link: "#"
  },
  {
    id: 3,
    title: "Cyber Security Hub",
    description: "Threat intelligence platform aggregating data from multiple global sources.",
    technologies: ["Vue", "Python", "ElasticSearch", "Docker"],
    imageUrl: "https://picsum.photos/600/400?random=3",
    link: "#"
  }
];

const careerHistory: CareerItem[] = [
  {
    id: 1,
    role: "Online Project Supervisor",
    company: "MarketView Research",
    period: "Mar 2015 - Nov 2017",
    description: "Started my career here out of college and wore many hats as I was responsible for managing multi-phase market research projects focused on new product offerings for Fortune 500 companies.<br>This consisted of:<ul style='margin-top: 8px; padding-left: 64px; list-style-type: disc; text-align: left;'><li style='padding-left: 4px;'>Programming online surveys</li><li style='padding-left: 4px;'>Analyzing and managing incoming data</li><li style='padding-left: 4px;'>Collaborating with the insights team on findings</li></ul>",
    technologies: ["HTML", "CSS", "SQL", "Photoshop"]
  },
  {
    id: 2,
    role: "Process Control Analyst",
    company: "The NPD Group",
    period: "Nov 2017 - Sep 2019",
    description: "Landed a job for a top 10 market research company where I learned how data at scale flows from end-to-end, from ingestion to client reports. ",
    technologies: ["Proprietary Software"]
  },
  {
    id: 3,
    role: "Data Management Specialist",
    company: "The NPD Group",
    period: "Sep 2019 - Jul 2021",
    description: "Moved from POS to CPG Receipt Panel data processing to work with industry leading tools and expand my skillset.",
    technologies: ["Snowflake", "SQL", "Alteryx"]
  },
  {
    id: 4,
    role: "Data Science Bootcamp",
    company: "Flatiron School",
    period: "Aug 2020 - Jun 2021",
    description: "Shortly after Covid-19 hit, I enrolled in a 10-month long part-time DS Bootcamp. This was extremely challenging to balance with my full-time job, but ultimately this played a signficiant role in my career as it provided me with a strong foundation in data science and machine learning.",
    technologies: ["Git", "Pandas", "Numpy", "Matplotlib", "Seaborn", "Scikit-Learn", "PyTorch"]
  },
  {
    id: 5,
    role: "Manager, Production Management",
    company: "The NPD Group",
    period: "Jul 2021 - Jul 2022",
    description: "With my new skills from the bootcamp, I took a larger role in processing our CPG Receipt-based data, implementing python to build custom scripts to automate several data cleaning processes and client reports.",
    technologies: ["Snowflake", "SQL", "Alteryx", "Python"]
  },
  {
    id: 6,
    role: "Analytics Engineer",
    company: "The NPD Group + Circana",
    companyNote: "(NPD + IRI merged to form Circana)",
    period: "Jul 2022 - Aug 2023",
    description: "Built a custom program for the Analytics team to use for analyzing our CPG data at the buyer-level and creating client reports. This program ultimately replaced all Tableau and Alteryx licenses and was a MASSIVE time saver for the team of 10 analysts.",
    technologies: ["PySpark", "Databricks", "Tableau"]
  },
  {
    id: 7,
    role: "Got Married!",
    period: "Jul 2023"
  },
  {
    id: 8,
    role: "Data Science Manager",
    company: "Circana",
    period: "Aug 2023 - Present",
    description: "Implemented new classification strategies using CV and LLMs to classify incoming data into our hierarchy. Also managed a team of three analysts enhancing our data classification coverage and accuracy.",
    technologies: ["Computer Vision", "LLMs", "Traditional ML", "Git", "Jira"]
  },
  {
    id: 9,
    role: "Lead AI Engineer",
    company: "Levee",
    period: "May 2024 - Present",
    description: "Awarded Top Travel and Hospitality Startup (Seed) in North America by PhocusWright for 2025. Levee uses CV + Agents within hotels to increase overall operational efficiency. As the first employee (outside of the two Co-Founders), I built the initial object detection model and am responsible for implementing our end-to-end CV pipeline, from annotation to deployment. Also implemented multi-agent systems and frontend apps for both internal and external use.",
    technologies: ["Computer Vision", "LLMs", "Traditional ML", "Git", "Jira", "Google Cloud", "VLMs", "Swagger", "Docker", "Vercel"]
  }
];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>(ViewState.HOME);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderContent = () => {
    switch(activeView) {
      case ViewState.HOME:
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
            <h1 className="text-6xl md:text-8xl font-black mb-6 animate-fade-in tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 neon-text">
              MICHAEL<br/>TIERNAN
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-8 font-light tracking-wide">
              An AI Engineer building to solve complex problems with <span className="text-blue-400 font-semibold">Computer Vision</span>, <span className="text-purple-400 font-semibold">LLMs</span>, and <span className="text-pink-400 font-semibold">Traditional ML</span>.
            </p>
            <div className="flex space-x-4 mb-20">
              <button 
                onClick={() => setActiveView(ViewState.PROJECTS)}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-none skew-x-[-12deg] transition-all border border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              >
                <span className="skew-x-[12deg] block">VIEW WORK</span>
              </button>
              <button 
                onClick={() => setActiveView(ViewState.CONTACT)}
                className="px-8 py-3 bg-transparent hover:bg-white/10 text-white font-bold rounded-none skew-x-[-12deg] transition-all border border-white/30"
              >
                 <span className="skew-x-[12deg] block">CONTACT</span>
              </button>
            </div>

            {/* Career Timeline Section */}
            <div className="w-full border-t border-slate-800/50 pt-20 pb-0">
               <h2 className="text-4xl font-bold mb-4 text-center neon-text tracking-widest">CAREER TRAJECTORY</h2>
               <p className="text-gray-400 mb-12">A <span className="text-blue-400">Professional</span> + <span className="text-pink-400">Personal</span> Timeline.</p>
               <CareerTree items={careerHistory} />
            </div>

            {/* Career Highlights Section - Continues from CareerTree */}
            <div className="w-full pt-0 pb-20">
               <h2 className="text-4xl font-bold mb-4 text-center neon-text tracking-widest">CAREER HIGHLIGHTS</h2>
               <p className="text-gray-400 mb-8">Key achievements and impact.</p>
               <CareerHighlights />
            </div>
            
            <div className="mt-10 w-full max-w-4xl mx-auto opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
              <div className="p-1 border border-blue-500/20 rounded-xl bg-black/40 backdrop-blur">
                <h3 className="text-center text-blue-400 mb-4 text-sm tracking-widest uppercase mt-4">Proficiency Matrix</h3>
                <SkillChart />
              </div>
            </div>
          </div>
        );
      
      case ViewState.PROJECTS:
        return (
          <div className="pt-24 px-4 max-w-7xl mx-auto min-h-screen">
            <h2 className="text-5xl font-bold mb-12 text-center neon-text">DEPLOYED UNITS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((p) => (
                <div key={p.id} className="group relative bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <div className="h-48 overflow-hidden">
                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter grayscale group-hover:grayscale-0" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{p.title}</h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">{p.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-800 text-blue-300 text-xs rounded border border-slate-700">{tech}</span>
                      ))}
                    </div>
                    <a href={p.link} className="inline-block text-white border-b border-blue-500 pb-0.5 hover:text-blue-400 transition-colors text-sm uppercase tracking-wider">
                      Initialize Link &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case ViewState.SKILLS:
        return (
          <div className="pt-24 px-4 max-w-6xl mx-auto min-h-screen">
             <h2 className="text-5xl font-bold mb-8 text-center neon-text">NEURAL NET</h2>
             <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
               Visualizing the interconnections between core technologies in my stack.
               Drag nodes to interact with the gravitational field.
             </p>
             <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
                <div className="w-full lg:w-2/3">
                  <TechNetwork />
                </div>
                <div className="w-full lg:w-1/3 space-y-4">
                  <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
                    <h3 className="text-xl font-bold text-blue-400 mb-2">Core</h3>
                    <p className="text-sm text-gray-300">Expertise in building scalable front-end architectures using React and TypeScript.</p>
                  </div>
                   <div className="p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
                    <h3 className="text-xl font-bold text-purple-400 mb-2">AI Integration</h3>
                    <p className="text-sm text-gray-300">Seamless implementation of LLMs like Gemini to create adaptive user interfaces.</p>
                  </div>
                </div>
             </div>
          </div>
        );

      case ViewState.CONTACT:
        return (
          <div className="pt-24 px-4 max-w-3xl mx-auto min-h-screen flex flex-col items-center">
            <h2 className="text-5xl font-bold mb-12 text-center neon-text">ESTABLISH UPLINK</h2>
            <form className="w-full space-y-6 bg-slate-900/50 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-blue-400">Identity</label>
                  <input type="text" className="w-full bg-black/50 border border-slate-700 rounded p-3 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-blue-400">Frequency</label>
                  <input type="email" className="w-full bg-black/50 border border-slate-700 rounded p-3 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="Email" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-blue-400">Transmission</label>
                <textarea rows={5} className="w-full bg-black/50 border border-slate-700 rounded p-3 text-white focus:border-blue-500 focus:outline-none transition-colors" placeholder="Message content..." />
              </div>
              <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                Transmit Data
              </button>
            </form>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen text-gray-100 font-sans selection:bg-blue-500 selection:text-white">
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-3' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-black tracking-widest cursor-pointer hover:text-blue-400 transition-colors" onClick={() => setActiveView(ViewState.HOME)}>
            MICHAEL TIERNAN
          </div>
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {[
              { id: ViewState.HOME, label: 'BASE' },
              // Show Projects and Skills only in development
              ...(import.meta.env.DEV ? [
                { id: ViewState.PROJECTS, label: 'PROJECTS' },
                { id: ViewState.SKILLS, label: 'SKILLS' },
              ] : []),
              { id: ViewState.CONTACT, label: 'UPLINK' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`text-sm tracking-widest hover:text-blue-400 transition-colors ${activeView === item.id ? 'text-blue-400 border-b border-blue-400' : 'text-gray-400'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-20">
        {renderContent()}
      </main>

      {/* AI Assistant - Dev Only */}
      {import.meta.env.DEV && <AIChat />}

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-slate-800 text-center text-gray-600 text-sm">
        <p>&copy; 2025 NEXUS SYSTEMS. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default App;