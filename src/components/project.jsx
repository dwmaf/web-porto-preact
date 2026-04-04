import { route } from "preact-router";
import techData from "../assets/techs.json";
import thumbnailData from "../assets/thumbnails.json";
import { useLanguage, t } from "../context/language-context";

export function Project({
  thumbnail,
  appname,
  description,
  techs,
  alt,
  slug,
  role,
}) {
  const { language } = useLanguage();
  const handleClick = () => {
    route(`/project/${slug}`);
  };

  return (
    <div
      className="bg-white dark:bg-slate-900 p-4 rounded-2xl cursor-pointer group transition-all duration-300 hover:ring-1 hover:ring-cyan-500/30 hover:shadow-lg dark:hover:shadow-cyan-900/10 hover:-translate-y-1 border border-slate-200 dark:border-transparent shadow-sm dark:shadow-none"
      onClick={handleClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleClick();
      }}
    >
      <div className="relative overflow-hidden mb-3">
        <img
          src={thumbnailData[thumbnail].thumb_source}
          loading="lazy"
          alt={alt}
          className="w-full max-h-80 object-cover object-top rounded-sm border border-cyan-200 text-cyan-100 transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 dark:group-hover:bg-slate-900/30 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-600 dark:bg-cyan-500/90 text-white text-sm font-medium shadow-lg">
            View Project
          </span>
        </div>
      </div>
      <h5 className="mb-3 text-cyan-600 dark:text-cyan-500 text-xl font-bold flex items-center gap-2 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
        {appname}
      </h5>
      {/* Description Section */}
      <div className="mb-4 space-y-3">
        {typeof t(description, language) === "string" ? (
          <p className="text-slate-600 dark:text-slate-300 text-sm w-full line-clamp-3 transition-colors">
            {t(description, language)}
          </p>
        ) : (
          <div className="space-y-3">
            {/* What problem I solved */}
            <div>
              <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-3">
                <span className="w-6 h-[2px] bg-cyan-600"></span>
                {language === "id"
                  ? "Masalah yang Diatasi"
                  : "Problem I Solved"}
              </p>
              <ul className="space-y-1.5 list-none">
                {t(description, language).problem.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-slate-600 dark:text-blue-custom leading-relaxed"
                  >
                    <img
                      src="/ai-star-icon-v2.png"
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      alt="AI Icon"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What feature I make */}
            <div>
              <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-3">
                <span className="w-6 h-[2px] bg-cyan-600"></span>
                {language === "id" ? "Fitur Utama" : "Key Features"}
              </p>
              <ul className="space-y-1.5 list-none">
                {t(description, language).feature.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-slate-600 dark:text-slate-300 leading-relaxed"
                  >
                    <img
                      src="/ai-star-icon-v2.png"
                      className="w-4 h-4 flex-shrink-0 mt-1"
                      alt="AI Icon"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {techs.map((techId) => {
          const tech = techData.find((t) => t.id === techId);
          if (!tech) return null;

          return (
            <div
              key={techId}
              className="flex items-center gap-1 py-2 px-3 gap-2 rounded-2xl flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-transparent"
            >
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
          );
        })}
      </div>
    </div>
  );
}
