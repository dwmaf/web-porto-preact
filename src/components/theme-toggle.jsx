import { useTheme } from "../context/theme-context";
import { Sun, Moon } from "feather-icons-react";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-1.5 rounded-full border transition-all duration-300 group ${
        isDark 
          ? "bg-slate-800/50 border-slate-700 text-yellow-400 hover:border-yellow-400/50" 
          : "bg-orange-50 border-orange-200 text-slate-700 hover:border-slate-500/50"
      }`}
      title={isDark ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
    >
      {isDark ? (
        <Sun size={18} className="transition-transform group-hover:rotate-45" />
      ) : (
        <Moon size={18} className="transition-transform group-hover:-rotate-12 fill-slate-700" />
      )}
    </button>
  );
}
