import { useState, useEffect, forwardRef } from "preact/compat";
import { Exp } from "./exp";
import supabase from "../../supabaseClient";
export const Experiences = forwardRef((props, ref) => {
  const [experiences, setExperiences] = useState([]);
  useEffect(() => {
    getExperiences();
  }, []);
  async function getExperiences() {
    const { data } = await supabase.from("experiences").select();
    setExperiences(data);
  }
  return (
    <>
      <h2 ref={ref} className="text-sm font-bold text-slate-200 mb-4 mt-24">
        EXPERIENCE
      </h2>
      {experiences.map((exp) => (
        <Exp
          key={exp.id}
          duration={exp.duration}
          timestamp={exp.timestamp}
          position={exp.position}
          place={exp.place}
          description={exp.description}
          techs={exp.techs}
        />
      ))}
      
    </>
  );
});
