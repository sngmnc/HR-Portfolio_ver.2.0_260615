import React from "react";
import { motion } from "motion/react";
import { SkillCategory, StrengthItem } from "../types";
import { 
  CheckSquare, BookOpen, Layers, Settings, HelpCircle, HardDrive, Cpu, Compass, Flame 
} from "lucide-react";

interface CapabilitiesProps {
  skills: SkillCategory[];
  strengths: StrengthItem[];
  skillsTitle?: string;
  strengthsTitle?: string;
}

export default function Capabilities({ skills, strengths, skillsTitle, strengthsTitle }: CapabilitiesProps) {

  // Strengths icon decider
  const getStrengthIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Layers className="w-5 h-5 text-indigo-600" />;
      case 1: return <Compass className="w-5 h-5 text-blue-600" />;
      case 2: return <Settings className="w-5 h-5 text-emerald-600" />;
      case 3: return <HelpCircle className="w-5 h-5 text-rose-600" />;
      default: return <Flame className="w-5 h-5 text-amber-500 animate-pulse" />;
    }
  };

  return (
    <section id="capabilities" className="py-20 bg-white border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-3">
            <div className="text-[10px] uppercase font-bold tracking-widest text-blue-600">
              CAPABILITIES
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              핵심 역량
            </h2>
            <div className="h-1.5 w-12 bg-slate-900 rounded"></div>
          </div>
        </div>

        {/* Double Column Split Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: 실무 역량 (Practical Skills) - LHS */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 border-b pb-3 border-slate-100">
              <Cpu className="w-5 h-5 text-blue-650 text-blue-600 shrink-0" />
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                {skillsTitle || "실무 역량 (HR & Corporate Skills)"}
              </h3>
            </div>

            <div className="space-y-4">
              {skills.map((category, catIdx) => (
                <div 
                  key={category.id || catIdx}
                  className="bg-slate-50/50 p-5 rounded-2xl border border-slate-150 border-slate-100"
                >
                  <span className="text-[10px] font-extrabold tracking-widest text-blue-650 bg-blue-50 text-blue-800 px-2.5 py-1 rounded">
                    {category.categoryName.toUpperCase()}
                  </span>
                  
                  <div className="grid gap-4 mt-4">
                    {category.skills.map((skill, skIdx) => (
                      <div key={skIdx} className="space-y-0.5">
                        <div className="text-xs font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                          {skill.name}
                        </div>
                        <div className="text-xs text-slate-550 text-slate-500 font-normal leading-relaxed pl-3">
                          {skill.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: 업무 강점 (Work Strengths) - RHS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3 border-b pb-3 border-slate-100">
              <BookOpen className="w-5 h-5 text-slate-800 shrink-0" />
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                {strengthsTitle || "적극적 업무 강점 (Core Philosophies)"}
              </h3>
            </div>

            <div className="space-y-4">
              {strengths.map((str, idx) => (
                <motion.div
                  key={str.id || idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:shadow-md bg-white p-5 rounded-2xl border border-slate-200/90 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="p-2.5 bg-slate-50 rounded-xl shrink-0 mt-0.5">
                    {getStrengthIcon(idx)}
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-905 text-slate-900 tracking-tight">
                      {str.title}
                    </h4>
                    <p className="text-xs text-slate-550 text-slate-550/95 text-slate-500 leading-relaxed font-normal mt-1.5 whitespace-pre-line">
                      {str.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
