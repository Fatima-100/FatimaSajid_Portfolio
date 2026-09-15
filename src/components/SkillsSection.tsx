import React from 'react';
import { Sparkles } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data';
import { TechLogoBadge } from './TechLogos';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-14 sm:py-16 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1b172a] border border-[#dfb098]/30 text-xs font-semibold text-[#dfb098] mb-3.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#dfb098]" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#f4f2f8] tracking-tight max-w-2xl mb-4">
            Modern Stack & Core Competencies
          </h2>
          <p className="max-w-lg text-[#9e97af] text-sm sm:text-base">
            Verified proficiencies across modern full-stack web frameworks, computer vision algorithms, and systems programming in C++.
          </p>
        </div>

        {/* Categories Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-[#141222]/85 border border-white/10 shadow-2xl hover:border-[#dfb098]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display font-bold text-xl text-[#f4f2f8]">
                    {cat.title}
                  </h3>
                  <span className="text-xs font-code text-[#dfb098] font-bold bg-[#241c2c] px-2.5 py-0.5 rounded-full border border-[#dfb098]/30">
                    {cat.skills.length} Techs
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#d5cee3] flex items-center gap-1.5">
                          {skill.highlight && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#dfb098]" />
                          )}
                          {skill.name}
                        </span>
                        <span className="text-[11px] text-[#dfb098] font-code">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#0c0a15] overflow-hidden border border-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#dfb098] via-[#e8cbb9] to-[#c9a0dc]"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tag Cloud with Authentic Badges */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                {cat.skills.map((s) => (
                  <TechLogoBadge
                    key={s.name}
                    name={s.name}
                    size="sm"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
