import { useState } from "preact/compat";
import { forwardRef } from "preact/compat";
import { Project } from "./project";
import { Subheader } from "./subheader";
import { projectsData } from "../data/projects-data";

import { useLanguage, t } from "../context/language-context";

export const Projects = forwardRef((props, ref) => {
  const { language } = useLanguage();
  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 3);
  const [hoverStates, setHoverStates] = useState([
    { isHovering: false, wasHovering: false },
  ]);

  return (
    <>
      <div>
        <Subheader
          label={{ id: "PROYEK UTAMA", en: "FEATURED PROJECTS" }}
          index={0}
          number="03"
          hoverStates={hoverStates}
          setHoverStates={setHoverStates}
          onClick={() => {}}
        />
        <div className="flex flex-col gap-4">
          {featuredProjects.map((project) => (
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
        <div className="mt-8">
          <a
            href="/archive"
            className="group inline-flex items-center gap-2 text-md font-semibold text-teal-500 transition-all hover:text-teal-600 dark:hover:text-teal-400"
          >
            <span className="">{t({ id: "Lihat Semua Proyek", en: "View All Projects" }, language)}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </>
  );
});
