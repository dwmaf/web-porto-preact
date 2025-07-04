import { useState, useEffect, forwardRef } from "preact/compat";
import { Exp } from "./exp";
import { Subheader } from "./subheader";
import techData from "../assets/techs.json";
import supabase from "../../supabaseClient";

export const Skills = forwardRef((props, ref) => {
  const [hoverStates, setHoverStates] = useState([
    { isHovering: false, wasHovering: false },
  ]);
  return (
    <>
      <div>
        <Subheader
          label="SKILLS"
          index={0} // Karena ini satu-satunya, index-nya 0
          hoverStates={hoverStates}
          setHoverStates={setHoverStates}
          // onClick bisa dikosongkan jika tidak ada aksi
          onClick={() => {}}
        />
        <div className="flex flex-row flex-wrap justify-center gap-4">
          {techData.map((tech) => (
            <div
              key={tech.techname}
              className={`group relative rounded-3xl w-20 h-20 flex items-center justify-center bg-slate-800 transition-transform duration-200 ease-in-out hover:scale-110`}
            >
              <img
                src={tech.icon_source}
                alt={tech.techname}
                className={`w-10`}
              />
              <span className="absolute -top-5 scale-0 rounded bg-slate-700 px-2 py-1 text-xs text-white transition-all group-hover:scale-100">
                {tech.techname}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});
