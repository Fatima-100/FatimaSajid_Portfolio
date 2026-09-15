import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Copy,
  Check,
  Play,
  Sparkles,
  FileCode,
  FolderTree,
  ChevronRight,
  Code2,
  Cpu,
  Layers,
  CheckCircle2,
  RefreshCw,
  TerminalSquare,
  Maximize2
} from 'lucide-react';

interface TabContent {
  id: string;
  name: string;
  path: string;
  lang: string;
  category: string;
  icon: string;
  iconColor: string;
  lines: number;
  code: string;
  output: string[];
}

const TABS: TabContent[] = [
  {
    id: 'fatima-ts',
    name: 'fatima.ts',
    path: 'src/profile/fatima.ts',
    lang: 'typescript',
    category: 'Core Profile',
    icon: 'TS',
    iconColor: 'bg-blue-600/30 text-blue-300 border-blue-500/40',
    lines: 20,
    code: `// Engineer Profile — Fatima Sajid
export const engineer: SoftwareEngineer = {
  name: "Fatima Sajid",
  education: {
    university: "COMSATS Lahore",
    degree: "BS Software Engineering",
    cgpa: 3.98 // out of 4.00 🏆 (Top 1% Tier)
  },
  currentRole: "Web Dev Intern @ Quantum Logics",
  primaryFocus: "Full-Stack Architecture & High-Performance Systems",
  stack: ["Next.js 14", "React", "Node.js", "Django", "Python", "C++", "MySQL", "OpenCV"],
  building: ["Trip-Share Travel Marketplace", "ChromaMatch AI Undertone Analyzer"],
  status: "Open to impactful software engineering opportunities"
};

// Ready to ship verified production code
export async function executeImpact() {
  const systems = await engineer.deployProductionSystems();
  return { status: "ACTIVE", impact: "High Scalability", available: true };
}`,
    output: [
      '> tsx src/profile/fatima.ts',
      '[✓] Compiled TypeScript 5.8 with zero strict-mode errors',
      '[✓] Loaded Profile: Fatima Sajid (BSSE @ COMSATS Lahore · CGPA 3.98)',
      '[✓] Active Role: Web Dev Intern @ Quantum Logics',
      '[✓] executeImpact(): 3 production-grade systems ready for review',
      '>> Result: { status: "ACTIVE", impact: "High Scalability", available: true }'
    ]
  },
  {
    id: 'chroma-py',
    name: 'chromaMatch.py',
    path: 'ai_vision/chromaMatch.py',
    lang: 'python',
    category: 'AI & Vision',
    icon: 'PY',
    iconColor: 'bg-amber-600/30 text-amber-300 border-amber-500/40',
    lines: 22,
    code: `# ChromaMatch AI — Illuminant-Invariant Skin Undertone Segmentation
import cv2
import numpy as np

def analyze_skin_undertone(image_bgr: np.ndarray) -> dict:
    # 1. Convert to CIELAB (L*a*b*) color space to eliminate camera exposure bias
    lab = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2LAB)
    L, a, b = cv2.split(lab)
    
    # 2. Compute Individual Typology Angle (ITA)
    # ITA = arctan((L - 50) / b) * (180 / pi)
    ita_deg = np.arctan2((np.mean(L) - 50.0), np.mean(b)) * (180.0 / np.pi)
    
    # 3. K-Means clustering across a* (red-green) & b* (yellow-blue) axes
    undertone = "Warm" if np.mean(b) > 16.5 else ("Cool" if np.mean(a) > 13.0 else "Neutral")
    return {
        "ita_angle": f"{ita_deg:+.1f}°",
        "classified_undertone": undertone,
        "recommended_season": "Warm Autumn" if undertone == "Warm" else "Cool Winter"
    }`,
    output: [
      '> python3 ai_vision/chromaMatch.py --sample=portrait_01.raw',
      '[CIELAB] Converted frame to L*a*b* color space (exposure normalized)',
      '[TELEMETRY] Mean L*: 64.8, a*: +14.2, b*: +18.7',
      '[ITA FORMULA] Calculated angle: +36.4° (Individual Typology Standard)',
      '[K-MEANS] Converged in 4 iterations across 12,000 segmented pixels',
      '>> Output: { "ita_angle": "+36.4°", "classified_undertone": "Warm", "season": "Warm Autumn" }'
    ]
  },
  {
    id: 'tripshare-ts',
    name: 'tripShare.ts',
    path: 'marketplace/tripShare.ts',
    lang: 'typescript',
    category: 'Full-Stack',
    icon: 'TS',
    iconColor: 'bg-blue-600/30 text-blue-300 border-blue-500/40',
    lines: 21,
    code: `// Trip-Share Marketplace Engine — Automated Driver Matching & Escrow
import { Matchmaker, EscrowSplit } from '@/lib/travel';

export class TripShareService {
  async coordinateGroupTrip(cohortId: string) {
    const group = await db.cohorts.findById(cohortId);
    
    // 1. Algorithmic driver dispatch matching vehicle capacity
    const matchedDriver = await Matchmaker.dispatch({
      seatsRequired: group.travelerCount,
      routeWaypoints: group.itinerary.stops,
      budgetCeiling: group.budgetPerHead
    });

    // 2. Fractional real-time split payment engine
    const payment = await EscrowSplit.distribute({
      totalCost: matchedDriver.fare + group.lodgingCost,
      members: group.memberIds
    });

    return { status: "COORDINATED", driver: matchedDriver.name, escrow: payment.status };
  }
}`,
    output: [
      '> npx tsx marketplace/tripShare.ts --cohortId=lahore-hunza-44',
      '[DATABASE] Fetched 12 registered travelers for Route: Lahore -> Hunza Valley',
      '[ALGORITHM] Matchmaker matched: 14-seater Toyota HiAce (Driver: Tariq M., Rating: 4.9/5)',
      '[ESCROW] Calculated automated equal fractional split: Rs 18,500/member',
      '[VERIFIED] Payment locks created in staging escrow vault',
      '>> Coordinated status: "COORDINATED" · Dispatch confirmed.'
    ]
  },
  {
    id: 'quantum-ts',
    name: 'quantumChat.ts',
    path: 'internship/quantumChat.ts',
    lang: 'typescript',
    category: 'Internship',
    icon: 'TS',
    iconColor: 'bg-cyan-600/30 text-cyan-300 border-cyan-500/40',
    lines: 18,
    code: `// QuantumLogics Encrypted Vault & FCM Notification Pipeline
import { FCMService } from '@quantum/notifications';
import { ClientVault } from '@quantum/security';

export const handleEncryptedStream = async (payload: StreamEvent) => {
  // Zero-knowledge encryption on device before transit
  const secureCipher = await ClientVault.seal(payload.message, {
    recipientPubKey: payload.targetKey,
    cipher: "AES-256-GCM"
  });

  // Background push dispatch via FCM worker
  await FCMService.dispatchSilentAlert({
    recipientId: payload.recipientId,
    badgeCountIncrement: 1
  });

  return { delivered: true, latencyMs: 38, cipherType: "AES-256-GCM" };
};`,
    output: [
      '> node internship/quantumChat.mjs --test-stream',
      '[CIPHER] Sealed packet using client-side AES-256-GCM zero-knowledge vault',
      '[SOCKET] Stream broadcast over WebSocket duplex channel',
      '[FCM WORKER] Silent wakeup push delivered in 38ms',
      '[AUDIT] Zero plain-text leaks detected on wire payload',
      '>> Status: { delivered: true, latencyMs: 38, cipherType: "AES-256-GCM" }'
    ]
  },
  {
    id: 'trapscape-cpp',
    name: 'trapscape.cpp',
    path: 'systems_dsa/trapscape.cpp',
    lang: 'cpp',
    category: 'Systems & DSA',
    icon: 'C++',
    iconColor: 'bg-rose-600/30 text-rose-300 border-rose-500/40',
    lines: 19,
    code: `// TrapScape SFML 3 Pathfinding & Custom AVL Self-Balancing Tree
#include <SFML/Graphics.hpp>
#include "DSA/AVLTree.hpp"
#include "DSA/AStarPathfinder.hpp"

class MazeEngine {
private:
    DSA::AVLTree<int, PlayerScore> leaderboard;
    DSA::AStarPathfinder<GridGraph> solver;

public:
    void updatePathfinding(const sf::Vector2i& start, const sf::Vector2i& target) {
        // Zero external STL dependencies: custom priority queue & Manhattan heuristic
        auto optimalPath = solver.computeRoute(start, target);
        renderMaze60FPS(optimalPath);
    }
};`,
    output: [
      '> g++ -std=c++20 -O3 systems_dsa/trapscape.cpp -lsfml-graphics -lsfml-window',
      '[DSA CHECK] Verified AVL Tree self-balancing rotations (Balance Factor: -1 to +1)',
      '[A* BENCHMARK] Computed shortest path across 1,600 grid nodes in 1.18ms',
      '[SFML 3 ENGINE] Frame budget: 16.6ms | Real-time measured rendering: 4.2ms (60 FPS)',
      '[MEMORY AUDIT] Valgrind: 0 errors from 0 contexts (clean heap)'
    ]
  },
  {
    id: 'terminal',
    name: 'terminal.sh',
    path: 'scripts/verify_engineer.sh',
    lang: 'bash',
    category: 'CLI Verification',
    icon: '$_',
    iconColor: 'bg-emerald-600/30 text-emerald-300 border-emerald-500/40',
    lines: 15,
    code: `#!/usr/bin/env bash
# Quick verification audit for Fatima Sajid
echo "[AUDIT] Candidate: Fatima Sajid"
echo "[AUDIT] Education: COMSATS University Islamabad, Lahore Campus"
echo "[AUDIT] Degree: BS Software Engineering (2022 - 2026)"
echo "[AUDIT] Academic Standing: CGPA 3.98 / 4.00 (Rank: Top 1% Tier)"
echo "[AUDIT] Internship: Web Development Intern @ Quantum Logics"
echo "[AUDIT] Meta Certifications: 9 Professional Specializations Verified"
echo "[AUDIT] Readiness: Immediate availability for Software Engineering roles"`,
    output: [
      '> bash scripts/verify_engineer.sh',
      '[AUDIT] Candidate: Fatima Sajid',
      '[AUDIT] Education: COMSATS University Islamabad, Lahore Campus',
      '[AUDIT] Degree: BS Software Engineering (2022 - 2026)',
      '[AUDIT] Academic Standing: CGPA 3.98 / 4.00 (Rank: Top 1% Tier)',
      '[AUDIT] Internship: Web Development Intern @ Quantum Logics',
      '[AUDIT] Meta Certifications: 9 Professional Specializations Verified',
      '[AUDIT] Readiness: Immediate availability for Software Engineering roles'
    ]
  }
];

export const InteractiveCodeMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('fatima-ts');
  const [copied, setCopied] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [activeBottomPane, setActiveBottomPane] = useState<'output' | 'tests'>('output');
  const [isRunning, setIsRunning] = useState(false);
  const [executionCount, setExecutionCount] = useState(1);

  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];

  // Typewriter effect when tab changes
  useEffect(() => {
    setIsTyping(true);
    setTypedText('');
    let idx = 0;
    const fullText = currentTab.code;
    const interval = setInterval(() => {
      idx += 6; // Fast, responsive typing
      if (idx >= fullText.length) {
        setTypedText(fullText);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setTypedText(fullText.slice(0, idx));
      }
    }, 10);

    return () => clearInterval(interval);
  }, [activeTab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunExecution = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setExecutionCount((c) => c + 1);
    }, 450);
  };

  return (
    <div
      id="code-editor-mockup"
      className="w-full max-w-5xl lg:max-w-6xl rounded-2xl overflow-hidden bg-[#0e0c19] text-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.7)] border border-white/15 transition-all"
    >
      {/* Top Main Window Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#141124] border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/40" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/40" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/40" />
          </div>
          <span className="text-xs font-mono text-white/50 hidden sm:inline-block">
            fatima@comsats-workstation:~/{currentTab.path}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunExecution}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
              isRunning
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
            }`}
            title="Execute file in simulated sandbox"
          >
            {isRunning ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>{isRunning ? 'Executing...' : 'Run Module'}</span>
          </button>

          <button
            onClick={handleCopy}
            title="Copy Code"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Dual-Pane Workspace: Left Explorer + Right Code & Output */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[360px]">
        
        {/* Left Explorer Sidebar (Columns 3) */}
        <div className="md:col-span-3.5 lg:col-span-3 bg-[#110d21] border-r border-white/8 p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#dfb098] px-2 py-1.5 mb-2 border-b border-white/8">
              <FolderTree className="w-3.5 h-3.5" />
              <span>Project Explorer</span>
            </div>

            <div className="space-y-1">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center justify-between cursor-pointer group ${
                      isActive
                        ? 'bg-[#221b3a] text-[#dfb098] font-bold border border-[#dfb098]/30 shadow-sm'
                        : 'text-[#9e97af] hover:text-[#f4f2f8] hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${tab.iconColor}`}>
                        {tab.icon}
                      </span>
                      <span className="truncate">{tab.name}</span>
                    </div>
                    <span className="text-[10px] text-white/30 font-normal">
                      {tab.lines}L
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sidebar Quick Stats Badge */}
          <div className="mt-4 pt-3 border-t border-white/8 px-1">
            <div className="p-2 rounded-lg bg-[#18132d] border border-white/5 text-[11px] text-[#9e97af] space-y-1">
              <div className="flex items-center justify-between text-white/80 font-mono">
                <span>Active Branch:</span>
                <span className="text-emerald-400 font-bold">main ✓</span>
              </div>
              <div className="flex items-center justify-between text-white/80 font-mono">
                <span>Verification:</span>
                <span className="text-[#dfb098]">CGPA 3.98</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: Code Editor + Live Terminal Output (Columns 9) */}
        <div className="md:col-span-8.5 lg:col-span-9 flex flex-col bg-[#0b0915]">
          
          {/* Editor Tab Bar */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#120e24] border-b border-white/8 overflow-x-auto">
            <div className="flex items-center gap-1">
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${currentTab.iconColor}`}>
                {currentTab.icon}
              </span>
              <span className="text-xs font-mono font-bold text-white px-2 py-0.5">
                {currentTab.name}
              </span>
              <span className="text-[11px] text-white/40 font-mono hidden sm:inline">
                ({currentTab.lang})
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-mono text-[#9e97af]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Code Preview</span>
            </div>
          </div>

          {/* Code Text Area */}
          <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto max-h-[290px] bg-[#0c0a17]">
            <pre className="text-slate-200 whitespace-pre font-mono">
              <code>
                {typedText.split('\n').map((line, lineIdx) => {
                  let colored = <span className="text-slate-300">{line}</span>;
                  if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
                    colored = <span className="text-purple-400/80 italic">{line}</span>;
                  } else if (
                    line.includes('const ') ||
                    line.includes('export ') ||
                    line.includes('import ') ||
                    line.includes('class ') ||
                    line.includes('def ') ||
                    line.includes('return ') ||
                    line.includes('echo ')
                  ) {
                    colored = <span className="text-pink-400 font-semibold">{line}</span>;
                  } else if (line.includes(': ') && (line.includes('"') || line.includes("'"))) {
                    colored = <span className="text-emerald-300">{line}</span>;
                  } else if (line.includes('$ ') || line.includes('#!')) {
                    colored = <span className="text-cyan-300 font-bold">{line}</span>;
                  } else if (line.includes('3.98') || line.includes('COMSATS') || line.includes('Quantum Logics')) {
                    colored = <span className="text-[#dfb098] font-bold">{line}</span>;
                  }

                  return (
                    <div key={lineIdx} className="table-row hover:bg-white/[0.03] transition-colors">
                      <span className="table-cell pr-4 select-none text-white/20 text-right text-[11px] w-8">
                        {lineIdx + 1}
                      </span>
                      <span className="table-cell">{colored}</span>
                    </div>
                  );
                })}
              </code>
            </pre>
            {isTyping && (
              <span className="inline-block w-2 h-4 bg-[#dfb098] ml-1 animate-pulse" />
            )}
          </div>

          {/* Bottom Execution Console Drawer (Fills Space with Useful Output) */}
          <div className="border-t border-white/10 bg-[#120f24]">
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#17132e] border-b border-white/5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#dfb098] font-bold">
                <TerminalSquare className="w-3.5 h-3.5" />
                <span>Simulated Sandbox Output · {currentTab.name}</span>
              </div>
              <div className="text-[10px] font-mono text-[#9e97af] flex items-center gap-2">
                <span>Run #{executionCount}</span>
                <span className="text-emerald-400 font-semibold">Exit Code: 0</span>
              </div>
            </div>

            <div className="p-3 font-mono text-[11px] sm:text-xs text-slate-300 space-y-1 overflow-x-auto max-h-[140px] bg-[#0d0a1c]">
              {currentTab.output.map((outLine, oIdx) => (
                <div
                  key={oIdx}
                  className={`flex items-start gap-2 ${
                    outLine.startsWith('>>')
                      ? 'text-emerald-300 font-bold'
                      : outLine.startsWith('>')
                      ? 'text-cyan-300 font-semibold'
                      : outLine.includes('[AUDIT]') || outLine.includes('[CIELAB]')
                      ? 'text-[#dfb098]'
                      : 'text-[#c5bed5]'
                  }`}
                >
                  <span className="text-white/20 select-none">→</span>
                  <span>{outLine}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Status Footer Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-[#120f24] border-t border-white/10 text-[11px] text-white/60 font-mono gap-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            TypeScript 5.8 / Node 22 / Python 3.11 / C++20
          </span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline text-white/50">UTF-8</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#dfb098] font-bold">COMSATS Lahore · 3.98 CGPA</span>
          <span className="text-white/30">|</span>
          <span className="text-[#c9a0dc]">Quantum Logics</span>
        </div>
      </div>
    </div>
  );
};
