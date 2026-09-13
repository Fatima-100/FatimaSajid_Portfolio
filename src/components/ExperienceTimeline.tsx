import React from 'react';
import { Briefcase, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';
import { TIMELINE } from '../data';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1b172a] border border-[#dfb098]/30 text-xs font-semibold text-[#dfb098] mb-3.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#dfb098]" />
            <span>Trajectory & Milestones</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#f4f2f8] tracking-tight max-w-2xl mb-4">
            Experience & Education
          </h2>
          <p className="max-w-xl text-[#9e97af] text-sm sm:text-base">
            Hands-on software development in an active corporate team alongside consistent top-tier academic rigor.
          </p>
        </div>

        {/* Timeline Bento Grid */}
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {TIMELINE.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-[#141222]/85 border border-white/10 shadow-2xl hover:border-[#dfb098]/40 transition-all duration-300 relative group"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#dfb098]">
                  {item.period}
                </span>
                {item.badge && (
                  <span className="px-3 py-1 rounded-full bg-[#261e30] text-[#dfb098] border border-[#dfb098]/30 font-bold text-xs">
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3.5 mb-4">
                <div className="p-2.5 rounded-xl bg-[#1d192e] border border-white/10 shadow-md">
                  {item.role.includes('Intern') ? (
                    <Briefcase className="w-5 h-5 text-[#dfb098]" />
                  ) : (
                    <GraduationCap className="w-5 h-5 text-[#c9a0dc]" />
                  )}
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#f4f2f8]">
                    {item.role}
                  </h3>
                  <p className="text-sm font-medium text-[#c5bed5]">
                    {item.organization}
                  </p>
                </div>
              </div>

              <ul className="space-y-2.5 pt-3 border-t border-white/10">
                {item.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#b5adc9] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#dfb098] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
