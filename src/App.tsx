import React, { useState, useEffect } from 'react';
import { 
  Home, 
  User, 
  Layers, 
  Award, 
  MessageSquare, 
  Mail, 
  Github, 
  Cpu, 
  Sparkles, 
  Sliders, 
  Terminal, 
  ArrowRight, 
  Cloud, 
  CheckCircle2, 
  Globe, 
  TrendingUp, 
  Trophy, 
  FileCheck, 
  CheckSquare, 
  Rocket,
  Shield,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { identity, aboutCopy, techStack, areasOfInterest, featuredProjects, achievements, currentFocus } from './data';

// Import Pritam's portrait assets using Vite asset URL resolution
const pritamHoodieSide = new URL('./assets/images/pritam_black_hoodie_1783968409185.png', import.meta.url).href;
const pritamOutdoorPortrait = new URL('./assets/images/file_0000000082607208a99c0c040b6d5b3a.png', import.meta.url).href;
const pritamStudioPortrait = new URL('./assets/images/file_000000003d5c71fa8406ad2692f42c75.png', import.meta.url).href;
const pritamCasualPortrait = new URL('./assets/images/file_0000000093d0720883bf675e612d02d6.jpg', import.meta.url).href;
const pritamCreativePortrait = new URL('./assets/images/file_00000000e3347206b40d244129a1e357.png', import.meta.url).href;

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'about' | 'projects' | 'achievements' | 'contact'>('home');
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // Slides configuration for Console Workspace
  const slides = [
    {
      type: 'image',
      src: pritamHoodieSide,
      alt: 'Pritam Biswas hoodie profile',
      label: 'PORTRAIT // HOODIE_SIDE',
      status: 'TRACKING_OK'
    },
    {
      type: 'image',
      src: pritamOutdoorPortrait,
      alt: 'Pritam Biswas outdoor portrait',
      label: 'PORTRAIT // OUTDOOR',
      status: 'TRACKING_OK'
    },
    {
      type: 'image',
      src: pritamStudioPortrait,
      alt: 'Pritam Biswas studio portrait',
      label: 'PORTRAIT // STUDIO',
      status: 'TRACKING_OK'
    },
    {
      type: 'image',
      src: pritamCasualPortrait,
      alt: 'Pritam Biswas casual portrait',
      label: 'PORTRAIT // CASUAL',
      status: 'TRACKING_OK'
    },
    {
      type: 'image',
      src: pritamCreativePortrait,
      alt: 'Pritam Biswas creative portrait',
      label: 'PORTRAIT // CREATIVE',
      status: 'TRACKING_OK'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1); // 1 = forward, -1 = backward
  const [sliderHovered, setSliderHovered] = useState(false);

  // Auto-play interval for the slider
  useEffect(() => {
    if (slides.length <= 1 || sliderHovered) return;
    const interval = setInterval(() => {
      setSlideDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [sliderHovered, slides.length]);

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Cycling roles typing effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullTagline = identity.roles[taglineIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText(fullTagline.substring(0, currentText.length + 1));
        if (currentText === fullTagline) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setCurrentText(fullTagline.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setTaglineIndex((prev) => (prev + 1) % identity.roles.length);
          return;
        }
      }
      
      const speed = isDeleting ? 25 : 60;
      timer = setTimeout(handleTyping, speed);
    };

    timer = setTimeout(handleTyping, 100);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, taglineIndex]);

  // Skill progress animation trigger
  useEffect(() => {
    if (activePage === 'home') {
      const timer = setTimeout(() => setSkillsVisible(true), 200);
      return () => clearTimeout(timer);
    } else {
      setSkillsVisible(false);
    }
  }, [activePage]);

  const copyYamlToClipboard = () => {
    const yamlString = `learning:
  - React.js — components, hooks, state management
  - Cyber Security fundamentals & ethical hacking
  - AI — supervised and unsupervised learning
  - DSA for competitive programming
building:
  - Full stack web projects with React.js
  - AI-powered mini tools and automation scripts
  - Expanding the Government GenZ Web platform
exploring:
  - Game development concepts and prototyping
  - Open source contribution workflows
  - Cloud computing basics (AWS/GCP)`;
    
    navigator.clipboard.writeText(yamlString);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Mailto fallback link to send mail directly
    const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${identity.email}?subject=${subject}&body=${body}`;
    
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden flex select-none bg-[#09090b] text-white">

      {/* Sidebar - Desktop Only */}
      <aside className="hidden md:flex w-[68px] shrink-0 border-r border-white/[0.04] bg-[#0c0d0f] flex-col items-center py-6 justify-between z-30 shadow-[4px_0_24px_rgba(0,0,0,0.5)] relative">
        <div className="flex flex-col gap-6 items-center w-full">
          {/* Logo badge */}
          <div 
            onClick={() => setActivePage('home')}
            className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-2 shadow-lg cursor-pointer transition-colors hover:bg-white/[0.08] font-mono text-[11px] font-bold text-[#00e559]"
          >
            PB
          </div>
          
          <nav className="flex flex-col gap-3 w-full px-3" id="sidebar-nav">
            <button 
              onClick={() => setActivePage('home')}
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-300 ${activePage === 'home' ? 'bg-[#00e559] text-black shadow-[0_0_15px_rgba(0,229,89,0.4)] font-bold' : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]'}`}
              title="Home"
            >
              <Home className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActivePage('about')}
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-300 ${activePage === 'about' ? 'bg-[#00e559] text-black shadow-[0_0_15px_rgba(0,229,89,0.4)] font-bold' : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]'}`}
              title="About"
            >
              <User className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActivePage('projects')}
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-300 ${activePage === 'projects' ? 'bg-[#00e559] text-black shadow-[0_0_15px_rgba(0,229,89,0.4)] font-bold' : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]'}`}
              title="Projects"
            >
              <Layers className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActivePage('achievements')}
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-300 ${activePage === 'achievements' ? 'bg-[#00e559] text-black shadow-[0_0_15px_rgba(0,229,89,0.4)] font-bold' : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]'}`}
              title="Achievements"
            >
              <Award className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActivePage('contact')}
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-300 ${activePage === 'contact' ? 'bg-[#00e559] text-black shadow-[0_0_15px_rgba(0,229,89,0.4)] font-bold' : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]'}`}
              title="Contact"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
          </nav>
        </div>

        {/* Email Footer Shortcut */}
        <a 
          href={`mailto:${identity.email}`}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 transition-colors hover:text-zinc-200 hover:bg-white/[0.04]"
          title="Send Direct Email"
        >
          <Mail className="w-5 h-5" />
        </a>
      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-1 flex flex-col relative bg-[#09090b] overflow-hidden">

        {/* Dynamic Topbar Header */}
        <header className="h-[72px] flex items-center justify-between px-6 md:px-8 border-b border-white/[0.02] z-30 relative shrink-0">
          <div className="flex items-center gap-3">
            <h1 id="page-title" className="text-lg font-medium text-zinc-100 tracking-tight capitalize select-text">
              {activePage}
            </h1>
            <div className="flex items-center gap-1 bg-[#121316]/80 px-2 py-0.5 rounded border border-white/[0.04]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e559] inline-block animate-pulse"></span>
              <span className="font-mono text-[9px] text-[#00e559] tracking-wider font-semibold">SECURE // SYNCED</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-zinc-500 tracking-wider hidden sm:block">DHAKA, BANGLADESH</span>
            <div className="w-[1px] h-4 bg-white/10 mx-1 hidden sm:block"></div>
            
            {/* Social Links Panel */}
            <div className="flex items-center gap-2">
              <a 
                href={identity.github} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full border border-white/[0.08] bg-[#0c0d0f]/60 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.04] hover:border-[#00e559]/30 transition-all duration-300" 
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href={identity.leetcode} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full border border-white/[0.08] bg-[#0c0d0f]/60 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.04] hover:border-[#38bdf8]/30 transition-all duration-300" 
                title="LeetCode"
              >
                <span className="font-mono text-xs font-bold text-[#FFA116]">LC</span>
              </a>
              <a 
                href={identity.codeforces} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full border border-white/[0.08] bg-[#0c0d0f]/60 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.04] hover:border-[#00e559]/30 transition-all duration-300" 
                title="Codeforces"
              >
                <span className="font-mono text-[10px] font-bold text-[#1F8ACB]">CF</span>
              </a>
              <a 
                href={identity.facebook} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full border border-white/[0.08] bg-[#0c0d0f]/60 flex items-center justify-center text-zinc-400 hover:text-[#1877F2] hover:bg-[#1877F2]/10 hover:border-[#1877F2]/30 transition-all duration-300" 
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={identity.instagram} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full border border-white/[0.08] bg-[#0c0d0f]/60 flex items-center justify-center text-zinc-400 hover:text-[#E1306C] hover:bg-[#E1306C]/10 hover:border-[#E1306C]/30 transition-all duration-300" 
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </header>

        {/* Ambient background decoration layers - 0% CPU footprint using radial gradients & CSS drift */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-grid-pattern" />
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 20%, #09090b 100%)' }} />
        
        {/* Soft glowing ambient backing balls */}
        <div className="absolute top-[30%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] rounded-full bg-[#00e559]/[0.015] blur-[100px] pointer-events-none z-0 glow-overlay-1" />
        <div className="absolute bottom-[20%] right-[15%] w-[700px] h-[550px] rounded-full bg-[#38bdf8]/[0.012] blur-[120px] pointer-events-none z-0 glow-overlay-2" />

        {/* Scrollable Main Area */}
        <div className="flex-1 relative overflow-y-auto overflow-x-hidden z-10 scrollbar-thin select-text pb-24 md:pb-12">

          {/* ============ HOME PAGE ============ */}
          {activePage === 'home' && (
            <section className="min-h-full flex items-center justify-center p-4 md:p-8 page-transition">
              <div className="w-full max-w-[1140px] relative py-8 md:py-16">

                {/* SVG Energy Line Paths (Matches HTML perfectly with 0% CPU SVG Stroke flow in CSS) */}
                <svg viewBox="0 0 1200 675" className="absolute inset-0 w-full h-full z-0 pointer-events-none drop-shadow-[0_0_8px_rgba(0,229,89,0.25)] hidden lg:block" preserveAspectRatio="none">
                  <g fill="none" stroke="#00e559" strokeWidth="2" className="opacity-[0.06]">
                    <path d="M 288 337.5 C 340 337.5, 360 160, 420 160" />
                    <path d="M 288 337.5 C 340 337.5, 360 515, 420 515" />
                    <path d="M 680 250 L 680 300" />
                    <path d="M 680 430 L 680 375" />
                    <path d="M 720 337.5 L 860 337.5" />
                  </g>
                  <g fill="none" stroke="#00e559" strokeWidth="1.5" className="animate-svg-flow text-[#00E559]/30">
                    <path d="M 288 337.5 C 340 337.5, 360 160, 420 160" />
                    <path d="M 288 337.5 C 340 337.5, 360 515, 420 515" />
                    <path d="M 680 250 L 680 300" />
                    <path d="M 680 430 L 680 375" />
                    <path d="M 720 337.5 L 860 337.5" />
                  </g>
                </svg>

                {/* Bento Grid Layout */}
                <div className="grid lg:grid-cols-[280px_1fr_320px] gap-6 lg:gap-8 relative z-10 items-stretch">

                  {/* Left: Identity Console Panel */}
                  <div className="bg-[#121316]/90 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-5 shadow-2xl relative flex flex-col justify-between hover-lift">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-200 tracking-tight">
                          <Cpu className="w-4 h-4 text-zinc-400" />
                          <span>Identity</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-[#00e559] shadow-[0_0_8px_#00e559]"></div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="font-mono text-[10px] text-zinc-500 mb-1 block uppercase tracking-wider font-semibold">Name</label>
                          <div className="bg-[#1a1b1e] border border-white/5 rounded-xl px-3 py-2 text-xs text-gray-200 select-all">
                            {identity.name}
                          </div>
                        </div>
                        <div>
                          <label className="font-mono text-[10px] text-zinc-500 mb-1 block uppercase tracking-wider font-semibold">Program</label>
                          <div className="bg-[#1a1b1e] border border-white/5 rounded-xl px-3 py-2 text-xs text-gray-200 select-all">
                            {identity.education.degree}
                          </div>
                        </div>
                        <div>
                          <label className="font-mono text-[10px] text-zinc-500 mb-1 block uppercase tracking-wider font-semibold">Status</label>
                          <div className="bg-[#1a1b1e] border border-white/5 rounded-xl px-3 py-2 flex items-center gap-2 text-xs text-[#00e559]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00e559]"></span>
                            <span>Open to internships</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-white/[0.04]">
                      <span className="font-mono text-[9px] text-zinc-600 block">SYSTEM CONSOLE REGISTER</span>
                      <span className="font-mono text-[10px] text-[#38bdf8] font-semibold">{identity.location}</span>
                    </div>

                    <div className="hidden lg:block absolute top-1/2 -right-[5px] -translate-y-1/2 w-2.5 h-2.5 bg-[#00e559] rounded-sm rotate-45 shadow-[0_0_10px_#00e559]"></div>
                  </div>

                  {/* Middle Stack: Mission + Skill tuning */}
                  <div className="flex flex-col gap-6 relative">
                    {/* Mission panel with typing output */}
                    <div className="bg-[#121316]/90 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-5 shadow-2xl relative flex-1 flex flex-col justify-between hover-lift">
                      <div className="hidden lg:block absolute top-1/2 -left-[5px] -translate-y-1/2 w-2.5 h-2.5 bg-[#00e559] rounded-sm rotate-45 shadow-[0_0_10px_#00e559]"></div>
                      <div className="hidden lg:block absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#00e559] rounded-sm rotate-45 shadow-[0_0_10px_#00e559]"></div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-200 tracking-tight">
                            <Sparkles className="w-4 h-4 text-zinc-400" />
                            <span>Mission</span>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-[#00e559] shadow-[0_0_8px_#00e559]"></div>
                        </div>
                        
                        {/* Interactive Dynamic Typing Output */}
                        <div className="bg-[#09090b]/60 border border-white/[0.04] p-4 rounded-xl font-mono text-xs text-[#38bdf8] min-h-[72px] relative overflow-hidden select-text">
                          <span className="text-zinc-500 mr-1.5">&gt;</span>
                          <span className="text-zinc-100">{currentText}</span>
                          <span className="w-1.5 h-3.5 bg-[#00e559] inline-block ml-1 cursor-blink" />
                        </div>
                        
                        <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-sans select-text">
                          {aboutCopy.intro}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-5 flex-wrap">
                        <div className="font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/[0.06] bg-white/[0.02] text-[10px] text-zinc-400">
                          <span className="w-1 h-1 rounded-full bg-[#38bdf8]"></span> React.js
                        </div>
                        <div className="font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/[0.06] bg-white/[0.02] text-[10px] text-zinc-400">
                          <span className="w-1 h-1 rounded-full bg-[#00e559]"></span> Cyber Security
                        </div>
                        <div className="font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/[0.06] bg-white/[0.02] text-[10px] text-zinc-400">
                          <span className="w-1 h-1 rounded-full bg-[#38bdf8]"></span> AI/ML
                        </div>
                        <div className="font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/[0.06] bg-white/[0.02] text-[10px] text-zinc-400">
                          <span className="w-1 h-1 rounded-full bg-yellow-500"></span> Python
                        </div>
                      </div>
                    </div>

                    {/* Skill Tuning meter dashboard */}
                    <div className="bg-[#121316]/90 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-5 shadow-2xl relative hover-lift">
                      <div className="hidden lg:block absolute top-1/2 -left-[5px] -translate-y-1/2 w-2.5 h-2.5 bg-[#00e559] rounded-sm rotate-45 shadow-[0_0_10px_#00e559]"></div>
                      <div className="hidden lg:block absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#00e559] rounded-sm rotate-45 shadow-[0_0_10px_#00e559]"></div>
                      
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-200 tracking-tight">
                          <Sliders className="w-4 h-4 text-zinc-400" />
                          <span>Skill Tuning Status</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-[#00e559] shadow-[0_0_8px_#00e559]"></div>
                      </div>

                      <div className="space-y-4">
                        {/* CP */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-zinc-300">Competitive Programming</span>
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#00e559]/10 text-[#00e559] font-semibold uppercase">ACTIVE (90)</span>
                          </div>
                          <div className="h-2 bg-[#1a1b1e] border border-white/[0.04] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#00e559] rounded-full transition-all duration-[1500ms] ease-out" 
                              style={{ width: skillsVisible ? '90%' : '0%' }}
                            />
                          </div>
                        </div>

                        {/* Development */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-zinc-300">App & Web Development</span>
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#00e559]/10 text-[#00e559] font-semibold uppercase">ACTIVE (80)</span>
                          </div>
                          <div className="h-2 bg-[#1a1b1e] border border-white/[0.04] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#00e559] rounded-full transition-all duration-[1500ms] ease-out" 
                              style={{ width: skillsVisible ? '80%' : '0%' }}
                            />
                          </div>
                        </div>

                        {/* AI ML */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-zinc-300">AI & Machine Learning</span>
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#38bdf8]/10 text-[#38bdf8] font-semibold uppercase">EXPLORING (55)</span>
                          </div>
                          <div className="h-2 bg-[#1a1b1e] border border-white/[0.04] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#38bdf8] rounded-full transition-all duration-[1500ms] ease-out" 
                              style={{ width: skillsVisible ? '55%' : '0%' }}
                            />
                          </div>
                        </div>

                        {/* Cyber Security */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-zinc-300">Cyber Security</span>
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#38bdf8]/10 text-[#38bdf8] font-semibold uppercase">LEARNING (45)</span>
                          </div>
                          <div className="h-2 bg-[#1a1b1e] border border-white/[0.04] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#38bdf8] rounded-full transition-all duration-[1500ms] ease-out" 
                              style={{ width: skillsVisible ? '45%' : '0%' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Console showcase panel */}
                  <div className="bg-[#121316]/90 backdrop-blur-xl border border-white/[0.08] rounded-[24px] p-5 shadow-2xl relative flex flex-col justify-between hover-lift">
                    <div className="hidden lg:block absolute top-1/2 -left-[5px] -translate-y-1/2 w-2.5 h-2.5 bg-[#00e559] rounded-sm rotate-45 shadow-[0_0_10px_#00e559]"></div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-200 tracking-tight">
                          <Terminal className="w-4 h-4 text-zinc-400" />
                          <span>Console Workspace</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-[#8b5cf6] shadow-[0_0_8px_#8b5cf6]"></div>
                      </div>

                      {/* Interactive Console Image Slider */}
                      <div 
                        onMouseEnter={() => setSliderHovered(true)}
                        onMouseLeave={() => setSliderHovered(false)}
                        className="w-full aspect-square rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.04)] bg-[#0c0d0f] flex flex-col items-center justify-center relative overflow-hidden mb-4 group"
                      >
                        <AnimatePresence initial={false} custom={slideDirection} mode="wait">
                          <motion.div
                            key={currentSlide}
                            custom={slideDirection}
                            variants={{
                              enter: (direction: number) => ({
                                x: direction > 0 ? '100%' : '-100%',
                                opacity: 0,
                                scale: 0.95
                              }),
                              center: {
                                x: 0,
                                opacity: 1,
                                scale: 1,
                                transition: {
                                  duration: 0.4,
                                  ease: [0.16, 1, 0.3, 1]
                                }
                              },
                              exit: (direction: number) => ({
                                x: direction < 0 ? '100%' : '-100%',
                                opacity: 0,
                                scale: 0.95,
                                transition: {
                                  duration: 0.4,
                                  ease: [0.16, 1, 0.3, 1]
                                }
                              })
                            }}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0 w-full h-full"
                          >
                            <div className="relative w-full h-full bg-[#0a0a0c]">
                              <img
                                src={slides[currentSlide].src}
                                alt={slides[currentSlide].alt}
                                className="w-full h-full object-cover object-center"
                                referrerPolicy="no-referrer"
                              />
                              {/* Glow scanline overlay for hacker console effect */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[8px] text-[#00e559] z-10">
                                <span>{slides[currentSlide].label}</span>
                                <span className="text-zinc-400">{slides[currentSlide].status}</span>
                              </div>
                            </div>
                          </motion.div>
                        </AnimatePresence>

                        {/* Interactive Navigation Controls */}
                        {slides.length > 1 && (
                          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSlideDirection(-1);
                                setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
                              }}
                              className="w-8 h-8 rounded-full bg-black/70 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#00e559] hover:text-black hover:border-[#00e559] transition-all cursor-pointer pointer-events-auto opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 duration-300"
                              title="Previous Slide"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSlideDirection(1);
                                setCurrentSlide((prev) => (prev + 1) % slides.length);
                              }}
                              className="w-8 h-8 rounded-full bg-black/70 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#00e559] hover:text-black hover:border-[#00e559] transition-all cursor-pointer pointer-events-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 duration-300"
                              title="Next Slide"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {/* Pagination indicators (Dots) */}
                        {slides.length > 1 && (
                          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 pointer-events-auto">
                            {slides.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setSlideDirection(idx > currentSlide ? 1 : -1);
                                  setCurrentSlide(idx);
                                }}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-[#00e559] w-3 shadow-[0_0_8px_#00e559]' : 'bg-white/20 hover:bg-white/40'}`}
                                title={`Go to slide ${idx + 1}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-[#1a1b1e] border border-white/5 rounded-xl px-3 py-2">
                          <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider">Rank</div>
                          <div className="text-xs text-zinc-200 mt-0.5 truncate font-medium">{identity.codeforcesUsername}</div>
                        </div>
                        <div className="bg-[#1a1b1e] border border-white/5 rounded-xl px-3 py-2">
                          <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider">Fairs Won</div>
                          <div className="text-xs text-zinc-200 mt-0.5 font-medium">3 years consecutively</div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setActivePage('projects')}
                      className="mt-4 w-full py-3 rounded-xl bg-[#00e559] hover:bg-[#00c54c] text-black text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,89,0.2)] hover:shadow-[0_0_20px_rgba(0,229,89,0.3)] active:scale-[0.98]"
                    >
                      <span>Explore Repository Modules</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            </section>
          )}

          {/* ============ ABOUT PAGE ============ */}
          {activePage === 'about' && (
            <section className="p-4 md:p-8 max-w-4xl mx-auto page-transition">
              
              {/* About description text block */}
              <div className="bg-[#121316]/90 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-6 md:p-8 shadow-2xl mb-6 hover-lift">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-200 tracking-tight mb-4">
                  <User className="w-4 h-4 text-[#00e559]" />
                  <span>About Host</span>
                </div>
                <div className="space-y-4 text-zinc-300 leading-relaxed text-sm md:text-base select-text font-sans">
                  <p>{aboutCopy.intro}</p>
                  <p>{aboutCopy.outro}</p>
                </div>
              </div>

              {/* Grid with tech stack & open items */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                
                {/* Tech stack badge list */}
                <div className="bg-[#121316]/90 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-6 shadow-2xl hover-lift">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-200 tracking-tight mb-4">
                    <Cpu className="w-4 h-4 text-[#38bdf8]" />
                    <span>Technical Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {techStack.languagesAndCore.map((lang) => (
                      <span key={lang} className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:border-[#00e559]/30 transition-colors">
                        {lang}
                      </span>
                    ))}
                    {techStack.toolsAndWorkflow.map((tool) => (
                      <span key={tool} className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-[#38bdf8]/30 transition-colors">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Open to collabs list */}
                <div className="bg-[#121316]/90 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-6 shadow-2xl hover-lift">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-200 tracking-tight mb-4">
                    <Rocket className="w-4 h-4 text-[#00e559]" />
                    <span>Engagement Vectors</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-zinc-400 font-sans select-text">
                    {aboutCopy.openTo.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00e559] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Terminal-like YAML block */}
              <div className="bg-[#0c0d0f] border border-white/[0.08] rounded-[20px] p-6 shadow-2xl relative group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-200 tracking-tight">
                    <Terminal className="w-4 h-4 text-zinc-400" />
                    <span className="font-mono text-xs">current_focus.yaml</span>
                  </div>
                  
                  <button 
                    onClick={copyYamlToClipboard}
                    className="p-1.5 rounded-md border border-white/[0.08] hover:border-[#00e559]/40 hover:bg-white/[0.02] text-zinc-400 hover:text-[#00e559] transition-all"
                    title="Copy configuration content"
                  >
                    {copiedText ? <Check className="w-3.5 h-3.5 text-[#00e559]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                
                <pre className="font-mono text-xs text-zinc-400 leading-6 overflow-x-auto select-all bg-[#09090b]/40 p-4 rounded-xl border border-white/[0.02]">
                  <span className="text-[#38bdf8]">learning</span>:
                  {currentFocus.learning.map((val) => `\n  - ${val}`)}
                  {"\n"}
                  <span className="text-[#38bdf8]">building</span>:
                  {currentFocus.building.map((val) => `\n  - ${val}`)}
                  {"\n"}
                  <span className="text-[#38bdf8]">exploring</span>:
                  {currentFocus.exploring.map((val) => `\n  - ${val}`)}
                </pre>
              </div>

            </section>
          )}

          {/* ============ PROJECTS PAGE ============ */}
          {activePage === 'projects' && (
            <section className="p-4 md:p-8 max-w-5xl mx-auto page-transition">
              <div className="grid md:grid-cols-2 gap-6 select-text">
                {featuredProjects.map((proj) => (
                  <div 
                    key={proj.id}
                    className="bg-[#121316]/90 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-6 shadow-2xl hover-lift flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
                          <Layers className="w-4.5 h-4.5 text-[#00e559]" />
                          <span>{proj.title}</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-[#00e559] shadow-[0_0_8px_#00e559]"></div>
                      </div>
                      
                      <p className="text-xs text-zinc-400 leading-relaxed mb-3 font-sans">
                        {proj.summary}
                      </p>
                      <p className="text-xs text-zinc-500 leading-relaxed mb-4 font-sans italic border-l border-white/10 pl-2">
                        {proj.detail}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                      <div className="flex items-center gap-1.5">
                        {proj.stack.map((item) => (
                          <span key={item} className="font-mono text-[9px] px-2 py-0.5 rounded-md border border-white/[0.06] bg-white/[0.02] text-zinc-400">
                            {item}
                          </span>
                        ))}
                      </div>
                      
                      <a 
                        href={proj.githubUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[10px] font-mono text-[#38bdf8] hover:text-[#00e559] font-bold uppercase flex items-center gap-1 transition-colors"
                      >
                        <span>Source</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* GitHub platform link */}
              <a 
                href={identity.github} 
                target="_blank" 
                rel="noreferrer" 
                className="mt-8 flex items-center justify-center gap-2 py-3.5 rounded-xl border border-white/[0.08] bg-[#0c0d0f]/40 text-zinc-400 hover:text-white hover:border-[#00e559]/40 hover:bg-white/[0.02] transition-all text-xs font-mono"
              >
                <Github className="w-4 h-4" />
                <span>VIEW ALL DEVELOPMENT REPOSITORIES ON GITHUB →</span>
              </a>
            </section>
          )}

          {/* ============ ACHIEVEMENTS PAGE ============ */}
          {activePage === 'achievements' && (
            <section className="p-4 md:p-8 max-w-4xl mx-auto page-transition">
              <div className="grid sm:grid-cols-2 gap-5 select-text">
                
                {/* Science Fair Winner */}
                <div className="bg-[#121316]/90 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-5 shadow-2xl flex items-start gap-4 hover-lift">
                  <div className="w-11 h-11 rounded-xl bg-[#00e559]/10 border border-[#00e559]/20 flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5 text-[#00e559]" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-100 font-medium mb-1">{achievements[0].title}</div>
                    <div className="text-xs text-zinc-500 leading-relaxed font-sans">{achievements[0].description}</div>
                  </div>
                </div>

                {/* Digital Bangladesh */}
                <div className="bg-[#121316]/90 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-5 shadow-2xl flex items-start gap-4 hover-lift">
                  <div className="w-11 h-11 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center shrink-0">
                    <FileCheck className="w-5 h-5 text-[#38bdf8]" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-100 font-medium mb-1">{achievements[1].title}</div>
                    <div className="text-xs text-zinc-500 leading-relaxed font-sans">{achievements[1].description}</div>
                  </div>
                </div>

                {/* National Science Fair */}
                <div className="bg-[#121316]/90 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-5 shadow-2xl flex items-start gap-4 hover-lift">
                  <div className="w-11 h-11 rounded-xl bg-[#00e559]/10 border border-[#00e559]/20 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-[#00e559]" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-100 font-medium mb-1">{achievements[2].title}</div>
                    <div className="text-xs text-zinc-500 leading-relaxed font-sans">{achievements[2].description}</div>
                  </div>
                </div>

                {/* Gov Certificates */}
                <div className="bg-[#121316]/90 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-5 shadow-2xl flex items-start gap-4 hover-lift">
                  <div className="w-11 h-11 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center shrink-0">
                    <CheckSquare className="w-5 h-5 text-[#38bdf8]" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-100 font-medium mb-1">{achievements[3].title}</div>
                    <div className="text-xs text-zinc-500 leading-relaxed font-sans">{achievements[3].description}</div>
                  </div>
                </div>

                {/* Consistent Learner - Full Column Span */}
                <div className="sm:col-span-2 bg-[#121316]/90 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-5 shadow-2xl flex items-start gap-4 hover-lift">
                  <div className="w-11 h-11 rounded-xl bg-[#00e559]/10 border border-[#00e559]/20 flex items-center justify-center shrink-0">
                    <Rocket className="w-5 h-5 text-[#00e559]" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-100 font-medium mb-1">{achievements[4].title}</div>
                    <div className="text-xs text-zinc-500 leading-relaxed font-sans">{achievements[4].description}</div>
                  </div>
                </div>

              </div>
            </section>
          )}

          {/* ============ CONTACT PAGE ============ */}
          {activePage === 'contact' && (
            <section className="p-4 md:p-8 max-w-2xl mx-auto page-transition">
              
              <div className="bg-[#121316]/90 backdrop-blur-xl border border-white/[0.08] rounded-[24px] p-6 md:p-8 shadow-2xl text-center select-text">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a1b1e] to-[#0c0d0f] border border-white/10 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  <span className="font-mono text-2xl font-bold text-[#00e559]/90">PB</span>
                </div>
                
                <h2 className="text-lg text-zinc-100 font-medium mb-1">Let's build something beautiful.</h2>
                <p className="text-xs text-zinc-500 mb-6 font-sans">Open to software internships, project collaborations, and hackathons.</p>
                
                {/* Contact Cards Grid */}
                <div className="grid sm:grid-cols-2 gap-3 text-left mb-6">
                  <a 
                    href={`mailto:${identity.email}`}
                    className="flex items-center gap-3 bg-[#1a1b1e] border border-white/5 rounded-xl px-4 py-3 hover:border-[#00e559]/40 transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-[#00e559] shrink-0" />
                    <div className="overflow-hidden">
                      <div className="font-mono text-[9px] text-zinc-500 uppercase">Email Address</div>
                      <div className="text-xs text-zinc-200 truncate">{identity.email}</div>
                    </div>
                  </a>

                  <a 
                    href={identity.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-3 bg-[#1a1b1e] border border-white/5 rounded-xl px-4 py-3 hover:border-[#00e559]/40 transition-colors"
                  >
                    <Github className="w-5 h-5 text-zinc-300 shrink-0" />
                    <div>
                      <div className="font-mono text-[9px] text-zinc-500 uppercase">GitHub Profile</div>
                      <div className="text-xs text-zinc-200">pbs002-s</div>
                    </div>
                  </a>

                  <a 
                    href={identity.leetcode} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-3 bg-[#1a1b1e] border border-white/5 rounded-xl px-4 py-3 hover:border-[#FFA116]/40 transition-colors"
                  >
                    <span className="font-mono text-sm font-bold text-[#FFA116] shrink-0 w-5 text-center">LC</span>
                    <div>
                      <div className="font-mono text-[9px] text-zinc-500 uppercase">LeetCode</div>
                      <div className="text-xs text-zinc-200">Pritam_002</div>
                    </div>
                  </a>

                  <a 
                    href={identity.codeforces} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-3 bg-[#1a1b1e] border border-white/5 rounded-xl px-4 py-3 hover:border-[#1F8ACB]/40 transition-colors"
                  >
                    <span className="font-mono text-xs font-bold text-[#1F8ACB] shrink-0 w-5 text-center">CF</span>
                    <div>
                      <div className="font-mono text-[9px] text-zinc-500 uppercase">Codeforces</div>
                      <div className="text-xs text-zinc-200">Pritam-580</div>
                    </div>
                  </a>

                  <a 
                    href={identity.facebook} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-3 bg-[#1a1b1e] border border-white/5 rounded-xl px-4 py-3 hover:border-[#1877F2]/40 transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-[#1877F2] shrink-0" />
                    <div>
                      <div className="font-mono text-[9px] text-zinc-500 uppercase">Facebook</div>
                      <div className="text-xs text-zinc-200">pbs.020</div>
                    </div>
                  </a>

                  <a 
                    href={identity.instagram} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-3 bg-[#1a1b1e] border border-white/5 rounded-xl px-4 py-3 hover:border-[#E1306C]/40 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-[#E1306C] shrink-0" />
                    <div>
                      <div className="font-mono text-[9px] text-zinc-500 uppercase">Instagram</div>
                      <div className="text-xs text-zinc-200">swagoto_pritom</div>
                    </div>
                  </a>
                </div>

                {/* Fully functional, beautiful interactive Form */}
                <form onSubmit={handleFormSubmit} className="text-left border-t border-white/[0.04] pt-6">
                  <h3 className="text-xs font-mono text-zinc-400 mb-4 uppercase tracking-wider font-semibold">Or send a quick message:</h3>
                  
                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">Your Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="John Doe"
                        className="w-full bg-[#1a1b1e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00e559] focus:ring-1 focus:ring-[#00e559]"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">Your Email</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-[#1a1b1e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00e559] focus:ring-1 focus:ring-[#00e559]"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">Message Content</label>
                    <textarea 
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      placeholder="Let's build a software project together..."
                      className="w-full bg-[#1a1b1e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00e559] focus:ring-1 focus:ring-[#00e559] resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-3 bg-[#00e559] hover:bg-[#00c54c] text-black text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,89,0.2)]"
                  >
                    <span>{formSubmitted ? 'Message Prepared for Mail Client' : 'Send Message // Mailto Draft'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {formSubmitted && (
                    <p className="font-mono text-[9px] text-[#00e559] mt-2 text-center">
                      Success: Opened system mail draft with your prefilled details!
                    </p>
                  )}
                </form>
              </div>

              <p className="text-center font-mono text-[11px] text-zinc-600 mt-8">
                "{identity.closingQuote}"
              </p>
            </section>
          )}

        </div>

        {/* Floating Bottom Nav - Absolute Touch Friendly Menu Bar (visible on mobile/tablet only) */}
        <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 p-1.5 bg-[#121316]/80 backdrop-blur-xl border border-white/[0.08] rounded-full shadow-2xl">
          <button 
            onClick={() => setActivePage('home')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activePage === 'home' ? 'bg-[#38bdf8]/20 text-[#38bdf8]' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            title="Home"
          >
            <Home className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => setActivePage('about')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activePage === 'about' ? 'bg-[#38bdf8]/20 text-[#38bdf8]' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            title="About"
          >
            <User className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => setActivePage('projects')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activePage === 'projects' ? 'bg-[#38bdf8]/20 text-[#38bdf8]' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            title="Projects"
          >
            <Layers className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => setActivePage('achievements')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activePage === 'achievements' ? 'bg-[#38bdf8]/20 text-[#38bdf8]' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            title="Achievements"
          >
            <Award className="w-5 h-5" />
          </button>
          
          <div className="w-[1px] h-5 bg-white/10 mx-1"></div>
          
          <button 
            onClick={() => setActivePage('contact')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activePage === 'contact' ? 'bg-[#38bdf8]/20 text-[#38bdf8]' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            title="Contact"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>

      </main>
    </div>
  );
}
