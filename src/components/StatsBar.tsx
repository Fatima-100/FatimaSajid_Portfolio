import React from 'react';
import { Award, GraduationCap, Briefcase, Layers } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const stats = [
    {
      icon: <GraduationCap className="w-5 h-5 text-[#dfb098]" />,
      value: '3.98',
      label: 'CGPA / 4.00',
      subtext: 'COMSATS Lahore Top Academic Standing',
    },
    {
      icon: <Briefcase className="w-5 h-5 text-[#c9a0dc]" />,
      value: '1',
      label: 'Production Internship',
      subtext: 'QuantumChat Encrypted Messaging',
    },
    {
      icon: <Layers className="w-5 h-5 text-[#dfb098]" />,
      value: '4',
      label: 'Flagship Systems',
      subtext: 'ChromaMatch AI, Trip-Share & QuantumChat',
    },
    {
      icon: <Award className="w-5 h-5 text-[#c9a0dc]" />,
      value: '9',
      label: 'Meta Certifications',
      subtext: 'Coursera Back-End Specialization',
    },
  ];

  return (
    <section id="stats" className="py-8 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-[#141222]/85 border border-white/10 shadow-2xl backdrop-blur-xl">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 group"
            >
              <div className="p-2.5 rounded-xl bg-[#1d192e] border border-[#dfb098]/30 shadow-md mb-3 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <span className="font-display font-bold text-3xl sm:text-4xl text-[#dfb098] tracking-tight mb-1">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#f4f2f8] mb-1">
                {stat.label}
              </span>
              <span className="text-[11px] text-[#9e97af] hidden sm:block">
                {stat.subtext}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
