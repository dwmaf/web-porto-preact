import galleryManifest from "virtual:gallery-manifest";

export const personalProjectsData = [
  {
    slug: "personal-cube-algo",
    thumbnail: 8,
    appname: "CubeAlgo",
    description: {
      id: "CubeAlgo adalah platform pembelajaran rubik yang dibangun secara fundamental untuk memberikan pengalaman belajar yang ringkas dan akurat bagi para speedcuber. Seluruh aset grafis, mulai dari visual 2D hingga proyeksi 3D rubik, digambar secara orisinal menggunakan teknologi SVG guna memastikan performa load yang instan serta kejernihan maksimal. Platform ini menawarkan database algoritma yang sangat komprehensif, mencakup 2x2 (OLL & PBL), 4x4 (OLL & PLL Parity), hingga 3x3 dengan rincian yang sangat mendalam: 41 skema F2L yang masing-masing disertai dengan 4 sudut pandang sisi berbeda (4-sides view), 57 algoritma OLL, dan 21 algoritma PLL. Selain sebagai perpustakaan algoritma, CubeAlgo juga dilengkapi dengan fitur Speedcube Timer terintegrasi untuk kategori 2x2 dan 3x3, menjadikannya asisten digital lengkap bagi siapa saja yang ingin menguasai teknik pemecahan rubik secara sistematis dan efisien.",
      en: "CubeAlgo is a Rubik's cube learning platform fundamentally built to provide a concise and accurate learning experience for speedcubers. All graphic assets, from 2D visuals to 3D projections, are original SVG drawings ensuring instant loading and maximum clarity. The platform offers a comprehensive algorithm database, including 2x2 (OLL & PBL), 4x4 (OLL & PLL Parity), to 3x3 with deep details: 41 F2L schemes each with 4-side views, 57 OLL algorithms, and 21 PLL algorithms. Beyond being a library, CubeAlgo features an integrated Speedcube Timer for 2x2 and 3x3 categories, making it a complete digital assistant for systematic Rubik's technique mastery."
    },
    techs: [15, 16, 9, 4],
    role: { id: "Web Developer", en: "Web Developer" },
    year: "2025",
    link: "https://cubealgo.netlify.app/",
  },
  {
    slug: "personal-wordle-solver",
    thumbnail: 9,
    appname: "Wordle Solver",
    description: {
      id: "Wordle Solver adalah asisten digital cerdas yang dirancang untuk membantu para penggemar word puzzle memecahkan teka-teki 5-huruf seperti Wordle, Katla, dan berbagai varian lokal lainnya secara efisien. Dengan memanfaatkan basis data ribuan kata yang bersumber langsung dari wordlist publik, aplikasi ini memungkinkan pengguna melakukan penyaringan kata yang sangat spesifik berdasarkan tiga kriteria utama: posisi huruf yang tepat (hijau), huruf yang ada tapi salah posisi (kuning), serta huruf yang tidak ada (abu-abu). Salah satu keunggulan teknis utama dari platform ini adalah integrasi dengan database Supabase untuk mengelola riwayat jawaban harian yang pernah muncul (past answers), sehingga algoritma filter mampu mengeliminasi kata-kata yang tidak mungkin muncul kembali dan memberikan prediksi jawaban yang jauh lebih presisi. Proyek ini memadukan kemudahan antarmuka dengan logika pemrosesan data yang kuat untuk memberikan solusi terbaik bagi para pemain.",
      en: "Wordle Solver is a smart digital assistant designed to help word puzzle enthusiasts solve 5-letter puzzles like Wordle, Katla, and various local variants efficiently. Leveraging thousands of words from public wordlists, it lets users filter words based on three criteria: exact position (green), present but wrong position (yellow), and not present (grey). A key technical feature is its integration with Supabase for managing past daily answers, allowing the filter algorithm to eliminate impossible words and provide highly precise predictions. This project combines a clean interface with robust data processing logic to deliver an optimal experience."
    },
    techs: [15, 16, 9, 12],
    role: { id: "Web Developer", en: "Web Developer" },
    year: "2025",
    link: "https://5-letter-words-indo.netlify.app/",
  },
  {
    slug: "personal-tool",
    thumbnail: 10,
    appname: "Personal Tool",
    description: {
      id: "Kumpulan tool buatan sendiri.",
      en: "A collection of self-made tools."
    },
    techs: [17, 15, 9],
    role: { id: "Web Developer", en: "Web Developer" },
    year: "2026",
    link: null,
  },
  
].map((project) => ({
  ...project,
  // Gallery otomatis dari folder public/projects/{slug}/
  gallery: galleryManifest[project.slug] || [],
}));

export function getProjectBySlug(slug) {
  return personalProjectsData.find((p) => p.slug === slug) || null;
}
