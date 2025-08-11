import { useState, useRef } from "preact/hooks";
import "../app.css";
import { Skills } from "../components/skills";
import { Experiences } from "../components/experiences";
import { Projects } from "../components/projects";
import {
  Instagram,
  Github,
  Linkedin,
  Briefcase,
  Code,
  Grid,
  Award,
  Layout,
  Archive,
  Package,
} from "feather-icons-react";

export function Home() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const [hoverStates, setHoverStates] = useState([
    { isHovering: false, wasHovering: false }, // ABOUT
    { isHovering: false, wasHovering: false }, // EXPERIENCE
    { isHovering: false, wasHovering: false }, // PROJECTS
  ]);

  return (
    <>
        <div className="min-h-screen lg:flex lg:justify-between lg:gap-8 md:px-12 md:py-16 p-2 lg:px-5 lg:py-0">
          <div
            id="kiri"
            className=" lg:w-1/2 lg:flex-col lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:justify-center lg:pt-5"
          >
            <div className="bg-slate-950 rounded-2xl p-5">
              <div id="badge-available-to-work" className="flex justify-end">
                <div className="inline-flex items-center gap-x-1.5 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-300">
                  <div className="relative flex h-2 w-2 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  </div>
                  <h4 className="mt-1">
                  AVAILABLE TO WORK
                  </h4>
                </div>
              </div>
              <h1 className="text-2xl font-bold mt-2 text-slate-200">
                Dawam Agung Fathoni
              </h1>
              <h2 className="text-4xl font-bold mt-3 text-cyan-300">
                Full Stack Web Developer
              </h2>
              <p className="mt-4 text-blue-custom">
                Crafting modern and responsive web applications
              </p>
              <p className="my-8 text-blue-custom text-justify">
                Hello! I am a dedicated web developer with a great passion for
                building functional, efficient, and user-friendly digital
                solutions. I have experience in developing various types of web
                applications, from{" "}
                <strong className="text-slate-100">information systems</strong>{" "}
                to platforms involving{" "}
                <strong className="text-slate-100">
                  financial transactions
                </strong>
                , using a range of modern technologies like{" "}
                <strong className="text-slate-100">
                  Laravel, React, Vue, and MySQL.
                </strong>
                My main focus is to create digital products that not only
                perform well but also have a real impact on users. I enjoy
                learning new technologies, exploring better development
                approaches, and implementing creative ideas in every project I
                work on. Please feel free to explore, and if you are interested
                in collaborating or just having a discussion, do not hesitate to
                contact me!
              </p>

              <div className="flex items-center gap-5">
                <a href="https://github.com/dwmaf" target="_blank">
                  <Github
                    size={24}
                    className="text-teal-500 hover:text-teal-300"
                  />
                </a>
                <a
                  href="https://linkedin.com/in/dawam-agung-fathoni"
                  target="_blank"
                >
                  <Linkedin
                    size={24}
                    className="text-teal-500 hover:text-teal-300"
                  />
                </a>
                <a href="https://www.instagram.com/dwmaf/" target="_blank">
                  <Instagram
                    size={24}
                    className="text-teal-500 hover:text-teal-300"
                  />
                </a>
              </div>
            </div>
          </div>
          <div id="kanan" className="lg:w-1/2 pt-15 pb-5">
            <div className="gap-15 flex flex-col mb-5">
              <Experiences ref={section1Ref} />
              <Skills ref={section2Ref} />
              <Projects ref={section3Ref} />
            </div>
            <p
              
              className="text-sm text-slate-400 italic mt-8 text-center lg:text-left"
            >
              Simplicity is the soul of efficiency - Austin Freeman
            </p>
          </div>
        </div>
    </>
  );
}
