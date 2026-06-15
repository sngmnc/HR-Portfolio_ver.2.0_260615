import React, { useState, useEffect } from "react";
import { ShieldAlert, Menu, X, Settings2 } from "lucide-react";

interface HeaderProps {
  onAdminClick: () => void;
}

export default function Header({ onAdminClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const menuItems = [
    { target: "profile", label: "소개" },
    { target: "results", label: "주요 성과" },
    { target: "career", label: "경력 요약" },
    { target: "cases", label: "업무 사례" },
    { target: "capabilities", label: "핵심 역량" },
    { target: "credentials", label: "학력·자격" },
    { target: "contact", label: "연락처" }
  ];

  return (
    <header
      id="portfolio-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/60 py-3 shadow-sm" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex flex-col gap-0.5">
          <div className="font-extrabold text-slate-900 tracking-tight text-sm leading-none">
            S.M. CHOI
          </div>
          <span className="text-[10px] text-blue-600 font-bold tracking-wider">
            HR GENERALIST
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollToSection(item.target)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-655 text-slate-600 hover:text-slate-950 hover:bg-slate-50 rounded-lg transition-all"
            >
              {item.label}
            </button>
          ))}
          <div className="w-px h-4 bg-slate-200 mx-2"></div>
          <button
            onClick={onAdminClick}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 hover:text-blue-700"
          >
            <Settings2 className="w-3.5 h-3.5 text-slate-600" />
            관리(Admin)
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={onAdminClick}
            className="p-1.5 bg-slate-150 bg-slate-150/10 rounded-lg text-slate-705 text-slate-700"
            title="Admin Login"
          >
            <Settings2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-700 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[100%] left-0 right-0 bg-white border-b border-slate-200 shadow-xl py-4 px-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          {menuItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollToSection(item.target)}
              className="w-full text-left py-2.5 px-3 hover:bg-slate-50 text-slate-700 hover:text-slate-950 rounded-lg text-xs font-semibold block"
            >
              {item.label}
            </button>
          ))}
          <div className="h-px bg-slate-100 my-2"></div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onAdminClick();
            }}
            className="w-full text-left py-2.5 px-3 bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center justify-between"
          >
            <span>관리자 대시보드 로그인</span>
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
