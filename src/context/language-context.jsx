import { createContext } from "preact";
import { useState, useContext, useEffect } from "preact/hooks";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Ambil bahasa dari localStorage atau default ke 'id'
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("portfolio_lang") || "id";
  });

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLang = prev === "id" ? "en" : "id";
      localStorage.setItem("portfolio_lang", newLang);
      return newLang;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

// Helper untuk memilih teks berdasarkan bahasa
export function t(obj, lang) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj["id"] || "";
}
