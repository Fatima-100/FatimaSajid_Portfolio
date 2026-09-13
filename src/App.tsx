/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsBar } from './components/StatsBar';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { InteractiveTerminalModal } from './components/InteractiveTerminalModal';
import { ResumeModal } from './components/ResumeModal';
import { PhotoUploadModal } from './components/PhotoUploadModal';
import { AvatarProvider } from './context/AvatarContext';

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <AvatarProvider>
      <div className="relative min-h-screen bg-gradient-to-b from-[#0b0914] via-[#120f22] to-[#090710] text-[#f4f2f8] overflow-x-hidden font-sans">
        
        {/* Subtle Ambient Background Gradients (Obsidian & Rose Gold Luxe) */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-[#dfb098]/10 blur-[120px]" />
          <div className="absolute top-1/3 -right-32 w-[34rem] h-[34rem] rounded-full bg-[#8c52ff]/12 blur-[130px]" />
          <div className="absolute bottom-1/4 -left-32 w-[30rem] h-[30rem] rounded-full bg-[#dfb098]/8 blur-[120px]" />
        </div>

        {/* Floating Navigation */}
        <Navbar
          onOpenResumeModal={() => setIsResumeOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <HeroSection onOpenTerminal={() => setIsTerminalOpen(true)} />
          <StatsBar />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <CertificationsSection />
          <ExperienceTimeline />
          <ContactSection />
        </main>

        {/* Interactive CLI Terminal Modal */}
        <InteractiveTerminalModal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
        />

        {/* Resume / CV Modal */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />

        {/* Photo Upload & Real Photo Switcher Modal */}
        <PhotoUploadModal />
      </div>
    </AvatarProvider>
  );
}

