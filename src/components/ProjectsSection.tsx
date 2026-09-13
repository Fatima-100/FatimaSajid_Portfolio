import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, CheckCircle2, ChevronRight, Zap, Palette, LayoutGrid, Columns } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { TechStack3DOrbit } from './TechStack3DOrbit';
import { TechLogoBadge } from './TechLogos';
import { UndertonePaletteSimulator } from './UndertonePaletteSimulator';
import { Project3DStage } from './Project3DStage';

export const ProjectsSection: React.FC = () => {
  const [selectedProjectModal, setSelectedProjectModal] = useState<Project | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0].id);
  const [filter, setFilter] = useState<'All' | 'AI & Vision' | 'Full-Stack' | 'Internship' | 'Systems & DSA'>('All');
  const [showSimulator, setShowSimulator] = useState<boolean>(true);
  const [layoutMode, setLayoutMode] = useState<'3d-cards' | 'split-console'>('3d-cards');

  const filteredProjects =
    filter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  const activeProject =
    PROJECTS.find((p) => p.id === activeProjectId) || filteredProjects[0] || PROJECTS[0];

  return (
    <section id="projects" className="py-24 px-6 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1b172a] border border-[#dfb098]/30 text-xs font-semibold text-[#dfb098] mb-4 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#dfb098]" />
            <span>Interactive 3D Architecture & Production Engineering</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#f4f2f8] tracking-tight max-w-2xl mb-4 font-bold">
            Featured Engineering Projects
          </h2>
          <p className="max-w-2xl text-[#b5adc9] text-sm sm:text-base leading-relaxed">
            Every project is represented with its own dedicated <span className="font-semibold text-[#dfb098]">3D Holographic Monolith & Orbit Stage</span> — displaying its core reactor, laser links, and orbiting technologies in real-time.
          </p>

          {/* Controls: Category Filter + Layout View Mode Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#151222]/90 border border-white/10 backdrop-blur-xl overflow-x-auto shadow-xl max-w-full">
              {(['All', 'AI & Vision', 'Full-Stack', 'Internship', 'Systems & DSA'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    filter === cat
                      ? 'bg-gradient-to-r from-[#dfb098] to-[#c9a0dc] text-[#12101c] font-bold shadow-md'
                      : 'text-[#9e97af] hover:text-[#f4f2f8] hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Layout Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-[#151222]/90 border border-white/10 backdrop-blur-xl shadow-xl">
              <button
                onClick={() => setLayoutMode('3d-cards')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  layoutMode === '3d-cards'
                    ? 'bg-[#261f38] text-[#dfb098] border border-[#dfb098]/40 shadow-sm'
                    : 'text-[#9e97af] hover:text-[#f4f2f8]'
                }`}
                title="3D Component in Front of Every Project"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>3D In Every Project</span>
              </button>

              <button
                onClick={() => setLayoutMode('split-console')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  layoutMode === 'split-console'
                    ? 'bg-[#261f38] text-[#dfb098] border border-[#dfb098]/40 shadow-sm'
                    : 'text-[#9e97af] hover:text-[#f4f2f8]'
                }`}
                title="Dual-Pane Master 3D Console"
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Split 3D Console</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Interactive Undertone Simulator Highlight */}
        {activeProject.id === 'chroma-match' && (
          <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#dfb098]">
                <Palette className="w-4 h-4" />
                <span>Featured Live Interactive Prototype</span>
              </div>
              <button
                onClick={() => setShowSimulator(!showSimulator)}
                className="text-xs text-[#9e97af] hover:text-[#dfb098] underline cursor-pointer"
              >
                {showSimulator ? 'Collapse Simulator' : 'Expand Interactive Simulator'}
              </button>
            </div>
            {showSimulator && <UndertonePaletteSimulator />}
          </div>
        )}

        {/* View Mode 1: 3D Stage in Front of Every Project Card (Default) */}
        {layoutMode === '3d-cards' ? (
          <div className="max-w-5xl mx-auto flex flex-col gap-10">
            {filteredProjects.map((project) => {
              const isActive = activeProject.id === project.id;
              return (
                <div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  onMouseEnter={() => setActiveProjectId(project.id)}
                  className="p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl hover:border-[#dfb098]/60 bg-[#13111f]/90 transition-all duration-300"
                >
                  {/* Card Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#dfb098] bg-[#2a1e2a] px-3.5 py-1 rounded-full border border-[#dfb098]/30">
                        {project.tag}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/40">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        Interactive 3D Matrix
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#251f38] text-[#f4f2f8] hover:bg-[#322a4c] border border-white/10 transition-all flex items-center gap-1.5 shadow-sm hover:border-[#dfb098]/50"
                      >
                        <Github className="w-3.5 h-3.5 text-[#dfb098]" />
                        <span>Code</span>
                        <ExternalLink className="w-3 h-3 ml-0.5 text-[#9e97af]" />
                      </a>
                      <button
                        onClick={() => setSelectedProjectModal(project)}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#dfb098] hover:text-white hover:bg-white/10 border border-[#dfb098]/30 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>Case Study</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#f4f2f8] mb-4">
                    {project.title}
                  </h3>

                  {/* 3D Component Representable in Front of Every Project */}
                  <div className="mb-6 rounded-2xl overflow-hidden border border-[#dfb098]/30 shadow-2xl">
                    <Project3DStage
                      project={project}
                      heightClass="h-[280px] sm:h-[330px]"
                    />
                  </div>

                  {/* Official Tech Logo Badges */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((t) => (
                      <TechLogoBadge
                        key={t}
                        name={t}
                        size="sm"
                        isHighlighted={true}
                      />
                    ))}
                  </div>

                  {/* Architecture & Problem Snapshot */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0e0c18]/80 p-5 rounded-2xl border border-white/5 mb-5">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block mb-1.5">
                        Challenge
                      </span>
                      <p className="text-xs sm:text-sm text-[#c5bed5] leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#dfb098] block mb-1.5">
                        Architecture & Solution
                      </span>
                      <p className="text-xs sm:text-sm text-[#ece8f4] font-medium leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Key Metrics Chips */}
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="p-3 rounded-xl bg-[#1a172a] border border-white/5">
                          <div className="text-xs sm:text-sm font-bold text-[#dfb098]">
                            {m.value}
                          </div>
                          <div className="text-[11px] text-[#9e97af] font-medium mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* View Mode 2: Responsive Split View with Dedicated Project 3D Stages + Master Monolith Console */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Project Cards List */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-6">
              {filteredProjects.map((project) => {
                const isActive = activeProject.id === project.id;
                return (
                  <div
                    key={project.id}
                    id={`project-card-${project.id}`}
                    onMouseEnter={() => setActiveProjectId(project.id)}
                    onClick={() => setActiveProjectId(project.id)}
                    className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-[#dfb098] shadow-2xl ring-2 ring-[#dfb098]/30 bg-[#171426]/95 -translate-y-1'
                        : 'border-white/10 shadow-md hover:shadow-xl hover:border-white/20 bg-[#13111f]/80'
                    }`}
                  >
                    {/* Card Top Row */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#dfb098] bg-[#2a1e2a] px-3 py-0.5 rounded-full border border-[#dfb098]/30">
                          {project.tag}
                        </span>
                        {isActive && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                            <Zap className="w-2.5 h-2.5 fill-current text-amber-400" />
                            Laser Linked
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#8c849e] font-medium hidden sm:inline-block">
                        Hover to link in master 3D
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-2xl text-[#f4f2f8] mb-3">
                      {project.title}
                    </h3>

                    {/* 3D Component in Front of Every Project (Compact) */}
                    <div className="mb-4 rounded-xl overflow-hidden border border-[#dfb098]/30 shadow-inner">
                      <Project3DStage
                        project={project}
                        heightClass="h-[220px]"
                        isCompact={true}
                      />
                    </div>

                    {/* Official Tech Logo Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((t) => (
                        <TechLogoBadge
                          key={t}
                          name={t}
                          size="sm"
                          isHighlighted={isActive}
                        />
                      ))}
                    </div>

                    {/* Architecture & Problem Snapshot */}
                    <div className="space-y-3 bg-[#0e0c18]/80 p-4 rounded-2xl border border-white/5 mb-4">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                          Challenge
                        </span>
                        <p className="text-xs text-[#c5bed5] leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#dfb098] block mb-1">
                          Architecture & Implementation
                        </span>
                        <p className="text-xs text-[#ece8f4] font-medium leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    {/* Key Metrics Chips */}
                    {project.metrics && (
                      <div className="grid grid-cols-3 gap-2.5 mb-4 text-center">
                        {project.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="p-2.5 rounded-xl bg-[#1a172a] border border-white/5">
                            <div className="text-xs font-bold text-[#dfb098]">
                              {m.value}
                            </div>
                            <div className="text-[10px] text-[#9e97af] font-medium mt-0.5">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Footer Links & Deep Dive */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 rounded-full text-xs font-semibold bg-[#251f38] text-[#f4f2f8] hover:bg-[#322a4c] border border-white/10 transition-all flex items-center gap-1.5 shadow-sm hover:border-[#dfb098]/50"
                      >
                        <Github className="w-3.5 h-3.5 text-[#dfb098]" />
                        <span>Repository</span>
                        <ExternalLink className="w-3 h-3 ml-0.5 text-[#9e97af]" />
                      </a>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProjectModal(project);
                        }}
                        className="px-4 py-1.5 rounded-full text-xs font-semibold text-[#dfb098] hover:text-white hover:bg-white/10 border border-[#dfb098]/30 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>Full Case Study</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: 3D Holographic Tech Monolith Reactor (Docked & Sticky) */}
            <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-28">
              <div className="rounded-3xl border border-white/10 shadow-2xl p-4 sm:p-5 flex flex-col bg-[#141122]/90 backdrop-blur-2xl">
                
                {/* Top Monolith Banner */}
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#dfb098] animate-pulse" />
                    <span className="text-xs font-bold text-[#f4f2f8] uppercase tracking-wider">
                      Master Tech Monolith
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#dfb098] bg-[#261c2e] px-2.5 py-0.5 rounded-full border border-[#dfb098]/30 truncate max-w-[190px]">
                    {activeProject.title}
                  </span>
                </div>

                {/* 3D Canvas Box */}
                <div className="w-full h-[380px] sm:h-[440px] rounded-2xl overflow-hidden relative bg-gradient-to-b from-[#0e0c18] via-[#151224] to-[#0c0a14] border border-white/10 shadow-inner">
                  <TechStack3DOrbit
                    activeTechStack={activeProject.tech}
                    activeProjectName={activeProject.title}
                  />
                </div>

                {/* Bottom Quick Active Tech Row */}
                <div className="mt-3.5 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-[11px] text-[#9e97af] mb-2 font-medium">
                    <span>Front Row Transmitting:</span>
                    <span className="font-bold text-[#dfb098]">
                      {activeProject.tech.length} Technologies
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1d192e] text-[#e3ddf0] border border-white/10 shadow-2xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>

      {/* Project Deep Dive Modal */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[#161324] text-[#f4f2f8] rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/15 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#dfb098] uppercase tracking-wider">
                {selectedProjectModal.tag}
              </span>
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#f4f2f8] flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl text-[#f4f2f8] font-bold mb-3">
              {selectedProjectModal.title}
            </h3>

            {/* Modal Tech Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProjectModal.tech.map((t) => (
                <TechLogoBadge key={t} name={t} size="sm" isHighlighted={true} />
              ))}
            </div>

            <div className="space-y-4 text-sm text-[#c5bed5] mb-6">
              <div className="p-4 rounded-2xl bg-[#0f0d1a] border border-white/10">
                <span className="text-xs font-bold uppercase text-rose-400 block mb-1">
                  Problem Context
                </span>
                <p className="text-xs leading-relaxed text-[#c5bed5]">
                  {selectedProjectModal.problem}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#f4f2f8] mb-2.5">
                  Core Architecture & Key Features:
                </h4>
                <ul className="space-y-2.5 pl-1">
                  {selectedProjectModal.keyFeatures.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#dfb098] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#f4f2f8]">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <a
                href={selectedProjectModal.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#dfb098] text-[#12101c] hover:bg-[#ebd0bf] transition-colors flex items-center gap-2 shadow-lg"
              >
                <Github className="w-4 h-4" />
                <span>Open Source Repository</span>
              </a>
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="px-4 py-2 text-xs font-semibold text-[#9e97af] hover:text-[#f4f2f8] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
