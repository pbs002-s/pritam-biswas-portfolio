import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, Cpu, Layers, Trophy, Mail, Github, Award } from 'lucide-react';
import { identity } from '../data';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'HOME', icon: Cpu },
    { path: '/about', label: 'ABOUT', icon: Terminal },
    { path: '/projects', label: 'PROJECTS', icon: Layers },
    { path: '/achievements', label: 'ACHIEVEMENTS', icon: Trophy },
    { path: '/contact', label: 'CONTACT', icon: Mail },
  ];

  return (
    <>
      {/* Desktop Sidebar Nav */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-64 bg-[#09090b] border-r border-[#27272a] z-50 p-6 select-none">
        {/* Console Header */}
        <div className="mb-8">
          <Link to="/" className="block group">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00E559] animate-ping" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#00E559] absolute" />
              <span className="font-mono text-xs text-[#00E559] tracking-widest font-semibold uppercase">
                SYSTEM ONLINE
              </span>
            </div>
            <h1 className="font-mono text-lg font-bold text-white tracking-wider group-hover:text-[#00E559] transition-colors">
              PRITAM_BISWAS<span className="text-[#00E559] cursor-blink">_</span>
            </h1>
            <p className="font-mono text-[10px] text-zinc-500 tracking-tight mt-0.5">
              CSE_CONSOLE // V1.0.4
            </p>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-2">
          <div className="text-[10px] font-mono text-zinc-600 tracking-widest mb-3 font-bold">
            NAVIGATION MODULES
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-[20px] font-mono text-xs font-semibold tracking-wider transition-all duration-300 group relative overflow-hidden
                  ${isActive 
                    ? 'bg-[#1A1B1E] text-[#00E559] border border-[#27272a] shadow-[0_0_15px_rgba(0,229,89,0.1)]' 
                    : 'text-[#A1A1AA] hover:text-[#FFFFFF] hover:bg-[#1A1B1E]/40 hover:border-zinc-800 border border-transparent'
                  }
                `}
              >
                {/* Active side indicator */}
                {isActive && (
                  <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#00E559] rounded-r-md" />
                )}
                
                <Icon className={`w-4.5 h-4.5 transition-colors ${isActive ? 'text-[#00E559]' : 'text-[#A1A1AA] group-hover:text-[#38BDF8]'}`} />
                <span>{item.label}</span>
                
                <span className="ml-auto font-mono text-[8px] opacity-0 group-hover:opacity-100 text-[#38BDF8] transition-opacity">
                  [LOAD]
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Quick Identity Footprint */}
        <div className="pt-6 border-t border-[#27272a] mt-auto">
          <div className="text-[10px] font-mono text-zinc-600 tracking-wider mb-2 uppercase">
            HOST PROFILE
          </div>
          <p className="font-sans text-xs text-zinc-400 font-medium">
            {identity.name}
          </p>
          <p className="font-mono text-[10px] text-zinc-500 mt-1 truncate">
            DIU_DHAKA_BD
          </p>
          
          <div className="flex gap-3 mt-4 text-zinc-400">
            <a 
              href={identity.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#00E559] transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href={`mailto:${identity.email}`} 
              className="hover:text-[#38BDF8] transition-colors"
              title="Send Mail"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#09090b] border-b border-[#27272a] z-50 px-4 flex items-center justify-between select-none">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00E559]" />
          <span className="font-mono text-sm font-bold text-white tracking-widest">
            PB_CONSOLE<span className="text-[#00E559]">_</span>
          </span>
        </Link>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-[#1A1B1E] border border-[#27272a] rounded-[20px] text-white hover:border-[#00E559] transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-5 h-5 text-[#00E559]" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-md z-45 flex flex-col justify-center p-6 pt-24">
          <div className="text-[10px] font-mono text-zinc-500 tracking-widest mb-4 text-center">
            -- CHOOSE MODULE --
          </div>
          <nav className="space-y-4 max-w-sm mx-auto w-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-4 px-6 py-4 rounded-[20px] font-mono text-sm font-semibold tracking-wider transition-all
                    ${isActive 
                      ? 'bg-[#1A1B1E] text-[#00E559] border border-[#27272a] shadow-[0_0_15px_rgba(0,229,89,0.15)]' 
                      : 'text-[#A1A1AA] bg-zinc-900/40 border border-transparent hover:text-white'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#00E559]' : 'text-[#38BDF8]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-auto text-center border-t border-zinc-800 pt-6">
            <p className="font-mono text-[11px] text-[#00E559] tracking-widest uppercase mb-1">
              {identity.name}
            </p>
            <p className="font-mono text-[10px] text-zinc-500">
              {identity.education.degree}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
