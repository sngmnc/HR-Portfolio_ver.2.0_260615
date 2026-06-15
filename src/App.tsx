import React, { useState, useEffect } from "react";
import { PortfolioData } from "./types";
import { DEFAULT_PORTFOLIO_DATA } from "./data";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Results from "./components/Results";
import Career from "./components/Career";
import Cases from "./components/Cases";
import Capabilities from "./components/Capabilities";
import Credentials from "./components/Credentials";
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
import { Settings2, ArrowUp, Sparkles } from "lucide-react";

export default function App() {
  const [data, setData] = useState<PortfolioData>(DEFAULT_PORTFOLIO_DATA);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const cached = localStorage.getItem("sm_choi_portfolio_v2_data_rev");
      if (cached) {
        const parsed = JSON.parse(cached);
        // Automatically migrate old single-line slogan to sleek new multiline screenshot version
        if (parsed.profile) {
          if (parsed.profile.mainSlogan === "조직 운영의 기준을 만들고 안정화해온 경영지원형 HR") {
            parsed.profile.mainSlogan = DEFAULT_PORTFOLIO_DATA.profile.mainSlogan;
            parsed.profile.subSlogan = DEFAULT_PORTFOLIO_DATA.profile.subSlogan;
          }
          if (!parsed.profile.aboutSubtitle || parsed.profile.aboutText.includes("저는 인사총무의 기본기 위에 인사운영")) {
            parsed.profile.aboutSubtitle = DEFAULT_PORTFOLIO_DATA.profile.aboutSubtitle;
            parsed.profile.aboutText = DEFAULT_PORTFOLIO_DATA.profile.aboutText;
            parsed.profile.aboutValues = DEFAULT_PORTFOLIO_DATA.profile.aboutValues;
          }
        }
        if (!parsed.heroKpis) {
          parsed.heroKpis = DEFAULT_PORTFOLIO_DATA.heroKpis;
        }
        if (parsed.contact) {
          if (parsed.contact.disclaimer === undefined) {
            parsed.contact.disclaimer = DEFAULT_PORTFOLIO_DATA.contact.disclaimer;
          }
          if (parsed.contact.copyright === undefined) {
            parsed.contact.copyright = DEFAULT_PORTFOLIO_DATA.contact.copyright;
          }
          if (parsed.contact.badgeText === undefined) {
            parsed.contact.badgeText = DEFAULT_PORTFOLIO_DATA.contact.badgeText;
          }
        }
        if (parsed.skillsTitle === undefined) {
          parsed.skillsTitle = DEFAULT_PORTFOLIO_DATA.skillsTitle;
        }
        if (parsed.strengthsTitle === undefined) {
          parsed.strengthsTitle = DEFAULT_PORTFOLIO_DATA.strengthsTitle;
        }
        localStorage.setItem("sm_choi_portfolio_v2_data_rev", JSON.stringify(parsed));
        setData(parsed);
      }
    } catch (e) {
      console.error("Failed to load cached portfolio data", e);
    }
  }, []);

  // Update scroll detection for "Scroll to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSaveData = (newData: PortfolioData) => {
    setData(newData);
    try {
      localStorage.setItem("sm_choi_portfolio_v2_data_rev", JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to persist data key-value state", e);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Floating Header */}
      <Header 
        onAdminClick={() => setIsAdminOpen(true)} 
      />

      {/* Main Flow */}
      <main className="flex-grow">
        
        {/* Slogan & KPI cards */}
        <Hero profile={data.profile} heroKpis={data.heroKpis} />

        {/* PROFILE OVERVIEW */}
        <About profile={data.profile} />

        {/* KEY RESULTS Bento-Grid */}
        <Results stats={data.stats} />

        {/* CAREER HISTORY Timeline */}
        <Career career={data.career} />

        {/* SELECTED CASES Collapsible */}
        <Cases cases={data.cases} />

        {/* CAPABILITIES (Skills & Philosophy) */}
        <Capabilities 
          skills={data.skills} 
          strengths={data.strengths} 
          skillsTitle={data.skillsTitle}
          strengthsTitle={data.strengthsTitle}
        />

        {/* CREDENTIALS (Education & Badges) */}
        <Credentials credentials={data.credentials} />

        {/* GET IN TOUCH */}
        <Contact contact={data.contact} />

      </main>

      {/* Floating Action Utilities */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-2">
        {/* Scroll Top */}
        {showScrollTop && (
          <button
            onClick={handleScrollToTop}
            className="p-3 bg-white hover:bg-slate-100 text-slate-800 rounded-full shadow-lg border border-slate-205 border-slate-200 transition-all hover:-translate-y-1"
            title="위로 이동"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
        
        {/* Floating Quick Admin Toggle */}
        <button
          onClick={() => setIsAdminOpen(true)}
          className="p-3 bg-slate-900 hover:bg-blue-600 text-white rounded-full shadow-xl transition-all hover:rotate-12 hover:-translate-y-1 flex items-center justify-center"
          title="관리자 수정 대시보드 열기"
        >
          <Settings2 className="w-5 h-5" />
        </button>
      </div>

      {/* Admin Panel Editing Overlay */}
      {isAdminOpen && (
        <AdminPanel
          currentData={data}
          onSave={handleSaveData}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

    </div>
  );
}
