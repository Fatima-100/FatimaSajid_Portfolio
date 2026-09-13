import { Project, Certification, ExperienceItem, SkillCategory } from './types';

export const PERSONAL_INFO = {
  name: 'Fatima Sajid',
  role: 'Software Engineer & Full-Stack Developer',
  university: 'COMSATS University Islamabad, Lahore Campus',
  degree: 'BS Software Engineering',
  cgpa: '3.98 / 4.00',
  currentRole: 'Web Development Intern @ Quantum Logics',
  email: 'hifamii100@gmail.com',
  github: 'https://github.com/Fatima-100',
  linkedin: 'https://linkedin.com/in/fatima-sajid',
  location: 'Lahore, Pakistan',
  status: 'Open to internships, junior roles & engineering collaborations',
};

export const PROJECTS: Project[] = [
  {
    id: 'chroma-match',
    title: 'ChromaMatch AI (Skin Undertone & Color Harmony Analyzer)',
    tag: 'Computer Vision & AI · Color Science Flagship',
    category: 'AI & Vision',
    tech: ['Python', 'OpenCV', 'React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'CIELAB Color Space'],
    githubUrl: 'https://github.com/Fatima-100/ChromaMatch-AI-Undertone-Analysis',
    problem:
      'Skin undertone and personal color matching are notoriously error-prone due to ambient lighting color casts, camera auto-exposure bias, and subjective visual guessing—leading to unflattering wardrobe, cosmetic, and styling palettes.',
    solution:
      'Engineered an intelligent computer vision application that isolates facial skin patches via automated landmark segmentation, converts pixel spectra into illumination-invariant CIELAB (L*a*b*) and HSV color spaces, and applies K-Means color clustering to determine exact undertones (Warm, Cool, Neutral, Olive). Automatically calculates Individual Typology Angles (ITA°) and generates seasonal 12-Tone harmonized wardrobe palettes with real-time contrast metrics.',
    impactOrStatus:
      'Achieved 96% undertone classification stability across variable ambient lighting conditions; delivers interactive palette generation, complementary color harmony vectors, and real-time contrast scoring.',
    keyFeatures: [
      'Automated facial landmark isolation segmenting cheek and forehead skin regions free of makeup and specular glares',
      'Device-independent CIELAB L*a*b* conversion and Individual Typology Angle (ITA) algorithmic undertone classification',
      'Seasonal color theory matching engine (Warm Autumn/Spring vs. Cool Winter/Summer)',
      'Interactive wardrobe color harmony tester calculating dynamic contrast ratios and complementary pairings',
    ],
    metrics: [
      { label: 'Color Space', value: 'CIELAB & HSV' },
      { label: 'Detection Speed', value: '<120ms Pipeline' },
      { label: 'Lighting Invariance', value: '96% Consistent' },
    ],
  },
  {
    id: 'trip-share',
    title: 'Trip-Share Platform',
    tag: 'Solo Flagship · In Active Development',
    category: 'Full-Stack',
    tech: ['Next.js 14', 'Node.js', 'Express', 'MySQL', 'JWT', 'REST APIs'],
    githubUrl: 'https://github.com/Fatima-100',
    problem:
      'Planning group expeditions forces users to juggle rides, hotel reservations, and split expenses across disjointed chat groups and payment apps with zero single-source sync.',
    solution:
      'Engineered an all-in-one travel marketplace where traveling cohorts create unified itineraries, get automatically matched with verified commercial drivers, reserve budget-tiered hotels, and execute real-time fractional split payments.',
    impactOrStatus:
      'Architected solo from system design to database normalization. Built production-ready rather than a scaled-down university demo.',
    keyFeatures: [
      'Multi-tenant group trip planner with synchronized itinerary boards',
      'Driver matchmaking algorithm matching vehicle capacity with group sizes',
      'Tiered hotel inventory engine with date-range reservation locks',
      'Automated expense-splitting calculator dividing fare and lodging',
    ],
    metrics: [
      { label: 'Architecture', value: 'Decoupled REST' },
      { label: 'Relational Schema', value: '3NF Normalized' },
      { label: 'Scope', value: 'Full Marketplace' },
    ],
  },
  {
    id: 'quantum-chat',
    title: 'QuantumChat',
    tag: 'Internship Production · Quantum Logics',
    category: 'Internship',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'FCM'],
    githubUrl: 'https://github.com/Fatima-100',
    problem:
      'Live commercial messaging platforms require robust zero-knowledge confidentiality, real-time push synchronization across devices, and instant UI state responsiveness under latency.',
    solution:
      'Actively engineer frontend and backend capabilities for a live encrypted chat application: implemented encrypted vault mechanisms, background FCM push notifications, responsive conversation streams, and performance fixes.',
    impactOrStatus:
      'Contributing directly within an active enterprise codebase under senior code review and Git/GitHub CI/CD collaboration workflows.',
    keyFeatures: [
      'End-to-end encrypted messaging streams with WebSocket real-time delivery',
      'Firebase Cloud Messaging (FCM) push notification infrastructure',
      'Client-side secure vault protection for sensitive conversation logs',
      'Optimistic UI state updates and media caching for low-bandwidth scenarios',
    ],
    metrics: [
      { label: 'Work Environment', value: 'Production Codebase' },
      { label: 'Latency', value: '<50ms Delivery' },
      { label: 'Platform', value: 'Web & PWA' },
    ],
  },
  {
    id: 'trapscape',
    title: 'TrapScape (SFML 3 Maze Engine)',
    tag: 'Systems Engineering · CSC-211 DSA Flagship',
    category: 'Systems & DSA',
    tech: ['C++20', 'SFML 3', 'Custom DSA', 'Graph Algorithms'],
    githubUrl: 'https://github.com/Fatima-100/Trapscape-DSA-Project',
    problem:
      'Academic algorithms coursework often remains abstract theory without stressing performance or memory-safety under continuous 60 FPS graphical rendering constraints.',
    solution:
      'Built a high-performance C++ maze exploration game integrating 10 handcrafted data structures: custom closed-addressing hash table authentication, min/max-heap matchmaking and leaderboards, self-balancing AVL-tree tier progression, and dynamic BFS/DFS/A* graph pathfinding.',
    impactOrStatus:
      'Awarded top project honors in Data Structures & Algorithms. Zero external STL shortcuts for internal algorithm components.',
    keyFeatures: [
      '10 custom hand-written data structures (AVL Trees, Heaps, Hash Tables, Queues)',
      'Real-time A*, Dijkstra, BFS, and DFS maze-solving pathfinders',
      'SFML 3 hardware-accelerated 2D rendering loop with frame-rate smoothing',
      'Persistent high-score indexing through binary tree serialization',
    ],
    metrics: [
      { label: 'Custom Structures', value: '10 Implemented' },
      { label: 'Language', value: 'Modern C++20' },
      { label: 'Frame Rate', value: 'Rock-solid 60 FPS' },
    ],
  },
  {
    id: 'nexmart',
    title: 'NexMart E-Commerce Platform',
    tag: 'Python & Django Architecture',
    category: 'E-Commerce',
    tech: ['Django', 'Python 3', 'PostgreSQL', 'TailwindCSS', 'Stripe API'],
    githubUrl: 'https://github.com/Fatima-100',
    problem:
      'Reliable web commerce demands resilient order transaction states, stock atomicity, and safe tokenized checkout handling.',
    solution:
      'Designed a multi-category Django digital marketplace with relational inventory models, session-backed shopping carts, atomic checkout orders, and administrative product dashboards.',
    impactOrStatus:
      'Demonstrated back-end mastery across the entire Django MTV paradigm, database ORM query optimization, and REST endpoint design.',
    keyFeatures: [
      'Django ORM with atomic database transactions preventing overselling',
      'Session-persistent cart state and tokenized secure checkout flow',
      'Role-based permission gating for customers and store merchants',
      'Server-side rendered templates optimized with lightweight CSS',
    ],
    metrics: [
      { label: 'Framework', value: 'Django 5' },
      { label: 'Database', value: 'Relational Models' },
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'meta-backend',
    issuer: 'Meta via Coursera',
    title: 'Meta Back-End Developer Professional Certificate',
    description:
      'Rigorous 9-course specialization covering Python programming, Linux commands, Git version control, relational databases (MySQL), Django web framework, RESTful APIs, and cloud back-end capstone deployment.',
    verifyUrl: 'https://coursera.org/verify/professional-cert/1TQO830LSVJF',
    topics: ['Python', 'Django', 'APIs & REST', 'MySQL', 'Git / GitHub', 'System Design'],
    date: 'Completed 2025/2026',
  },
  {
    id: 'bano-qabil-python',
    issuer: 'Bano Qabil Training Initiative',
    title: 'Python Programming Specialization',
    description:
      'Hands-on immersion in Python core syntax, data structures, modular package architecture, algorithm efficiency, and backend scripting.',
    verifyUrl: 'https://github.com/Fatima-100',
    topics: ['Core Python', 'OOP', 'Data Structures', 'Scripting'],
    date: 'Certified',
  },
];

export const TIMELINE: ExperienceItem[] = [
  {
    period: '2025 — Present',
    role: 'Web Development Intern',
    organization: 'Quantum Logics (QuantumChat Product)',
    badge: 'Active Internship',
    details: [
      'Engineered core messaging UI features, encrypted vault storage logic, and media sharing workflows for the live QuantumChat product.',
      'Configured Firebase Cloud Messaging (FCM) background workers to guarantee persistent cross-device notification dispatch.',
      'Diagnosed and resolved critical client-server WebSocket synchronization issues, reducing message delivery latency.',
      'Collaborated within an agile team adhering to strict PR reviews, issue ticketing, and Git branch governance.',
    ],
  },
  {
    period: '2023 — Present',
    role: 'BS in Software Engineering',
    organization: 'COMSATS University Islamabad, Lahore Campus',
    badge: 'CGPA: 3.98 / 4.00',
    details: [
      'Maintained near-perfect 3.98 academic standing across rigorous software engineering coursework.',
      'Coursework mastery in Data Structures & Algorithms, Object-Oriented Programming, Database Systems, Software Design & Architecture, and Operating Systems.',
      'Led university project teams, mentoring peers in modern web frameworks and version control fundamentals.',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend & UI',
    skills: [
      { name: 'React', level: 95, highlight: true },
      { name: 'Next.js', level: 90, highlight: true },
      { name: 'TypeScript', level: 90, highlight: true },
      { name: 'Tailwind CSS', level: 95, highlight: true },
      { name: 'HTML5 & Modern CSS', level: 98 },
      { name: 'Motion / Animations', level: 85 },
      { name: 'WebGL / Three.js Basics', level: 80 },
    ],
  },
  {
    title: 'Backend & APIs',
    skills: [
      { name: 'Node.js & Express', level: 92, highlight: true },
      { name: 'Django & Python', level: 90, highlight: true },
      { name: 'FastAPI & REST', level: 86, highlight: true },
      { name: 'WebSockets / Socket.io', level: 85 },
      { name: 'FCM Push Services', level: 82 },
      { name: 'Authentication & JWT', level: 90 },
    ],
  },
  {
    title: 'AI, Vision & Systems',
    skills: [
      { name: 'OpenCV & Vision', level: 88, highlight: true },
      { name: 'Color Spaces (CIELAB/HSV)', level: 90, highlight: true },
      { name: 'MongoDB', level: 88, highlight: true },
      { name: 'MySQL & PostgreSQL', level: 90, highlight: true },
      { name: 'C++ & SFML', level: 85 },
      { name: 'Data Structures & Algorithms', level: 96, highlight: true },
      { name: 'Git & GitHub Workflows', level: 95, highlight: true },
    ],
  },
];
