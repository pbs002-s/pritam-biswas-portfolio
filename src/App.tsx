import React, { useState, useEffect, useRef } from 'react';
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
  Star,
  Activity,
  Flame,
  CheckCircle2,
  Trophy,
  FileCheck,
  CheckSquare,
  Rocket,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Zap,
  Radio,
  Scan,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  identity,
  aboutCopy,
  techStack,
  featuredProjects,
  achievements,
  currentFocus,
  skillIcons,
  githubWidgets
} from './data';
import GreenDataFabric from './components/GreenDataFabric';
import DecryptedText from './components/DecryptedText';
import SpatialRevealText from './components/SpatialRevealText';
import { copyToClipboard } from './utils/clipboard';

// Import Pritam's portrait assets using Vite asset URL resolution
const pritamHoodieSide = new URL('./assets/images/pritam_black_hoodie_1783968409185.png', import.meta.url).href;
const pritamOutdoorPortrait = new URL('./assets/images/file_0000000082607208a99c0c040b6d5b3a.png', import.meta.url).href;
const pritamStudioPortrait = new URL('./assets/images/file_000000003d5c71fa8406ad2692f42c75.png', import.meta.url).href;
const pritamCasualPortrait = new URL('./assets/images/file_0000000093d0720883bf675e612d02d6.jpg', import.meta.url).href;
const pritamCreativePortrait = new URL('./assets/images/file_00000000e3347206b40d244129a1e357.png', import.meta.url).href;

export default function App() {
  const [activePage, setActivePage] = useState<'home' | 'about' | 'projects' | 'achievements' | 'contact'>('home');
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [projectFilter, setProjectFilter] = useState<'all' | 'featured' | 'web' | 'ai'>('all');

  // Real-time GitHub stars state map
  const [repoStars, setRepoStars] = useState<{ [repo: string]: number }>({});

  // Fetch GitHub stars asynchronously
  useEffect(() => {
    const fetchStars = async () => {
      const starsMap: { [repo: string]: number } = {};

      const targetRepos = [
        'BhashaBot',
        'diu-routine',
        'OpenGovtBD',
        'nagorik-setu',
        'Government-GenZ-Web',
        'AI-Cluster'
      ];

      await Promise.all(
        targetRepos.map(async (repo) => {
          try {
            const res = await fetch(`https://api.github.com/repos/pbs002-s/${repo}`);
            if (res.ok) {
              const data = await res.json();
              starsMap[repo] = data.stargazers_count ?? 0;
            }
          } catch {
            // Gracefully ignore rate limits
          }
        })
      );

      if (Object.keys(starsMap).length > 0) {
        setRepoStars(starsMap);
      }
    };

    fetchStars();
  }, []);

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
  const [slideDirection, setSlideDirection] = useState(1);
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

  // Cycling taglines for Decrypted Text animation
  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % identity.roles.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Skill progress animation trigger
  useEffect(() => {
    if (activePage === 'home') {
      const timer = setTimeout(() => setSkillsVisible(true), 200);
      return () => clearTimeout(timer);
    } else {
      setSkillsVisible(false);
    }
  }, [activePage]);

  // Safe clipboard copying with feedback
  const handleCopyYaml = async () => {
    const yamlString = `learning:
  - React.js & Next.js — full-stack modern web architecture
  - Laravel & Spring Boot — robust backend APIs and enterprise services
  - Docker & Redis — containerization and caching microservices
  - Cyber Security fundamentals & ethical testing methods
  - DSA for competitive programming
building:
  - BhashaBot — multilingual AI translation and conversational NLP engine
  - DIU Routine — smart timetable scheduler for university peers
  - OpenGovtBD & Nagorik Setu — open civic technology platforms
  - Full-stack web applications with React + Spring Boot
exploring:
  - Machine learning clustering and deep learning architectures
  - Open source contribution workflows and distributed systems
  - Cloud infrastructure & deployment automation`;

    const success = await copyToClipboard(yamlString);
    if (success) {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2200);
    }
  };

  const handleCopyEmail = async () => {
    const success = await copyToClipboard(identity.email);
    if (success) {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${identity.email}?subject=${subject}&body=${body}`;

    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormSubmitted(false);
    }, 4000);
  };

  const filteredProjects = featuredProjects.filter((p) => {
    if (projectFilter === 'featured') return p.featured;
    if (projectFilter === 'web') return p.stack.some(s => ['React', 'TypeScript', 'Laravel', 'Spring Boot', 'HTML'].includes(s));
    if (projectFilter === 'ai') return p.stack.some(s => ['Python', 'AI', 'NLP', 'Machine Learning'].includes(s));
    return true;
  });

  return (
    <div className="h-[100dvh] w-full overflow-hidden flex select-none bg-[#09090b] text-white relative">

      {/* Global Interactive Green Data Fabric Animation Canvas Background Layer */}
      <GreenDataFabric particleCount={65} connectionDistance={145} enableMouseInteraction={true} />

      {/* Sidebar - Desktop Only */}
      <aside className="hidden md:flex w-[68px] shrink-0 border-r border-white/[0.06] bg-[#0c0d0f]/90 backdrop-blur-xl flex-col items-center py-6 justify-between z-30 shadow-[4px_0_24px_rgba(0,0,0,0.5)] relative">
        <div className="flex flex-col gap-6 items-center w-full">
          {/* Logo badge with decrypt hover animation */}
          <div
            onClick={() => setActivePage('home')}
            className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-2 shadow-lg cursor-pointer transition-all hover:border-[#00e559]/50 hover:bg-white/[0.08] font-mono text-[11px] font-bold text-[#00e559] group"
          >
            <DecryptedText text="PB" speed={30} animateOn="hover" />
          </div>

          <nav className="flex flex-col gap-3 w-full px-3" id="sidebar-nav">
            <button
              onClick={() => setActivePage('home')}
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-300 ${activePage === 'home' ? 'bg-[#00e559] text-black shadow-[0_0_18px_rgba(0,229,89,0.5)] font-bold scale-105' : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]'}`}
              title="Home"
            >
              <Home className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActivePage('about')}
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-300 ${activePage === 'about' ? 'bg-[#00e559] text-black shadow-[0_0_18px_rgba(0,229,89,0.5)] font-bold scale-105' : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]'}`}
              title="About & Tech Stack"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActivePage('projects')}
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-300 ${activePage === 'projects' ? 'bg-[#00e559] text-black shadow-[0_0_18px_rgba(0,229,89,0.5)] font-bold scale-105' : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]'}`}
              title="Projects & Repositories"
            >
              <Layers className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActivePage('achievements')}
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-300 ${activePage === 'achievements' ? 'bg-[#00e559] text-black shadow-[0_0_18px_rgba(0,229,89,0.5)] font-bold scale-105' : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]'}`}
              title="Achievements & GitHub Stats"
            >
              <Award className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-300 ${activePage === 'contact' ? 'bg-[#00e559] text-black shadow-[0_0_18px_rgba(0,229,89,0.5)] font-bold scale-105' : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]'}`}
              title="Contact"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
          </nav>
        </div>

        {/* Email Shortcut with interactive copy tooltip */}
        <button
          onClick={handleCopyEmail}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 transition-colors hover:text-[#00e559] hover:bg-white/[0.04] relative group"
          title="Click to copy email"
        >
          {copiedEmail ? <Check className="w-5 h-5 text-[#00e559]" /> : <Mail className="w-5 h-5" />}
          <span className="absolute left-14 bg-black/90 border border-white/10 text-[9px] font-mono text-[#00e559] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {copiedEmail ? 'COPIED!' : 'COPY EMAIL'}
          </span>
        </button>
      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-1 flex flex-col relative bg-transparent overflow-hidden">

        {/* Dynamic Topbar Header */}
        <header className="h-[72px] flex items-center justify-between px-6 md:px-8 border-b border-white/[0.04] bg-[#09090b]/80 backdrop-blur-md z-30 relative shrink-0">
          <div className="flex items-center gap-3">
            <h1 id="page-title" className="text-lg font-medium text-zinc-100 tracking-tight select-text flex items-center gap-2">
              <DecryptedText
                text={activePage === 'about' ? 'ABOUT & TECH STACK' : activePage === 'achievements' ? 'ACHIEVEMENTS & STATS' : activePage.toUpperCase()}
                speed={25}
                animateOn="always"
              />
            </h1>

            {/* Audio/Telemetry Equalizer Animation */}
            <div className="flex items-center gap-1.5 bg-[#121316]/90 px-2.5 py-1 rounded-full border border-white/[0.06] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#00e559] inline-block animate-ping shadow-[0_0_8px_#00e559]"></span>
              <span className="font-mono text-[9px] text-[#00e559] tracking-wider font-semibold">DATA FABRIC // 60 FPS</span>
              <div className="flex items-end gap-0.5 h-3 ml-1">
                <span className="w-0.5 bg-[#00e559] h-2 animate-pulse"></span>
                <span className="w-0.5 bg-[#00e559] h-3 animate-bounce"></span>
                <span className="w-0.5 bg-[#00e559] h-1.5 animate-pulse"></span>
                <span className="w-0.5 bg-[#38bdf8] h-2.5 animate-bounce"></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-zinc-400 tracking-wider hidden sm:block">DHAKA, BANGLADESH</span>
            <div className="w-[1px] h-4 bg-white/10 mx-1 hidden sm:block"></div>

            {/* Social Links Panel */}
            <div className="flex items-center gap-2">
              <a
                href={identity.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/[0.08] bg-[#0c0d0f]/80 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.04] hover:border-[#00e559]/40 transition-all duration-300"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={identity.leetcode}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/[0.08] bg-[#0c0d0f]/80 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.04] hover:border-[#FFA116]/40 transition-all duration-300"
                title="LeetCode"
              >
                <span className="font-mono text-xs font-bold text-[#FFA116]">LC</span>
              </a>
              <a
                href={identity.codeforces}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/[0.08] bg-[#0c0d0f]/80 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.04] hover:border-[#38bdf8]/40 transition-all duration-300"
                title="Codeforces"
              >
                <span className="font-mono text-[10px] font-bold text-[#1F8ACB]">CF</span>
              </a>
              <a
                href={identity.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/[0.08] bg-[#0c0d0f]/80 flex items-center justify-center text-zinc-400 hover:text-[#1877F2] hover:bg-[#1877F2]/10 hover:border-[#1877F2]/30 transition-all duration-300"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={identity.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/[0.08] bg-[#0c0d0f]/80 flex items-center justify-center text-zinc-400 hover:text-[#E1306C] hover:bg-[#E1306C]/10 hover:border-[#E1306C]/30 transition-all duration-300"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </header>

        {/* Ambient background decoration layers */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-grid-pattern" />

        {/* Soft glowing ambient backing lights */}
        <div className="absolute top-[25%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] rounded-full bg-[#00e559]/[0.025] blur-[120px] pointer-events-none z-0 glow-overlay-1" />
        <div className="absolute bottom-[20%] right-[15%] w-[700px] h-[550px] rounded-full bg-[#38bdf8]/[0.02] blur-[140px] pointer-events-none z-0 glow-overlay-2" />

        {/* Scrollable Main Area */}
        <div className="flex-1 relative overflow-y-auto overflow-x-hidden z-10 scrollbar-thin select-text pb-24 md:pb-12">

          {/* ============ HOME PAGE ============ */}
          {activePage === 'home' && (
            <section className="min-h-full flex items-center justify-center p-4 md:p-8 page-transition">
              <div className="w-full max-w-[1140px] relative py-8 md:py-16">

                {/* SVG Energy Line Paths */}
                <svg viewBox="0 0 1200 675" className="absolute inset-0 w-full h-full z-0 pointer-events-none drop-shadow-[0_0_8px_rgba(0,229,89,0.3)] hidden lg:block" preserveAspectRatio="none">
                  <g fill="none" stroke="#00e559" strokeWidth="2" className="opacity-[0.08]">
                    <path d="M 288 337.5 C 340 337.5, 360 160, 420 160" />
                    <path d="M 288 337.5 C 340 337.5, 360 515, 420 515" />
                    <path d="M 680 250 L 680 300" />
                    <path d="M 680 430 L 680 375" />
                    <path d="M 720 337.5 L 860 337.5" />
                  </g>
                  <g fill="none" stroke="#00e559" strokeWidth="1.5" className="animate-svg-flow text-[#00E559]/40">
                    <path d="M 288 337.5 C 340 337.5, 360 160, 420 160" />
                    <path d="M 288 337.5 C 340 337.5, 360 515, 420 515" />
                    <path d="M 680 250 L 680 300" />
                    <path d="M 680 430 L 680 375" />
                    <path d="M 720 337.5 L 860 337.5" />
                  </g>
                </svg>

                {/* Bento Grid Layout */}
                <div className="grid lg:grid-cols-[280px_1fr_330px] gap-6 lg:gap-8 relative z-10 items-stretch">

                  {/* Left: Identity Console Panel */}
                  <div className="bg-[#121316]/95 backdrop-blur-xl border border-white/[0.08] hover:border-[#00e559]/30 rounded-[20px] p-5 shadow-2xl relative flex flex-col justify-between hover-lift transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-200 tracking-tight">
                          <Cpu className="w-4 h-4 text-[#00e559]" />
                          <span>Identity Core</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-[#00e559] shadow-[0_0_8px_#00e559]"></div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="font-mono text-[10px] text-zinc-500 mb-1 block uppercase tracking-wider font-semibold">Name</label>
                          <div className="bg-[#1a1b1e] border border-white/5 rounded-xl px-3 py-2 text-xs text-gray-200 select-all font-medium flex items-center justify-between">
                            <DecryptedText text={identity.name} speed={30} animateOn="hover" />
                            <span className="font-mono text-[9px] text-[#00e559] opacity-70">CSE // DIU</span>
                          </div>
                        </div>
                        <div>
                          <label className="font-mono text-[10px] text-zinc-500 mb-1 block uppercase tracking-wider font-semibold">Program</label>
                          <div className="bg-[#1a1b1e] border border-white/5 rounded-xl px-3 py-2 text-xs text-gray-200 select-all">
                            {identity.education.degree}
                          </div>
                        </div>
                        <div>
                          <label className="font-mono text-[10px] text-zinc-500 mb-1 block uppercase tracking-wider font-semibold">Institution</label>
                          <div className="bg-[#1a1b1e] border border-white/5 rounded-xl px-3 py-2 text-xs text-gray-300 select-all">
                            {identity.education.institution}
                          </div>
                        </div>
                        <div>
                          <label className="font-mono text-[10px] text-zinc-500 mb-1 block uppercase tracking-wider font-semibold">Status</label>
                          <div className="bg-[#1a1b1e] border border-white/5 rounded-xl px-3 py-2 flex items-center gap-2 text-xs text-[#00e559]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00e559] animate-ping"></span>
                            <span className="font-semibold">Open to internships & collabs</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between">
                      <div>
                        <span className="font-mono text-[9px] text-zinc-600 block">SYSTEM CONSOLE REGISTER</span>
                        <span className="font-mono text-[10px] text-[#38bdf8] font-semibold">{identity.location}</span>
                      </div>
                      <Radio className="w-4 h-4 text-[#00e559] animate-pulse" />
                    </div>

                    <div className="hidden lg:block absolute top-1/2 -right-[5px] -translate-y-1/2 w-2.5 h-2.5 bg-[#00e559] rounded-sm rotate-45 shadow-[0_0_10px_#00e559]"></div>
                  </div>

                  {/* Middle Stack: Mission + Skill tuning */}
                  <div className="flex flex-col gap-6 relative">
                    {/* Mission panel with Decrypted Text animation */}
                    <div className="bg-[#121316]/95 backdrop-blur-xl border border-white/[0.08] hover:border-[#00e559]/30 rounded-[20px] p-5 shadow-2xl relative flex-1 flex flex-col justify-between hover-lift transition-all">
                      <div className="hidden lg:block absolute top-1/2 -left-[5px] -translate-y-1/2 w-2.5 h-2.5 bg-[#00e559] rounded-sm rotate-45 shadow-[0_0_10px_#00e559]"></div>
                      <div className="hidden lg:block absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#00e559] rounded-sm rotate-45 shadow-[0_0_10px_#00e559]"></div>

                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-200 tracking-tight">
                            <Sparkles className="w-4 h-4 text-[#00e559]" />
                            <span>Mission & Specialization</span>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-[#00e559] shadow-[0_0_8px_#00e559]"></div>
                        </div>

                        {/* Interactive Decrypted Text Scramble Stream */}
                        <div className="bg-[#09090b]/80 border border-white/[0.06] p-4 rounded-xl font-mono text-xs text-[#38bdf8] min-h-[72px] relative overflow-hidden select-text shadow-inner flex items-center">
                          <span className="text-zinc-500 mr-2">&gt;</span>
                          <span className="text-[#00e559] font-bold text-sm">
                            <DecryptedText
                              text={identity.roles[taglineIndex]}
                              speed={28}
                              maxIterations={12}
                              animateOn="always"
                              encryptedClassName="text-[#38bdf8] opacity-80"
                            />
                          </span>
                          <span className="w-1.5 h-4 bg-[#00e559] inline-block ml-1 cursor-blink" />
                        </div>

                        <p className="text-xs text-zinc-400 mt-4 leading-relaxed font-sans select-text">
                          {aboutCopy.intro}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-5 flex-wrap">
                        <div className="font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/[0.06] bg-white/[0.02] text-[10px] text-zinc-300">
                          <span className="w-1 h-1 rounded-full bg-[#38bdf8]"></span> React.js & Next.js
                        </div>
                        <div className="font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/[0.06] bg-white/[0.02] text-[10px] text-zinc-300">
                          <span className="w-1 h-1 rounded-full bg-[#00e559]"></span> Laravel & Spring Boot
                        </div>
                        <div className="font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/[0.06] bg-white/[0.02] text-[10px] text-zinc-300">
                          <span className="w-1 h-1 rounded-full bg-[#A78BFA]"></span> Docker & Redis
                        </div>
                        <div className="font-mono flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/[0.06] bg-white/[0.02] text-[10px] text-zinc-300">
                          <span className="w-1 h-1 rounded-full bg-yellow-500"></span> Python & AI
                        </div>
                      </div>
                    </div>

                    {/* Skill Tuning meter dashboard */}
                    <div className="bg-[#121316]/95 backdrop-blur-xl border border-white/[0.08] hover:border-[#00e559]/30 rounded-[20px] p-5 shadow-2xl relative hover-lift transition-all">
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
                              className="h-full bg-[#00e559] rounded-full transition-all duration-[1500ms] ease-out shadow-[0_0_8px_#00e559]"
                              style={{ width: skillsVisible ? '90%' : '0%' }}
                            />
                          </div>
                        </div>

                        {/* Full Stack */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-zinc-300">Full-Stack & Web Engineering</span>
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#00e559]/10 text-[#00e559] font-semibold uppercase">ACTIVE (85)</span>
                          </div>
                          <div className="h-2 bg-[#1a1b1e] border border-white/[0.04] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#00e559] rounded-full transition-all duration-[1500ms] ease-out shadow-[0_0_8px_#00e559]"
                              style={{ width: skillsVisible ? '85%' : '0%' }}
                            />
                          </div>
                        </div>

                        {/* AI ML */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-zinc-300">AI & Natural Language Processing</span>
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#38bdf8]/10 text-[#38bdf8] font-semibold uppercase">EXPLORING (65)</span>
                          </div>
                          <div className="h-2 bg-[#1a1b1e] border border-white/[0.04] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#38bdf8] rounded-full transition-all duration-[1500ms] ease-out shadow-[0_0_8px_#38bdf8]"
                              style={{ width: skillsVisible ? '65%' : '0%' }}
                            />
                          </div>
                        </div>

                        {/* Cyber Security */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-zinc-300">Cyber Security & DevOps</span>
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#A78BFA]/10 text-[#A78BFA] font-semibold uppercase">LEARNING (55)</span>
                          </div>
                          <div className="h-2 bg-[#1a1b1e] border border-white/[0.04] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#A78BFA] rounded-full transition-all duration-[1500ms] ease-out shadow-[0_0_8px_#A78BFA]"
                              style={{ width: skillsVisible ? '55%' : '0%' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Console showcase panel with Holographic HUD, Laser Scanner, and 3D Parallax Tilt */}
                  <div
                    className="bg-[#121316]/95 backdrop-blur-xl border border-white/[0.08] hover:border-[#00e559]/40 rounded-[24px] p-5 shadow-2xl relative flex flex-col justify-between hover-lift transition-all"
                  >
                    <div className="hidden lg:block absolute top-1/2 -left-[5px] -translate-y-1/2 w-2.5 h-2.5 bg-[#00e559] rounded-sm rotate-45 shadow-[0_0_10px_#00e559]"></div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-200 tracking-tight">
                          <Terminal className="w-4 h-4 text-[#00e559]" />
                          <span>Console Workspace</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-[#00e559] shadow-[0_0_8px_#00e559]"></div>
                      </div>

                      {/* Interactive Console Image Slider */}
                      <div
                        onMouseEnter={() => setSliderHovered(true)}
                        onMouseLeave={() => setSliderHovered(false)}
                        className="w-full aspect-square rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(0,229,89,0.15)] bg-[#0c0d0f] flex flex-col items-center justify-center relative overflow-hidden mb-4 group"
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
                                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                              />

                              {/* Subtle Bottom Gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                              {/* Bottom Status Labels */}
                              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[9px] text-[#00e559] z-10">
                                <span className="font-semibold">{slides[currentSlide].label}</span>
                                <span className="text-zinc-400">TRACKING_OK</span>
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
                              className="w-8 h-8 rounded-full bg-black/80 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#00e559] hover:text-black hover:border-[#00e559] transition-all cursor-pointer pointer-events-auto opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 duration-300 shadow-lg"
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
                              className="w-8 h-8 rounded-full bg-black/80 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#00e559] hover:text-black hover:border-[#00e559] transition-all cursor-pointer pointer-events-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 duration-300 shadow-lg"
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
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-[#00e559] w-4 shadow-[0_0_8px_#00e559]' : 'bg-white/30 hover:bg-white/50'}`}
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
                      className="mt-4 w-full py-3 rounded-xl bg-[#00e559] hover:bg-[#00c54c] text-black text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,89,0.25)] hover:shadow-[0_0_22px_rgba(0,229,89,0.4)] active:scale-[0.98]"
                    >
                      <span>Explore Repository Modules ({featuredProjects.length})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            </section>
          )}

          {/* ============ ABOUT & TECH STACK PAGE ============ */}
          {activePage === 'about' && (
            <section className="p-4 md:p-8 max-w-4xl mx-auto page-transition space-y-6">

              {/* About description text block */}
              <div className="bg-[#121316]/95 backdrop-blur-xl border border-white/[0.08] hover:border-[#00e559]/30 rounded-[20px] p-6 md:p-8 shadow-2xl hover-lift transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-200 tracking-tight">
                    <User className="w-4 h-4 text-[#00e559]" />
                    <SpatialRevealText text="Host Profile & Engineering Philosophy" className="text-sm font-medium text-gray-200" />
                  </div>
                  <span className="font-mono text-[9px] text-[#00e559] px-2 py-0.5 rounded bg-[#00e559]/10 font-semibold uppercase">
                    CSE // DIU
                  </span>
                </div>
                <div className="space-y-4 text-zinc-300 leading-relaxed text-sm md:text-base select-text font-sans">
                  <p>{aboutCopy.intro}</p>
                  <p>{aboutCopy.outro}</p>
                </div>
              </div>

              {/* Visual SkillIcons Section */}
              <div className="bg-[#121316]/95 backdrop-blur-xl border border-white/[0.08] hover:border-[#38bdf8]/30 rounded-[20px] p-6 shadow-2xl hover-lift transition-all">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-200 tracking-tight">
                    <Cpu className="w-4 h-4 text-[#38bdf8]" />
                    <SpatialRevealText text="◈ Tech Stack Matrix & Frameworks" className="text-sm font-medium text-gray-200" />
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500">SYSTEM STACK MATRIX</span>
                </div>

                {/* Skillicons embedded badge streams */}
                <div className="flex flex-col items-center gap-3 py-2">
                  {skillIcons.map((iconUrl, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-[#09090b]/80 border border-white/[0.04] shadow-inner max-w-full overflow-x-auto">
                      <img
                        src={iconUrl}
                        alt={`Tech Stack Part ${idx + 1}`}
                        className="h-10 md:h-12 w-auto max-w-none transition-transform hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                {/* Categorized Tech Chips with interactive decrypt hover */}
                <div className="grid sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/[0.04]">
                  <div>
                    <span className="font-mono text-[10px] text-zinc-400 block mb-2 font-semibold uppercase">Languages & Core</span>
                    <div className="flex flex-wrap gap-1.5">
                      {techStack.languagesAndCore.map((t) => (
                        <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-md border border-white/[0.06] bg-white/[0.02] text-zinc-300 hover:border-[#00e559]/40 hover:text-white transition-all cursor-pointer">
                          <DecryptedText text={t} speed={40} animateOn="hover" />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-zinc-400 block mb-2 font-semibold uppercase">Frameworks & Web</span>
                    <div className="flex flex-wrap gap-1.5">
                      {techStack.frameworks.map((t) => (
                        <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-md border border-[#00e559]/20 bg-[#00e559]/5 text-[#00e559] hover:border-[#00e559] hover:bg-[#00e559]/10 transition-all cursor-pointer">
                          <DecryptedText text={t} speed={40} animateOn="hover" />
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-zinc-400 block mb-2 font-semibold uppercase">Databases & DevOps</span>
                    <div className="flex flex-wrap gap-1.5">
                      {techStack.databasesAndDevOps.map((t) => (
                        <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-md border border-[#38bdf8]/20 bg-[#38bdf8]/5 text-[#38bdf8] hover:border-[#38bdf8] hover:bg-[#38bdf8]/10 transition-all cursor-pointer">
                          <DecryptedText text={t} speed={40} animateOn="hover" />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Engagement Vectors */}
              <div className="bg-[#121316]/95 backdrop-blur-xl border border-white/[0.08] hover:border-[#00e559]/30 rounded-[20px] p-6 shadow-2xl hover-lift transition-all">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-200 tracking-tight mb-4">
                  <Rocket className="w-4 h-4 text-[#00e559]" />
                  <span>Engagement Vectors & Collaboration</span>
                </div>
                <ul className="grid sm:grid-cols-2 gap-3 text-xs text-zinc-400 font-sans select-text">
                  {aboutCopy.openTo.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-[#1a1b1e]/60 p-3 rounded-xl border border-white/[0.03]">
                      <CheckCircle2 className="w-4 h-4 text-[#00e559] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Terminal-like YAML block with reliable clipboard button */}
              <div className="bg-[#0c0d0f] border border-white/[0.08] rounded-[20px] p-6 shadow-2xl relative group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-200 tracking-tight">
                    <Terminal className="w-4 h-4 text-zinc-400" />
                    <span className="font-mono text-xs text-[#00e559]">current_focus.yaml</span>
                  </div>

                  <button
                    onClick={handleCopyYaml}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-all ${copiedText ? 'border-[#00e559] bg-[#00e559]/10 text-[#00e559]' : 'border-white/[0.08] hover:border-[#00e559]/40 hover:bg-white/[0.02] text-zinc-400 hover:text-[#00e559]'}`}
                    title="Copy configuration content"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#00e559]" />
                        <span>COPIED TO CLIPBOARD</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY YAML</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="font-mono text-xs text-zinc-400 leading-6 overflow-x-auto select-all bg-[#09090b]/60 p-4 rounded-xl border border-white/[0.03]">
                  <span className="text-[#38bdf8]">learning</span>:
                  {currentFocus.learning.map((val) => `\n  - ${val}`)}
                  {"\n"}
                  <span className="text-[#00e559]">building</span>:
                  {currentFocus.building.map((val) => `\n  - ${val}`)}
                  {"\n"}
                  <span className="text-[#A78BFA]">exploring</span>:
                  {currentFocus.exploring.map((val) => `\n  - ${val}`)}
                </pre>
              </div>

            </section>
          )}

          {/* ============ PROJECTS PAGE ============ */}
          {activePage === 'projects' && (
            <section className="p-4 md:p-8 max-w-5xl mx-auto page-transition space-y-6">

              {/* Header & Filter Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#121316]/90 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-5">
                <div>
                  <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#00e559]" />
                    <SpatialRevealText text="Compiled Development Modules" className="text-base font-semibold text-zinc-100" />
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1 font-sans">
                    Exploring full-stack web applications, multilingual AI bots, and civic platforms.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 p-1 bg-[#09090b] border border-white/[0.06] rounded-xl text-xs font-mono">
                  <button
                    onClick={() => setProjectFilter('all')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${projectFilter === 'all' ? 'bg-[#00e559] text-black font-bold shadow-[0_0_10px_rgba(0,229,89,0.3)]' : 'text-zinc-400 hover:text-white'}`}
                  >
                    ALL ({featuredProjects.length})
                  </button>
                  <button
                    onClick={() => setProjectFilter('featured')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${projectFilter === 'featured' ? 'bg-[#00e559] text-black font-bold shadow-[0_0_10px_rgba(0,229,89,0.3)]' : 'text-zinc-400 hover:text-white'}`}
                  >
                    FEATURED
                  </button>
                  <button
                    onClick={() => setProjectFilter('web')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${projectFilter === 'web' ? 'bg-[#00e559] text-black font-bold shadow-[0_0_10px_rgba(0,229,89,0.3)]' : 'text-zinc-400 hover:text-white'}`}
                  >
                    WEB
                  </button>
                  <button
                    onClick={() => setProjectFilter('ai')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${projectFilter === 'ai' ? 'bg-[#00e559] text-black font-bold shadow-[0_0_10px_rgba(0,229,89,0.3)]' : 'text-zinc-400 hover:text-white'}`}
                  >
                    AI/NLP
                  </button>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 gap-6 select-text">
                {filteredProjects.map((proj) => {
                  const starCount = proj.repoName && repoStars[proj.repoName] !== undefined ? repoStars[proj.repoName] : (proj.stars ?? 0);

                  return (
                    <div
                      key={proj.id}
                      className="bg-[#121316]/95 backdrop-blur-xl border border-white/[0.08] hover:border-[#00e559]/40 rounded-[20px] p-6 shadow-2xl hover-lift flex flex-col justify-between group transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-100 group-hover:text-[#00e559] transition-colors">
                            <Layers className="w-4.5 h-4.5 text-[#00e559]" />
                            <DecryptedText text={proj.title} speed={25} animateOn="hover" />
                          </div>

                          <div className="flex items-center gap-2">
                            {proj.featured && (
                              <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-[#00e559]/10 text-[#00e559] border border-[#00e559]/20 font-semibold">
                                FEATURED
                              </span>
                            )}
                            <div className="w-2 h-2 rounded-full bg-[#00e559] shadow-[0_0_8px_#00e559]"></div>
                          </div>
                        </div>

                        <p className="text-xs text-zinc-300 leading-relaxed mb-3 font-sans">
                          {proj.summary}
                        </p>
                        <p className="text-xs text-zinc-500 leading-relaxed mb-4 font-sans italic border-l-2 border-[#00e559]/30 pl-2.5">
                          {proj.detail}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                        <div className="flex items-center gap-1.5 flex-wrap max-w-[65%]">
                          {proj.stack.map((item) => (
                            <span key={item} className="font-mono text-[9px] px-2 py-0.5 rounded-md border border-white/[0.06] bg-white/[0.02] text-zinc-400">
                              {item}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] font-mono px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-[#00e559] hover:text-black border border-white/[0.08] text-zinc-300 font-bold uppercase flex items-center gap-1.5 transition-all"
                            title="View GitHub Repository & Star"
                          >
                            <Star className="w-3 h-3 text-[#FFA116] group-hover:text-black fill-[#FFA116]" />
                            <span>Star {starCount > 0 ? `(${starCount})` : ''}</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* GitHub platform link */}
              <a
                href={identity.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-white/[0.08] bg-[#0c0d0f]/60 text-zinc-400 hover:text-white hover:border-[#00e559]/50 hover:bg-[#00e559]/5 transition-all text-xs font-mono shadow-lg"
              >
                <Github className="w-4 h-4 text-[#00e559]" />
                <span>VIEW ALL DEVELOPMENT REPOSITORIES ON GITHUB (@pbs002-s) →</span>
              </a>
            </section>
          )}

          {/* ============ ACHIEVEMENTS & GITHUB STATS PAGE ============ */}
          {activePage === 'achievements' && (
            <section className="p-4 md:p-8 max-w-4xl mx-auto page-transition space-y-6">

              {/* GitHub Stats & Real-Time Activity Section */}
              <div className="bg-[#121316]/95 backdrop-blur-xl border border-white/[0.08] hover:border-[#00e559]/30 rounded-[20px] p-6 shadow-2xl hover-lift transition-all">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-200 tracking-tight">
                    <Activity className="w-4 h-4 text-[#00e559]" />
                    <SpatialRevealText text="◈ GitHub Stats & Coding Activity" className="text-sm font-medium text-gray-200" />
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#00e559] bg-[#00e559]/10 px-2.5 py-1 rounded-full border border-[#00e559]/20 font-semibold">
                    <Flame className="w-3 h-3 text-[#FFA116]" />
                    <span>ACTIVE STREAK & CONTRIBUTIONS</span>
                  </div>
                </div>

                {/* GitHub Stats Cards Grid */}
                <div className="grid md:grid-cols-2 gap-4 items-center justify-center">
                  <div className="rounded-xl overflow-hidden bg-[#09090b] border border-white/[0.06] p-2 flex items-center justify-center shadow-inner hover:border-[#00e559]/40 transition-colors">
                    <img
                      src={githubWidgets.stats}
                      alt="GitHub Stats Extended"
                      className="w-full h-auto object-contain max-h-[170px]"
                      loading="lazy"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden bg-[#09090b] border border-white/[0.06] p-2 flex items-center justify-center shadow-inner hover:border-[#00e559]/40 transition-colors">
                    <img
                      src={githubWidgets.streak}
                      alt="GitHub Readme Streak Stats"
                      className="w-full h-auto object-contain max-h-[170px]"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* GitHub Activity Graph Banner */}
                <div className="mt-4 rounded-xl overflow-hidden bg-[#09090b] border border-white/[0.06] p-2 flex items-center justify-center shadow-inner hover:border-[#00e559]/40 transition-colors">
                  <img
                    src={githubWidgets.activityGraph}
                    alt="GitHub Readme Activity Graph"
                    className="w-full h-auto object-contain max-h-[190px]"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Achievements & Certifications Grid */}
              <div className="grid sm:grid-cols-2 gap-4 select-text">

                {/* Science Fair Winner */}
                <div className="bg-[#121316]/95 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-5 shadow-2xl flex items-start gap-4 hover-lift">
                  <div className="w-11 h-11 rounded-xl bg-[#00e559]/10 border border-[#00e559]/20 flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5 text-[#00e559]" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-100 font-medium mb-1">{achievements[0].title}</div>
                    <div className="text-xs text-zinc-400 leading-relaxed font-sans">{achievements[0].description}</div>
                  </div>
                </div>

                {/* Digital Bangladesh */}
                <div className="bg-[#121316]/95 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-5 shadow-2xl flex items-start gap-4 hover-lift">
                  <div className="w-11 h-11 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center shrink-0">
                    <FileCheck className="w-5 h-5 text-[#38bdf8]" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-100 font-medium mb-1">{achievements[1].title}</div>
                    <div className="text-xs text-zinc-400 leading-relaxed font-sans">{achievements[1].description}</div>
                  </div>
                </div>

                {/* National Science Fair */}
                <div className="bg-[#121316]/95 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-5 shadow-2xl flex items-start gap-4 hover-lift">
                  <div className="w-11 h-11 rounded-xl bg-[#00e559]/10 border border-[#00e559]/20 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-[#00e559]" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-100 font-medium mb-1">{achievements[2].title}</div>
                    <div className="text-xs text-zinc-400 leading-relaxed font-sans">{achievements[2].description}</div>
                  </div>
                </div>

                {/* Gov Certificates */}
                <div className="bg-[#121316]/95 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-5 shadow-2xl flex items-start gap-4 hover-lift">
                  <div className="w-11 h-11 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center shrink-0">
                    <CheckSquare className="w-5 h-5 text-[#38bdf8]" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-100 font-medium mb-1">{achievements[3].title}</div>
                    <div className="text-xs text-zinc-400 leading-relaxed font-sans">{achievements[3].description}</div>
                  </div>
                </div>

                {/* Consistent Learner */}
                <div className="sm:col-span-2 bg-[#121316]/95 backdrop-blur-xl border border-white/[0.08] rounded-[20px] p-5 shadow-2xl flex items-start gap-4 hover-lift">
                  <div className="w-11 h-11 rounded-xl bg-[#00e559]/10 border border-[#00e559]/20 flex items-center justify-center shrink-0">
                    <Rocket className="w-5 h-5 text-[#00e559]" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-100 font-medium mb-1">{achievements[4].title}</div>
                    <div className="text-xs text-zinc-400 leading-relaxed font-sans">{achievements[4].description}</div>
                  </div>
                </div>

              </div>
            </section>
          )}

          {/* ============ CONTACT PAGE ============ */}
          {activePage === 'contact' && (
            <section className="p-4 md:p-8 max-w-2xl mx-auto page-transition">

              <div className="bg-[#121316]/95 backdrop-blur-xl border border-white/[0.08] hover:border-[#00e559]/30 rounded-[24px] p-6 md:p-8 shadow-2xl text-center select-text transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a1b1e] to-[#0c0d0f] border border-white/10 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(0,0,0,0.5)] group">
                  <span className="font-mono text-2xl font-bold text-[#00e559]">
                    <DecryptedText text="PB" speed={35} animateOn="hover" />
                  </span>
                </div>

                <h2 className="text-lg text-zinc-100 font-medium mb-1">
                  <SpatialRevealText text="Let's build something extraordinary." className="text-lg text-zinc-100 font-medium" />
                </h2>
                <p className="text-xs text-zinc-400 mb-6 font-sans">Open to software engineering internships, open-source projects, and collaborative development.</p>

                {/* Contact Cards Grid */}
                <div className="grid sm:grid-cols-2 gap-3 text-left mb-6">
                  <div
                    onClick={handleCopyEmail}
                    className="flex items-center gap-3 bg-[#1a1b1e] border border-white/5 rounded-xl px-4 py-3 hover:border-[#00e559]/50 hover:bg-[#00e559]/5 transition-all group cursor-pointer"
                    title="Click to copy email"
                  >
                    <Mail className="w-5 h-5 text-[#00e559] shrink-0" />
                    <div className="overflow-hidden flex-1">
                      <div className="font-mono text-[9px] text-zinc-500 uppercase flex items-center justify-between">
                        <span>Email Address</span>
                        <span className="text-[#00e559] font-mono text-[8px]">{copiedEmail ? 'COPIED!' : 'CLICK TO COPY'}</span>
                      </div>
                      <div className="text-xs text-zinc-200 truncate">{identity.email}</div>
                    </div>
                  </div>

                  <a
                    href={identity.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 bg-[#1a1b1e] border border-white/5 rounded-xl px-4 py-3 hover:border-[#00e559]/50 hover:bg-[#00e559]/5 transition-all"
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
                    className="flex items-center gap-3 bg-[#1a1b1e] border border-white/5 rounded-xl px-4 py-3 hover:border-[#FFA116]/50 hover:bg-[#FFA116]/5 transition-all"
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
                    className="flex items-center gap-3 bg-[#1a1b1e] border border-white/5 rounded-xl px-4 py-3 hover:border-[#1F8ACB]/50 hover:bg-[#1F8ACB]/5 transition-all"
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
                    className="flex items-center gap-3 bg-[#1a1b1e] border border-white/5 rounded-xl px-4 py-3 hover:border-[#1877F2]/50 hover:bg-[#1877F2]/5 transition-all"
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
                    className="flex items-center gap-3 bg-[#1a1b1e] border border-white/5 rounded-xl px-4 py-3 hover:border-[#E1306C]/50 hover:bg-[#E1306C]/5 transition-all"
                  >
                    <Instagram className="w-5 h-5 text-[#E1306C] shrink-0" />
                    <div>
                      <div className="font-mono text-[9px] text-zinc-500 uppercase">Instagram</div>
                      <div className="text-xs text-zinc-200">swagoto_pritom</div>
                    </div>
                  </a>
                </div>

                {/* Fully functional, interactive Contact Form */}
                <form onSubmit={handleFormSubmit} className="text-left border-t border-white/[0.04] pt-6">
                  <h3 className="text-xs font-mono text-zinc-400 mb-4 uppercase tracking-wider font-semibold">Or send a direct transmission:</h3>

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
                    className="w-full py-3 bg-[#00e559] hover:bg-[#00c54c] text-black text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,89,0.3)] hover:shadow-[0_0_20px_rgba(0,229,89,0.4)]"
                  >
                    <span>{formSubmitted ? 'Message Prepared in Mail Client' : 'Send Transmission // Mailto Draft'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {formSubmitted && (
                    <p className="font-mono text-[9px] text-[#00e559] mt-2 text-center">
                      Success: Opened system mail draft with your prefilled details!
                    </p>
                  )}
                </form>
              </div>

              <p className="text-center font-mono text-[11px] text-zinc-500 mt-8">
                "{identity.closingQuote}"
              </p>
            </section>
          )}

        </div>

        {/* Floating Bottom Nav - Mobile/Tablet Only */}
        <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 p-1.5 bg-[#121316]/90 backdrop-blur-xl border border-white/[0.08] rounded-full shadow-2xl">
          <button
            onClick={() => setActivePage('home')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activePage === 'home' ? 'bg-[#00e559] text-black shadow-[0_0_12px_rgba(0,229,89,0.4)] font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            title="Home"
          >
            <Home className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActivePage('about')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activePage === 'about' ? 'bg-[#00e559] text-black shadow-[0_0_12px_rgba(0,229,89,0.4)] font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            title="About & Tech Stack"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActivePage('projects')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activePage === 'projects' ? 'bg-[#00e559] text-black shadow-[0_0_12px_rgba(0,229,89,0.4)] font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            title="Projects"
          >
            <Layers className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActivePage('achievements')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activePage === 'achievements' ? 'bg-[#00e559] text-black shadow-[0_0_12px_rgba(0,229,89,0.4)] font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            title="Achievements"
          >
            <Award className="w-5 h-5" />
          </button>

          <div className="w-[1px] h-5 bg-white/10 mx-1"></div>

          <button
            onClick={() => setActivePage('contact')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${activePage === 'contact' ? 'bg-[#00e559] text-black shadow-[0_0_12px_rgba(0,229,89,0.4)] font-bold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
            title="Contact"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>

      </main>
    </div>
  );
}
