import { useState } from "preact/compat";
import { forwardRef } from "preact/compat";
import { Project } from "./project";
import { Subheader } from "./subheader";
import { personalProjectsData } from "../data/personal-projects-data";

export const PersonalProjects = forwardRef((props, ref) => {
  const [hoverStates, setHoverStates] = useState([
    { isHovering: false, wasHovering: false },
  ]);

  return (
    <>
      <div>
        <Subheader
          label={{ id: "PROYEK PRIBADI", en: "PERSONAL PROJECTS" }}
          index={0}
          hoverStates={hoverStates}
          setHoverStates={setHoverStates}
          onClick={() => {}}
        />
        <div className="flex flex-col gap-4">
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
      </div>
    </>
  );
});
