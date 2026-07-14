import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Sparkles, Cpu, Code2, ShieldAlert, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { identity, featuredProjects, areasOfInterest } from '../data';

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  // Auto-typing/cycling tagline effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullRole = identity.roles[roleIndex];
    
    const tick = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullRole.substring(0, currentText.length + 1));
        if (currentText === fullRole) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        // Deleting
        setCurrentText(fullRole.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % identity.roles.length);
          return;
        }
      }
      
      const speed = isDeleting ? 30 : 70;
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  // Tech console clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] md:min-h-screen py-12 md:py-20 px-4 md:px-12 flex flex-col justify-center overflow-hidden bg-grid-pattern">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[30%] w-72 h-72 rounded-full bg-[#00E559]/5 blur-[120px] glow-overlay-1" />
        <div className="absolute bottom-[30%] right-[20%] w-96 h-96 rounded-full bg-[#38BDF8]/5 blur-[150px] glow-overlay-2" />
        <div className="absolute top-0 left-0 w-full h-full scanlines opacity-30 pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col justify-between h-full gap-12">
        
        {/* Top Status Indicators (Engineering Console Theme) */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-[#27272a]/80 pb-4 text-[11px] font-mono tracking-wider text-zinc-500"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E559] inline-block animate-pulse" />
            <span>LOC: <span className="text-white">{identity.location.toUpperCase()}</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span>CLOCK: <span className="text-zinc-300 font-medium">{timeStr}</span></span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="hidden sm:inline">CONN: <span className="text-[#38BDF8]">SECURE</span></span>
          </div>
        </motion.div>

        {/* Hero Section */}
        <div className="space-y-6 text-left my-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1B1E] border border-[#27272a] text-[11px] font-mono text-[#38BDF8] tracking-widest font-semibold uppercase"
          >
            <Terminal className="w-3.5 h-3.5 text-[#00E559]" />
            <span>INITIALIZE_PORTFOLIO_CORE</span>
          </motion.div>

          <div className="space-y-3">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#00E559]"
            >
              HELLO WORLD, MY NAME IS
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.04]"
            >
              {identity.name}
            </motion.h1>
          </div>

          {/* Typing Tagline */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="h-8 md:h-10 flex items-center font-mono text-base md:text-xl font-bold text-[#38BDF8]"
          >
            <span className="text-zinc-500 mr-2">&gt;</span>
            <span>{currentText}</span>
            <span className="w-2.5 h-5 bg-[#00E559] ml-1 animate-pulse" />
          </motion.div>

          {/* Brief Intro */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg text-[#A1A1AA] leading-relaxed max-w-2xl font-sans"
          >
            CSE student at Daffodil International University building software at the intersection of web technology, AI explorations, and cyber security fundamentals. Focused on consistency and continuous craft development.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <Link 
              to="/projects"
              className="px-6 py-3 bg-[#00E559] text-black font-semibold rounded-[20px] text-sm tracking-wide inline-flex items-center gap-2 hover:bg-[#00c54c] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-[0_4px_20px_rgba(0,229,89,0.3)] hover:shadow-[0_6px_25px_rgba(0,229,89,0.4)]"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link 
              to="/contact"
              className="px-6 py-3 bg-[#1A1B1E] hover:bg-[#25272b] text-white border border-[#27272a] hover:border-[#38BDF8]/40 font-semibold rounded-[20px] text-sm tracking-wide inline-flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              <span>Contact Me</span>
              <Terminal className="w-4 h-4 text-[#38BDF8]" />
            </Link>
          </motion.div>
        </div>

        {/* Bento/Dashboard Overview Grid (Engineering Console vibe) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#27272a]/80 pt-8"
        >
          {/* Box 1 */}
          <div className="bg-[#1A1B1E]/60 border border-[#27272a] rounded-[20px] p-5 flex flex-col justify-between hover:border-[#00E559]/30 transition-all group">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">ACADEMIC_TRACK</span>
              <Cpu className="w-4 h-4 text-[#00E559] group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <p className="font-mono text-xl font-bold text-white tracking-wider">B.TECH CSE</p>
              <p className="font-sans text-[11px] text-zinc-400 mt-1">Daffodil International University</p>
            </div>
          </div>

          {/* Box 2 */}
          <div className="bg-[#1A1B1E]/60 border border-[#27272a] rounded-[20px] p-5 flex flex-col justify-between hover:border-[#38BDF8]/30 transition-all group">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">SYSTEMS_BUILD</span>
              <Code2 className="w-4 h-4 text-[#38BDF8] group-hover:-translate-y-1 transition-transform" />
            </div>
            <div>
              <p className="font-mono text-xl font-bold text-white tracking-wider">{featuredProjects.length} MODULES</p>
              <p className="font-sans text-[11px] text-zinc-400 mt-1">Compiled real-world repository projects</p>
            </div>
          </div>

          {/* Box 3 */}
          <div className="bg-[#1A1B1E]/60 border border-[#27272a] rounded-[20px] p-5 flex flex-col justify-between hover:border-[#00E559]/30 transition-all group">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">COMPETITIVE</span>
              <Award className="w-4 h-4 text-[#00E559] group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <p className="font-mono text-xl font-bold text-white tracking-wider">ACTIVE</p>
              <p className="font-sans text-[11px] text-zinc-400 mt-1">LeetCode & Codeforces practices</p>
            </div>
          </div>
        </motion.div>

        {/* Footer closing tag */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center font-mono text-[10px] text-zinc-600 tracking-wider"
        >
          // "{identity.closingQuote}"
        </motion.div>

      </div>
    </div>
  );
}
