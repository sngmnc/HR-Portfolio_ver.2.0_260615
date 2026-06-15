import React from "react";
import { motion } from "motion/react";
import { CareerItem } from "../types";
import { Calendar, Briefcase, Dot, CheckCircle } from "lucide-react";

interface CareerProps {
  career: CareerItem[];
}

export default function Career({ career }: CareerProps) {
  return (
    <section id="career" className="py-20 bg-white border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-3">
            <div className="text-[10px] uppercase font-bold tracking-widest text-blue-600">
              CAREER HISTORY
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              경력 요약
            </h2>
            <div className="h-1.5 w-12 bg-slate-900 rounded"></div>
          </div>
        </div>

        {/* Timeline Track */}
        <div className="relative border-l-2 border-slate-200/80 pl-6 sm:pl-10 space-y-16 ml-3">
          {career.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 80 }}
              className="relative"
            >
              {/* Point Circle */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 bg-slate-900 text-white rounded-full border-4 border-white flex items-center justify-center shadow-md">
                <Briefcase className="w-2.5 h-2.5" />
              </div>

              {/* Time Badge */}
              <div className="flex flex-wrap items-center gap-3.5 mb-2.5">
                <span className="flex items-center gap-1 font-mono text-xs font-bold text-slate-500 bg-slate-100 p-1 px-2.5 rounded-full border border-slate-200/30">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.period}
                </span>
                <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase">
                  {idx === 0 ? "LATEST POSITION" : "PREVIOUS EXPERIENCES"}
                </span>
              </div>

              {/* Main Info */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold font-sans text-slate-900 tracking-tight">
                  {item.companyName}
                </h3>
                <div className="text-xs font-extrabold text-blue-800 bg-sky-50 inline-block px-3 py-1 rounded border border-blue-100">
                  {item.role}
                </div>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal bg-slate-50/50 p-3.5 rounded-xl border border-slate-100/80 max-w-3xl">
                  {item.description}
                </p>
              </div>

              {/* Scope Breakdown */}
              <div className="grid md:grid-cols-2 gap-8 mt-6 pt-5 border-t border-slate-100 max-w-5xl">
                
                {/* 1. 업무 Scope */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-800 tracking-wide uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    {item.tasksTitle || "주요 위임 책임 및 업무 (Key Tasks)"}
                  </h4>
                  <ul className="space-y-2">
                    {item.tasks.map((task, tIdx) => (
                      <li key={tIdx} className="text-xs text-slate-600 leading-relaxed flex items-start gap-1">
                        <Dot className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. 소속 성과 */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-emerald-800 tracking-wide uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {item.resultsTitle || "부서 내 주도 성과 (Achievements)"}
                  </h4>
                  <ul className="space-y-2">
                    {item.results.map((res, rIdx) => (
                      <li key={rIdx} className="text-xs text-slate-705 text-slate-700 leading-relaxed flex items-start gap-1.5 bg-emerald-50/30 p-2 rounded-lg border border-emerald-500/10">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="font-semibold">{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
