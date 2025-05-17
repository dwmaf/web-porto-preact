import { forwardRef } from "preact/compat";
import { Project } from "./components/project";
export const Projects = forwardRef((props, ref) => {
  return (
        <>
      <h2 ref={ref} className="text-sm font-bold text-slate-200 mb-4 mt-24">PROJECTS</h2>
      <Project thumbnail="" appname="Saputipu" description="" techs={["Kotlin","Tensorflow"]} />
      {/* <div className="flex lg:p-4 rounded-2xl gap-4">
        <img src="" alt="bangkit" className="w-1/4 " />
        <div className="w-3/4 flex flex-col">
          <h6 className="mb-2 hover:text-teal-200 font-bold ">Saputipu</h6>
          <p className="mb-2 text-blue-custom text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            adipisci repudiandae error, debitis, saepe minus necessitatibus
            illum et totam nemo maiores. Nostrum excepturi, optio soluta
            praesentium omnis ratione! Necessitatibus excepturi modi possimus
            doloribus ducimus exercitationem enim fuga cumque omnis dicta
            repellat, minima ullam explicabo beatae natus quibusdam quia illo
            tempore repellendus ipsa dignissimos nihil?
          </p>
          <div className="flex gap-2 text-sm">
            <div className="rounded-xl bg-teal-950 text-teal-300 py-1 px-3">
              Kotlin
            </div>
            <div className="rounded-xl bg-teal-950 text-teal-300 py-1 px-3">
              Tensorflow
            </div>
          </div>
        </div>
      </div> */}
      {/* Web Profil LSP UNTAN */}
      
      
    </>
  );
});