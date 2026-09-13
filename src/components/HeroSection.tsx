import React, { useState, useEffect } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Terminal,
  Code2,
  Sparkles,
} from 'lucide-react';
import { InteractiveCodeMockup } from './InteractiveCodeMockup';
import { TechLogoBadge } from './TechLogos';
import { HeroInteractiveNexus } from './HeroInteractiveNexus';

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
      className="min-h-screen pt-28 pb-16 px-6 relative z-10 flex flex-col justify-center items-center"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center text-center">
        
        {/* Status Pill Badge */}
        <div
          id="hero-status-pill"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181427]/85 border border-[#dfb098]/35 shadow-lg backdrop-blur-md mb-6 hover:scale-105 transition-transform"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold tracking-wide text-[#dfb098]">
            Open to Internship & Engineering Roles
          </span>
          <span className="hidden sm:inline text-xs text-white/20">|</span>
          <span className="hidden sm:inline text-xs font-semibold text-[#c5bed5]">
            CGPA 3.98 / 4.00
          </span>
        </div>

        {/* Interactive 3D Holographic Core (Replaces static upper picture) */}
        <HeroInteractiveNexus />

        {/* Main Headline */}
        <h1
          id="hero-title"
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-[#f4f2f8] tracking-tight max-w-4xl leading-[1.12] mb-4"
        >
          Engineering real, full-stack products with{' '}
          <span className="italic font-normal bg-gradient-to-r from-[#dfb098] via-[#eed4c6] to-[#c9a0dc] bg-clip-text text-transparent">
            precision and passion.
          </span>
        </h1>

        {/* Animated Typewriter Subtitle */}
        <div className="min-h-[36px] flex items-center justify-center gap-2 mb-6">
          <span className="font-code text-base sm:text-xl text-[#dfb098] font-semibold">
            {'> '}
            {subText}
          </span>
          <span className="w-2 h-5 bg-[#dfb098] animate-pulse" />
        </div>

        {/* Bio Narrative */}
        <p className="max-w-2xl text-[#b5adc9] text-base sm:text-lg leading-relaxed mb-8">
          I'm <span className="font-semibold text-[#f4f2f8]">Fatima</span> — BS Software Engineering student at COMSATS Lahore and Web Development Intern at Quantum Logics. I bridge theory with real execution: engineering <span className="font-semibold text-[#dfb098]">ChromaMatch AI</span> for illuminant-invariant color harmony, architecting the <span className="font-semibold text-[#dfb098]">Trip-Share</span> travel marketplace, shipping encrypted chat features for <span className="font-semibold text-[#dfb098]">QuantumChat</span>, and building high-performance systems with modern algorithms.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
          <a
            href="#projects"
            id="hero-cta-projects"
            className="px-6 py-3 rounded-full font-bold text-sm text-[#12101c] bg-gradient-to-r from-[#dfb098] to-[#c9a0dc] hover:brightness-110 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <span>Explore Featured Work</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenTerminal}
            id="hero-cta-terminal"
            className="px-5 py-3 rounded-full font-semibold text-sm text-[#f4f2f8] bg-[#1a162b] hover:bg-[#251f3d] border border-white/15 shadow-md hover:border-[#dfb098]/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-[#dfb098]" />
            <span>Launch CLI Terminal</span>
          </button>

          <a
            href="#contact"
            id="hero-cta-contact"
            className="px-5 py-3 rounded-full font-semibold text-sm text-[#c5bed5] hover:text-[#f4f2f8] bg-[#161324]/80 hover:bg-[#1f1b32] border border-white/10 transition-all flex items-center gap-1.5"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-4 h-4 text-[#dfb098]" />
          </a>
        </div>

        {/* Technology Logos Strip */}
        <div className="w-full max-w-4xl mb-12 flex flex-col items-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#dfb098] mb-3.5">
            Core Technologies & Engineering Stack
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
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
          <div className="flex items-center gap-2 mb-3 text-xs font-code text-[#9e97af]">
            <Code2 className="w-4 h-4 text-[#dfb098]" />
            <span>Interactive IDE Showcase · Click tabs to inspect live modules</span>
          </div>
          <InteractiveCodeMockup />
        </div>

      </div>
    </section>
  );
};
