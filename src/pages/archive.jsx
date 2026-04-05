import { useState, useEffect } from "preact/hooks";
import { projectsData } from "../data/projects-data";
import { personalProjectsData } from "../data/personal-projects-data";
import { Project } from "../components/project";
import { useLanguage, t } from "../context/language-context";
import { ArrowLeft } from "feather-icons-react";
import { route } from "preact-router";
import { Subheader } from "../components/subheader";

export function Archive() {
  const { language } = useLanguage();
  const [hoverStates, setHoverStates] = useState([
    { isHovering: false, wasHovering: false }, // MAIN PROJECTS
    { isHovering: false, wasHovering: false }, // PERSONAL PROJECTS
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const title = {
    id: "Arsip Proyek",
    en: "Project Archive"
  };

  const subtitle = {
    id: "Koleksi lengkap proyek yang pernah saya kerjakan.",
    en: "A complete collection of projects I've worked on."
  };

  const mainSectionTitle = {
    id: "Proyek Utama",
    en: "Main Projects"
  };

  const personalSectionTitle = {
    id: "Proyek Pribadi",
    en: "Personal Projects"
  };

  const backText = {
    id: "Kembali ke Beranda",
    en: "Back to Home"
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-200 p-6 md:p-12 lg:p-20 font-['League_Spartan',_sans-serif] transition-colors duration-300">
      <div className="mx-auto">
        <button
          onClick={() => route("/")}
          className="group flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 mb-8 transition-colors"
        >
          <ArrowLeft
            size={20}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span className="font-['Geist_Mono',_monospace] text-sm">
            {t(backText, language)}
          </span>
        </button>

        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 transition-colors">
            {t(title, language)}
          </h1>
          <p className="text-slate-600 dark:text-blue-custom text-lg max-w-2xl transition-colors">
            {t(subtitle, language)}
          </p>
        </header>

        <section className="mb-20">
          <Subheader
            label={mainSectionTitle}
            index={0}
            number="01"
            hoverStates={hoverStates}
            setHoverStates={setHoverStates}
            onClick={() => {}}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project) => (
              <Project
                key={project.slug}
                thumbnail={project.thumbnail}
                alt={`${project.appname} mockup`}
                appname={project.appname}
                description={project.description}
                techs={project.techs}
                slug={project.slug}
                role={project.role}
              />
            ))}
          </div>
        </section>

        <section className="mb-20">
          <Subheader
            label={personalSectionTitle}
            index={1}
            number="02"
            hoverStates={hoverStates}
            setHoverStates={setHoverStates}
            onClick={() => {}}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalProjectsData.map((project) => (
              <Project
                key={project.slug}
                thumbnail={project.thumbnail}
                alt={`${project.appname} mockup`}
                appname={project.appname}
                description={project.description}
                techs={project.techs}
                slug={project.slug}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
