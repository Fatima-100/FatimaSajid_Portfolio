import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Menu,
  X,
  Sparkles,
  FileText,
  Terminal,
  CircleDot,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { useAvatar } from '../context/AvatarContext';

interface NavbarProps {
  onOpenResumeModal: () => void;
  onOpenTerminal?: () => void;
}

const NAV_LINKS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Featured Work', href: '#projects', id: 'projects' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Certifications', href: '#certifications', id: 'certifications' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResumeModal,
  onOpenTerminal,
}) => {
  const { avatarUrl } = useAvatar();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      // Active Section Spy
      const sections = ['contact', 'experience', 'certifications', 'skills', 'projects', 'about'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionId);
          return;
        }
      }
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-nav-container"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none ${
        scrolled ? 'pt-3 pb-2' : 'pt-5 pb-3'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pointer-events-auto">
        {/* Floating Glassmorphic Pill Capsule */}
        <div
          id="glass-navbar-capsule"
          className="relative px-3.5 sm:px-5 py-2.5 rounded-full bg-[#110d21]/70 backdrop-blur-2xl border border-white/[0.12] border-t-white/[0.24] shadow-[0_20px_50px_rgba(0,0,0,0.65),0_1px_0_rgba(255,255,255,0.12)_inset] transition-all duration-300 flex items-center justify-between"
        >
          {/* Top Specular Glass Reflection */}
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* Left Brand / Identity */}
          <a
            href="#hero"
            id="nav-logo"
            className="flex items-center gap-2.5 group cursor-pointer text-decoration-none select-none"
          >
            {/* Monogram Jewel with Glowing Pulse */}
            <div className="relative w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-[#2a2040] to-[#161226] border border-[#dfb098]/40 shadow-inner group-hover:border-[#dfb098] transition-colors overflow-hidden">
              <span className="font-display font-black text-xs tracking-wider bg-gradient-to-r from-[#dfb098] to-[#c9a0dc] bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                FS
              </span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-sm text-[#f4f2f8] tracking-tight group-hover:text-[#dfb098] transition-colors">
                  Fatima Sajid
                </span>
                {/* Live Availability Emerald Pulse */}
                <span className="relative flex h-2 w-2" title="Available for Internship & Engineering Roles">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <span className="hidden sm:block text-[10px] text-[#9e97af] font-medium leading-tight">
                Software Engineer · CGPA 3.98
              </span>
            </div>
          </a>

          {/* Center: Desktop Glass Nav Links with Gliding Highlights */}
          <nav
            onMouseLeave={() => setHoveredNav(null)}
            className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#181329]/60 border border-white/8 backdrop-blur-md shadow-inner relative"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              const isHovered = hoveredNav === link.id;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  id={`nav-link-${link.id}`}
                  onMouseEnter={() => setHoveredNav(link.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 z-10 select-none ${
                    isActive
                      ? 'text-[#f4f2f8]'
                      : 'text-[#a9a1be] hover:text-[#f4f2f8]'
                  }`}
                >
                  {/* Active Section Frosted Pill */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#dfb098]/25 via-[#c9a0dc]/20 to-[#dfb098]/25 border border-[#dfb098]/40 shadow-sm -z-10 animate-in fade-in duration-300" />
                  )}

                  {/* Hover Glass Pill Glow */}
                  {isHovered && !isActive && (
                    <span className="absolute inset-0 rounded-full bg-white/8 border border-white/10 -z-10 animate-in fade-in duration-150" />
                  )}

                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls: CLI, Resume, Socials & CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Interactive CLI Terminal Launch Button */}
            {onOpenTerminal && (
              <button
                onClick={onOpenTerminal}
                id="nav-terminal-quick-btn"
                className="px-3 py-1.5 text-xs font-mono font-bold text-[#dfb098] bg-[#1a142c]/90 hover:bg-[#251d3e] border border-[#dfb098]/35 hover:border-[#dfb098] rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer group/term"
                title="Launch Interactive Engineering Terminal (CLI)"
              >
                <Terminal className="w-3.5 h-3.5 text-[#dfb098] group-hover/term:scale-110 transition-transform" />
                <span>$ CLI</span>
              </button>
            )}

            {/* Resume Button */}
            <button
              onClick={onOpenResumeModal}
              id="nav-resume-btn"
              className="px-3.5 py-1.5 text-xs font-semibold text-[#ece8f4] bg-[#221c35]/80 hover:bg-[#2e2547] border border-white/12 hover:border-[#dfb098]/40 rounded-full shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#dfb098]" />
              <span>CV</span>
            </button>

            {/* Social Icons */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              id="nav-github-link"
              className="p-1.5 text-[#b0a8c2] hover:text-[#f4f2f8] bg-[#1a152e]/60 hover:bg-[#251f3e] rounded-full transition-all border border-white/8 hover:border-white/20 hover:scale-105"
              title="GitHub Profile"
            >
              <Github className="w-3.5 h-3.5" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              id="nav-linkedin-link"
              className="p-1.5 text-[#b0a8c2] hover:text-[#f4f2f8] bg-[#1a152e]/60 hover:bg-[#251f3e] rounded-full transition-all border border-white/8 hover:border-white/20 hover:scale-105"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>

            {/* Contact CTA */}
            <a
              href="#contact"
              id="nav-cta-contact"
              className="px-4 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-[#dfb098] to-[#c9a0dc] text-[#12101c] hover:brightness-110 shadow-md hover:shadow-lg transition-all flex items-center gap-1 hover:scale-102"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu & Terminal Buttons */}
          <div className="flex lg:hidden items-center gap-1.5">
            {onOpenTerminal && (
              <button
                onClick={onOpenTerminal}
                className="p-2 rounded-full text-xs font-mono font-bold text-[#dfb098] bg-[#1e1732] border border-[#dfb098]/30 hover:bg-[#2a2046]"
                title="Open CLI"
              >
                <Terminal className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="nav-mobile-toggle"
              className="p-2 rounded-full text-[#f4f2f8] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Frosted Glass Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-3xl bg-[#110d22]/95 backdrop-blur-3xl border border-white/15 shadow-2xl flex flex-col gap-2.5 animate-in slide-in-from-top-3 duration-200">
            <div className="flex items-center justify-between px-2 pb-2 border-b border-white/10 text-xs">
              <span className="font-bold text-[#dfb098] uppercase tracking-wider">Navigation</span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Roles
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#261f38] text-[#dfb098] border border-[#dfb098]/40'
                        : 'text-[#c5bed5] hover:text-[#f4f2f8] hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResumeModal();
                }}
                className="flex-1 py-2 px-3 text-xs font-semibold text-[#f4f2f8] bg-[#221c35] hover:bg-[#2d2545] rounded-xl border border-[#dfb098]/30 flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-[#dfb098]" />
                <span>Resume / CV</span>
              </button>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2 px-3 text-xs font-bold text-[#12101c] bg-gradient-to-r from-[#dfb098] to-[#c9a0dc] rounded-xl flex items-center justify-center gap-1"
              >
                <span>Let's Connect</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
