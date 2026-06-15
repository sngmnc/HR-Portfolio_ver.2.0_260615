import React, { useState } from "react";
import { ContactInfo } from "../types";
import { Mail, Copy, Check, Download, Share2, Building2 } from "lucide-react";

interface ContactProps {
  contact: ContactInfo;
}

export default function Contact({ contact }: ContactProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Abstract dark graphics */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_120%,rgba(37,99,235,0.18),transparent_100%)] opacity-85" />
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -z-10" />

      <div className="relative max-w-4xl mx-auto px-6 text-center space-y-10 z-10">
        
        {/* Header Tag */}
        <div className="space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white rounded-full text-[10px] font-extrabold tracking-widest uppercase">
            {contact.badgeText || "GET IN TOUCH"}
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            연락처
          </h2>
          <div className="h-1.5 w-12 bg-white rounded mx-auto"></div>
        </div>

        {/* Supporting Slogan */}
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto font-medium whitespace-pre-line">
          &ldquo;{contact.closingMessage}&rdquo;
        </p>

        {/* Minimalist Contact Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-8 rounded-3xl max-w-lg mx-auto space-y-6 shadow-xl">
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-blue-600/20 text-blue-400 rounded-full">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">대표 이메일</span>
            <span className="text-base md:text-lg font-mono font-bold tracking-tight text-white">
              {contact.email}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-white/5">
            <button
              onClick={handleCopyEmail}
              className="py-3 px-4 bg-white/10 hover:bg-white/15 text-white/95 hover:text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-450 text-emerald-400" />
                  복사 완료
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  이메일 복사
                </>
              )}
            </button>

            <button
              onClick={handleCopyLink}
              className="py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/15"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  복사 완료
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  포폴 링크 복사
                </>
              )}
            </button>
          </div>
        </div>

        {/* Human Resource / Corporate Operations Professional Disclaimer */}
        <div className="space-y-4 pt-4 border-t border-white/5 max-w-2xl mx-auto text-slate-500 text-[11px] leading-relaxed">
          <div className="flex items-center justify-center gap-1.5 font-semibold text-slate-400">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="whitespace-pre-line">{contact.disclaimer || "조직의 안정적 기준을 만들고, 사규와 법문 사이에서 균형을 잡는 Business Support 실무 파트너."}</span>
          </div>
          <p className="whitespace-pre-line">{contact.copyright !== undefined ? contact.copyright : `© 2026 ${contact.email.split("@")[0].toUpperCase()}. All rights reserved. S.M. Choi Portfolio Edition V2.`}</p>
        </div>

      </div>
    </section>
  );
}
