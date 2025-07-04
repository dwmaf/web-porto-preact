import { useState, useEffect } from "preact/compat";
import { forwardRef } from "preact/compat";
import { Project } from "./project";
import { Subheader } from "./subheader";
import supabase from "../../supabaseClient";
export const Projects = forwardRef((props, ref) => {
  const [projects, setProjects] = useState([]);
  const [hoverStates, setHoverStates] = useState([
    { isHovering: false, wasHovering: false },
  ]);
  useEffect(() => {
    getProjects();
  }, []);
  async function getProjects() {
    const { data } = await supabase
      .from("projects")
      .select()
      .order("date", { ascending: false });
    setProjects(data);
  }
  return (
    <>
      <div>
        <Subheader
          label="PROJECTS"
          index={0} // Karena ini satu-satunya, index-nya 0
          hoverStates={hoverStates}
          setHoverStates={setHoverStates}
          // onClick bisa dikosongkan jika tidak ada aksi
          onClick={() => {}}
        />
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <Project
              thumbnail={project.thumbnail}
              alt="mockup-image"
              appname={project.appname}
              description={project.description}
              techs={project.techs}
            />
          ))}
        </div>
      </div>
    </>
  );
});
