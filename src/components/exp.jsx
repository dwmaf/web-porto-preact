import { useLanguage, t } from "../context/language-context";
import techData from "../assets/techs.json";

export function Exp({
  timestamp,
  duration,
  position,
  place,
  description,
  techs,
}) {
  const { language } = useLanguage();
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-transparent shadow-sm dark:shadow-none transition-all">
      <h6 className="flex items-center w-full text-slate-500 dark:text-blue-custom text-sm gap-1 transition-colors">
        <span>{timestamp}</span>
        <span className="text-xs leading-none">•</span>
        <span>{t(duration, language)} </span>
      </h6>
      <h3 className="font-['Geist_Mono',_monospace] uppercase text-cyan-600 dark:text-cyan-500 font-extrabold text-xl tracking-wider transition-colors">
          {t(position, language)}
      </h3>
      <h4 className="text-slate-700 dark:text-slate-300 font-bold text-lg transition-colors">{place}</h4>
      <p className="mb-2 text-slate-600 dark:text-blue-custom text-sm w-full text-justify transition-colors">
        {t(description, language)}
      </p>
      {/* <hr className="w-full border-t-1 border-slate-200 dark:border-gray-600 opacity-50 mb-3 transition-colors" /> */}
      <div className="flex flex-wrap gap-1 sm:gap-3">
        {techs.map((techId) => {
          const tech = techData.find((t) => t.id === techId);
          if (!tech) return null;

          return (
            <div className="flex items-center" key={techId}>
              <div className="py-1 sm:py-2 px-2 sm:px-3 gap-2 rounded-2xl flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-transparent">
                <img
                  src={tech.icon_source}
                  loading="lazy"
                  alt={tech.techname}
                  className={`h-4`}
                />
                <span className="text-sm text-slate-800 dark:text-white">
                  {tech.techname}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
