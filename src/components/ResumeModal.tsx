import React, { useState } from 'react';
import { X, Copy, Check, Printer } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const text = `
FATIMA SAJID — SOFTWARE ENGINEER & FULL-STACK DEVELOPER
Email: ${PERSONAL_INFO.email} | GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}
Location: ${PERSONAL_INFO.location}

EDUCATION:
- ${PERSONAL_INFO.degree}, ${PERSONAL_INFO.university} (CGPA: ${PERSONAL_INFO.cgpa})

EXPERIENCE:
- Web Development Intern @ Quantum Logics (QuantumChat)
  * Feature engineering for encrypted chat application
  * Real-time FCM push notifications & client vault security

PROJECTS:
1. ChromaMatch AI: Skin Undertone & Color Harmony Analyzer (Python, OpenCV, CIELAB Color Space, FastAPI, React)
2. Trip-Share Platform (Next.js, Node.js, Express, MySQL)
3. QuantumChat (React, Node.js, MongoDB, Socket.io, FCM)
4. TrapScape Maze Engine (C++20, SFML 3, 10 Custom Data Structures)
5. NexMart E-Commerce (Django, Python, PostgreSQL)

CERTIFICATIONS:
- Meta Back-End Developer Professional Certificate (Coursera - 9 Specializations)
- Python Programming Specialization (Bano Qabil)
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl">
      <div className="w-full max-w-3xl max-h-[90vh] bg-[#141122] rounded-3xl shadow-2xl border border-[#dfb098]/40 flex flex-col overflow-hidden text-[#f4f2f8]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1b172c]">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-[#f4f2f8]">
              Curriculum Vitae
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#2a223a] text-[#dfb098] font-bold border border-[#dfb098]/30">
              Verified 2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#f4f2f8] bg-[#241f35] border border-white/15 hover:border-[#dfb098]/40 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#dfb098]" />}
              <span>{copied ? 'Copied' : 'Copy Plaintext'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#12101c] bg-gradient-to-r from-[#dfb098] to-[#c9a0dc] hover:brightness-110 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Content */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto space-y-6 text-[#c5bed5] text-xs sm:text-sm leading-relaxed font-sans print:bg-white print:text-black">
          
          {/* Header Title */}
          <div className="border-b border-white/10 pb-4">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#f4f2f8]">
              Fatima Sajid
            </h1>
            <p className="text-sm font-semibold text-[#dfb098] mt-0.5">
              Software Engineer & Full-Stack Developer
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#9e97af] mt-2 font-mono">
              <span>{PERSONAL_INFO.email}</span>
              <span>•</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-[#dfb098] hover:underline">
                github.com/Fatima-100
              </a>
              <span>•</span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-[#dfb098] hover:underline">
                linkedin.com/in/fatima-sajid
              </a>
              <span>•</span>
              <span>{PERSONAL_INFO.location}</span>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-display text-base font-bold text-[#dfb098] uppercase tracking-wider mb-2">
              Education
            </h2>
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-[#f4f2f8]">
                BS in Software Engineering — COMSATS University Islamabad, Lahore
              </span>
              <span className="text-xs font-mono text-[#9e97af]">2023 — Present</span>
            </div>
            <p className="text-emerald-400 font-bold text-xs mt-0.5">
              Cumulative GPA: 3.98 / 4.00 (Top Percentile)
            </p>
            <p className="text-xs text-[#9e97af] mt-1">
              Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Systems, Software Design & Architecture, Operating Systems.
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="font-display text-base font-bold text-[#dfb098] uppercase tracking-wider mb-2">
              Professional Experience
            </h2>
            <div className="flex justify-between items-baseline">
              <span className="font-bold text-[#f4f2f8]">
                Web Development Intern — Quantum Logics
              </span>
              <span className="text-xs font-mono text-[#9e97af]">2025 — Present</span>
            </div>
            <ul className="list-disc list-inside text-xs text-[#b5adc9] space-y-1 mt-1 pl-1">
              <li>Contributing to QuantumChat: live commercial encrypted chat application.</li>
              <li>Engineered encrypted conversation vault logic and Firebase Cloud Messaging (FCM) push workers.</li>
              <li>Diagnosed and optimized client-server WebSocket synchronization, reducing message latency.</li>
            </ul>
          </div>

          {/* Key Projects */}
          <div>
            <h2 className="font-display text-base font-bold text-[#dfb098] uppercase tracking-wider mb-2">
              Key Projects
            </h2>
            <div className="space-y-3">
              {PROJECTS.map((p) => (
                <div key={p.id} className="text-xs">
                  <div className="flex justify-between font-bold text-[#f4f2f8]">
                    <span>{p.title}</span>
                    <span className="font-mono text-[11px] text-[#dfb098] font-normal">
                      {p.tech.slice(0, 4).join(', ')}
                    </span>
                  </div>
                  <p className="text-[#9e97af] mt-0.5">{p.solution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="font-display text-base font-bold text-[#dfb098] uppercase tracking-wider mb-2">
              Certifications
            </h2>
            <ul className="list-disc list-inside text-xs text-[#b5adc9] space-y-1">
              <li>
                <span className="font-semibold text-[#f4f2f8]">Meta Back-End Developer Professional Certificate</span> (Coursera - 9 Specializations in Python, Django, APIs, MySQL).
              </li>
              <li>
                <span className="font-semibold text-[#f4f2f8]">Python Programming Specialization</span> (Bano Qabil Training Program).
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};
