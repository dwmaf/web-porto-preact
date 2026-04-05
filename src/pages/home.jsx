import { useState, useRef, useEffect } from "preact/hooks";
import "../app.css";
import { Skills } from "../components/skills";
import { Experiences } from "../components/experiences";
import { Projects } from "../components/projects";
import { PersonalProjects } from "../components/personalprojects";
import { Instagram, Github, Linkedin, Mail } from "feather-icons-react";
import { useLanguage, t } from "../context/language-context";
import { LanguageToggle } from "../components/language-toggle";
import { ThemeToggle } from "../components/theme-toggle";
import { projectsData } from "../data/projects-data";
import { personalProjectsData } from "../data/personal-projects-data";

export function Home() {
  const { language } = useLanguage();
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);

  const [time, setTime] = useState(new Date());
  const yearsOfExperience = new Date().getFullYear() - 2023;
  const totalProjects = projectsData.length + personalProjectsData.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const [hoverStates, setHoverStates] = useState([
    { isHovering: false, wasHovering: false }, // ABOUT
    { isHovering: false, wasHovering: false }, // EXPERIENCE
    { isHovering: false, wasHovering: false }, // PROJECTS
  ]);

  const introText = {
    id: 'Saya adalah pengembang web yang berdedikasi untuk menciptakan solusi digital yang berorientasi pada performa dan pengalaman pengguna. Dengan keahlian mendalam pada ekosistem <strong class="text-slate-900 dark:text-slate-100">Laravel, React, Vue, dan MySQL</strong>, saya telah berhasil membangun berbagai platform kompleks, mulai dari <strong class="text-slate-900 dark:text-slate-100">sistem informasi perusahaan</strong> hingga aplikasi <strong class="text-slate-900 dark:text-slate-100">transaksi keuangan</strong> yang aman. Fokus saya adalah menjembatani logika teknis yang kuat dengan desain yang intuitif untuk memberikan dampak nyata bagi setiap pengguna.',
    en: 'I am a web developer dedicated to crafting high-performance, user-centric digital solutions. Leveraging my expertise in the <strong class="text-slate-900 dark:text-slate-100">Laravel, React, Vue, and MySQL</strong> ecosystems, I have successfully built various complex platforms, from <strong class="text-slate-900 dark:text-slate-100">enterprise information systems</strong> to secure <strong class="text-slate-900 dark:text-slate-100">financial transaction</strong> applications. My focus lies in bridging robust technical logic with intuitive design to deliver a meaningful impact for every user.',
  };

  const subIntro = {
    id: "Silakan jelajahi, dan jika Anda tertarik untuk berkolaborasi atau sekadar berdiskusi, jangan ragu untuk menghubungi saya!",
    en: "Please feel free to explore, and if you are interested in collaborating or just having a discussion, do not hesitate to contact me!",
  };

  const tagline = {
    id: "Mentransformasi ide kompleks menjadi aplikasi web yang berkinerja tinggi.",
    en: "Turning complex ideas into high-performance web applications.",
  };

  const availableStatus = {
    id: "SIAP BEKERJA",
    en: "AVAILABLE TO WORK",
  };

  return (
    <>
      <div className="min-h-screen lg:flex lg:justify-between lg:gap-8 pr-5 md:px-12 md:py-16 p-2 lg:px-6 lg:py-0">
        <div
          id="kiri"
          className=" lg:w-1/2 lg:flex-col lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:justify-center lg:pt-5"
        >
          <div className="p-2">
            <div
              id="badge-available-to-work"
              className="flex justify-between items-center mb-4"
            >
              <div className="flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>
              <div className="font-['Geist_Mono',_monospace] inline-flex items-center gap-x-1.5 rounded-full  px-2.5 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-300">
                <div className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
                </div>
                <h4 className="">{t(availableStatus, language)}</h4>
              </div>
            </div>
            <h1 className="text-2xl font-bold mt-2 text-slate-900 dark:text-slate-200 transition-colors">
              Dawam Agung Fathoni
            </h1>
            <h2 className="text-4xl font-bold mt-3 text-cyan-600 dark:text-cyan-300 transition-colors">
              Full Stack Web Developer
            </h2>
            <p className="mt-4 text-slate-500 dark:text-blue-custom transition-colors">{t(tagline, language)}</p>
            <div className="my-4 lg:my-8 text-slate-600 dark:text-blue-custom text-justify space-y-4 transition-colors">
              <p dangerouslySetInnerHTML={{ __html: t(introText, language) }} />
              <p dangerouslySetInnerHTML={{ __html: t(subIntro, language) }} />
            </div>

            {/* Statistics Section */}
            <div className="flex gap-8 mb-4">
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-bold text-cyan-800 dark:text-slate-100 transition-colors">
                  {yearsOfExperience}+
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-blue-custom uppercase tracking-widest mt-1 transition-colors">
                  {language === "id" ? "Tahun Pengalaman" : "Years Experience"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-bold text-cyan-800 dark:text-slate-100 transition-colors">
                  {totalProjects}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-blue-custom uppercase tracking-widest mt-1 transition-colors">
                  {language === "id" ? "Proyek Selesai" : "Completed Projects"}
                </span>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-5">
              <a
                href="mailto:dawamaf11ipa2@gmail.com"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-cyan-700 dark:bg-cyan-600 px-6 py-2.5 font-semibold text-slate-100 dark:text-slate-950  transition-all hover:bg-cyan-800 dark:hover:bg-cyan-500 leading-none shadow-md hover:shadow-teal-500/20"
              >
                <Mail size={18} />
                <span className="mb-[-4px]">{language === "id" ? "Hubungi Saya" : "Contact Me"}</span>
              </a>
              <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

              <a href="https://github.com/dwmaf" target="_blank">
                <Github
                  size={24}
                  className="text-teal-600 hover:text-teal-700 dark:text-teal-500 dark:hover:text-teal-300 transition-colors"
                />
              </a>
              <a
                href="https://linkedin.com/in/dawam-agung-fathoni"
                target="_blank"
              >
                <Linkedin
                  size={24}
                  className="text-teal-600 hover:text-teal-700 dark:text-teal-500 dark:hover:text-teal-300 transition-colors"
                />
              </a>

              <a href="https://www.instagram.com/dwmaf/" target="_blank">
                <Instagram
                  size={24}
                  className="text-teal-600 hover:text-teal-700 dark:text-teal-500 dark:hover:text-teal-300 transition-colors"
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
          <p className="text-sm text-slate-400 italic mt-8 text-center lg:text-left">
            Simplicity is the soul of efficiency - Austin Freeman
          </p>
          <div className="mt-2 text-center lg:text-left font-['Geist_Mono',_monospace] text-[10px] sm:text-xs text-slate-500 dark:text-slate-400/80 transition-colors">
            <div className="flex items-center justify-center lg:justify-start gap-1 sm:gap-2">
              <span className="tracking-wider">Pontianak, Indonesia</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="tabular-nums">{formattedTime} WIB</span>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
              <span className="hidden sm:inline opacity-70">UTC +7</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
