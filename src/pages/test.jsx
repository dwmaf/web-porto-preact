import { useState, useRef } from "preact/hooks";
import "../app.css";
import { Instagram, Github, Linkedin, ArrowUpRight, Mail } from "feather-icons-react";

// Komponen Kartu Bento yang bisa digunakan ulang
const BentoCard = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/60 rounded-2xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 ease-in-out hover:border-neutral-500/80 group ${className}`}
    >
      {/* Efek sorotan saat hover */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

// Komponen utama portofolio
export function Test() {
  const projects = [
    {
      title: "Sistem Informasi Keuangan",
      description: "Aplikasi berbasis web untuk manajemen keuangan perusahaan.",
      tech: ["Laravel", "React", "MySQL"],
    },
    {
      title: "Platform E-Learning",
      description: "Platform interaktif untuk kursus online dengan fitur kuis.",
      tech: ["Preact", "Supabase", "Tailwind"],
    },
    {
      title: "Website Portofolio",
      description: "Portofolio personal yang sedang Anda lihat saat ini.",
      tech: ["Vite", "Preact", "Tailwind CSS"],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans antialiased selection:bg-teal-500/40">
      {/* Efek latar belakang gradien radial */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* --- HEADER / HERO --- */}
        <header className="text-center mb-16 md:mb-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Dawam Agung Fathoni
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
            A passionate Web Developer crafting modern, responsive, and user-friendly digital experiences.
          </p>
        </header>

        {/* --- BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kartu Profil (Besar) */}
          <BentoCard className="md:col-span-2 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-neutral-100">About Me</h2>
              <p className="text-neutral-400">
                Dengan pengalaman di Laravel dan ekosistem JavaScript modern, saya fokus membangun solusi digital yang efisien dan berdampak. Saya senang belajar teknologi baru dan menerapkannya dalam proyek yang menantang.
              </p>
            </div>
            <a href="mailto:your.email@example.com" className="mt-6 inline-flex items-center text-teal-400 font-medium hover:text-teal-300 transition-colors">
              Get in Touch <Mail size={18} className="ml-2" />
            </a>
          </BentoCard>

          {/* Kartu Sosial Media */}
          <BentoCard className="flex flex-col justify-center items-center">
            <img src="/oc.png" alt="Profile" className="w-24 h-24 rounded-full mb-4 border-2 border-neutral-700" />
            <div className="flex space-x-5">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors"><Github /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors"><Linkedin /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors"><Instagram /></a>
            </div>
          </BentoCard>

          {/* Kartu Proyek */}
          <BentoCard className="md:col-span-3">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-100">Featured Projects</h2>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="p-4 rounded-lg bg-neutral-800/50 hover:bg-neutral-800 transition-colors">
                  <h3 className="font-semibold text-neutral-200">{project.title}</h3>
                  <p className="text-sm text-neutral-400 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => <span key={t} className="text-xs bg-teal-900/50 text-teal-300 px-2 py-1 rounded-full">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Kartu Keahlian */}
          <BentoCard className="md:col-span-1">
            <h2 className="text-2xl font-semibold mb-4 text-neutral-100">Core Skills</h2>
            <ul className="space-y-2 text-neutral-300">
              <li className="flex items-center"><ArrowUpRight size={16} className="mr-2 text-teal-400"/> Laravel</li>
              <li className="flex items-center"><ArrowUpRight size={16} className="mr-2 text-teal-400"/> React / Preact</li>
              <li className="flex items-center"><ArrowUpRight size={16} className="mr-2 text-teal-400"/> Node.js</li>
              <li className="flex items-center"><ArrowUpRight size={16} className="mr-2 text-teal-400"/> Tailwind CSS</li>
              <li className="flex items-center"><ArrowUpRight size={16} className="mr-2 text-teal-400"/> MySQL / PostgreSQL</li>
            </ul>
          </BentoCard>

          {/* Kartu CTA */}
          <BentoCard className="md:col-span-2 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-semibold mb-2 text-neutral-100">Interested in collaborating?</h2>
            <p className="text-neutral-400 mb-4 max-w-sm">
              I'm currently open to new opportunities and freelance projects. Let's build something great together.
            </p>
            <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold px-6 py-3 rounded-lg hover:scale-105 transition-transform">
              View My Resume
            </button>
          </BentoCard>
        </div>

        {/* --- FOOTER --- */}
        <footer className="text-center mt-16 md:mt-24 text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Dawam Agung Fathoni. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}
