export interface AboutValueCard {
  id: string;
  title: string;
  description: string;
}

export interface Profile {
  name: string;
  englishName: string;
  title: string;
  mainSlogan: string;
  subSlogan: string;
  email: string;
  aboutText: string;
  aboutSubtitle?: string;
  aboutValues?: AboutValueCard[];
}

export interface StatCard {
  id: string;
  label: string;
  value: string;
  description: string;
}

export interface CareerItem {
  id: string;
  companyName: string;
  role: string;
  period: string;
  description: string;
  tasks: string[];
  results: string[];
  badge?: string;
  tasksTitle?: string;
  resultsTitle?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  companyName: string;
  period: string;
  problem: string;
  execution: string[];
  result: string[];
  note?: string;
  badge?: string;
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: { name: string; desc: string }[];
}

export interface StrengthItem {
  id: string;
  title: string;
  description: string;
}

export interface CredentialItem {
  id: string;
  type: 'education' | 'cert';
  title: string;
  subtitle: string;
  description?: string;
}

export interface ContactInfo {
  email: string;
  resumeUrl: string;
  portfolioUrl: string;
  closingMessage: string;
  disclaimer?: string;
  copyright?: string;
  badgeText?: string;
}

export interface HeroKpiItem {
  id: string;
  label: string;
  value: string;
  desc: string;
  icon: string;
}

export interface PortfolioData {
  profile: Profile;
  stats: StatCard[];
  career: CareerItem[];
  cases: CaseStudy[];
  skills: SkillCategory[];
  strengths: StrengthItem[];
  credentials: CredentialItem[];
  contact: ContactInfo;
  heroKpis?: HeroKpiItem[];
  skillsTitle?: string;
  strengthsTitle?: string;
}
