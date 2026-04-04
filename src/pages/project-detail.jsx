import { useEffect, useState, useRef } from "preact/hooks";
import { route } from "preact-router";
import { getProjectBySlug as getMainProject } from "../data/projects-data";
import { getProjectBySlug as getPersonalProject } from "../data/personal-projects-data";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  User,
  Layers,
} from "feather-icons-react";
import { useLanguage, t } from "../context/language-context";
import techData from "../assets/techs.json";
import thumbnailData from "../assets/thumbnails.json";

export function ProjectDetail({ slug }) {
  const { language } = useLanguage();
  const [project, setProject] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const p = getMainProject(slug) || getPersonalProject(slug);
    if (!p) {
      route("/", true);
      return;
    }
    setProject(p);
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: "instant" });
    // Trigger fade-in
    requestAnimationFrame(() => {
      setTimeout(() => setLoaded(true), 50);
    });
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center transition-colors">
        <div className="w-8 h-8 border-2 border-cyan-600 dark:border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const allImages =
    project.gallery.length > 0
      ? project.gallery
      : [thumbnailData[project.thumbnail]?.thumb_source].filter(Boolean);

  return (
    <div
      className={`min-h-screen bg-slate-50 dark:bg-slate-900 transition-all duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Sticky Back Button */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-slate-50/80 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800/50 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => route("/")}
            className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse mb-1" />
            <span className="text-xs text-slate-500 font-medium tracking-wider uppercase transition-colors">
              Project Detail
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-10 transition-colors">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-3 transition-colors">
            {project.appname}
          </h1>
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-10 items-start">
          {/* Left Column — Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/30 p-6 sm:p-8 shadow-sm dark:shadow-none transition-all">
              <h3 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-4 transition-colors">
                About This Project
              </h3>
              {typeof t(project.description, language) === "string" ? (
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base text-justify transition-colors">
                  {t(project.description, language)}
                </p>
              ) : (
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-3">
                       <span className="w-6 h-[2px] bg-cyan-600"></span>
                       {language === "id" ? "Masalah yang Diatasi" : "Problem I Solved"}
                    </h4>
                    <ul className="space-y-1.5">
                      {t(project.description, language).problem.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 leading-relaxed">
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

                  <div>
                    <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-3">
                       <span className="w-6 h-[2px] bg-cyan-600"></span>
                       {language === "id" ? "Fitur Utama" : "Key Features"}
                    </h4>
                    <ul className="space-y-1.5">
                      {t(project.description, language).feature.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300 leading-relaxed">
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
                </div>
              )}
            </div>
          </div>

          {/* Right Column — Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700/30 p-6 sticky top-20 shadow-sm dark:shadow-none transition-all">
              <h3 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-5 transition-colors">
                Project Info
              </h3>
              <div className="gap-4 flex lg:flex-col">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User size={16} className="text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-medium transition-colors">
                      Role
                    </p>
                    <p className="text-slate-800 dark:text-slate-200 text-sm font-medium mt-0.5 transition-colors">
                      {t(project.role, language)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Calendar size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider font-medium transition-colors">
                      Year
                    </p>
                    <p className="text-slate-800 dark:text-slate-200 text-sm font-medium mt-0.5 transition-colors">
                      {project.year}
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-px bg-slate-200 dark:bg-slate-700/50 my-5 transition-colors" />
              <h3 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-4 transition-colors">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.techs.map((techId) => {
                  const tech = techData.find((t) => t.id === techId);
                  if (!tech) return null;
                  return (
                    <div
                      key={techId}
                      className="flex items-center gap-1"
                    >
                      <div
                        className="py-2 px-3 gap-2 rounded-2xl flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-transparent"
                      >
                        <img
                          src={tech.icon_source}
                          loading="lazy"
                          alt={tech.techname}
                          className="h-4"
                        />
                      <span className="text-sm text-slate-800 dark:text-white">
                        {tech.techname}
                      </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Visit Website Button */}
              {project.link && (
                <div className="mt-8">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    Visit Website
                    <ExternalLink
                      size={16}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2 transition-colors">
            Project Showcase
          </h3>
          <div className="flex flex-col gap-6">
            {allImages.map((img, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700/40 transition-colors shadow-sm dark:shadow-none"
              >
                <img
                  src={img}
                  loading="lazy"
                  alt={`${project.appname} screenshot ${idx + 1}`}
                  className="w-full h-auto object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="border-t border-slate-200 dark:border-slate-800/50 pt-8 flex items-center justify-center transition-colors">
          <button
            onClick={() => route("/")}
            className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span className="text-sm">Back to all projects</span>
          </button>
        </div>
      </div>
    </div>
  );
}
