import { useEffect, useState, useRef } from "preact/hooks";
import { route } from "preact-router";
import { getProjectBySlug } from "../data/projects-data";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  User,
  Layers,
} from "feather-icons-react";
import techData from "../assets/techs.json";
import thumbnailData from "../assets/thumbnails.json";

export function ProjectDetail({ slug }) {
  const [project, setProject] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const p = getProjectBySlug(slug);
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
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const allImages =
    project.gallery.length > 0
      ? project.gallery
      : [thumbnailData[project.thumbnail]?.thumb_source].filter(Boolean);

  return (
    <div
      className={`min-h-screen bg-slate-900 transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
    >

      {/* Sticky Back Button */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/70 border-b border-slate-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => route("/")}
            className="group flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors duration-300"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse mb-1" />
            <span className="text-xs text-slate-500 font-medium tracking-wider uppercase">
              Project Detail
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">    
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 leading-tight mb-3">
              {project.appname}
            </h1>
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-10 items-start">
            {/* Left Column — Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-6 sm:p-8">
                <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4">
                  About This Project
                </h3>
                <p className="text-slate-300 leading-relaxed text-base">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Right Column — Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-6 sticky top-20">
                <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-5">
                  Project Info
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User size={16} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                        Role
                      </p>
                      <p className="text-slate-200 text-sm font-medium mt-0.5">
                        {project.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Calendar size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                        Year
                      </p>
                      <p className="text-slate-200 text-sm font-medium mt-0.5">
                        {project.year}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="h-px bg-slate-700/50 my-5" />
                <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {project.techs.map((techId) => (
                    <div
                      key={techId}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-700/30 border border-slate-600/30 hover:border-cyan-500/30 transition-colors duration-300"
                    >
                      <div
                        className={`rounded-lg w-7 h-7 flex items-center justify-center ${techData[techId]["bg-spesial"]}`}
                      >
                        <img
                          src={techData[techId].icon_source}
                          alt={techData[techId].techname}
                          className="w-4"
                        />
                      </div>
                      <span className="text-sm text-slate-300 font-medium">
                        {techData[techId].techname}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-2">
              Project Showcase
            </h3>
            <div className="flex flex-col gap-6">
              {allImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-xl border border-slate-700/40"
                >
                  <img
                    src={img}
                    alt={`${project.appname} screenshot ${idx + 1}`}
                    className="w-full h-auto object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </div>
      </div>

      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="border-t border-slate-800/50 pt-8 flex items-center justify-center">
          <button
            onClick={() => route("/")}
            className="group flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors duration-300"
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
