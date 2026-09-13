import React, { useState, useEffect } from 'react';
import { Terminal, Copy, Check, Play, Sparkles, FileCode, RefreshCw } from 'lucide-react';

interface TabContent {
  id: string;
  name: string;
  lang: string;
  icon: string;
  code: string;
}

const TABS: TabContent[] = [
  {
    id: 'fatima-ts',
    name: 'fatima.ts',
    lang: 'typescript',
    icon: 'TS',
    code: `// Engineer Profile — Fatima Sajid
export const engineer: SoftwareEngineer = {
  name: "Fatima Sajid",
  education: {
    university: "COMSATS Lahore",
    degree: "BS Software Engineering",
    cgpa: 3.98 // out of 4.00 🏆
  },
  currentRole: "Web Dev Intern @ Quantum Logics",
  primaryFocus: "Full-Stack Architecture & Systems",
  stack: ["Next.js", "React", "Node.js", "Django", "Python", "C++", "MySQL"],
  building: "Trip-Share & ChromaMatch AI Undertone Analyzer",
  status: "Open to impactful engineering opportunities"
};

// Ready to ship production code
export async function executeImpact() {
  return await engineer.buildRealWorldProducts();
}`,
  },
  {
    id: 'chroma-py',
    name: 'chromaMatch.py',
    lang: 'python',
    icon: 'PY',
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
  },
  {
    id: 'tripshare-ts',
    name: 'tripShare.ts',
    lang: 'typescript',
    icon: 'TS',
    code: `// Trip-Share Marketplace Engine
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

    return { status: "COORDINATED", driver: matchedDriver.name };
  }
}`,
  },
  {
    id: 'quantum-ts',
    name: 'quantumChat.ts',
    lang: 'typescript',
    icon: 'TS',
    code: `// QuantumLogics Encrypted Vault & FCM Pipeline
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

  return { delivered: true, latencyMs: 38 };
};`,
  },
  {
    id: 'trapscape-cpp',
    name: 'trapscape.cpp',
    lang: 'cpp',
    icon: 'C++',
    code: `// TrapScape SFML 3 Pathfinding & Custom AVL Tree
#include <SFML/Graphics.hpp>
#include "DSA/AVLTree.hpp"
#include "DSA/AStarPathfinder.hpp"

class MazeEngine {
private:
    DSA::AVLTree<int, PlayerScore> leaderboard;
    DSA::AStarPathfinder<GridGraph> solver;

public:
    void updatePathfinding(const sf::Vector2i& start, const sf::Vector2i& target) {
        // Zero external STL: custom priority queue and heuristic
        auto optimalPath = solver.computeRoute(start, target);
        renderMaze60FPS(optimalPath);
    }
};`,
  },
  {
    id: 'terminal',
    name: 'terminal.sh',
    lang: 'bash',
    icon: '$_',
    code: `# Interactive Developer CLI
$ whoami
> fatima-sajid: software engineer & problem solver

$ cat education.txt
> BS Software Engineering @ COMSATS Lahore (CGPA 3.98/4.00)
> Meta Certified Back-End Developer (Coursera, 9 Specializations)

$ npm run verify-status
> Ready for high-impact software engineering roles ✓`,
  },
];

export const InteractiveCodeMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('fatima-ts');
  const [copied, setCopied] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];

  // Typewriter effect when tab changes
  useEffect(() => {
    setIsTyping(true);
    setTypedText('');
    let idx = 0;
    const fullText = currentTab.code;
    const interval = setInterval(() => {
      idx += 4; // Faster chunk typing for slick feel
      if (idx >= fullText.length) {
        setTypedText(fullText);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setTypedText(fullText.slice(0, idx));
      }
    }, 12);

    return () => clearInterval(interval);
  }, [activeTab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setMouseTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  return (
    <div
      id="code-editor-mockup"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${mouseTilt.y}deg) rotateY(${mouseTilt.x}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="w-full max-w-2xl rounded-2xl overflow-hidden glass-panel-dark text-slate-100 shadow-2xl border border-white/20"
    >
      {/* Top Bar with window dots & tab buttons */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/35 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-400/80" />
          <div className="w-3 h-3 rounded-full bg-amber-400/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
          <span className="ml-2 text-xs font-code text-white/50 hidden sm:inline">
            fatima@studio:~
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              id={`tab-btn-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 text-xs font-code rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-purple-600/40 text-rose-200 border border-purple-400/40 shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-[10px] px-1 py-0.2 rounded bg-white/10 font-bold">
                {tab.icon}
              </span>
              {tab.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            title="Copy Code"
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Code Text Area */}
      <div className="relative p-5 font-code text-xs sm:text-sm leading-relaxed overflow-x-auto max-h-[380px] bg-black/40">
        <pre className="text-slate-200 whitespace-pre font-code">
          <code>
            {typedText.split('\n').map((line, lineIdx) => {
              // Simple syntax colorizer for visual pop
              let colored = <span className="text-slate-300">{line}</span>;
              if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
                colored = <span className="text-purple-300/70 italic">{line}</span>;
              } else if (line.includes('const ') || line.includes('export ') || line.includes('import ') || line.includes('class ')) {
                colored = <span className="text-pink-300">{line}</span>;
              } else if (line.includes(': ') && line.includes('"')) {
                colored = <span className="text-emerald-300">{line}</span>;
              } else if (line.includes('$ ')) {
                colored = <span className="text-cyan-300 font-bold">{line}</span>;
              } else if (line.includes('> ')) {
                colored = <span className="text-amber-200">{line}</span>;
              }

              return (
                <div key={lineIdx} className="table-row">
                  <span className="table-cell pr-4 select-none text-white/20 text-right text-[11px] w-6">
                    {lineIdx + 1}
                  </span>
                  <span className="table-cell">{colored}</span>
                </div>
              );
            })}
          </code>
        </pre>
        {isTyping && (
          <span className="inline-block w-2 h-4 bg-rose-300 ml-1 animate-pulse" />
        )}
      </div>

      {/* Status Footer Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/50 border-t border-white/10 text-[11px] text-white/60 font-code">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Typescript 5.8 / Node 22
          </span>
          <span className="hidden sm:inline text-white/40">UTF-8</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-rose-200">CGPA 3.98</span>
          <span className="text-white/40">|</span>
          <span className="text-teal-300">Quantum Logics</span>
        </div>
      </div>
    </div>
  );
};
