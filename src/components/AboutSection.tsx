import React from 'react';
import { Sparkles, Server, Cpu, Compass, GitBranch, Camera, Eye } from 'lucide-react';
import { useAvatar } from '../context/AvatarContext';

export const AboutSection: React.FC = () => {
  const { avatarUrl, setIsUploadModalOpen } = useAvatar();

  const principles = [
    {
      icon: <Server className="w-5 h-5 text-[#dfb098]" />,
      title: 'Full-Stack Architecture',
      desc: 'React, Next.js, Node.js, Express, and Django — designing seamless client-to-server data contracts rather than stopping at the view layer.',
    },
    {
      icon: <Eye className="w-5 h-5 text-[#c9a0dc]" />,
      title: 'Computer Vision & Color Science',
      desc: 'Applying OpenCV, CIELAB color spaces, and machine learning segmentation to solve lighting-invariant undertone and wardrobe classification.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#dfb098]" />,
      title: 'Data Structures & Algorithms',
      desc: 'Hand-crafting AVL trees, heaps, and graph search routines (A*, BFS, DFS) in C++ to solve algorithmic bottlenecks with zero STL dependencies.',
    },
    {
      icon: <GitBranch className="w-5 h-5 text-[#c9a0dc]" />,
      title: 'Production Team Dynamics',
      desc: 'Fluent in Git branch hygiene, CI/CD reviews, zero-knowledge encryption constraints, and collaborative push notification pipelines.',
    },
  ];

  return (
    <section id="about" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1b172a] border border-[#dfb098]/30 text-xs font-semibold text-[#dfb098] mb-3.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#dfb098]" />
            <span>Background & Engineering Foundation</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#f4f2f8] tracking-tight max-w-2xl">
            From inquisitive beginnings to shipping production software.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Portrait & Credential Highlights */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm rounded-3xl p-3 bg-[#151224]/90 border border-[#dfb098]/40 shadow-2xl group">
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden relative bg-[#100e1a]">
                <img
                  src={avatarUrl}
                  alt="Fatima Sajid"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0914]/80 via-transparent to-transparent" />
                
                {/* Quick Upload Button on About Photo */}
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#1b172b]/90 hover:bg-[#282142] text-[#dfb098] border border-[#dfb098]/40 shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                  title="Upload / Change to your real photo"
                >
                  <Camera className="w-4 h-4" />
                </button>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#dfb098]">
                    Software Engineer
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#f4f2f8]">Fatima Sajid</h3>
                  <p className="text-xs text-[#c5bed5] font-mono mt-0.5">
                    COMSATS Lahore · CGPA 3.98
                  </p>
                </div>
              </div>

              {/* Verified Pill Floating */}
              <div className="mt-3 p-3 rounded-xl bg-[#1b172c] border border-white/10 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#f4f2f8]">Quantum Logics Intern</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 font-bold text-[11px]">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Principle Cards */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="prose text-[#b5adc9] text-base sm:text-lg leading-relaxed space-y-4 mb-8">
              <p>
                I began my journey into computer science with no formal background in programming. Facing my very first C++ and Object-Oriented Programming challenges, I dedicated countless late nights to mastering memory models, pointer arithmetic, and algorithmic trade-offs.
              </p>
              <p>
                Through relentless perseverance, I transformed that steep learning curve into an academic pinnacle—maintaining a <span className="font-bold text-[#dfb098]">3.98 / 4.00 CGPA</span> at COMSATS University Islamabad, Lahore Campus.
              </p>
              <p>
                Today, as a <span className="font-bold text-[#f4f2f8]">Web Development Intern at Quantum Logics</span>, I contribute directly to <span className="font-bold text-[#f4f2f8]">QuantumChat</span>—a real-time encrypted messaging application. In parallel, I engineered <span className="font-bold text-[#dfb098]">ChromaMatch AI</span> for lighting-invariant skin color harmony and am building the multi-tenant <span className="font-bold text-[#f4f2f8]">Trip-Share</span> travel platform.
              </p>
            </div>

            {/* Principles Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {principles.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#151224]/80 border border-white/10 hover:border-[#dfb098]/40 transition-all duration-300 group hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <div className="p-2 rounded-xl bg-[#1f1a33] border border-white/10 w-fit mb-3 group-hover:scale-110 transition-transform shadow-md">
                    {item.icon}
                  </div>
                  <h4 className="font-display font-semibold text-base text-[#f4f2f8] mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#9e97af] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
