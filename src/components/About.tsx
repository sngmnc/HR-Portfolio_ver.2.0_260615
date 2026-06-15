import React from "react";
import { motion } from "motion/react";
import { Profile } from "../types";

interface AboutProps {
  profile: Profile;
}

export default function About({ profile }: AboutProps) {
  // Split paragraphs safely
  const paragraphs = profile.aboutText.split("\n\n").filter(p => p.trim());

  const fallbackValues = [
    { id: "av-1", title: "기준을 먼저 세웁니다", description: "반복되는 업무일수록 개인의 감각이나 기억에 의존하기보다, 명확한 기준과 프로세스를 만드는 것이 중요하다고 생각합니다." },
    { id: "av-2", title: "회사와 구성원 사이의 균형을 고민합니다", description: "회사의 현실적인 상황 안에서 구성원이 납득할 수 있는 방식을 찾고, 필요한 경우 경영진과 구성원 사이에서 커뮤니케이션을 조율합니다." },
    { id: "av-3", title: "문제 발생 전 리스크를 줄입니다", description: "노무 이슈는 발생 후 대응보다 예방이 중요하다고 생각합니다. 기본적인 영역을 사전에 점검하고 노무사와 협업하여 리스크를 줄입니다." },
    { id: "av-4", title: "필요한 역량은 스스로 학습합니다", description: "조직 운영에 필요한 회계, 세무 등 새로운 전문 영역도 스스로 학습하고 자격증을 취득하며 실무에 적용해왔습니다." }
  ];

  const activeValues = profile.aboutValues && profile.aboutValues.length > 0
    ? profile.aboutValues
    : fallbackValues;

  const aboutSubtitle = profile.aboutSubtitle || "인사총무의 기본기에서 출발해\n전사 운영으로 확장해온 사람";

  const getCardIndexText = (id: string, idx: number) => {
    const match = id.match(/\d+/);
    if (match) {
      const num = parseInt(match[0], 10);
      return num < 10 ? `0${num}` : `${num}`;
    }
    return `0${idx + 1}`;
  };

  // Divide into two columns for the masonry-like stagger effect
  const col1 = activeValues.filter((_, idx) => idx % 2 === 0);
  const col2 = activeValues.filter((_, idx) => idx % 2 !== 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15
      }
    }
  };

  return (
    <section id="about" className="py-24 bg-[#FAF9FB] border-y border-slate-200/40 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-purple-50/10 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Column: Slogan & Subtitle & Text Overview */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Story & Strategy Tag */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <span className="text-[10px] md:text-xs uppercase font-extrabold tracking-[0.22em] text-blue-600">
                STORY & STRATEGY
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mt-1">
                간략 소개
              </h2>
              {/* Thick Black Accent Line underneath */}
              <div className="h-[3.5px] w-12 bg-slate-900 rounded-full mt-2" />
            </motion.div>

            {/* Subtitle Headline */}
            <motion.div variants={itemVariants} className="pt-4">
              <h3 className="text-xl md:text-2xl lg:text-[27px] font-extrabold text-slate-900 tracking-tight leading-[1.3] whitespace-pre-line">
                {aboutSubtitle}
              </h3>
            </motion.div>

            {/* Description Paragraphs block */}
            <motion.div 
              variants={itemVariants}
              className="space-y-6 text-[13px] md:text-sm text-slate-500 font-medium leading-[1.72]"
            >
              {paragraphs.map((p, index) => (
                <p key={index} className="whitespace-pre-line text-justify">
                  {p}
                </p>
              ))}
            </motion.div>
          </div>

          {/* Right Column: High-impact 4-card Stagger List */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            
            {/* Left Masonry Column (01, 03) */}
            <div className="space-y-6 flex flex-col">
              {col1.map((card, idx) => {
                const numberText = getCardIndexText(card.id, idx * 2);
                return (
                  <motion.div
                    key={card.id || idx}
                    variants={itemVariants}
                    className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100/80 shadow-[0_4px_24px_rgba(148,163,184,0.05)] hover:shadow-[0_12px_36px_rgba(148,163,184,0.12)] transition-all flex flex-col justify-between group h-full"
                  >
                    <div>
                      {/* Stylized premium number font */}
                      <span className="text-4xl md:text-5xl font-extrabold text-blue-100 block select-none tracking-tight">
                        {numberText}
                      </span>
                      <h4 className="text-sm md:text-base font-extrabold text-slate-900 mt-4 mb-3 leading-snug group-hover:text-blue-600 transition-colors break-keep">
                        {card.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed break-keep whitespace-pre-line">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Masonry Column (02, 04) - Pushed down slightly on large screens for staggered look */}
            <div className="space-y-6 flex flex-col lg:translate-y-12">
              {col2.map((card, idx) => {
                const numberText = getCardIndexText(card.id, idx * 2 + 1);
                return (
                  <motion.div
                    key={card.id || idx}
                    variants={itemVariants}
                    className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100/80 shadow-[0_4px_24px_rgba(148,163,184,0.05)] hover:shadow-[0_12px_36px_rgba(148,163,184,0.12)] transition-all flex flex-col justify-between group h-full"
                  >
                    <div>
                      {/* Stylized premium number font */}
                      <span className="text-4xl md:text-5xl font-extrabold text-blue-100 block select-none tracking-tight">
                        {numberText}
                      </span>
                      <h4 className="text-sm md:text-base font-extrabold text-slate-900 mt-4 mb-3 leading-snug group-hover:text-blue-600 transition-colors break-keep">
                        {card.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed break-keep whitespace-pre-line">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
