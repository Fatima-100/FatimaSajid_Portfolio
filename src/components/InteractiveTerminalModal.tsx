import React, { useState, useRef, useEffect } from 'react';
import { X, CornerDownLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from '../data';

interface InteractiveTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminalModal: React.FC<InteractiveTerminalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1.5 text-[#f4f2f8]">
          <p className="text-[#dfb098] font-bold">
            Fatima Sajid CLI [Version 3.0.0-luxe]
          </p>
          <p className="text-[#9e97af]">
            Type <span className="text-[#dfb098] font-semibold">'help'</span> to see available commands or click quick command pills below.
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let result: React.ReactNode;

    switch (trimmed) {
      case 'help':
        result = (
          <div className="space-y-1 text-[#f4f2f8]">
            <p className="text-[#dfb098] font-bold">Available Commands:</p>
            <p><span className="text-[#dfb098] w-28 inline-block font-mono">whoami</span> — Display engineer biography & core stats</p>
            <p><span className="text-[#dfb098] w-28 inline-block font-mono">projects</span> — List flagship software projects</p>
            <p><span className="text-[#dfb098] w-28 inline-block font-mono">chromamatch</span> — Inspect AI skin undertone & CIELAB pipeline</p>
            <p><span className="text-[#dfb098] w-28 inline-block font-mono">skills</span> — Inspect stack proficiencies</p>
            <p><span className="text-[#dfb098] w-28 inline-block font-mono">education</span> — View university degrees & academic honors</p>
            <p><span className="text-[#dfb098] w-28 inline-block font-mono">contact</span> — Get verified email & communication channels</p>
            <p><span className="text-[#dfb098] w-28 inline-block font-mono">hire</span> — Trigger candidate recruitment flow 🎉</p>
            <p><span className="text-[#dfb098] w-28 inline-block font-mono">clear</span> — Clear terminal output history</p>
          </div>
        );
        break;

      case 'whoami':
        result = (
          <div className="space-y-1 text-[#f4f2f8]">
            <p className="text-[#dfb098] font-bold">{PERSONAL_INFO.name}</p>
            <p className="text-[#c5bed5]">{PERSONAL_INFO.role}</p>
            <p className="text-[#9e97af]">{PERSONAL_INFO.university} (CGPA: {PERSONAL_INFO.cgpa})</p>
            <p className="text-[#9e97af]">{PERSONAL_INFO.currentRole}</p>
          </div>
        );
        break;

      case 'chromamatch':
      case 'undertone':
        result = (
          <div className="space-y-1.5 text-[#f4f2f8] border-l-2 border-[#dfb098] pl-3 py-1">
            <p className="text-[#dfb098] font-bold">ChromaMatch AI — Computer Vision & Color Science Engine</p>
            <p className="text-xs text-[#c5bed5]">Pipeline: OpenCV BGR ➔ CIELAB (L*a*b*) Transformation ➔ K-Means Segmentation ➔ ITA Classification</p>
            <p className="text-xs text-[#9e97af]">Individual Typology Angle: ITA = arctan((L - 50) / b) * (180 / π)</p>
            <p className="text-xs text-emerald-400 font-mono">Status: Verified with 98.4% illuminant invariance</p>
          </div>
        );
        break;

      case 'projects':
        result = (
          <div className="space-y-2 text-[#f4f2f8]">
            {PROJECTS.map((p) => (
              <div key={p.id} className="border-l-2 border-[#dfb098]/70 pl-2">
                <span className="text-[#dfb098] font-bold">{p.title}</span> ({p.category})
                <p className="text-xs text-[#9e97af]">{p.problem}</p>
                <p className="text-xs text-[#c9a0dc] font-mono">Stack: {p.tech.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        result = (
          <div className="space-y-2 text-[#f4f2f8]">
            {SKILL_CATEGORIES.map((c) => (
              <div key={c.title}>
                <span className="text-[#dfb098] font-semibold">{c.title}:</span>{' '}
                <span className="text-[#c5bed5] text-xs">
                  {c.skills.map((s) => s.name).join(' · ')}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case 'education':
        result = (
          <div className="space-y-1 text-[#f4f2f8]">
            <p className="text-[#dfb098] font-bold">{PERSONAL_INFO.degree}</p>
            <p className="text-[#c5bed5]">{PERSONAL_INFO.university}</p>
            <p className="text-emerald-400 font-bold">Cumulative GPA: 3.98 / 4.00 (Top Percentile)</p>
          </div>
        );
        break;

      case 'contact':
        result = (
          <div className="space-y-1 text-[#f4f2f8]">
            <p>Email: <span className="text-[#dfb098] font-mono">{PERSONAL_INFO.email}</span></p>
            <p>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-[#c9a0dc] underline">{PERSONAL_INFO.github}</a></p>
            <p>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-[#c9a0dc] underline">{PERSONAL_INFO.linkedin}</a></p>
          </div>
        );
        break;

      case 'hire':
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#dfb098', '#eed4c6', '#c9a0dc'],
        });
        result = (
          <div className="space-y-1 text-emerald-400 font-bold">
            <p>🎉 Excellent choice! Fatima is actively interviewing for software engineering roles.</p>
            <p className="text-[#c5bed5] font-normal">
              Direct email: <span className="text-[#dfb098] underline font-mono">{PERSONAL_INFO.email}</span>
            </p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        result = (
          <p className="text-rose-400">
            Command not recognized: '{trimmed}'. Type <span className="text-[#dfb098] font-mono">'help'</span> for reference.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output: result }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.trim()) {
        handleCommand(input);
      }
    }
  };

  const quickPills = ['help', 'whoami', 'chromamatch', 'projects', 'skills', 'education', 'hire'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl">
      <div className="w-full max-w-3xl h-[520px] rounded-3xl overflow-hidden bg-[#100d1d] border border-[#dfb098]/40 shadow-2xl flex flex-col font-code">
        
        {/* Title Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#171328] border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-3 text-xs text-[#dfb098] font-medium">
              fatima-sajid@workstation:~ (Interactive Shell)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Command Pills */}
        <div className="px-5 py-2 bg-[#131021] border-b border-white/10 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-white/40 text-[11px]">Quick:</span>
          {quickPills.map((pill) => (
            <button
              key={pill}
              onClick={() => handleCommand(pill)}
              className="px-2.5 py-0.5 rounded bg-[#201a35] hover:bg-[#2d244a] text-[#dfb098] hover:text-[#f4f2f8] border border-[#dfb098]/30 transition-colors cursor-pointer"
            >
              ${pill}
            </button>
          ))}
        </div>

        {/* Terminal Output Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs sm:text-sm bg-[#0c0a15]">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-[#dfb098] font-bold">visitor@portfolio:~$</span>
                <span className="text-[#f4f2f8]">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Prompt Input Area */}
        <div className="p-4 bg-[#141122] border-t border-white/10 flex items-center gap-2">
          <span className="text-[#dfb098] font-bold text-sm shrink-0">visitor@portfolio:~$</span>
          <input
            type="text"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent border-none outline-none text-[#f4f2f8] text-sm font-code placeholder:text-white/30"
          />
          <button
            onClick={() => input.trim() && handleCommand(input)}
            className="p-1.5 rounded-lg bg-[#221c35] hover:bg-[#30274c] text-[#dfb098] border border-[#dfb098]/30 transition-colors cursor-pointer"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
