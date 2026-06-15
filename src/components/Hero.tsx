import React from "react";
import { motion } from "motion/react";
import { Profile, HeroKpiItem } from "../types";
import { 
  ArrowRight, ChevronDown, Milestone, ShieldCheck, Network, Landmark, 
  Award, Briefcase, Users, TrendingUp, Calendar, Heart, Globe, BookOpen 
} from "lucide-react";

interface HeroProps {
  profile: Profile;
  heroKpis?: HeroKpiItem[];
}

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Milestone,
  ShieldCheck,
  Network,
  Landmark,
  Award,
  Briefcase,
  Users,
  TrendingUp,
  Calendar,
  Heart,
  Globe,
  BookOpen
};

export default function Hero({ profile, heroKpis }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  const activeKpis = heroKpis && heroKpis.length > 0 ? heroKpis : [
    { id: "hk-1", label: "Career", value: "총 경력 7년+", desc: "중견기업 & 스타트업", icon: "Milestone" },
    { id: "hk-2", label: "Role", value: "HR & Corporate Operations", desc: "인사총무팀 주임 및 스타트업 리드", icon: "ShieldCheck" },
    { id: "hk-3", label: "Strength", value: "기준 수립 · 운영 안정화", desc: "사규 구축, 노무 리스크 제어", icon: "Network" },
    { id: "hk-4", label: "Scope", value: "HR · GA · ER · Finance", desc: "인사·총무부터 회계·세무 지원까지", icon: "Landmark" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 20 } }
  };

  // Helper to highlight English terms or key words like 'HR' or 'HR Ops'
  const renderHighlightedTitle = (text: string) => {
    const parts = text.split(/(HR|HR Ops|Corporate Operations|HR Generalist)/gi);
    return parts.map((part, index) => {
      if (/(HR|HR Ops|Corporate Operations|HR Generalist)/i.test(part)) {
        return (
          <span key={index} className="text-blue-600 font-extrabold tracking-tight">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center bg-white pt-28 pb-16 overflow-hidden">
      {/* Exquisite soft glowing background on top-left to enrich focus */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      
      {/* Subtle bottom gradient shadow */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-50/50 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full z-10 flex flex-col justify-center">
        <motion.div 
          className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Slogan, Subslogan, Buttons */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Accent Line + Tag */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <span className="w-10 h-[2px] bg-blue-600 rounded-full" />
              <span className="text-[10px] md:text-xs uppercase font-extrabold tracking-[0.2em] text-blue-600">
                EXPERTISE IN HUMAN RESOURCES
              </span>
            </motion.div>
            
            {/* Main Slogan Headings */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] whitespace-pre-line">
                {renderHighlightedTitle(profile.mainSlogan)}
              </h1>
            </motion.div>

            {/* SubSlogan Description */}
            <motion.p 
              variants={itemVariants} 
              className="text-sm md:text-[15px] lg:text-[16px] text-slate-500 leading-relaxed font-semibold max-w-2xl whitespace-pre-line"
            >
              {profile.subSlogan}
            </motion.p>

            {/* Action Buttons Row */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => scrollToSection("cases")}
                className="px-10 md:px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm md:text-base rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2 group cursor-pointer"
              >
                주요 업무 사례 보기
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: High-impact KPI Card List */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-3.5 lg:py-1">
            {activeKpis.map((kpi, idx) => {
              const Icon = ICON_MAP[kpi.icon] || ShieldCheck;
              return (
                <motion.div
                  key={kpi.id || idx}
                  variants={itemVariants}
                  className="bg-slate-50/80 backdrop-blur-md p-6 lg:py-4.5 lg:px-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-start gap-4 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300 hover:bg-white"
                >
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                      {kpi.label}
                    </div>
                    <div className="text-[14px] md:text-base font-extrabold text-slate-900 mt-1 leading-tight">
                      {kpi.value}
                    </div>
                    <div className="text-[12px] text-slate-500 font-medium mt-1 leading-relaxed">
                      {kpi.desc}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </motion.div>

        {/* Elegant Scroll Explorer Indicator */}
        <motion.div 
          variants={itemVariants}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex items-center gap-4 pt-12 lg:pt-16 cursor-pointer inline-flex group select-none mr-auto"
          onClick={() => scrollToSection("about")}
        >
          <div className="w-10 h-10 rounded-full border border-slate-200 group-hover:border-blue-600 group-hover:text-blue-600 flex items-center justify-center text-slate-400 bg-white transition-all shadow-sm">
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
            </motion.div>
          </div>
          <span className="text-[10px] font-extrabold tracking-[0.16em] text-slate-400 group-hover:text-blue-600 transition-colors uppercase">
            SCROLL TO EXPLORE EXPERIENCE
          </span>
        </motion.div>
      </div>
    </section>
  );
}
