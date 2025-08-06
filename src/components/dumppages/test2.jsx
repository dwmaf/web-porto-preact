import { useState, useEffect } from "preact/hooks";
import "../app.css";
import { Heart, Star, Mail } from "feather-icons-react";

// Custom Hook untuk efek mengetik, sama seperti sebelumnya
const useTypingEffect = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    if (displayedText.length < text.length) {
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1));
      }, speed);
      return () => clearInterval(interval);
    }
  }, [text, speed, displayedText]);
  return displayedText;
};

// Komponen Kotak Dialog
const DialogueBox = ({ children, className = "" }) => (
  <div className={`bg-blue-900 border-4 border-white p-4 md:p-6 text-white ${className}`}>
    {children}
  </div>
);

// Komponen Tombol Game
const GameButton = ({ children, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-gray-700 text-white px-4 py-2 border-2 border-b-4 border-r-4 border-gray-500 hover:bg-gray-600 active:border-b-2 active:border-r-2 active:translate-y-px"
  >
    {children}
  </button>
);

// Komponen utama portofolio
export function Test2() {
  const projects = [
    { title: "Sistem Keuangan", description: "Manajemen keuangan perusahaan." },
    { title: "Platform E-Learning", description: "Kursus online interaktif." },
    { title: "Portofolio v1", description: "Versi pertama portofolio ini." },
    { title: "API Layanan Mikro", description: "Backend service otentikasi." },
  ];

  const aboutText = "Seorang petualang digital yang mengubah baris kode menjadi dunia yang fungsional dan indah. Berbekal 'Pedang Laravel' dan 'Mantra JavaScript', saya siap untuk quest berikutnya!";
  const typedAbout = useTypingEffect(aboutText, 30);

  return (
    <div className="bg-[#1D2B53] text-white font-pixel min-h-screen p-4 md:p-6 antialiased">
      {/* Latar belakang pola pixel */}
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* --- HEADER / STATUS BAR --- */}
        <header className="border-4 border-white p-4 mb-6 flex justify-between items-center bg-blue-900">
          <div>
            <h1 className="text-xl md:text-2xl">DAWAM</h1>
            <p className="text-sm text-yellow-400">LVL 25 WEB DEV</p>
          </div>
          <div className="text-right">
            <p className="flex items-center justify-end gap-2">HP <span className="w-20 h-4 bg-red-500 border-2 border-white block"></span></p>
            <p className="flex items-center justify-end gap-2">MP <span className="w-20 h-4 bg-blue-500 border-2 border-white block"></span></p>
          </div>
        </header>

        {/* --- KONTEN UTAMA --- */}
        <main className="space-y-6">
          {/* Kotak Dialog About */}
          <DialogueBox>
            <div className="flex items-start gap-4">
              <img src="/oc.png" alt="Pixel Avatar" className="w-16 h-16 border-2 border-white image-rendering-pixelated" />
              <p className="text-sm md:text-base leading-relaxed">{typedAbout}</p>
            </div>
          </DialogueBox>

          {/* Kotak Dialog Projects */}
          <DialogueBox>
            <h2 className="text-lg text-yellow-400 mb-4">QUEST LOG</h2>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="flex items-center justify-between hover:bg-blue-800 p-2 -m-2">
                  <div>
                    <p className="text-base">{project.title}</p>
                    <p className="text-xs text-gray-400">{project.description}</p>
                  </div>
                  <span className="text-yellow-400"><Star size={20} /></span>
                </div>
              ))}
            </div>
          </DialogueBox>

          {/* Kotak Dialog Contact/Menu */}
          <DialogueBox>
            <h2 className="text-lg text-yellow-400 mb-4">MENU</h2>
            <div className="flex flex-wrap gap-4">
              <GameButton>EMAIL</GameButton>
              <GameButton>GITHUB</GameButton>
              <GameButton>LINKEDIN</GameButton>
            </div>
          </DialogueBox>
        </main>

        {/* --- FOOTER --- */}
        <footer className="text-center text-xs text-gray-500 mt-8">
          <p>PRESS START TO CONTINUE</p>
          <p className="mt-2">© {new Date().getFullYear()} DAWAM GAME DEV</p>
        </footer>
      </div>
    </div>
  );
}
