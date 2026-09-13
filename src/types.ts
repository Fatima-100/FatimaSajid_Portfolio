export interface Project {
  id: string;
  title: string;
  tag: string;
  category: 'Full-Stack' | 'AI & Vision' | 'Internship' | 'Systems & DSA' | 'E-Commerce';
  tech: string[];
  githubUrl: string;
  liveUrl?: string;
  problem: string;
  solution: string;
  impactOrStatus: string;
  keyFeatures: string[];
  metrics?: { label: string; value: string }[];
}

export interface Certification {
  id: string;
  issuer: string;
  title: string;
  description: string;
  verifyUrl: string;
  topics: string[];
  date: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  details: string[];
  badge?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; highlight?: boolean }[];
}
