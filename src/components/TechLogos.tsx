import React from 'react';

export interface TechItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'systems' | 'tools';
  color: string;
  bgLight: string;
}

export const TECH_CATALOG: Record<string, { name: string; color: string; bg: string; icon: React.ReactNode }> = {
  'React': {
    name: 'React',
    color: '#087ea4',
    bg: '#e6f7ff',
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-full h-full fill-current">
        <circle cx="0" cy="0" r="2.05" fill="#087ea4" />
        <g stroke="#087ea4" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  'Next.js 14': {
    name: 'Next.js',
    color: '#000000',
    bg: '#f3f4f6',
    icon: (
      <svg viewBox="0 0 180 180" className="w-full h-full fill-current">
        <mask height="180" id="mask0" maskUnits="userSpaceOnUse" width="180" x="0" y="0">
          <circle cx="90" cy="90" fill="#000" r="90" />
        </mask>
        <g mask="url(#mask0)">
          <circle cx="90" cy="90" fill="#000" r="90" />
          <path d="M149.508 157.438L69.147 54H54V125.979H66.979V70.6125L139.73 164.912C143.149 162.64 146.42 160.136 149.508 157.438Z" fill="#fff" />
          <rect fill="#fff" height="72" width="13" x="115" y="54" />
        </g>
      </svg>
    ),
  },
  'Next.js': {
    name: 'Next.js',
    color: '#000000',
    bg: '#f3f4f6',
    icon: (
      <svg viewBox="0 0 180 180" className="w-full h-full fill-current">
        <circle cx="90" cy="90" fill="#111" r="90" />
        <path d="M149.5 157.4L69.1 54H54v72h13V70.6l72.7 94.3c3.4-2.3 6.7-4.8 9.8-7.5z" fill="#fff" />
        <rect fill="#fff" height="72" width="13" x="115" y="54" />
      </svg>
    ),
  },
  'TypeScript': {
    name: 'TypeScript',
    color: '#3178c6',
    bg: '#e8f1fa',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect width="128" height="128" rx="20" fill="#3178c6" />
        <path d="M64 40v12H52v48h-14V52H26V40h38zm44 14c-4-3-10-5-17-5-8 0-14 3-14 9 0 5 4 8 13 11 13 4 18 10 18 18 0 13-10 21-26 21-8 0-16-2-22-6l4-11c5 4 12 6 18 6 8 0 12-3 12-8 0-6-5-8-14-11-13-4-17-10-17-18 0-12 10-20 24-20 7 0 14 2 19 5l-5 10z" fill="#ffffff" />
      </svg>
    ),
  },
  'Node.js': {
    name: 'Node.js',
    color: '#539e43',
    bg: '#edf7eb',
    icon: (
      <svg viewBox="0 0 32 32" className="w-full h-full fill-current">
        <path d="M16 2.5L3.5 9.7v14.6L16 31.5l12.5-7.2V9.7L16 2.5z" fill="#539e43" />
        <path d="M16 5.8l9.6 5.5v11.4L16 28.2l-9.6-5.5V11.3L16 5.8z" fill="#3c873a" />
        <path d="M15.4 11.2c-2.3 0-3.9 1.4-3.9 3.5 0 3.3 4.4 2.9 4.4 4.5 0 .6-.5 1-1.4 1-1.3 0-2.6-.7-3.4-1.6l-1.3 1.9c1.2 1.3 3 2.1 4.7 2.1 2.5 0 4.2-1.4 4.2-3.7 0-3.4-4.4-3.1-4.4-4.6 0-.6.5-.9 1.3-.9 1.1 0 2.2.5 2.9 1.2l1.2-1.8c-1-.9-2.5-1.6-4.2-1.6z" fill="#ffffff" />
      </svg>
    ),
  },
  'Express': {
    name: 'Express',
    color: '#333333',
    bg: '#f1f1f1',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect width="128" height="128" rx="20" fill="#222" />
        <text x="64" y="78" fill="#fff" fontSize="38" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
          ex
        </text>
      </svg>
    ),
  },
  'C++20': {
    name: 'C++20',
    color: '#00599c',
    bg: '#e6f0fa',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect width="128" height="128" rx="20" fill="#00599c" />
        <text x="36" y="80" fill="#fff" fontSize="52" fontWeight="800" fontFamily="sans-serif">C</text>
        <text x="76" y="60" fill="#659ad2" fontSize="32" fontWeight="bold" fontFamily="sans-serif">++</text>
      </svg>
    ),
  },
  'C++': {
    name: 'C++',
    color: '#00599c',
    bg: '#e6f0fa',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect width="128" height="128" rx="20" fill="#00599c" />
        <text x="36" y="80" fill="#fff" fontSize="52" fontWeight="800" fontFamily="sans-serif">C</text>
        <text x="76" y="60" fill="#659ad2" fontSize="32" fontWeight="bold" fontFamily="sans-serif">++</text>
      </svg>
    ),
  },
  'Python': {
    name: 'Python',
    color: '#3776ab',
    bg: '#e8f2f9',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <path d="M63.7 13c-27 0-25.3 11.7-25.3 11.7l.1 12.1h25.7v3.7H29.5S13 38.6 13 65.6c0 26.9 14.4 26 14.4 26h8.6v-12.1s-.5-14.4 14.2-14.4h24.5s13.7.2 13.7-13.4V26.4S90.7 13 63.7 13zm-13.9 8.2a4.3 4.3 0 1 1 0 8.6 4.3 4.3 0 0 1 0-8.6z" fill="#3776ab" />
        <path d="M64.3 115c27 0 25.3-11.7 25.3-11.7l-.1-12.1H63.8v-3.7h34.7s16.5 1.9 16.5-25.1c0-26.9-14.4-26-14.4-26H92v12.1s.5 14.4-14.2 14.4H53.3S39.6 62.7 39.6 76.3v25.3s-2.3 13.4 24.7 13.4zm13.9-8.2a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6z" fill="#ffd43b" />
      </svg>
    ),
  },
  'Python 3': {
    name: 'Python 3',
    color: '#3776ab',
    bg: '#e8f2f9',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <path d="M63.7 13c-27 0-25.3 11.7-25.3 11.7l.1 12.1h25.7v3.7H29.5S13 38.6 13 65.6c0 26.9 14.4 26 14.4 26h8.6v-12.1s-.5-14.4 14.2-14.4h24.5s13.7.2 13.7-13.4V26.4S90.7 13 63.7 13zm-13.9 8.2a4.3 4.3 0 1 1 0 8.6 4.3 4.3 0 0 1 0-8.6z" fill="#3776ab" />
        <path d="M64.3 115c27 0 25.3-11.7 25.3-11.7l-.1-12.1H63.8v-3.7h34.7s16.5 1.9 16.5-25.1c0-26.9-14.4-26-14.4-26H92v12.1s.5 14.4-14.2 14.4H53.3S39.6 62.7 39.6 76.3v25.3s-2.3 13.4 24.7 13.4zm13.9-8.2a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6z" fill="#ffd43b" />
      </svg>
    ),
  },
  'Django': {
    name: 'Django',
    color: '#092e20',
    bg: '#e8f0ec',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect width="128" height="128" rx="20" fill="#092e20" />
        <path d="M62.6 30h14.8v43.4c0 14-6.4 20.3-18.7 20.3-4.8 0-8.8-.7-11.6-1.8l2.9-12.3c2.1.8 4.7 1.3 7.7 1.3 5.4 0 7.8-2.6 7.8-9.1V30h-2.9zm-29.3 22.8h14.8v40.4H33.3V52.8z" fill="#44b78b" />
      </svg>
    ),
  },
  'MySQL': {
    name: 'MySQL',
    color: '#00758f',
    bg: '#e6f3f6',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect width="128" height="128" rx="20" fill="#00758f" />
        <path d="M64 34c-16 0-28 10-28 26s12 28 28 28 28-12 28-28c0-15-11-26-28-26zm0 46c-10 0-18-8-18-18s8-18 18-18 18 8 18 18-8 18-18 18z" fill="#f29111" />
        <circle cx="64" cy="62" r="8" fill="#ffffff" />
      </svg>
    ),
  },
  'MongoDB': {
    name: 'MongoDB',
    color: '#13aa52',
    bg: '#e7f7ee',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <path d="M64 12c-2 0-3.6 1.4-4.2 3.3C52.7 41.5 35 63 35 83.5c0 18.2 12.5 32.5 29 32.5s29-14.3 29-32.5c0-20.5-17.7-42-24.8-68.2-.6-1.9-2.2-3.3-4.2-3.3z" fill="#13aa52" />
        <path d="M64 16v97c14.2-.6 25-13.8 25-29.5 0-19-15.5-39.6-25-67.5z" fill="#116149" />
      </svg>
    ),
  },
  'PostgreSQL': {
    name: 'PostgreSQL',
    color: '#336791',
    bg: '#eaf0f5',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect width="128" height="128" rx="20" fill="#336791" />
        <path d="M64 28c-18 0-30 14-30 32 0 14 7 24 18 29v-9c-7-4-11-11-11-20 0-12 9-22 23-22s23 10 23 22c0 9-4 16-11 20v9c11-5 18-15 18-29 0-18-12-32-30-32z" fill="#ffffff" />
        <circle cx="64" cy="60" r="10" fill="#ffffff" />
      </svg>
    ),
  },
  'Socket.io': {
    name: 'Socket.io',
    color: '#010101',
    bg: '#f3f4f6',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect width="128" height="128" rx="20" fill="#010101" />
        <path d="M64 28c-19.9 0-36 16.1-36 36s16.1 36 36 36 36-16.1 36-36-16.1-36-36-36zm14.5 48.2l-18.7 11.2c-2.4 1.4-5.3-.6-5.3-3.4V60.6c0-2.8 2.9-4.8 5.3-3.4l18.7 11.2c2.2 1.3 2.2 4.5 0 5.8z" fill="#ffffff" />
      </svg>
    ),
  },
  'OpenCV': {
    name: 'OpenCV',
    color: '#00ff00',
    bg: '#142918',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <circle cx="64" cy="40" r="24" fill="#ff0000" />
        <circle cx="40" cy="88" r="24" fill="#00ff00" />
        <circle cx="88" cy="88" r="24" fill="#0000ff" />
        <circle cx="64" cy="40" r="12" fill="#151320" />
        <circle cx="40" cy="88" r="12" fill="#151320" />
        <circle cx="88" cy="88" r="12" fill="#151320" />
      </svg>
    ),
  },
  'FastAPI': {
    name: 'FastAPI',
    color: '#059669',
    bg: '#064e3b',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect width="128" height="128" rx="24" fill="#059669" />
        <path d="M72 16L32 72h28l-4 40 40-56H68l4-40z" fill="#ffffff" />
      </svg>
    ),
  },
  'CIELAB Color Space': {
    name: 'CIELAB / Color Theory',
    color: '#e69d72',
    bg: '#3d251e',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <defs>
          <linearGradient id="cielabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <circle cx="64" cy="64" r="54" fill="url(#cielabGrad)" />
        <circle cx="64" cy="64" r="22" fill="#14121e" />
        <circle cx="64" cy="64" r="10" fill="#dfb098" />
      </svg>
    ),
  },
  'Tailwind CSS': {
    name: 'Tailwind CSS',
    color: '#06b6d4',
    bg: '#e6f9fc',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <path d="M36 44c4.8-9.6 12-14.4 21.6-14.4 14.4 0 20.4 10.8 26.4 15.6 4 3.2 8.4 4.8 14.4 4.8 7.2 0 13.2-3.6 18-10.8-4.8 9.6-12 14.4-21.6 14.4-14.4 0-20.4-10.8-26.4-15.6-4-3.2-8.4-4.8-14.4-4.8-7.2 0-13.2 3.6-18 10.8zm-24 36c4.8-9.6 12-14.4 21.6-14.4 14.4 0 20.4 10.8 26.4 15.6 4 3.2 8.4 4.8 14.4 4.8 7.2 0 13.2-3.6 18-10.8-4.8 9.6-12 14.4-21.6 14.4-14.4 0-20.4-10.8-26.4-15.6-4-3.2-8.4-4.8-14.4-4.8-7.2 0-13.2 3.6-18 10.8z" fill="#06b6d4" />
      </svg>
    ),
  },
  'TailwindCSS': {
    name: 'Tailwind CSS',
    color: '#06b6d4',
    bg: '#e6f9fc',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <path d="M36 44c4.8-9.6 12-14.4 21.6-14.4 14.4 0 20.4 10.8 26.4 15.6 4 3.2 8.4 4.8 14.4 4.8 7.2 0 13.2-3.6 18-10.8-4.8 9.6-12 14.4-21.6 14.4-14.4 0-20.4-10.8-26.4-15.6-4-3.2-8.4-4.8-14.4-4.8-7.2 0-13.2 3.6-18 10.8zm-24 36c4.8-9.6 12-14.4 21.6-14.4 14.4 0 20.4 10.8 26.4 15.6 4 3.2 8.4 4.8 14.4 4.8 7.2 0 13.2-3.6 18-10.8-4.8 9.6-12 14.4-21.6 14.4-14.4 0-20.4-10.8-26.4-15.6-4-3.2-8.4-4.8-14.4-4.8-7.2 0-13.2 3.6-18 10.8z" fill="#06b6d4" />
      </svg>
    ),
  },
  'Git': {
    name: 'Git',
    color: '#f05032',
    bg: '#feeeeb',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <path d="M123.6 57.2L70.8 4.4c-4-4-10.4-4-14.4 0L44.8 16l18.2 18.2c4.3-1.4 9.2-.5 12.7 2.9 3.6 3.6 4.4 8.7 2.8 13l17.4 17.4c4.3-1.6 9.4-.8 13 2.8 5.6 5.6 5.6 14.7 0 20.4-5.6 5.6-14.7 5.6-20.4 0-3.9-3.9-4.6-9.6-2.3-14.2L68 59.1v27.2c1.8 1 3.4 2.4 4.6 4.2 4.1 6.1 2.5 14.4-3.6 18.5-6.1 4.1-14.4 2.5-18.5-3.6-4.1-6.1-2.5-14.4 3.6-18.5 2.2-1.5 4.8-2.3 7.5-2.4V57.8c-2.7-.2-5.3-1.3-7.3-3.3-3.8-3.8-4.5-9.4-2.3-13.9L33.7 22.3 4.4 51.6c-4 4-4 10.4 0 14.4l52.8 52.8c4 4 10.4 4 14.4 0l52-52c4-4 4-10.4 0-14.4z" fill="#f05032" />
      </svg>
    ),
  },
  'Linux': {
    name: 'Linux',
    color: '#f5a623',
    bg: '#fef6e9',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <circle cx="64" cy="64" r="54" fill="#222" />
        <circle cx="48" cy="48" r="8" fill="#fff" />
        <circle cx="80" cy="48" r="8" fill="#fff" />
        <circle cx="48" cy="50" r="4" fill="#000" />
        <circle cx="80" cy="50" r="4" fill="#000" />
        <ellipse cx="64" cy="64" rx="16" ry="10" fill="#f5a623" />
        <ellipse cx="64" cy="92" rx="30" ry="14" fill="#fff" />
      </svg>
    ),
  },
  'SFML 3': {
    name: 'SFML',
    color: '#8cc445',
    bg: '#f3fae8',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect width="128" height="128" rx="20" fill="#2e3842" />
        <text x="64" y="78" fill="#8cc445" fontSize="36" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
          SFML
        </text>
      </svg>
    ),
  },
  'Custom DSA': {
    name: 'Algorithms & DSA',
    color: '#845bb0',
    bg: '#f4effa',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect width="128" height="128" rx="20" fill="#845bb0" />
        <circle cx="64" cy="36" r="12" fill="#fff" />
        <circle cx="36" cy="92" r="12" fill="#fff" />
        <circle cx="92" cy="92" r="12" fill="#fff" />
        <line x1="64" y1="36" x2="36" y2="92" stroke="#fff" strokeWidth="6" />
        <line x1="64" y1="36" x2="92" y2="92" stroke="#fff" strokeWidth="6" />
      </svg>
    ),
  },
  'Graph Algorithms': {
    name: 'Graph A*',
    color: '#f5a9c0',
    bg: '#fdf0f4',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect width="128" height="128" rx="20" fill="#d8527a" />
        <circle cx="40" cy="40" r="10" fill="#fff" />
        <circle cx="88" cy="40" r="10" fill="#fff" />
        <circle cx="64" cy="88" r="10" fill="#fff" />
        <line x1="40" y1="40" x2="88" y2="40" stroke="#fff" strokeWidth="5" />
        <line x1="40" y1="40" x2="64" y2="88" stroke="#fff" strokeWidth="5" />
        <line x1="88" y1="40" x2="64" y2="88" stroke="#fff" strokeWidth="5" />
      </svg>
    ),
  },
  'JWT': {
    name: 'JWT Auth',
    color: '#d63aff',
    bg: '#faebff',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect width="128" height="128" rx="20" fill="#201f2d" />
        <text x="64" y="78" fill="#d63aff" fontSize="34" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
          JWT
        </text>
      </svg>
    ),
  },
  'REST APIs': {
    name: 'REST APIs',
    color: '#ff6c37',
    bg: '#fff1ec',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect width="128" height="128" rx="20" fill="#ff6c37" />
        <text x="64" y="78" fill="#fff" fontSize="30" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          REST
        </text>
      </svg>
    ),
  },
  'FCM': {
    name: 'Firebase FCM',
    color: '#ffca28',
    bg: '#fffbeb',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect width="128" height="128" rx="20" fill="#039be5" />
        <path d="M38 98L64 28l26 70-26-15z" fill="#ffca28" />
        <path d="M64 83l-26 15 16-52z" fill="#ffa000" />
      </svg>
    ),
  },
  'Stripe API': {
    name: 'Stripe API',
    color: '#635bff',
    bg: '#eeedff',
    icon: (
      <svg viewBox="0 0 128 128" className="w-full h-full">
        <rect width="128" height="128" rx="20" fill="#635bff" />
        <text x="64" y="86" fill="#fff" fontSize="64" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          S
        </text>
      </svg>
    ),
  },
};

export const getTechDetails = (techName: string) => {
  if (TECH_CATALOG[techName]) {
    return TECH_CATALOG[techName];
  }
  // Fallback generic tag
  return {
    name: techName,
    color: '#7c6a8f',
    bg: '#f4f0f7',
    icon: (
      <div className="w-full h-full rounded-md bg-[#b98fde]/20 flex items-center justify-center font-bold text-[10px] text-[#594270]">
        {techName.slice(0, 2).toUpperCase()}
      </div>
    ),
  };
};

export const TechLogoBadge: React.FC<{
  name: string;
  size?: 'sm' | 'md' | 'lg';
  isHighlighted?: boolean;
  showName?: boolean;
}> = ({ name, size = 'sm', isHighlighted = false, showName = true }) => {
  const details = getTechDetails(name);

  const sizeClasses = {
    sm: 'h-7 px-2.5 text-[11px] gap-1.5',
    md: 'h-9 px-3 text-xs gap-2',
    lg: 'h-11 px-4 text-sm gap-2.5',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div
      className={`inline-flex items-center rounded-full font-medium transition-all duration-300 ${sizeClasses[size]} ${
        isHighlighted
          ? 'bg-[#1e1a2f] border border-[#dfb098] shadow-lg text-[#f4f2f8] ring-2 ring-[#dfb098]/30 scale-105'
          : 'bg-[#161424]/80 hover:bg-[#1f1c30] border border-white/10 text-[#d0cae2] shadow-2xs hover:border-white/20'
      }`}
      style={{
        boxShadow: isHighlighted ? `0 4px 20px -2px ${details.color}45, 0 0 12px rgba(223,176,152,0.2)` : undefined,
      }}
    >
      <div className={`${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        {details.icon}
      </div>
      {showName && <span className="font-semibold">{details.name}</span>}
    </div>
  );
};
