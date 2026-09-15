import React from 'react';
import { ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS } from '../data';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-14 sm:py-16 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1b172a] border border-[#dfb098]/30 text-xs font-semibold text-[#dfb098] mb-3.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#dfb098]" />
            <span>Verified Industry Credentials</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#f4f2f8] tracking-tight max-w-2xl mb-4">
            Professional Certifications
          </h2>
          <p className="max-w-xl text-[#9e97af] text-sm sm:text-base">
            Credentialed specializations demonstrating verified competency in Python, Django, APIs, MySQL, and back-end engineering.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#141222]/85 border border-white/10 shadow-2xl hover:border-[#dfb098]/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#dfb098] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    {cert.issuer}
                  </span>
                  <span className="text-[11px] font-code text-[#c5bed5] px-2.5 py-0.5 rounded-full bg-[#1e1930] border border-white/10">
                    {cert.date}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-[#f4f2f8] mb-3">
                  {cert.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#b5adc9] leading-relaxed mb-6">
                  {cert.description}
                </p>

                {/* Topic tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#1e1a33] border border-white/10 text-[#dfb098]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#dfb098] hover:text-[#f4f2f8] transition-colors"
                >
                  <span>Verify Credential on Coursera</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 text-[11px] font-bold border border-emerald-500/40">
                  Verified ✓
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
