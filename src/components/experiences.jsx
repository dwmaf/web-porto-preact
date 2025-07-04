import { useState, useEffect, forwardRef, useRef } from "preact/compat";
import { Exp } from "./exp";
import { Subheader } from "./subheader";
import supabase from "../../supabaseClient";
export const Experiences = forwardRef((props, ref) => {
  const [experiences, setExperiences] = useState([]);
  // 2. Tambahkan state yang dibutuhkan oleh Subheader
  const [hoverStates, setHoverStates] = useState([
    { isHovering: false, wasHovering: false },
  ]);
  useEffect(() => {
    getExperiences();
  }, []);
  async function getExperiences() {
    const { data } = await supabase
      .from("experiences")
      .select()
      .order("date", { ascending: true });
    setExperiences(data);
  }
  
  return (
    <section
      
    >
      <div>
        <Subheader
          label="EXPERIENCES"
          index={0} // Karena ini satu-satunya, index-nya 0
          hoverStates={hoverStates}
          setHoverStates={setHoverStates}
          // onClick bisa dikosongkan jika tidak ada aksi
          onClick={() => {}}
        />
        
        
        <div className="flex flex-col gap-4">
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
        </div>
      </div>
     
    </section>
  );
});
