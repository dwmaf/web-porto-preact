import { useState, useEffect } from "preact/compat";
import { forwardRef } from "preact/compat";
import { Project } from "./project";
import supabase from "../../supabaseClient";
export const Projects = forwardRef((props, ref) => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    getProjects();
  }, []);
  async function getProjects() {
    const { data } = await supabase.from("projects").select();
    setProjects(data);
  }
  return (
    <>
      <h2 ref={ref} className="text-sm font-bold text-slate-200 mb-4 mt-24">
        PROJECTS
      </h2>
      {projects.map((project) => (
        <Project
          thumbnail={project.thumbnail}
          alt="mockup-image"
          appname={project.appname}
          description={project.description}
          techs={project.techs}
        />
      ))}
    </>
  );
});
