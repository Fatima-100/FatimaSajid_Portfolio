import React, { useState, useEffect } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Terminal,
  Code2,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Award,
  ExternalLink,
} from 'lucide-react';
import { InteractiveCodeMockup } from './InteractiveCodeMockup';
import { TechLogoBadge } from './TechLogos';
import { HeroInteractiveNexus } from './HeroInteractiveNexus';
import { useAvatar } from '../context/AvatarContext';

interface HeroSectionProps {
  onOpenTerminal: () => void;
}

const ROLES = [
  'Full-Stack Software Engineer',
  'Computer Vision & CIELAB Architect',
  'Next.js & React Core Developer',
  'Systems & Algorithms Specialist',
  'Web Dev Intern @ Quantum Logics',
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTerminal }) => {
  const { avatarUrl } = useAvatar();
  const [roleIndex, setRoleIndex] = useState(0);
  const [subText, setSubText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for roles
  useEffect(() => {
    const currentFullRole = ROLES[roleIndex];
    const speed = isDeleting ? 30 : 65;

    const typingTimeout = setTimeout(() => {
      if (!isDeleting && subText === currentFullRole) {
        setTimeout(() => setIsDeleting(true), 1800);
        return;
      }

      if (isDeleting && subText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        return;
      }

      setSubText((prev) =>
        isDeleting
          ? currentFullRole.substring(0, prev.length - 1)
          : currentFullRole.substring(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(typingTimeout);
  }, [subText, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="min-h-screen pt-24 sm:pt-28 pb-12 px-4 sm:px-6 relative z-10 flex flex-col justify-center items-center"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center">
        
        {/* Status Pill Badge */}
        <div
          id="hero-status-pill"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181427]/85 border border-[#dfb098]/30 shadow-md backdrop-blur-md mb-4 hover:scale-105 transition-transform"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-[#dfb098]">
            Open to Internship & Engineering Roles
          </span>
          <span className="text-xs text-white/20">|</span>
          <span className="text-xs font-mono text-[#c5bed5]">
            CGPA 3.98 / 4.00
          </span>
        </div>

        {/* Main Headline */}
        <h1
          id="hero-title"
          className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-[#f4f2f8] tracking-tight max-w-4xl text-center leading-[1.14] mb-3"
        >
          Engineering real, full-stack products with{' '}
          <span className="italic font-normal bg-gradient-to-r from-[#dfb098] via-[#eed4c6] to-[#c9a0dc] bg-clip-text text-transparent">
            precision and passion.
          </span>
        </h1>

        {/* Animated Typewriter Subtitle */}
        <div className="min-h-[28px] flex items-center justify-center gap-2 mb-4">
          <span className="font-code text-sm sm:text-lg text-[#dfb098] font-semibold">
            {'> '}
            {subText}
          </span>
          <span className="w-1.5 h-4 bg-[#dfb098] animate-pulse" />
        </div>

        {/* Bio Narrative */}
        <p className="max-w-2xl text-center text-[#b5adc9] text-sm sm:text-base leading-relaxed mb-6">
          I'm <span className="font-semibold text-[#f4f2f8]">Fatima Sajid</span> — BS Software Engineering student at COMSATS Lahore and Web Development Intern at Quantum Logics. Building production-grade systems from illuminant-invariant computer vision to scalable web architectures.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <a
            href="#projects"
            id="hero-cta-projects"
            className="px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm text-[#12101c] bg-gradient-to-r from-[#dfb098] to-[#c9a0dc] hover:brightness-110 shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <span>Explore Featured Work</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onOpenTerminal}
            id="hero-cta-terminal"
            className="px-4 py-2.5 rounded-full font-semibold text-xs sm:text-sm text-[#f4f2f8] bg-[#1a162b] hover:bg-[#251f3d] border border-white/15 shadow-md hover:border-[#dfb098]/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-[#dfb098]" />
            <span>Launch CLI Terminal</span>
          </button>

          <a
            href="#contact"
            id="hero-cta-contact"
            className="px-4 py-2.5 rounded-full font-semibold text-xs sm:text-sm text-[#c5bed5] hover:text-[#f4f2f8] bg-[#161324]/80 hover:bg-[#1f1b32] border border-white/10 transition-all flex items-center gap-1.5"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#dfb098]" />
          </a>
        </div>

        {/* High-Density Bento Showcase Grid: Eliminates Dead Free Space */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 mb-10 text-left">
          
          {/* Bento Tile 1: Profile & Credentials Card (Col span 4) */}
          <div
            id="bento-profile-card"
            className="lg:col-span-4 rounded-2xl p-4 bg-[#141024]/90 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-[#dfb098]/40 transition-all"
          >
            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-[#dfb098]/50 shadow-md">
                <img
                  src={avatarUrl}
                  alt="Fatima Sajid"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#141024]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-bold text-base text-[#f4f2f8]">Fatima Sajid</h3>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xs text-[#dfb098] font-medium">Software Engineer</div>
                <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Hire
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-white/8 pt-3">
              <div className="flex items-start gap-2 text-[#c5bed5]">
                <GraduationCap className="w-3.5 h-3.5 text-[#dfb098] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white">COMSATS University Lahore</span>
                  <div className="text-[11px] text-[#9e97af]">BS Software Engineering (2022–2026)</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[#c5bed5] px-2.5 py-1.5 rounded-lg bg-[#1a152d]/60 border border-white/5">
                <span className="text-[11px] font-semibold text-[#9e97af]">Cumulative GPA:</span>
                <span className="font-mono font-bold text-[#dfb098] text-xs">3.98 / 4.00</span>
              </div>

              <div className="flex items-start gap-2 text-[#c5bed5]">
                <Briefcase className="w-3.5 h-3.5 text-[#dfb098] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white">Quantum Logics</span>
                  <div className="text-[11px] text-[#9e97af]">Web Development Intern</div>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/8 flex items-center justify-between">
              <a
                href="https://www.linkedin.com/in/fatima-sajid-80738a382"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-[#dfb098] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="#about"
                className="text-[11px] text-[#9e97af] hover:text-white transition-colors"
              >
                Read Bio →
              </a>
            </div>
          </div>

          {/* Bento Tile 2: Live 3D Holographic Nexus (Col span 5) */}
          <div
            id="bento-nexus-card"
            className="lg:col-span-5 rounded-2xl p-4 bg-[#141024]/90 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-[#dfb098]/40 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#dfb098]" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#dfb098] font-bold">
                  Interactive 3D Engine
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#9e97af] bg-[#1d1734] px-2 py-0.5 rounded-full border border-white/5">
                Interactive Telemetry
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center min-h-[220px]">
              <HeroInteractiveNexus className="w-full mb-0" />
            </div>

            <div className="text-[11px] text-[#9e97af] text-center border-t border-white/8 pt-2">
              Click nodes or drag mouse to simulate real-time CIELAB vector space calculations
            </div>
          </div>

          {/* Bento Tile 3: Key Performance Metrics & Stats (Col span 3) */}
          <div
            id="bento-stats-card"
            className="lg:col-span-3 rounded-2xl p-4 bg-[#141024]/90 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-[#dfb098]/40 transition-all"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Award className="w-3.5 h-3.5 text-[#dfb098]" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#dfb098] font-bold">
                Impact & Credentials
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 my-auto">
              <div className="p-2.5 rounded-xl bg-[#1b162f]/70 border border-white/5">
                <div className="font-mono font-bold text-xl text-[#dfb098]">3.98</div>
                <div className="text-[11px] text-[#c5bed5] font-medium">Academic CGPA</div>
                <div className="text-[10px] text-[#8e87a2]">COMSATS Rank #1 Tier</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#1b162f]/70 border border-white/5">
                <div className="font-mono font-bold text-xl text-emerald-400">3+</div>
                <div className="text-[11px] text-[#c5bed5] font-medium">Production Systems</div>
                <div className="text-[10px] text-[#8e87a2]">ChromaMatch · TripShare · Chat</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#1b162f]/70 border border-white/5">
                <div className="font-mono font-bold text-xl text-[#c9a0dc]">15+</div>
                <div className="text-[11px] text-[#c5bed5] font-medium">Technologies Mastered</div>
                <div className="text-[10px] text-[#8e87a2]">OpenCV, Next.js, FastAPI, C++</div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#1b162f]/70 border border-white/5">
                <div className="font-mono font-bold text-xl text-sky-400">100%</div>
                <div className="text-[11px] text-[#c5bed5] font-medium">Verified Code</div>
                <div className="text-[10px] text-[#8e87a2]">Tested & Documented</div>
              </div>
            </div>

            <button
              onClick={onOpenTerminal}
              className="w-full mt-3 py-1.5 px-3 rounded-lg bg-[#201a38] hover:bg-[#2c244e] border border-white/10 text-[11px] font-semibold text-[#f4f2f8] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Terminal className="w-3 h-3 text-[#dfb098]" />
              <span>Launch Terminal CLI</span>
            </button>
          </div>

        </div>

        {/* Technology Logos Strip */}
        <div className="w-full max-w-5xl mb-8 flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#dfb098] mb-3">
            Core Technologies & Engineering Stack
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              'React',
              'Next.js 14',
              'TypeScript',
              'OpenCV',
              'FastAPI',
              'CIELAB Color Space',
              'C++20',
              'Python',
              'Node.js',
              'Express',
              'Django',
              'MySQL',
              'MongoDB',
              'PostgreSQL',
              'Socket.io',
              'Tailwind CSS',
              'Git',
            ].map((tech) => (
              <TechLogoBadge key={tech} name={tech} size="sm" />
            ))}
          </div>
        </div>

        {/* Text Writing / Code Mockup Clone from Sample */}
        <div className="w-full flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2.5 text-xs font-code text-[#9e97af]">
            <Code2 className="w-4 h-4 text-[#dfb098]" />
            <span>Interactive IDE Showcase · Click tabs to inspect live modules</span>
          </div>
          <InteractiveCodeMockup />
        </div>

      </div>
    </section>
  );
};
