import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import './app.css'
import { Experience } from './experience'
import { Projects } from './projects'
export function App() {
  

  return (
    <>
      <body className="min-h-screen ">
      <main className="gap-3 w-full items-start">
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

            <div className="flex-col mt-20 mb-17 hidden lg:flex">
              <div className="flex items-center gap-3 group">
                <div className="h-[1px] w-10 group-hover:w-20 group-hover:bg-white bg-blue-200"></div>
                <a
                  href=""
                  className="text-blue-200 text-xs font-bold group-hover:text-white"
                >
                  ABOUT
                </a>
              </div>

              <div className="flex items-center gap-3 mt-5 group">
                <div className="h-[1px] w-10 group-hover:w-20 group-hover:bg-white bg-blue-200"></div>
                <a
                  href=""
                  className="text-blue-200 text-xs font-bold group-hover:text-white"
                >
                  EXPERIENCE
                </a>
              </div>
              <div className="flex items-center gap-3 mt-5 group">
                <div className="h-[1px] w-10 group-hover:w-20 group-hover:bg-white bg-blue-200"></div>
                <a
                  href=""
                  className="text-blue-200 text-xs font-bold group-hover:text-white"
                >
                  PROJECTS
                </a>
              </div>
            </div>
            <div className="flex mt-8 items-center gap-5">
              <img src="/github.png" alt="github" className="w-6 h-6" />
              <img src="/linkedin.png" alt="linkedin" className="w-6 h-6" />
              <img src="/ig.png" alt="instagram" className="w-6 h-6" />
            </div>
          </div>
          <div id="kanan" className="lg:w-1/2 pt-20 ">
            <h2 className="text-sm font-bold text-slate-200 mb-4">ABOUT</h2>
            <p className="mb-4 text-blue-custom text-justify">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              adipisci repudiandae error, debitis, saepe minus necessitatibus
              illum et totam nemo maiores. Nostrum excepturi, optio soluta
              praesentium omnis ratione! Necessitatibus excepturi modi possimus
              doloribus ducimus exercitationem enim fuga cumque omnis dicta
              repellat, minima ullam explicabo beatae natus quibusdam quia illo
              tempore repellendus ipsa dignissimos nihil? Libero dolorum
              eligendi ullam odio soluta, eos officiis placeat. Ullam mollitia
              nesciunt exercitationem voluptatem nam minima, fugiat perferendis
              veritatis omnis quas quia culpa tempore reprehenderit magni
              placeat consequuntur repellendus odio itaque aspernatur architecto
              molestiae voluptate consectetur deserunt! Magnam odio dolores
              consectetur corrupti eaque fugiat alias? Repellendus!{" "}
            </p>
            
            <div className="gap-5 flex flex-col ">
              <Experience></Experience>
              <Projects></Projects>
            </div>
          </div>
        </div>
      </main>
    </body>

    </>
  )
}
