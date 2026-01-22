import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import AIChat from './components/AIChat';
import SkillChart from './components/SkillChart';
import TechNetwork from './components/TechNetwork';
import CareerTree from './components/CareerTree';
import CVPipeline from './components/CVPipeline';
import CareerHighlights from './components/CareerHighlights';
import ContactForm from './components/ContactForm';
import WhatImLookingFor from './components/WhatImLookingFor';
import WhatYouGet from './components/WhatYouGet';
import { Project, ViewState, CareerItem } from './types';
import headshotImage from './Headshot.PNG';

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
    description: "Awarded Top Travel and Hospitality Startup (Seed) in North America by PhocusWright for 2025. Levee uses CV + Agents within hotels to unlock overall operational efficiency. As the first employee (outside of the two Co-Founders), I built the initial object detection model and am responsible for implementing our end-to-end CV pipeline, from annotation to deployment. Also implemented multi-agent systems and frontend apps for both internal and external use.",
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
                onClick={() => setActiveView(ViewState.BLOG)}
                className="px-8 py-3 bg-transparent hover:bg-white/10 text-white font-bold rounded-none skew-x-[-12deg] transition-all border border-white/30"
              >
                 <span className="skew-x-[12deg] block">BLOG</span>
              </button>
            </div>

            {/* Career Timeline Section */}
            <div className="w-full border-t border-slate-800/50 pt-20 pb-0">
               <h2 className="text-4xl font-bold mb-4 text-center neon-text tracking-widest">CAREER TRAJECTORY</h2>
               <p className="text-gray-400 mb-12">A <span className="text-blue-400">Professional</span> + <span className="text-pink-400">Personal</span> Timeline.</p>
               <CareerTree items={careerHistory} />
            </div>

            {/* Career Highlights Section - Continues from CareerTree */}
            <div className="w-full pt-0 pb-0">
               <h2 className="text-4xl font-bold mb-4 text-center neon-text tracking-widest">CAREER HIGHLIGHTS</h2>
               <p className="text-gray-400 mb-8">Key achievements and impact.</p>
               <CareerHighlights />
            </div>

            {/* What I'm Looking For Section - Continues from CareerHighlights */}
            <div className="w-full pt-12 pb-0">
               <h2 className="text-4xl font-bold mb-4 text-center neon-text tracking-widest">WHAT I'M LOOKING FOR NEXT</h2>
               <p className="text-gray-400 mb-8">Mission parameters.</p>
               <WhatImLookingFor />
            </div>

            {/* What You Get Section - Continues from WhatImLookingFor */}
            <div className="w-full pt-12 pb-20">
               <h2 className="text-4xl font-bold mb-4 text-center neon-text tracking-widest">WHAT YOU GET FROM ME</h2>
               <p className="text-gray-400 mb-8">My work principles.</p>
               <WhatYouGet />
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
            
            {/* CV Pipeline Demo Section */}
            <div className="mb-20">
              <h3 className="text-2xl font-bold text-blue-400 mb-6 tracking-widest uppercase text-center md:text-left border-l-4 border-blue-500 pl-4">
                Active Computer Vision Pipeline
              </h3>
              <p className="text-gray-400 mb-8 max-w-3xl">
                Interact with a live demonstration of my object detection pipeline. 
                Select a sample image from the dataset, adjust confidence thresholds, and execute the model in real-time.
              </p>
              <CVPipeline />
            </div>
          </div>
        );

      case ViewState.ABOUT:
        return (
          <div className="pt-24 px-4 max-w-7xl mx-auto min-h-screen">
             <h2 className="text-5xl font-bold mb-12 text-center neon-text">ABOUT ME</h2>
             
             {/* Profile & Info Section */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
                
                {/* Image */}
                <div className="relative flex justify-center lg:justify-end">
                   <div className="w-64 h-64 md:w-80 md:h-80 relative">
                     <div className="absolute inset-0 border-2 border-blue-500 rounded-full animate-[spin_10s_linear_infinite] opacity-50 border-t-transparent border-l-transparent"></div>
                     <div className="absolute inset-2 border-2 border-purple-500 rounded-full animate-[spin_15s_linear_infinite_reverse] opacity-50 border-b-transparent border-r-transparent"></div>
                     <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-slate-800 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                        <img 
                          src={headshotImage} 
                          alt="Michael Tiernan" 
                          className="w-full h-full object-cover filter hover:brightness-110 transition-all"
                        />
                     </div>
                   </div>
                </div>

                {/* Bio & Contact */}
                <div className="space-y-6 text-center lg:text-left">
                   <h3 className="text-3xl font-bold text-white">
                     Michael Tiernan
                     <span className="block text-lg font-normal text-blue-400 mt-1 font-mono">AI Engineer</span>
                   </h3>
                   <p className="text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
                     Continuous learning and pushing boundaries to build solutions that solve complex problems. Proven track record of building products in both corporate and startup environments.
                   </p>
                   
                   <div className="flex flex-col gap-4 max-w-sm mx-auto lg:mx-0">
                      {/* Contact Form */}
                      <ContactForm />
                      
                      {/* Calendar Embed Placeholder */}
                      <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg flex items-center gap-4 relative overflow-hidden group cursor-pointer hover:border-blue-500/50 transition-colors">
                        <span className="text-purple-400">📅</span>
                        <div className="text-left z-10">
                           <div className="text-xs text-gray-500 uppercase tracking-widest">Availability</div>
                           <div className="text-white font-bold group-hover:text-blue-400 transition-colors">Schedule a Call</div>
                        </div>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 group-hover:translate-x-1 transition-transform">→</div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Skills Network Section */}
             <div className="border-t border-slate-800/50 pt-12">
               <h3 className="text-2xl font-bold mb-8 text-center neon-text tracking-widest">TECHNICAL ARSENAL</h3>
               <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                 Visualizing the interconnections between core technologies in my stack.
               </p>
               <div className="h-[600px] w-full border border-slate-800 rounded-xl bg-black/20 backdrop-blur-sm overflow-hidden relative">
                  <TechNetwork />
                  <div className="absolute top-4 right-4 p-4 bg-black/60 backdrop-blur rounded border border-slate-700 max-w-xs text-xs">
                    <div className="font-bold text-blue-400 mb-1">Core Stack</div>
                    <p className="text-gray-400">React, TypeScript, Python, TensorFlow</p>
                  </div>
               </div>
             </div>
          </div>
        );

      case ViewState.BLOG:
        return (
          <div className="pt-24 px-4 max-w-5xl mx-auto min-h-screen">
            <h2 className="text-5xl font-bold mb-12 text-center neon-text">TRANSMISSIONS</h2>
            
            {/* Featured Post */}
            <div className="mb-20 group cursor-pointer">
              <div className="relative h-[400px] rounded-2xl overflow-hidden border border-slate-700 group-hover:border-blue-500/50 transition-all shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop" 
                  alt="AI Vision"
                  className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
                  <div className="absolute bottom-0 left-0 p-8 md:p-12">
                     <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-blue-900 bg-blue-400 rounded uppercase">Computer Vision</span>
                     <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-blue-300 transition-colors">
                       The Future of Object Detection in Hospitality
                     </h3>
                     <p className="text-gray-300 text-lg max-w-2xl mb-6 line-clamp-2">
                       How we are using advanced YOLO models to automate inventory tracking and improve guest experiences in real-time.
                     </p>
                     <div className="flex items-center text-sm text-gray-400 font-mono">
                        <span>Jan 24, 2026</span>
                        <span className="mx-3">•</span>
                        <span>8 min read</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {[
                 {
                   title: "Scaling LLM Agents for Enterprise",
                   excerpt: "Challenges and solutions when deploying multi-agent systems in production environments.",
                   date: "Jan 15, 2026",
                   tag: "LLMs",
                   color: "purple"
                 },
                 {
                   title: "From Seed to Series A: A Tech Lead's Perspective",
                   excerpt: "Lessons learned building the technical foundation of a high-growth startup.",
                   date: "Dec 28, 2025",
                   tag: "Business",
                   color: "green"
                 },
                 {
                   title: "Optimizing React Performance for Data Visualization",
                   excerpt: "Techniques for rendering thousands of data points without blocking the main thread.",
                   date: "Dec 10, 2025",
                   tag: "Engineering",
                   color: "blue"
                 },
                 {
                   title: "The Ethics of Autonomous Systems",
                   excerpt: "Navigating the moral landscape of deploying AI in public spaces.",
                   date: "Nov 22, 2025",
                   tag: "AI Ethics",
                   color: "pink"
                 }
               ].map((post, i) => (
                 <div key={i} className="flex flex-col group cursor-pointer">
                    <div className="relative h-64 mb-6 overflow-hidden rounded-xl border border-slate-800">
                      <div className={`absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 group-hover:scale-105 transition-transform duration-500`}></div>
                      {/* Abstract pattern overlay */}
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
                      
                      <div className="absolute top-6 left-6">
                        <span className={`px-3 py-1 text-xs font-bold tracking-widest text-${post.color}-300 bg-${post.color}-900/30 border border-${post.color}-500/30 rounded uppercase`}>
                          {post.tag}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-100 mb-3 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 font-mono uppercase tracking-widest mt-auto">
                       <span>{post.date}</span>
                       <span className="mx-2">•</span>
                       <span className="group-hover:translate-x-1 transition-transform text-blue-500">Read Article →</span>
                    </div>
                 </div>
               ))}
            </div>

            {/* Newsletter / RSS */}
            <div className="mt-24 p-12 bg-slate-900/30 border border-slate-800 rounded-2xl text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
               <h3 className="text-2xl font-bold text-white mb-4">Subscribe to Intelligence Feed</h3>
               <p className="text-gray-400 mb-8 max-w-lg mx-auto">Get the latest deep dives on AI engineering and startup strategies delivered to your inbox.</p>
               <div className="flex max-w-md mx-auto">
                 <input type="email" placeholder="email@address.com" className="flex-1 bg-black/50 border border-slate-700 rounded-l px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                 <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-r font-bold uppercase tracking-widest text-sm transition-colors">
                   Connect
                 </button>
               </div>
            </div>
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
                { id: ViewState.ABOUT, label: 'ABOUT ME' },
              ] : []),
              { id: ViewState.BLOG, label: 'BLOG' },
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