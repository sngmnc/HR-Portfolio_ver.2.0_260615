import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CaseStudy } from "../types";
import { 
  Building2, Calendar, FileQuestion, ArrowRightCircle, Trophy, Sparkles, FolderDot, AlertTriangle 
} from "lucide-react";

interface CasesProps {
  cases: CaseStudy[];
}

export default function Cases({ cases }: CasesProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const activeCase = cases[selectedIdx] || cases[0];

  return (
    <section id="cases" className="py-20 bg-slate-50 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="text-[10px] uppercase font-bold tracking-widest text-blue-600">
               SELECTED CASES
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              주요 업무 사례
            </h2>
            <div className="h-1.5 w-12 bg-slate-900 rounded"></div>
          </div>
        </div>

        {/* Dynamic Workspace: Left list selector, Right Detail display */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation items - Left Column */}
          <div className="lg:col-span-4 space-y-2">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 mb-2.5">
              실무 기여 프로젝트 목록 ({cases.length})
            </span>
            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
              {cases.map((cs, idx) => (
                <button
                  key={cs.id || idx}
                  onClick={() => setSelectedIdx(idx)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-semibold leading-relaxed transition-all cursor-pointer flex items-center justify-between ${
                    selectedIdx === idx
                      ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.01]"
                      : "bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 border-slate-200/90 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3 pr-2 select-none">
                    <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      selectedIdx === idx ? "bg-blue-650 bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                    }`}>
                      0{idx + 1}
                    </span>
                    <span className="font-sans text-xs whitespace-normal break-keep leading-snug">
                      {cs.title}
                    </span>
                  </div>
                  <FolderDot className={`w-4 h-4 shrink-0 opacity-70 ${
                    selectedIdx === idx ? "text-blue-450 text-blue-400" : "text-slate-400"
                  }`} />
                </button>
              ))}
            </div>

            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mt-4 text-[11px] text-blue-805 text-slate-650 flex gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-blue-600" />
              <span>원하는 위 프로젝트를 클릭하시면 우측(모바일은 하단) 영역에 해당 상세 업무가 실시간 인계되어 표출됩니다.</span>
            </div>
          </div>

          {/* Details - Right Column */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeCase && (
                <motion.div
                  key={activeCase.id || selectedIdx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-slate-200 shadow-lg rounded-2xl p-6 md:p-8 space-y-6"
                >
                  {/* Case Title Card Header */}
                  <div className="border-b pb-5 border-slate-100 space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-800 text-[10px] font-bold rounded-full font-mono">
                      {activeCase.badge || `CASE NO.0${selectedIdx + 1}`}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      {activeCase.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs text-slate-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <span>{activeCase.companyName}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>{activeCase.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* 1. Problem (Red Theme Card) */}
                  <div className="bg-rose-50/20 border-l-4 border-rose-500 p-4 rounded-r-xl space-y-2">
                    <h4 className="text-xs font-bold text-rose-800 flex items-center gap-1.5 uppercase">
                      <FileQuestion className="w-4 h-4" />
                      문제 영역 (PROBLEM DEFINITION)
                    </h4>
                    <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-normal">
                      {activeCase.problem}
                    </p>
                  </div>

                  {/* 2. Execution (Blue Theme Cards) */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-blue-800 flex items-center gap-1.5 uppercase">
                      <ArrowRightCircle className="w-4 h-4" />
                      적극적 실행 조치 및 개선안 (EXECUTION)
                    </h4>
                    <div className="space-y-2">
                      {activeCase.execution.map((exec, eIdx) => (
                        <div 
                          key={eIdx} 
                          className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-3.5 transition-all hover:bg-slate-50/70"
                        >
                          <span className="w-5 h-5 rounded-full bg-blue-105 bg-blue-50 text-blue-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            {eIdx + 1}
                          </span>
                          <span className="text-xs md:text-sm text-slate-700 leading-relaxed">
                            {exec}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Result (Green Theme Cards) */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 uppercase">
                      <Trophy className="w-4 h-4 animate-pulse" />
                      달성한 결과 및 비즈니스 기여도 (RESULT)
                    </h4>
                    <div className="space-y-2">
                      {activeCase.result.map((res, rIdx) => (
                        <div 
                          key={rIdx} 
                          className="bg-emerald-50/20 p-3.5 rounded-xl border border-emerald-500/10 flex items-start gap-3.5"
                        >
                          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            ✓
                          </span>
                          <span className="text-xs md:text-sm text-emerald-850 font-semibold text-slate-800 leading-relaxed">
                            {res}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exception / Custom Note if any */}
                  {activeCase.note && (
                    <div className="bg-amber-50/30 border border-amber-500/20 p-3 rounded-lg flex items-center gap-2 text-[11px] text-amber-800">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                      <span>{activeCase.note}</span>
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
