import { useLanguage } from "../context/language-context";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 group"
      title={language === "id" ? "Ganti ke English" : "Switch to Indonesian"}
    >
      <div className="flex items-center gap-1.5">
        <span className={`text-xs font-bold ${language === 'id' ? 'text-cyan-400' : 'text-slate-500'}`}>ID</span>
        <div className="w-px h-3 bg-slate-700" />
        <span className={`text-xs font-bold ${language === 'en' ? 'text-cyan-400' : 'text-slate-500'}`}>EN</span>
      </div>
    </button>
  );
}
