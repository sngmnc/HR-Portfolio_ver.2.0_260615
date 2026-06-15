import React, { useState } from "react";
import { CredentialItem } from "../types";
import { GraduationCap, Award, HelpCircle, Check, BookOpen } from "lucide-react";

interface CredentialsProps {
  credentials: CredentialItem[];
}

export default function Credentials({ credentials }: CredentialsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const education = credentials.filter((c) => c.type === "education");
  const certs = credentials.filter((c) => c.type === "cert");

  return (
    <section id="credentials" className="py-20 bg-slate-50 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-3">
            <div className="text-[10px] uppercase font-bold tracking-widest text-blue-600">
              CREDENTIALS
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              학력 및 자격
            </h2>
            <div className="h-1.5 w-12 bg-slate-900 rounded"></div>
          </div>
        </div>

        {/* 2 Grid Columns */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Section: Academic Background */}
          <div className="space-y-6">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-800 flex items-center gap-2 border-b pb-3 border-slate-200/60">
              <GraduationCap className="w-5 h-5 text-slate-800" />
              학력 사항 (Education)
            </h3>

            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div 
                  key={edu.id || idx}
                  className="bg-white p-5 rounded-2xl border border-slate-205/95 border-slate-200 shadow-sm flex items-start gap-4 hover:-translate-y-0.5 transition-transform"
                >
                  <div className="p-2.5 bg-blue-50 text-blue-800 rounded-xl">
                    <BookOpen className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 tracking-tight">
                      {edu.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      {edu.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Professional Certification & Skills */}
          <div className="space-y-6">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-800 flex items-center gap-2 border-b pb-3 border-slate-200/60">
              <Award className="w-5 h-5 text-blue-600" />
              자격 및 어학 (Qualifications)
            </h3>

            <div className="grid sm:grid-cols-1 gap-3.5">
              {certs.map((cert, idx) => (
                <div 
                  key={cert.id || idx}
                  className="relative bg-white p-4.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-sm group p-4"
                  onMouseEnter={() => setHoveredId(cert.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        {cert.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5 pl-3.5">
                        {cert.subtitle}
                      </p>
                    </div>
                    
                    {cert.description && (
                      <div className="p-1 text-slate-400 group-hover:text-blue-650 transition-colors">
                        <HelpCircle className="w-4 h-4 text-slate-300" />
                      </div>
                    )}
                  </div>

                  {cert.description && (
                    <div className="mt-2 pl-3.5 text-[11px] leading-relaxed text-slate-655 text-slate-600 border-l border-slate-100 italic">
                      {cert.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
