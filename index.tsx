
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BookOpen, 
  Users, 
  ShieldCheck, 
  MessageSquare, 
  ExternalLink, 
  ArrowRight, 
  Heart, 
  Globe, 
  Mail, 
  Award,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Code
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- Types & Data ---

interface Character {
  name: string;
  role: string;
  description: string;
  image: string;
  gradient: string;
}

const characters: Character[] = [
  {
    name: "Sue Chan",
    role: "The Visionary Coder",
    description: "A brilliant 17-year-old coder who believes technology should empower people, not just harvest their data. She is the architect of the survival code.",
    image: "https://suraj-k-gupta-dev.github.io/Code-of-survival/generated-image%20(13).png?auto=format&fit=crop&q=80&w=400",
    gradient: "from-[#8B5CF6] to-[#D946EF]"
  },
  {
    name: "Clara Schneider",
    role: "The Community Bridge",
    description: "Sue's close ally who understands the human pulse of Riverside. She ensures that technology serves the most vulnerable members of society.",
    image: "https://suraj-k-gupta-dev.github.io/Code-of-survival/generated-image%20(9).png?auto=format&fit=crop&q=80&w=400",
    gradient: "from-[#D946EF] to-[#06B6D4]"
  },
  {
    name: "Leo Lace",
    role: "The Strategy Architect",
    description: "A tactical thinker who balances the group's idealistic vision with the hard realities of a tech-dominated world.",
    image: "https://suraj-k-gupta-dev.github.io/Code-of-survival/generated-image%20(10).png?auto=format&fit=crop&q=80&w=400",
    gradient: "from-[#06B6D4] to-[#8B5CF6]"
  },
  {
    name: "Erik Lindqvist",
    role: "The Tech Titan (Antagonist)",
    description: "The architect of the convenience-first world where privacy is a relic. He represents the ethical decay Sue fights against.",
    image: "https://suraj-k-gupta-dev.github.io/Code-of-survival/generated-image%20(12).png?auto=format&fit=crop&q=80&w=400",
    gradient: "from-slate-700 to-slate-900"
  }
];

const discussionQuestions = [
  "How does Sue Chan's vision of 'privacy as power' challenge our current reality of 'convenience at any cost'?",
  "In what ways does Erik Lindqvist represent the ethical pitfalls of modern startup culture?",
  "What role does community play in the story's technological 'Code of Survival'?",
  "Does technology truly reconnect us, or is it a barrier to genuine human interaction?",
  "How does the setting of Riverside mirror or differ from your own city's digital landscape?",
  "Which character's leadership style—Sue, Clara, or Leo—would you follow in a crisis?",
  "Is 'Connect Local' a viable solution for real-world privacy concerns?",
  "What do you predict will happen in the sequel regarding the global impact of the Code?"
];

// --- Styled Components ---

const PetalButton = ({ children, className = "", primary = true, ...props }: any) => {
  const baseClass = "relative px-8 py-3 font-semibold transition-all duration-300 overflow-hidden active:scale-95";
  const petalShape = "rounded-[20px_5px_20px_5px]";
  const variantClass = primary 
    ? "bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#06B6D4] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(217,70,239,0.6)]" 
    : "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20";

  return (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      className={`${baseClass} ${petalShape} ${className} ${variantClass}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

const GlassCard = ({ children, className = "" }: any) => (
  <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-6 ${className}`}>
    {children}
  </div>
);

// Added : any to the props parameter to fix the TypeScript error where 'key' was not recognized on the inferred type.
const FloatingPetal = ({ delay = 0, x = "50%", scale = 1 }: any) => (
  <motion.div
    initial={{ y: -100, x, opacity: 0, rotate: 0 }}
    animate={{ 
      y: ['0vh', '110vh'],
      x: [x, `calc(${x} + 50px)`, `calc(${x} - 50px)`, x],
      opacity: [0, 0.4, 0.4, 0],
      rotate: [0, 360]
    }}
    transition={{ 
      duration: 15, 
      repeat: Infinity, 
      delay, 
      ease: "linear" 
    }}
    className="fixed pointer-events-none z-0"
    style={{ scale }}
  >
    <div className="w-6 h-10 bg-gradient-to-br from-pink-300/20 to-magenta-400/10 rounded-[50%_50%_50%_50%_/_80%_80%_20%_20%] rotate-45" />
  </motion.div>
);

// --- Main Sections ---

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#8B5CF6] to-[#06B6D4] rounded-[15px_5px_15px_5px] flex items-center justify-center shadow-lg">
            <BookOpen className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-tight">
            Code of Survival : Startup Surge
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium">
          {['The Story', 'Characters', 'Innovation', 'Book Club', 'Author'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`} 
              className="text-white/80 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#D946EF] rounded-full transition-all group-hover:w-full" />
            </a>
          ))}
          <PetalButton className="text-sm px-6 py-2">Buy Now</PetalButton>
        </div>

        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 bg-[#0F172A] z-40 md:hidden flex flex-col items-center justify-center gap-8"
          >
            {['The Story', 'Characters', 'Innovation', 'Book Club', 'Author'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="text-2xl text-white font-bold"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <PetalButton className="mt-4">Buy Now</PetalButton>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617]">
      {/* Sunset Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8B5CF6]/10 via-[#D946EF]/5 to-[#020617] pointer-events-none" />
      
      {/* Animated Particles/Cherry Blossoms */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(15)].map((_, i) => (
          <FloatingPetal key={i} delay={i * 2} x={`${i * 7}%`} scale={0.5 + Math.random()} />
        ))}
      </div>

      <motion.div style={{ y: y1, opacity }} className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#06B6D4] font-bold tracking-[0.2em] mb-4 uppercase text-sm"
        >
          A Novel by Suraj Kumar Gupta
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight"
        >
          Code of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#06B6D4]">Survival</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          In a world where convenience is the ultimate currency, a group of young innovators discovers that privacy is the only true power.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <PetalButton className="text-lg group">
            Start Reading <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
          </PetalButton>
          <a 
            href="https://www.amazon.com/dp/B0FTXMPLJL" 
            target="_blank" 
            className="px-8 py-3 rounded-[20px_5px_20px_5px] border border-white/20 hover:bg-white/5 transition-all flex items-center gap-2 text-white font-semibold"
          >
            Amazon Kindle <ExternalLink size={16} />
          </a>
        </motion.div>
      </motion.div>

      {/* Hero Book Mockup */}
      <motion.div 
        initial={{ opacity: 0, rotateY: 30, x: 100 }}
        animate={{ opacity: 1, rotateY: 15, x: 0 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] h-[600px] preserve-3d"
      >
        <div className="w-full h-full bg-gradient-to-br from-[#8B5CF6] via-[#D946EF] to-[#06B6D4] rounded-r-3xl shadow-[50px_0_100px_rgba(0,0,0,0.5)] border-y border-r border-white/20 p-8 flex flex-col justify-end overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000')] bg-cover" />
          <h2 className="text-4xl font-black text-white relative z-10 leading-none mb-2">CODE OF SURVIVAL</h2>
          <p className="text-white/80 text-lg relative z-10 uppercase tracking-widest font-bold">Startup Surge</p>
        </div>
      </motion.div>
    </section>
  );
};

const YoungInnovators = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="innovation" className="py-24 bg-[#0F172A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] font-bold text-xs uppercase tracking-widest mb-6">
              <Award size={14} /> Future of Tech
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Empowering the Next Generation of <span className="text-[#06B6D4]">Ethical Innovators</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Suraj Kumar Gupta, the 17-year-old visionary behind <span className="italic">Startup Surge</span>, believes that technology should be a tool for community empowerment, not just a mechanism for surveillance. 
            </p>
            
            <GlassCard className="mb-8 border-[#06B6D4]/20">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
                <ShieldCheck className="text-[#06B6D4]" /> Connect Local: Privacy by Design
              </h3>
              <p className="text-slate-300 leading-relaxed">
                The Connect Local platform concept explores a decentralized social network where data never leaves the user's community. It's a vision for ethical innovation where privacy is the foundational layer.
              </p>
            </GlassCard>

            <div className="bg-gradient-to-br from-[#8B5CF6]/20 to-transparent p-6 rounded-2xl border border-[#8B5CF6]/20">
              <p className="text-white italic text-lg mb-4">
                "Technology reconnects us... through the shared stories it enables. We must build for trust, not just for clicks."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-[#8B5CF6] overflow-hidden">
                   <img src="https://suraj-k-gupta-dev.github.io/Code-of-survival/IMG_20260104_210539.jpg?auto=format&fit=crop&q=80&w=100" alt="Suraj" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-bold">Suraj Kumar Gupta</p>
                  <p className="text-slate-400 text-sm">Author & Innovator</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-10 border-[#D946EF]/20 relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D946EF]/10 blur-3xl rounded-full" />
              <h3 className="text-2xl font-bold text-white mb-2">Submit Your Innovation</h3>
              <p className="text-slate-400 mb-8">Are you building something ethical? We want to showcase young developers who prioritize community and privacy.</p>
              
              {!submitted ? (
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Your Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#06B6D4] transition-colors" placeholder="Jane Doe" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Project Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#06B6D4] transition-colors" placeholder="EcoConnect" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Tell us about your ethical vision</label>
                    <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#06B6D4] transition-colors" placeholder="How does your project respect user privacy?" required></textarea>
                  </div>
                  <PetalButton type="submit" className="w-full">Submit My Idea</PetalButton>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="text-green-500 w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-slate-400">Thanks for being a part of the ethical tech movement. We'll be in touch soon.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 text-[#06B6D4] hover:underline">Send another idea</button>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CharactersSection = () => {
  return (
    <section id="characters" className="py-24 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]">Survivors</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">The tech-noir landscape of Riverside is shaped by visionaries and villains alike.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {characters.map((char, idx) => (
            <motion.div
              key={char.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <GlassCard className="h-full flex flex-col p-0 overflow-hidden border-white/5 group-hover:border-white/20 transition-all">
                <div className="relative h-64 overflow-hidden">
                  <img src={char.image} alt={char.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${char.gradient} opacity-20 group-hover:opacity-40 transition-opacity`} />
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-white mb-1">{char.name}</h3>
                  <p className="text-[#06B6D4] text-sm font-bold uppercase tracking-wider mb-4">{char.role}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{char.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DiscussionGuide = () => {
  return (
    <section id="book-club" className="py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6">
        <GlassCard className="p-12 border-magenta-500/20">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-black text-white mb-6">Book Club <span className="text-[#D946EF]">Discussion Guide</span></h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Dive deeper into the ethical dilemmas and technological foresight of <span className="italic">Startup Surge</span> with these curated conversation starters.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/80">
                  <Users className="text-[#D946EF]" /> Perfect for tech ethics classes
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Globe className="text-[#D946EF]" /> Global privacy implications
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Heart className="text-[#D946EF]" /> Character-driven analysis
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
              {discussionQuestions.map((q, i) => (
                <div key={i} className="bg-white/5 border border-white/5 hover:border-white/20 p-4 rounded-xl transition-all cursor-default group">
                  <span className="text-[#D946EF] font-bold block mb-2 opacity-50">#0{i+1}</span>
                  <p className="text-slate-200 text-sm leading-relaxed group-hover:text-white transition-colors">{q}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

const AuthorSection = () => {
  return (
    <section id="author" className="py-24 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#8B5CF6]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="w-full aspect-square rounded-[40px_10px_40px_10px] bg-gradient-to-tr from-[#8B5CF6] via-[#D946EF] to-[#06B6D4] p-1 shadow-2xl overflow-hidden">
               <div className="w-full h-full bg-slate-900 rounded-[38px_8px_38px_8px] overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1519085185758-29178f0d9ef6?auto=format&fit=crop&q=80&w=800" alt="Suraj Kumar Gupta" className="w-full h-full object-cover" />
               </div>
            </div>
            {/* Stats Card Overlay */}
            <div className="absolute -bottom-6 -right-6">
              <GlassCard className="p-6 border-cyan-500/30">
                <div className="flex items-center gap-4">
                  <div className="text-center px-4 border-r border-white/10">
                    <p className="text-3xl font-black text-white">17</p>
                    <p className="text-[10px] uppercase text-slate-400 tracking-tighter">Age of Author</p>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-3xl font-black text-white">1</p>
                    <p className="text-[10px] uppercase text-slate-400 tracking-tighter">Published Novel</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </motion.div>

          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">The Mind Behind <span className="text-[#06B6D4]">Riverside</span></h2>
            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
              Suraj Kumar Gupta is a 17-year-old innovator from India who blends his technical prowess with deep storytelling. At the intersection of literature and code, Suraj explores how digital systems impact our human connections.
            </p>
            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
                  <Globe />
                </div>
                <div>
                  <h4 className="text-white font-bold">Innovation First</h4>
                  <p className="text-slate-400 text-sm">Passionate about decentralized systems and user-owned data.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#06B6D4]/10 flex items-center justify-center text-[#06B6D4]">
                  <MessageSquare />
                </div>
                <div>
                  <h4 className="text-white font-bold">Community Voice</h4>
                  <p className="text-slate-400 text-sm">Speaker at youth tech conferences advocating for digital ethics.</p>
                </div>
              </div>
            </div>
            <PetalButton primary={false} className="group">
              Follow Suraj's Journey <ArrowRight size={18} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </PetalButton>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#020617] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-tr from-[#8B5CF6] to-[#06B6D4] rounded-[10px_3px_10px_3px] flex items-center justify-center">
                <BookOpen className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">STARTUP SURGE</span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              A literary journey through the ethics of innovation. Build for humanity, protect your privacy, and find your survival code.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#innovation" className="hover:text-white transition-colors">Innovation</a></li>
              <li><a href="#characters" className="hover:text-white transition-colors">Characters</a></li>
              <li><a href="https://www.amazon.com/dp/B0FTXMPLJL" target="_blank" className="hover:text-white transition-colors">Buy Book</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white"><Globe size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white"><Mail size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white"><Code size={18} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:row justify-between items-center gap-4 text-slate-600 text-sm">
          <p>© 2024 Code of Survival: Startup Surge. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---

const App = () => {
  return (
    <div className="bg-[#020617] text-slate-200 selection:bg-[#D946EF]/30 selection:text-white font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          scroll-behavior: smooth;
        }

        h1, h2, h3, h4 {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.02em;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #020617;
        }
        ::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>

      <Header />
      <main>
        <Hero />
        
        {/* Intro Section */}
        <section id="the-story" className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8">20 Chapters of <span className="text-[#8B5CF6]">High-Stakes</span> Tech Noir</h2>
            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
              In the heart of Riverside, the boundary between community and convenience has blurred. When Sue Chan discovers the true price of her city's technological "utopia," she must lead a group of misfits to reclaim their digital sovereignty.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <ShieldCheck className="text-[#06B6D4] mb-2" />
                <h4 className="text-white font-bold text-sm">Ethics First</h4>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <Code className="text-[#D946EF] mb-2" />
                <h4 className="text-white font-bold text-sm">Privacy Code</h4>
              </div>
            </div>
          </motion.div>
          <div className="relative">
             <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000" alt="Tech City" className="rounded-2xl shadow-2xl opacity-50 grayscale hover:grayscale-0 transition-all duration-1000" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent" />
          </div>
        </section>

        <CharactersSection />
        <YoungInnovators />
        <DiscussionGuide />
        <AuthorSection />
      </main>
      <Footer />
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
