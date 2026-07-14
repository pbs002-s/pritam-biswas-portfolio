import React, { useState } from 'react';
import { Terminal, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface TerminalPanelProps {
  title: string;
  subtitle?: string;
  code: string;
  language?: string;
}

export default function TerminalPanel({ title, subtitle = "READ_ONLY_STREAM", code, language = "yaml" }: TerminalPanelProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#1A1B1E] border border-[#27272a] rounded-[20px] overflow-hidden shadow-2xl flex flex-col font-mono text-xs text-white">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d0e] border-b border-[#27272a] select-none">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#00E559]/80" />
          </div>
          <div className="flex items-center gap-1.5 ml-2 text-zinc-400">
            <Terminal className="w-3.5 h-3.5 text-[#00E559]" />
            <span className="text-[11px] font-semibold text-zinc-300 uppercase tracking-widest">{title}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 text-[9px] tracking-tight">{subtitle}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-[20px] hover:bg-zinc-800 text-zinc-400 hover:text-[#00E559] transition-all"
            title="Copy snippet"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#00E559]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-[20px] hover:bg-zinc-800 text-zinc-400 hover:text-[#38BDF8] transition-all"
          >
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code Area */}
      {isExpanded && (
        <div className="p-4 bg-[#09090b]/40 overflow-x-auto select-text scrollbar-thin">
          <pre className="text-zinc-300 leading-relaxed font-mono whitespace-pre text-left">
            <code>{code}</code>
          </pre>
        </div>
      )}

      {/* Footer bar */}
      {isExpanded && (
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#0d0d0e]/60 border-t border-[#27272a] text-[10px] text-zinc-500 select-none">
          <span>LANG: {language.toUpperCase()}</span>
          <span className="text-[#38BDF8]">UTF-8</span>
          <span className="text-[#00E559]">SECURE // CONNECTION_OK</span>
        </div>
      )}
    </div>
  );
}
