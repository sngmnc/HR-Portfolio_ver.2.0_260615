import React, { useState } from "react";
import { PortfolioData, CareerItem, CaseStudy, SkillCategory, StrengthItem, CredentialItem, StatCard, HeroKpiItem, AboutValueCard } from "../types";
import { DEFAULT_PORTFOLIO_DATA } from "../data";
import { 
  X, Check, Lock, Save, RotateCcw, Plus, Trash2, ChevronUp, ChevronDown, 
  FileText, Briefcase, Award, Eye, Mail, User, ShieldCheck, ListPlus 
} from "lucide-react";

interface AdminPanelProps {
  currentData: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onClose: () => void;
}

export default function AdminPanel({ currentData, onSave, onClose }: AdminPanelProps) {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [toastMessage, setToastMessage] = useState("");

  // Working copy of data
  const [localData, setLocalData] = useState<PortfolioData>(() => JSON.parse(JSON.stringify(currentData)));

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "2181") {
      setIsAuthorized(true);
      setErrorMsg("");
    } else {
      setErrorMsg("비밀번호가 올바르지 않습니다. 다시 시도해주세요.");
      setPassword("");
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const syncData = (updated: PortfolioData) => {
    setLocalData(updated);
    onSave(updated);
    showToast("수정 사항이 실시간으로 대시보드와 포트폴리오에 적용되었습니다.");
  };

  const handleResetToDefault = () => {
    if (window.confirm("포트폴리오의 모든 데이터를 기획서 초기 기본값으로 완벽히 복원하시겠습니까?")) {
      const restored = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
      setLocalData(restored);
      onSave(restored);
      showToast("기초 포트폴리오 데이터 복원이 완료되었습니다.");
    }
  };

  // Helper selectors and updates
  const updateProfile = (key: keyof typeof localData.profile, value: string) => {
    const updated = {
      ...localData,
      profile: {
        ...localData.profile,
        [key]: value,
      },
    };
    syncData(updated);
  };

  const updateContact = (key: keyof typeof localData.contact, value: string) => {
    const updated = {
      ...localData,
      contact: {
        ...localData.contact,
        [key]: value,
      },
    };
    syncData(updated);
  };

  // Stats
  const updateStatCard = (index: number, key: keyof StatCard, value: string) => {
    const nextStats = [...localData.stats];
    nextStats[index] = { ...nextStats[index], [key]: value };
    syncData({ ...localData, stats: nextStats });
  };

  const addStat = () => {
    const nextStats = [...localData.stats];
    const newId = `stat-${Date.now()}`;
    nextStats.push({
      id: newId,
      label: "새 성과 지표",
      value: "성과 수치 대입 (예: 99% 달성)",
      description: "여기에 세부 성과와 공적 사항을 기록하세요."
    });
    syncData({ ...localData, stats: nextStats });
    showToast("새 성과 지표 카드가 성공적으로 추가되었습니다.");
  };

  const removeStat = (id: string) => {
    if (localData.stats.length <= 1) {
      alert("최소 1개 이상의 성과 지표가 있어야 합니다.");
      return;
    }
    if (window.confirm("이 주요 성과 카드를 삭제하시겠습니까?")) {
      const nextStats = localData.stats.filter(s => s.id !== id);
      syncData({ ...localData, stats: nextStats });
      showToast("선택하신 주요 성과 지표가 삭제되었습니다.");
    }
  };

  // Hero KPIs
  const updateHeroKpi = (index: number, key: keyof HeroKpiItem, value: string) => {
    const nextKpis = localData.heroKpis ? [...localData.heroKpis] : [];
    if (nextKpis.length === 0) {
      nextKpis.push(
        { id: "hk-1", label: "Career", value: "총 경력 7년+", desc: "중견기업 & 스타트업", icon: "Milestone" },
        { id: "hk-2", label: "Role", value: "HR & Corporate Operations", desc: "인사총무팀 주임 및 스타트업 리드", icon: "ShieldCheck" },
        { id: "hk-3", label: "Strength", value: "기준 수립 · 운영 안정화", desc: "사규 구축, 노무 리스크 제어", icon: "Network" },
        { id: "hk-4", label: "Scope", value: "HR · GA · ER · Finance", desc: "인사·총무부터 회계·세무 지원까지", icon: "Landmark" }
      );
    }
    nextKpis[index] = { ...nextKpis[index], [key]: value };
    syncData({ ...localData, heroKpis: nextKpis });
  };

  // About 4 Values cards
  const updateAboutValue = (index: number, key: keyof AboutValueCard, value: string) => {
    const nextValues = localData.profile.aboutValues && localData.profile.aboutValues.length > 0
      ? [...localData.profile.aboutValues]
      : [
          { id: "av-1", title: "기준을 먼저 세웁니다", description: "반복되는 업무일수록 개인의 감각이나 기억에 의존하기보다, 명확한 기준과 프로세스를 만드는 것이 중요하다고 생각합니다." },
          { id: "av-2", title: "회사와 구성원 사이의 균형을 고민합니다", description: "회사의 현실적인 상황 안에서 구성원이 납득할 수 있는 방식을 찾고, 필요한 경우 경영진과 구성원 사이에서 커뮤니케이션을 조율합니다." },
          { id: "av-3", title: "문제 발생 전 리스크를 줄입니다", description: "노무 이슈는 발생 후 대응보다 예방이 중요하다고 생각합니다. 기본적인 영역을 사전에 점검하고 노무사와 협업하여 리스크를 줄입니다." },
          { id: "av-4", title: "필요한 역량은 스스로 학습합니다", description: "조직 운영에 필요한 회계, 세무 등 새로운 전문 영역도 스스로 학습하고 자격증을 취득하며 실무에 적용해왔습니다." }
        ];
    nextValues[index] = { ...nextValues[index], [key]: value };
    const updated = {
      ...localData,
      profile: {
        ...localData.profile,
        aboutValues: nextValues,
      }
    };
    syncData(updated);
  };

  // Careers
  const handleCareerChange = (index: number, key: keyof CareerItem, value: any) => {
    const nextCareer = [...localData.career];
    nextCareer[index] = { ...nextCareer[index], [key]: value };
    syncData({ ...localData, career: nextCareer });
  };

  const handleCareerArrayChange = (careerIndex: number, field: 'tasks' | 'results', itemIndex: number, value: string) => {
    const nextCareer = [...localData.career];
    const nextArr = [...nextCareer[careerIndex][field]];
    nextArr[itemIndex] = value;
    nextCareer[careerIndex] = { ...nextCareer[careerIndex], [field]: nextArr };
    syncData({ ...localData, career: nextCareer });
  };

  const addCareerArrayItem = (careerIndex: number, field: 'tasks' | 'results') => {
    const nextCareer = [...localData.career];
    const nextArr = [...nextCareer[careerIndex][field], ""];
    nextCareer[careerIndex] = { ...nextCareer[careerIndex], [field]: nextArr };
    syncData({ ...localData, career: nextCareer });
  };

  const removeCareerArrayItem = (careerIndex: number, field: 'tasks' | 'results', itemIndex: number) => {
    const nextCareer = [...localData.career];
    const nextArr = nextCareer[careerIndex][field].filter((_, idx) => idx !== itemIndex);
    nextCareer[careerIndex] = { ...nextCareer[careerIndex], [field]: nextArr };
    syncData({ ...localData, career: nextCareer });
  };

  const addCareer = () => {
    const newCareer: CareerItem = {
      id: "career-" + Date.now(),
      companyName: "새로운 회사명",
      role: "직무 타이틀",
      period: "2026.00 ~ 2026.00",
      description: "역할 및 업무 환경 요약",
      tasks: ["수행 업무 항목을 기재하세요"],
      results: ["주요 성과 항목을 기재하세요"],
      tasksTitle: "주요 위임 책임 및 업무 (Key Tasks)",
      resultsTitle: "부서 내 주도 성과 (Achievements)"
    };
    syncData({ ...localData, career: [...localData.career, newCareer] });
  };

  const removeCareer = (id: string) => {
    if (window.confirm("선택하신 경력을 삭제하시겠습니까?")) {
      syncData({ ...localData, career: localData.career.filter(c => c.id !== id) });
    }
  };

  const moveCareer = (index: number, direction: 'up' | 'down') => {
    const nextCareer = [...localData.career];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= nextCareer.length) return;
    const temp = nextCareer[index];
    nextCareer[index] = nextCareer[targetIdx];
    nextCareer[targetIdx] = temp;
    syncData({ ...localData, career: nextCareer });
  };

  // Cases
  const handleCaseChange = (index: number, key: keyof CaseStudy, value: any) => {
    const nextCases = [...localData.cases];
    nextCases[index] = { ...nextCases[index], [key]: value };
    syncData({ ...localData, cases: nextCases });
  };

  const handleCaseArrayChange = (caseIndex: number, field: 'execution' | 'result', itemIndex: number, value: string) => {
    const nextCases = [...localData.cases];
    const nextArr = [...nextCases[caseIndex][field]];
    nextArr[itemIndex] = value;
    nextCases[caseIndex] = { ...nextCases[caseIndex], [field]: nextArr };
    syncData({ ...localData, cases: nextCases });
  };

  const addCaseArrayItem = (caseIndex: number, field: 'execution' | 'result') => {
    const nextCases = [...localData.cases];
    const nextArr = [...nextCases[caseIndex][field], ""];
    nextCases[caseIndex] = { ...nextCases[caseIndex], [field]: nextArr };
    syncData({ ...localData, cases: nextCases });
  };

  const removeCaseArrayItem = (caseIndex: number, field: 'execution' | 'result', itemIndex: number) => {
    const nextCases = [...localData.cases];
    const nextArr = nextCases[caseIndex][field].filter((_, idx) => idx !== itemIndex);
    nextCases[caseIndex] = { ...nextCases[caseIndex], [field]: nextArr };
    syncData({ ...localData, cases: nextCases });
  };

  const addCase = () => {
    const newCase: CaseStudy = {
      id: "case-" + Date.now(),
      title: "새로운 프로젝트 사례 타이틀",
      companyName: "소속 회사명",
      period: "2026.00 ~ 2026.00",
      problem: "프로젝트 돌입 전 발생했던 문제나 요구 및 한계 상황",
      execution: ["수행 및 해결을 위한 구체적인 실행 행동"],
      result: ["성취해낸 비즈니스 정량/정성적 성과"],
      note: ""
    };
    syncData({ ...localData, cases: [...localData.cases, newCase] });
  };

  const removeCase = (id: string) => {
    if (window.confirm("선택하신 주요 사례를 영구히 삭제하시겠습니까?")) {
      syncData({ ...localData, cases: localData.cases.filter(c => c.id !== id) });
    }
  };

  const moveCase = (index: number, direction: 'up' | 'down') => {
    const nextCases = [...localData.cases];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= nextCases.length) return;
    const temp = nextCases[index];
    nextCases[index] = nextCases[targetIdx];
    nextCases[targetIdx] = temp;
    syncData({ ...localData, cases: nextCases });
  };

  // Skills
  const updateSkill = (catIndex: number, skillIndex: number, field: 'name' | 'desc', value: string) => {
    const nextSkills = [...localData.skills];
    const cat = { ...nextSkills[catIndex] };
    const arr = [...cat.skills];
    arr[skillIndex] = { ...arr[skillIndex], [field]: value };
    cat.skills = arr;
    nextSkills[catIndex] = cat;
    syncData({ ...localData, skills: nextSkills });
  };

  const updateSkillCategoryName = (catIndex: number, name: string) => {
    const nextSkills = [...localData.skills];
    nextSkills[catIndex] = { ...nextSkills[catIndex], categoryName: name };
    syncData({ ...localData, skills: nextSkills });
  };

  const addSkillToCategory = (catIndex: number) => {
    const nextSkills = [...localData.skills];
    const cat = { ...nextSkills[catIndex] };
    cat.skills = [...cat.skills, { name: "새 스킬명", desc: "해당 실무 수행 능력 설명" }];
    nextSkills[catIndex] = cat;
    syncData({ ...localData, skills: nextSkills });
  };

  const removeSkillFromCategory = (catIndex: number, skillIndex: number) => {
    const nextSkills = [...localData.skills];
    const cat = { ...nextSkills[catIndex] };
    cat.skills = cat.skills.filter((_, idx) => idx !== skillIndex);
    nextSkills[catIndex] = cat;
    syncData({ ...localData, skills: nextSkills });
  };

  const addSkillCategory = () => {
    const newCat: SkillCategory = {
      id: "skill-cat-" + Date.now(),
      categoryName: "새로운 기술 세트 대항목",
      skills: [{ name: "스킬명", desc: "해당 실무 수행 능력 설명" }]
    };
    syncData({ ...localData, skills: [...localData.skills, newCat] });
  };

  const removeSkillCategory = (id: string) => {
    if (window.confirm("대분류 기술 세트를 전체 삭제하시겠습니까?")) {
      syncData({ ...localData, skills: localData.skills.filter(s => s.id !== id) });
    }
  };

  // Strengths
  const handleStrengthChange = (index: number, key: keyof StrengthItem, value: string) => {
    const nextStr = [...localData.strengths];
    nextStr[index] = { ...nextStr[index], [key]: value };
    syncData({ ...localData, strengths: nextStr });
  };

  const addStrength = () => {
    const newStr: StrengthItem = {
      id: "str-" + Date.now(),
      title: "새 업무 강점 타이틀",
      description: "업무 추진 및 위기 대응에서 자아내는 독자적 강점에 대한 구체적인 방법론적 기술"
    };
    syncData({ ...localData, strengths: [...localData.strengths, newStr] });
  };

  const removeStrength = (id: string) => {
    if (window.confirm("해당 업무 강점 카드를 삭제하시겠습니까?")) {
      syncData({ ...localData, strengths: localData.strengths.filter(s => s.id !== id) });
    }
  };

  // Credentials
  const handleCredentialChange = (index: number, key: keyof CredentialItem, value: string) => {
    const nextCred = [...localData.credentials];
    nextCred[index] = { ...nextCred[index], [key]: value };
    syncData({ ...localData, credentials: nextCred });
  };

  const addCredential = (type: 'education' | 'cert') => {
    const newCred: CredentialItem = {
      id: "cred-" + Date.now(),
      type,
      title: type === 'education' ? "학교명" : "자격증명",
      subtitle: type === 'education' ? "전공 및 학위 상태" : "인증 위원회 및 발행부서",
      description: type === 'cert' ? "해당 자격 보유가 지원하는 업무 수행 내에서 가진 가치 및 실무 역량 대변 설명" : ""
    };
    syncData({ ...localData, credentials: [...localData.credentials, newCred] });
  };

  const removeCredential = (id: string) => {
    if (window.confirm("해당 학력/자격증 카드를 영구 삭제하시겠습니까?")) {
      syncData({ ...localData, credentials: localData.credentials.filter(c => c.id !== id) });
    }
  };

  // PASSWORD SECURITY OVERLAY
  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-6 bg-slate-950 text-white flex items-center gap-3">
            <div className="p-2.5 bg-sky-500/10 rounded-lg text-sky-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">포트폴리오 관리자 인증</h3>
              <p className="text-xs text-slate-400 mt-1">포토폴리오 기획 실시간 편집 대시보드</p>
            </div>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                관리자 암호코드 (PASSWORD)
              </label>
              <input
                type="password"
                placeholder="관리자 암호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-center text-lg font-mono tracking-widest focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
                autoFocus
              />
            </div>
            
            {errorMsg && (
              <p className="text-xs text-red-600 font-medium bg-red-50 p-2.5 rounded-lg border border-red-100">
                {errorMsg}
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-sm transition-colors"
              >
                홈으로 돌아가기
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/15"
              >
                <ShieldCheck className="w-4 h-4" />
                인증 완료
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // AUTHORIZED WORKSPACE
  return (
    <div className="fixed inset-0 z-50 flex bg-slate-100 text-slate-800 font-sans">
      
      {/* SIDEBAR TABS */}
      <div className="w-64 bg-slate-900 text-slate-200 flex flex-col shrink-0 border-r border-slate-950">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 px-2 text-[10px] bg-emerald-500/20 text-emerald-400 font-bold tracking-widest rounded uppercase">
              Admin Mode
            </span>
            <span className="text-xs text-slate-400 font-mono">v2.0</span>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-slate-800"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">실시간 편집 세션</p>
          <nav className="space-y-1">
            {[
              { id: "profile", label: " PROFILE OVERVIEW (소개)", icon: User },
              { id: "heroKpis", label: " HERO KPIS (히어로 카드)", icon: Award },
              { id: "stats", label: " KEY RESULTS (주요 성과)", icon: Award },
              { id: "career", label: " CAREER HISTORY (경력)", icon: Briefcase },
              { id: "cases", label: " SELECTED CASES (업무 사례)", icon: FileText },
              { id: "skills", label: " CAPABILITIES (실무 역량)", icon: ListPlus },
              { id: "strengths", label: " CAPABILITIES (업무 강점)", icon: Award },
              { id: "credentials", label: " CREDENTIALS (학력·자격)", icon: ShieldCheck },
              { id: "contact", label: " GET IN TOUCH (연락처)", icon: Mail },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide text-left transition-all ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-slate-800 space-y-2 bg-slate-950/40">
          <button
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(localData, null, 2));
              alert("현재 실시간 편집한 포트폴리오의 전체 데이터가 클립보드에 무사히 복사되었습니다!\n\n이 복사된 내용을 이 채팅창에 그대로 붙여넣기(Ctrl+V)하여 저에게 보내주시면, 다음 새로고침이나 타 기기 접속 시에도 이 상태가 기본 유지되도록 최신 서버 코드 파일(src/data.ts)로 완벽히 자동 반영해 드릴게요! ✨");
            }}
            className="w-full py-2.5 px-3 bg-indigo-950/45 hover:bg-indigo-900/50 text-indigo-300 hover:text-indigo-200 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 border border-indigo-900/30 cursor-pointer"
          >
            <span>✨</span>
            현재 편집본 데이터 복사 (AI 전송용)
          </button>
          <button
            onClick={handleResetToDefault}
            className="w-full py-2.5 px-3 bg-red-950/35 hover:bg-red-950/60 text-red-400 hover:text-red-300 font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 border border-red-900/30 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            초기 기본값으로 복원
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            수정완료 및 닫기
          </button>
        </div>
      </div>

      {/* EDIT CONSOLE */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 relative">
        
        {/* EDIT HEADER */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-2">
            <h1 className="text-md font-bold text-slate-800">
              {activeTab === "profile" && "소개 (PROFILE OVERVIEW) 편집"}
              {activeTab === "heroKpis" && "히어로 섹션 핵심 역량 카드 (HERO KPIS) 편집"}
              {activeTab === "stats" && "주요 성과 카드 (KEY RESULTS) 편집"}
              {activeTab === "career" && "경력 요약 (CAREER HISTORY) 편집"}
              {activeTab === "cases" && "실무 프로젝트 사례 (SELECTED CASES) 편집"}
              {activeTab === "skills" && "기술 능력 세트 (CAPABILITIES) 편집"}
              {activeTab === "strengths" && "업무상 철학 및 강점 (CAPABILITIES) 편집"}
              {activeTab === "credentials" && "학력 및 자격증 자격 (CREDENTIALS) 편집"}
              {activeTab === "contact" && "안내 문구 및 연락망 (GET IN TOUCH) 편집"}
            </h1>
            <span className="text-xs text-slate-400">| 모든 입력 필드는 입력 즉시 메인 페이지 화면에 반영 완료됩니다.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow-md"
            >
              <Eye className="w-3.5 h-3.5" />
              포트폴리오 라이브 보기
            </button>
          </div>
        </header>

        {/* COMPONENT TOAST */}
        {toastMessage && (
          <div className="absolute top-4 right-6 z-50 bg-slate-900 text-emerald-400 font-semibold text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-emerald-500/20 animate-in fade-in slide-in-from-top-4 duration-300">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            {toastMessage}
          </div>
        )}

        {/* EDITOR AREA */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 max-w-4xl">

          {/* 1. PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
              <h3 className="font-bold text-slate-700 text-sm border-b pb-3 border-slate-100">기본 프로필 & 슬로건</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">한글 성명 및 자격</label>
                  <input
                    type="text"
                    value={localData.profile.name}
                    onChange={(e) => updateProfile("name", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">영문 성명 또는 회사 직급</label>
                  <input
                    type="text"
                    value={localData.profile.englishName}
                    onChange={(e) => updateProfile("englishName", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">직무 타이틀 (Role Title)</label>
                <input
                  type="text"
                  value={localData.profile.title}
                  onChange={(e) => updateProfile("title", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">메인 슬로건 문구 (Main Slogan)</label>
                <input
                  type="text"
                  value={localData.profile.mainSlogan}
                  onChange={(e) => updateProfile("mainSlogan", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 text-sm font-semibold text-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">서브 설명구 (Sub Description)</label>
                <textarea
                  rows={2}
                  value={localData.profile.subSlogan}
                  onChange={(e) => updateProfile("subSlogan", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">소개 본문 (PROFILE OVERVIEW)</label>
                <textarea
                  rows={8}
                  value={localData.profile.aboutText}
                  onChange={(e) => updateProfile("aboutText", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">소개 서브 타이틀 (About Subtitle)</label>
                <input
                  type="text"
                  value={localData.profile.aboutSubtitle || ""}
                  placeholder="인사총무의 기본기에서 출발해 전사 운영으로 확장해온 사람"
                  onChange={(e) => updateProfile("aboutSubtitle", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="border-t pt-4 mt-6">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-blue-600 rounded-sm"></span>
                  간략 소개 우측 4대 핵심 가치 카드 (01 ~ 04)
                </h4>
                
                <div className="space-y-4">
                  {(localData.profile.aboutValues || [
                    { id: "av-1", title: "기준을 먼저 세웁니다", description: "반복되는 업무일수록 개인의 감각이나 기억에 의존하기보다, 명확한 기준과 프로세스를 만드는 것이 중요하다고 생각합니다." },
                    { id: "av-2", title: "회사와 구성원 사이의 균형을 고민합니다", description: "회사의 현실적인 상황 안에서 구성원이 납득할 수 있는 방식을 찾고, 필요한 경우 경영진과 구성원 사이에서 커뮤니케이션을 조율합니다." },
                    { id: "av-3", title: "문제 발생 전 리스크를 줄입니다", description: "노무 이슈는 발생 후 대응보다 예방이 중요하다고 생각합니다. 기본적인 영역을 사전에 점검하고 노무사와 협업하여 리스크를 줄입니다." },
                    { id: "av-4", title: "필요한 역량은 스스로 학습합니다", description: "조직 운영에 필요한 회계, 세무 등 새로운 전문 영역도 스스로 학습하고 자격증을 취득하며 실무에 적용해왔습니다." }
                  ]).map((val, idx) => (
                    <div key={val.id || idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/50 space-y-2">
                      <div className="text-[11px] font-extrabold text-blue-600 uppercase">카드 0{idx + 1} ({val.id})</div>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-1">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase">카드 제목</label>
                          <input
                            type="text"
                            value={val.title}
                            onChange={(e) => updateAboutValue(idx, "title", e.target.value)}
                            className="w-full mt-1 px-2.5 py-1.5 border border-slate-200 text-xs font-bold text-slate-800 rounded bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase">상세 설명</label>
                          <input
                            type="text"
                            value={val.description}
                            onChange={(e) => updateAboutValue(idx, "description", e.target.value)}
                            className="w-full mt-1 px-2.5 py-1.5 border border-slate-200 text-xs text-slate-600 rounded bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 1.5. HERO KPIS TAB */}
          {activeTab === "heroKpis" && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200/40 text-xs text-blue-800 leading-relaxed">
                💡 <strong>히어로 핵심 역량 카드</strong>는 메인 화면 최상단 우측에 고정 배치되는 4가지 핵심 팩트 시트 요약입니다. 좌측의 타이틀 메인 카피와 균형을 잘 잡도록 요약된 문구로 기재해 주세요.
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {(localData.heroKpis || [
                  { id: "hk-1", label: "Career", value: "총 경력 7년+", desc: "중견기업 & 스타트업", icon: "Milestone" },
                  { id: "hk-2", label: "Role", value: "HR & Corporate Operations", desc: "인사총무팀 주임 및 스타트업 리드", icon: "ShieldCheck" },
                  { id: "hk-3", label: "Strength", value: "기준 수립 · 운영 안정화", desc: "사규 구축, 노무 리스크 제어", icon: "Network" },
                  { id: "hk-4", label: "Scope", value: "HR · GA · ER · Finance", desc: "인사·총무부터 회계·세무 지원까지", icon: "Landmark" }
                ]).map((kpi, idx) => (
                  <div key={kpi.id || idx} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b pb-2 border-slate-100">
                      <span className="text-xs font-bold text-blue-600">히어로 카드 #{idx + 1} ({kpi.label})</span>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">대항목 라벨 (Label)</label>
                      <input
                        type="text"
                        value={kpi.label}
                        onChange={(e) => updateHeroKpi(idx, "label", e.target.value)}
                        className="w-full mt-1 px-2 py-1.5 border border-slate-200 text-slate-700 text-xs rounded focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">대표 성과 및 지표 (Value)</label>
                      <input
                        type="text"
                        value={kpi.value}
                        onChange={(e) => updateHeroKpi(idx, "value", e.target.value)}
                        className="w-full mt-1 px-2 py-1.5 border border-slate-200 text-slate-900 font-bold text-xs rounded focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">간단 요약 설명 (Description)</label>
                      <input
                        type="text"
                        value={kpi.desc}
                        onChange={(e) => updateHeroKpi(idx, "desc", e.target.value)}
                        className="w-full mt-1 px-2 py-1.5 border border-slate-200 text-xs text-slate-600 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">매칭 아이콘 (Icon)</label>
                      <select
                        value={kpi.icon}
                        onChange={(e) => updateHeroKpi(idx, "icon", e.target.value)}
                        className="w-full mt-1 px-2 py-1.5 border border-slate-200 text-xs text-slate-700 rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white font-semibold"
                      >
                        <option value="Milestone"> Milestone (이정표 마일스톤)</option>
                        <option value="ShieldCheck"> ShieldCheck (방패 체크 노무)</option>
                        <option value="Network"> Network (네트워크 연계)</option>
                        <option value="Landmark"> Landmark (랜드마크 지식)</option>
                        <option value="Award"> Award (어워드/자격)</option>
                        <option value="Briefcase"> Briefcase (서류가방 업무)</option>
                        <option value="Users"> Users (협업/인사)</option>
                        <option value="TrendingUp"> TrendingUp (트렌드 성장)</option>
                        <option value="Calendar"> Calendar (일정/달력)</option>
                        <option value="Heart"> Heart (하트/복지)</option>
                        <option value="Globe"> Globe (글로벌/해외)</option>
                        <option value="BookOpen"> BookOpen (학습/지식)</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. STATS TAB */}
          {activeTab === "stats" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-600">주요 성과 요약 카드 목록 ({localData.stats.length}개)</span>
                <button
                  onClick={addStat}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  새 주요 성과 추가
                </button>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200/40 text-xs text-amber-800">
                💡 주요 성과는 사이트 전면 bento-grid 및 요약 카드에 노출되는 가장 중요한 성과 정보 카드입니다. 수치 중심의 성과가 돋보이도록 상세 적재해 주세요.
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {localData.stats.map((stat, idx) => (
                  <div key={stat.id} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b pb-2 border-slate-100">
                      <span className="text-xs font-bold text-blue-600">성과 지표 #{idx + 1}</span>
                      <button
                        onClick={() => removeStat(stat.id)}
                        className="text-red-500 hover:text-red-700 text-xs flex items-center gap-0.5"
                        title="지표 삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        지표 삭제
                      </button>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">성취 타이틀 라벨 (예: 사내 반복 문의율)</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => updateStatCard(idx, "label", e.target.value)}
                        className="w-full mt-1 px-2 py-1.5 border border-slate-200 text-slate-700 text-xs rounded focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">대표 성과 숫값 (예: 90% 절감 / 0건 수성)</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => updateStatCard(idx, "value", e.target.value)}
                        className="w-full mt-1 px-2 py-1.5 border border-slate-200 text-blue-700 font-bold text-xs rounded focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">상세 부가 공적 해설</label>
                      <input
                        type="text"
                        value={stat.description}
                        onChange={(e) => updateStatCard(idx, "description", e.target.value)}
                        className="w-full mt-1 px-2 py-1.5 border border-slate-200 text-xs text-slate-600 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. CAREER HISTORY TAB */}
          {activeTab === "career" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-600">등록된 회사/경력 요약 목록 ({localData.career.length}개)</span>
                <button
                  onClick={addCareer}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  새 경력 추가
                </button>
              </div>

              {localData.career.map((car, idx) => (
                <div key={car.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative space-y-4">
                  <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={car.badge !== undefined ? car.badge : `🏢 Career #${idx + 1}`}
                        onChange={(e) => handleCareerChange(idx, "badge", e.target.value)}
                        className="bg-slate-100 px-2 md:px-2.5 py-1 text-slate-600 font-bold text-xs rounded border border-transparent hover:border-slate-300 focus:bg-white focus:border-blue-500 outline-none w-28 md:w-32 transition-all text-center"
                        title="경력 표시 라벨 수정"
                      />
                      <h4 className="font-bold text-slate-800 text-sm">{car.companyName || "회사 등록"}</h4>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveCareer(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 border text-slate-400 rounded hover:bg-slate-50 disabled:opacity-30"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveCareer(idx, 'down')}
                        disabled={idx === localData.career.length - 1}
                        className="p-1 border text-slate-400 rounded hover:bg-slate-50 disabled:opacity-30"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeCareer(car.id)}
                        className="p-1 text-red-500 border border-red-100 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">회사명 (익명화 권장)</label>
                      <input
                        type="text"
                        value={car.companyName}
                        onChange={(e) => handleCareerChange(idx, "companyName", e.target.value)}
                        className="w-full px-3 py-1.5 border border-slate-200 text-xs rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">직무 및 역할 이름</label>
                      <input
                        type="text"
                        value={car.role}
                        onChange={(e) => handleCareerChange(idx, "role", e.target.value)}
                        className="w-full px-3 py-1.5 border border-slate-200 text-xs rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">재직 기간</label>
                      <input
                        type="text"
                        value={car.period}
                        onChange={(e) => handleCareerChange(idx, "period", e.target.value)}
                        className="w-full px-3 py-1.5 border border-slate-200 text-xs rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">역할 요약</label>
                    <textarea
                      rows={2}
                      value={car.description}
                      onChange={(e) => handleCareerChange(idx, "description", e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-200 text-xs rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  {/* Tasks nested list */}
                  <div className="space-y-2 border-t pt-3 border-slate-50">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5 flex-1 max-w-md">
                        <span className="text-xs font-bold text-slate-500 shrink-0" title="업무 헤더 아이콘">📌</span>
                        <input
                          type="text"
                          value={car.tasksTitle !== undefined ? car.tasksTitle : "주요 위임 책임 및 업무 (Key Tasks)"}
                          onChange={(e) => handleCareerChange(idx, "tasksTitle", e.target.value)}
                          className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-transparent hover:border-slate-200 focus:border-blue-500 font-bold text-xs text-slate-700 rounded px-2 py-1 outline-none transition-all"
                          placeholder="주요 실무 업무 타이틀"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => addCareerArrayItem(idx, "tasks")}
                        className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2.5 py-1.5 rounded shrink-0 transition-all"
                      >
                        업무 추가 +
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {car.tasks.map((task, tIdx) => (
                        <div key={tIdx} className="flex gap-2 items-center">
                          <span className="text-[10px] text-slate-400 shrink-0">#{tIdx + 1}</span>
                          <input
                            type="text"
                            value={task}
                            onChange={(e) => handleCareerArrayChange(idx, "tasks", tIdx, e.target.value)}
                            className="flex-1 px-2.5 py-1.5 border border-slate-200 text-xs rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                            placeholder="수행 업무 상세 내용"
                          />
                          <button
                            type="button"
                            onClick={() => removeCareerArrayItem(idx, "tasks", tIdx)}
                            className="text-red-400 hover:text-red-650 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Results nested list */}
                  <div className="space-y-2 border-t pt-3 border-slate-50">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5 flex-1 max-w-md">
                        <span className="text-xs font-bold text-emerald-600 shrink-0" title="성과 헤더 아이콘">🏆</span>
                        <input
                          type="text"
                          value={car.resultsTitle !== undefined ? car.resultsTitle : "부서 내 주도 성과 (Achievements)"}
                          onChange={(e) => handleCareerChange(idx, "resultsTitle", e.target.value)}
                          className="w-full bg-emerald-50/20 hover:bg-emerald-50/50 focus:bg-white border border-transparent hover:border-emerald-100 focus:border-emerald-500 font-bold text-xs text-emerald-800 rounded px-2 py-1 outline-none transition-all"
                          placeholder="부서 내 주요 성과 타이틀"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => addCareerArrayItem(idx, "results")}
                        className="text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1.5 rounded shrink-0 transition-all font-sans"
                      >
                        성과 추가 +
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {car.results.map((res, rIdx) => (
                        <div key={rIdx} className="flex gap-2 items-center">
                          <span className="text-[10px] text-emerald-500 shrink-0">#{rIdx + 1}</span>
                          <input
                            type="text"
                            value={res}
                            onChange={(e) => handleCareerArrayChange(idx, "results", rIdx, e.target.value)}
                            className="flex-1 px-2.5 py-1.5 border border-emerald-100 bg-emerald-50/10 text-xs text-slate-750 rounded-md focus:ring-1 focus:ring-emerald-500 outline-none"
                            placeholder="성취 성과 정량 및 정성 결과치"
                          />
                          <button
                            type="button"
                            onClick={() => removeCareerArrayItem(idx, "results", rIdx)}
                            className="text-red-400 hover:text-red-650 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. SELECTED CASES TAB */}
          {activeTab === "cases" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-600">등록된 상세 업무 사례 ({localData.cases.length}개)</span>
                <button
                  onClick={addCase}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  새 사례 추가
                </button>
              </div>

              {localData.cases.map((cs, index) => (
                <div key={cs.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={cs.badge !== undefined ? cs.badge : `Case.0${index + 1}`}
                        onChange={(e) => handleCaseChange(index, "badge", e.target.value)}
                        className="bg-sky-500/10 px-2 md:px-2.5 py-1 text-sky-700 font-bold text-xs rounded border border-transparent hover:border-sky-305 focus:bg-white focus:border-blue-500 outline-none w-20 md:w-24 transition-all text-center"
                        title="사례 표시 라벨 수정"
                      />
                      <h4 className="font-bold text-slate-800 text-sm">{cs.title || "새 실무 사례"}</h4>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveCase(index, 'up')}
                        disabled={index === 0}
                        className="p-1 border text-slate-400 rounded hover:bg-slate-50 disabled:opacity-30"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveCase(index, 'down')}
                        disabled={index === localData.cases.length - 1}
                        className="p-1 border text-slate-400 rounded hover:bg-slate-50 disabled:opacity-30"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeCase(cs.id)}
                        className="p-1 text-red-500 border border-red-100 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">제목 (Title)</label>
                      <input
                        type="text"
                        value={cs.title}
                        onChange={(e) => handleCaseChange(index, "title", e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-200 text-xs font-medium rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">소속 기수 / 회사명</label>
                      <input
                        type="text"
                        value={cs.companyName}
                        onChange={(e) => handleCaseChange(index, "companyName", e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-200 text-xs rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">수행 시기 기수</label>
                      <input
                        type="text"
                        value={cs.period}
                        onChange={(e) => handleCaseChange(index, "period", e.target.value)}
                        className="w-full px-2 py-1.5 border border-slate-200 text-xs rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-red-700/80 mb-1">🔴 문제 영역 (PROBLEM)</label>
                    <textarea
                      rows={3}
                      value={cs.problem}
                      onChange={(e) => handleCaseChange(index, "problem", e.target.value)}
                      className="w-full p-2.5 bg-red-50/10 border border-slate-200 text-xs rounded-lg outline-none focus:ring-1 focus:ring-blue-500 leading-normal"
                    />
                  </div>

                  {/* EXECUTION */}
                  <div className="space-y-2 border-t pt-3 border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-700">🔵 실행 행동 (EXECUTION) 목록</span>
                      <button
                        type="button"
                        onClick={() => addCaseArrayItem(index, "execution")}
                        className="text-[10px] bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold px-2 py-1 rounded"
                      >
                        행동 추가 +
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {cs.execution.map((exec, eIdx) => (
                        <div key={eIdx} className="flex gap-2 items-center">
                          <span className="text-[10px] text-blue-500 shrink-0">#{eIdx + 1}</span>
                          <textarea
                            rows={1}
                            value={exec}
                            onChange={(e) => handleCaseArrayChange(index, "execution", eIdx, e.target.value)}
                            className="flex-1 px-2 py-1.5 border border-slate-200 text-xs rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeCaseArrayItem(index, "execution", eIdx)}
                            className="text-red-400 hover:text-red-650 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RESULT */}
                  <div className="space-y-2 border-t pt-3 border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-700">🟢 성과 결과 (RESULT) 목록</span>
                      <button
                        type="button"
                        onClick={() => addCaseArrayItem(index, "result")}
                        className="text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded"
                      >
                        결과 추가 +
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {cs.result.map((res, rIdx) => (
                        <div key={rIdx} className="flex gap-2 items-center">
                          <span className="text-[10px] text-emerald-500 shrink-0">#{rIdx + 1}</span>
                          <textarea
                            rows={1}
                            value={res}
                            onChange={(e) => handleCaseArrayChange(index, "result", rIdx, e.target.value)}
                            className="flex-1 px-2 py-1.5 border border-slate-200 bg-emerald-50/5 text-xs rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeCaseArrayItem(index, "result", rIdx)}
                            className="text-red-400 hover:text-red-650 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">참고 사항 및 예외 메모 (선택 사항)</label>
                    <input
                      type="text"
                      value={cs.note || ""}
                      onChange={(e) => handleCaseChange(index, "note", e.target.value)}
                      placeholder="사내 특이 사항 기재 (예: 회사 내부 사정으로 완결되지 못함)"
                      className="w-full px-2 py-1.5 border border-slate-200 text-xs rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 5. SKILLS TAB */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              {/* 섹션 전체 타이틀 편집기 */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <label className="block text-xs font-bold text-slate-700">⚙️ 실무 역량 섹션 대타이틀 문구 수정</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={localData.skillsTitle !== undefined ? localData.skillsTitle : "실무 역량 (HR & Corporate Skills)"}
                    onChange={(e) => syncData({ ...localData, skillsTitle: e.target.value })}
                    className="flex-1 px-3 py-1.5 border border-slate-200 text-xs rounded-lg outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                    placeholder="예: 실무 역량 (HR & Corporate Skills)"
                  />
                  {localData.skillsTitle && (
                    <button
                      type="button"
                      onClick={() => syncData({ ...localData, skillsTitle: "" })}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs rounded-lg font-bold"
                    >
                      초기화
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-600">실무 역량(SKILLS) 대분류 목록 ({localData.skills.length}개)</span>
                <button
                  onClick={addSkillCategory}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  새 자격 부서 추가
                </button>
              </div>

              {localData.skills.map((cat, catIdx) => (
                <div key={cat.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="font-bold text-xs text-slate-400">대항목</span>
                      <input
                        type="text"
                        value={cat.categoryName}
                        onChange={(e) => updateSkillCategoryName(catIdx, e.target.value)}
                        className="px-3 py-1 border border-slate-200 text-xs font-bold rounded-md outline-none focus:border-slate-400"
                      />
                    </div>
                    <button
                      onClick={() => removeSkillCategory(cat.id)}
                      className="text-red-500 hover:text-red-750 text-xs flex items-center gap-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      분류 삭제
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500">지정 기술 요산 ({cat.skills.length}개)</span>
                      <button
                        type="button"
                        onClick={() => addSkillToCategory(catIdx)}
                        className="text-[10px] bg-slate-100 p-1 px-2 rounded hover:bg-slate-200 text-slate-700 font-bold"
                      >
                        세부 스킬 추가 +
                      </button>
                    </div>

                    {cat.skills.map((sk, skIdx) => (
                      <div key={skIdx} className="border border-slate-100 p-3 bg-slate-50/20 rounded-lg flex flex-col gap-2 relative">
                        <button
                          type="button"
                          onClick={() => removeSkillFromCategory(catIdx, skIdx)}
                          className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="w-4/5">
                          <label className="block text-[9px] font-bold text-slate-500">스킬명 (예: 급여 및 보상 실무)</label>
                          <input
                            type="text"
                            value={sk.name}
                            onChange={(e) => updateSkill(catIdx, skIdx, "name", e.target.value)}
                            className="w-full mt-1 px-2 py-1 border border-slate-200 text-slate-800 text-xs font-bold rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-500">상세 설명</label>
                          <input
                            type="text"
                            value={sk.desc}
                            onChange={(e) => updateSkill(catIdx, skIdx, "desc", e.target.value)}
                            className="w-full mt-1 px-2 py-1 border border-slate-200 text-slate-600 text-xs rounded"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 6. STRENGTHS TAB */}
          {activeTab === "strengths" && (
            <div className="space-y-6">
              {/* 섹션 전체 타이틀 편집기 */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <label className="block text-xs font-bold text-slate-700">⚙️ 업무상 철학 및 강점 섹션 대타이틀 문구 수정</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={localData.strengthsTitle !== undefined ? localData.strengthsTitle : "적극적 업무 강점 (Core Philosophies)"}
                    onChange={(e) => syncData({ ...localData, strengthsTitle: e.target.value })}
                    className="flex-1 px-3 py-1.5 border border-slate-200 text-xs rounded-lg outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                    placeholder="예: 적극적 업무 강점 (Core Philosophies)"
                  />
                  {localData.strengthsTitle && (
                    <button
                      type="button"
                      onClick={() => syncData({ ...localData, strengthsTitle: "" })}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs rounded-lg font-bold"
                    >
                      초기화
                    </button>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-600">인사·경영지원인으로서의 태도 및 강점 ({localData.strengths.length}개)</span>
                <button
                  onClick={addStrength}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  업무 강점 추가
                </button>
              </div>

              {localData.strengths.map((str, idx) => (
                <div key={str.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3 relative">
                  <button
                    onClick={() => removeStrength(str.id)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div>
                    <label className="block text-xs font-bold text-slate-500">강점 타이틀 #{idx + 1}</label>
                    <input
                      type="text"
                      value={str.title}
                      onChange={(e) => handleStrengthChange(idx, "title", e.target.value)}
                      className="w-3/4 mt-1 px-2 py-1.5 border border-slate-200 text-xs font-bold rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500">세부 전술 해설구</label>
                    <textarea
                      rows={2}
                      value={str.description}
                      onChange={(e) => handleStrengthChange(idx, "description", e.target.value)}
                      className="w-full mt-1 p-2 border border-slate-200 text-xs text-slate-650 rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 7. CREDENTIALS TAB */}
          {activeTab === "credentials" && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">학력 및 공인 자격증 목록 ({localData.credentials.length}개)</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => addCredential("education")}
                    className="px-2.5 py-1.5 bg-slate-105 hover:bg-slate-200 border border-slate-300 text-slate-700 font-bold text-[11px] rounded"
                  >
                    학력 추가+
                  </button>
                  <button
                    type="button"
                    onClick={() => addCredential("cert")}
                    className="px-2.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-[11px] rounded"
                  >
                    자격증 추가+
                  </button>
                </div>
              </div>

              {localData.credentials.map((cred, idx) => (
                <div key={cred.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => removeCredential(cred.id)}
                    className="absolute top-3 right-3 text-slate-405 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                      cred.type === 'education' ? 'bg-emerald-100 text-emerald-850' : 'bg-blue-105 bg-blue-50 text-blue-800'
                    }`}>
                      {cred.type === 'education' ? '학력' : '자격/어학'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-sans">Index #{idx + 1}</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500">기관/등급/학교명</label>
                      <input
                        type="text"
                        value={cred.title}
                        onChange={(e) => handleCredentialChange(idx, "title", e.target.value)}
                        className="w-full mt-1 px-2 py-1.5 border border-slate-200 text-xs font-bold rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500">전공/상태/인증처</label>
                      <input
                        type="text"
                        value={cred.subtitle}
                        onChange={(e) => handleCredentialChange(idx, "subtitle", e.target.value)}
                        className="w-full mt-1 px-2 py-1.5 border border-slate-200 text-xs rounded"
                      />
                    </div>
                  </div>

                  {cred.type === 'cert' && (
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500">자격증이 대변하는 직무 내재 가치 (마우스 오버나 칩에 표출)</label>
                      <input
                        type="text"
                        value={cred.description || ""}
                        onChange={(e) => handleCredentialChange(idx, "description", e.target.value)}
                        className="w-full mt-1 px-2 py-1.5 border border-slate-200 text-xs text-slate-600 rounded"
                        placeholder="예: 4대보험 실무, 퇴직금 정산, 세무 회계 집행 역량 대변"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 8. CONTACT TAB */}
          {activeTab === "contact" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <h3 className="font-bold text-slate-700 text-sm border-b pb-3 border-slate-100">연락처 & 이력서 다운로드 링크</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">공개 이메일 주소</label>
                  <input
                    type="email"
                    value={localData.contact.email}
                    onChange={(e) => updateContact("email", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">이력서 다운로드 PDF 경로 (# 기판 유지)</label>
                  <input
                    type="text"
                    value={localData.contact.resumeUrl}
                    onChange={(e) => updateContact("resumeUrl", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">포트폴리오 주소 복사용 링크</label>
                <input
                  type="text"
                  value={localData.contact.portfolioUrl}
                  onChange={(e) => updateContact("portfolioUrl", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">상단 뱃지 텍스트 (예: GET IN TOUCH)</label>
                <input
                  type="text"
                  value={localData.contact.badgeText !== undefined ? localData.contact.badgeText : "GET IN TOUCH"}
                  onChange={(e) => updateContact("badgeText", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="예: GET IN TOUCH"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">연락처 마무리 추천 문구 (Get In Touch Message)</label>
                <textarea
                  rows={4}
                  value={localData.contact.closingMessage}
                  onChange={(e) => updateContact("closingMessage", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">하단 한 줄 전문성 핵심 요약 / 파트너 문구</label>
                <textarea
                  rows={2}
                  value={localData.contact.disclaimer !== undefined ? localData.contact.disclaimer : "조직의 안정적 기준을 만들고, 사규와 법문 사이에서 균형을 잡는 Business Support 실무 파트너."}
                  onChange={(e) => updateContact("disclaimer", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
                  placeholder="예: 조직의 안정적 기준을 만들고, 사규와 법문 사이에서 균형을 잡는 Business Support 실무 파트너."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">하단 카피라이트 / 저작권 문구</label>
                <textarea
                  rows={2}
                  value={localData.contact.copyright !== undefined ? localData.contact.copyright : `© 2026 ${localData.contact.email.split("@")[0].toUpperCase()}. All rights reserved. S.M. Choi Portfolio Edition V2.`}
                  onChange={(e) => updateContact("copyright", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
                  placeholder="예: © 2026 MINS6060. All rights reserved. S.M. Choi Portfolio Edition V2."
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
