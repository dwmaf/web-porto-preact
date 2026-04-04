import { useState, useEffect, forwardRef } from "preact/compat";
import { Subheader } from "./subheader";
import techData from "../assets/techs.json";

export const Skills = forwardRef((props, ref) => {
  const [hoverStates, setHoverStates] = useState([
    { isHovering: false, wasHovering: false },
  ]);
  return (
    <>
      <div>
        <Subheader
          label={{ id: "KEAHLIAN", en: "TECH STACK" }}
          index={0}
          number="02"
          hoverStates={hoverStates}
          setHoverStates={setHoverStates}
          // onClick bisa dikosongkan jika tidak ada aksi
          onClick={() => {}}
        />
        <div className="flex flex-row flex-wrap justify-center gap-3">
          {techData.map((tech) => (
            <div
              key={tech.techname}
              className="py-2 px-3 gap-2 rounded-2xl flex items-center justify-center bg-white dark:bg-slate-700 border border-slate-200 dark:border-transparent transition-all shadow-sm dark:shadow-none"
            >
              <img
                src={tech.icon_source}
                loading="lazy"
                alt={tech.techname}
                className="h-5"
              />
              <span className="text-sm text-slate-800 dark:text-white">
                {tech.techname}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});
