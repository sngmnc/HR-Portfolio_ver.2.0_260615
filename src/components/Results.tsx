import React from "react";
import { motion } from "motion/react";
import { StatCard } from "../types";
import { 
  MessageSquareOff, TrendingUp, Target, ShieldCheck, HeartHandshake, Landmark, FileSpreadsheet
} from "lucide-react";

interface ResultsProps {
  stats: StatCard[];
}

export default function Results({ stats }: ResultsProps) {
  // Map icons dynamically based on index to ensure beautiful layouts
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0: return <MessageSquareOff className="w-5 h-5 text-indigo-600" />;
      case 1: return <TrendingUp className="w-5 h-5 text-sky-650 text-sky-600" />;
      case 2: return <Target className="w-5 h-5 text-rose-600" />;
      case 3: return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 4: return <HeartHandshake className="w-5 h-5 text-teal-600" />;
      case 5: default: return <Landmark className="w-5 h-5 text-amber-650 text-slate-800" />;
    }
  };

  const getCardBg = (idx: number) => {
    switch (idx) {
      case 0: return "hover:border-indigo-200 hover:bg-indigo-50/10";
      case 1: return "hover:border-sky-200 hover:bg-sky-50/10";
      case 2: return "hover:border-rose-200 hover:bg-rose-50/10";
      case 3: return "hover:border-emerald-200 hover:bg-emerald-50/10";
      case 4: return "hover:border-teal-200 hover:bg-teal-50/10";
      default: return "hover:border-slate-300 hover:bg-slate-50/10";
    }
  };

  return (
    <section id="results" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-slate-100 rounded-full blur-3xl opacity-50 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="text-[10px] uppercase font-bold tracking-widest text-blue-600">
              KEY RESULTS
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              주요 성과
            </h2>
            <div className="h-1.5 w-12 bg-slate-900 rounded"></div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id || idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.08, type: "spring", stiffness: 90 }}
              className={`bg-white p-6 rounded-2xl border border-slate-205/85 border-slate-200 shadow-sm transition-all duration-300 flex flex-col justify-between ${getCardBg(idx)}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    {getIcon(idx)}
                  </div>
                </div>
                
                <p className="text-xs font-bold text-slate-500 tracking-tight uppercase">
                  {stat.label}
                </p>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-1.5 tracking-tight">
                  {stat.value}
                </h3>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100/80">
                <p className="text-[11px] md:text-xs text-slate-500/90 leading-relaxed font-semibold">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
