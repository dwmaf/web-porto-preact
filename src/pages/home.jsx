import { useState, useRef } from "preact/hooks";
import "../app.css";
import { Experiences } from "../components/experiences";
import { Projects } from "../components/projects";
import { NavButton } from "../components/navmenu";


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
      <body className="min-h-screen gap-3 w-full items-start">
        <div className="lg:flex lg:justify-between px-6 py-12 md:px-12 md:py-16  lg:px-10 lg:py-0">
          <div
            id="kiri"
            className="lg:w-1/2 lg:flex-col lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:pt-20 lg:pl-10"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-200">
              Dawam Agung Fathoni
            </h1>
            <h2 className="text-lg font-medium mt-3 text-slate-200">
              Full Stack Web Developer, Character Illustrator
            </h2>
            <p className="mt-4 text-blue-custom">
              I love to build website that can bring usefulness
            </p>

            <div className="flex-col mt-20 mb-17 hidden lg:flex gap-3">
              <NavButton
                label="ABOUT"
                index={0}
                hoverStates={hoverStates}
                setHoverStates={setHoverStates}
                onClick={() => scrollToSection(section1Ref)}
              />

              <NavButton
                label="EXPERIENCE"
                index={1}
                hoverStates={hoverStates}
                setHoverStates={setHoverStates}
                onClick={() => scrollToSection(section2Ref)}
              />

              <NavButton
                label="PROJECTS"
                index={2}
                hoverStates={hoverStates}
                setHoverStates={setHoverStates}
                onClick={() => scrollToSection(section3Ref)}
              />
            </div>
            <div className="flex mt-8 items-center gap-5">
              <img src="/github.png" alt="github" className="w-6 h-6" />
              <img src="/linkedin.png" alt="linkedin" className="w-6 h-6" />
              <img src="/ig.png" alt="instagram" className="w-6 h-6" />
            </div>
          </div>
          <div id="kanan" className="lg:w-1/2 pt-20 ">
            <h2
              className="text-sm font-bold text-slate-200 mb-4"
              ref={section1Ref}
            >
              ABOUT
            </h2>
            <p className="mb-4 text-blue-custom text-justify">
              Halo! Saya adalah seorang web developer yang berdedikasi, dengan minat besar dalam membangun solusi digital yang fungsional, efisien, dan user-friendly. Saya memiliki pengalaman dalam mengembangkan berbagai jenis aplikasi web, mulai dari sistem informasi hingga platform e-commerce, menggunakan beragam teknologi modern seperti Laravel, Vue.js, Nuxt, dan lainnya.
              Fokus utama saya adalah menciptakan produk digital yang tidak hanya berjalan dengan baik, tetapi juga memiliki dampak nyata bagi pengguna. Saya senang belajar teknologi baru, mengeksplorasi pendekatan pengembangan yang lebih baik, dan mengimplementasikan ide-ide kreatif dalam setiap proyek yang saya kerjakan.
              Web portofolio ini adalah tempat di mana saya menampilkan karya-karya terbaik saya, proses yang saya lalui, serta kemampuan yang terus saya kembangkan. Silakan jelajahi, dan jika Anda tertarik untuk bekerja sama atau sekadar berdiskusi, jangan ragu untuk menghubungi saya!
            </p>

            <div className="gap-5 flex flex-col mb-5">
              <Experiences ref={section2Ref} />
              <Projects ref={section3Ref} />
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
