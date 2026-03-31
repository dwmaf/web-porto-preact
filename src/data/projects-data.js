import galleryManifest from "virtual:gallery-manifest";

export const projectsData = [
  {
    slug: "saputipu",
    thumbnail: 2,
    appname: "Saputipu",
    description:
      "Aplikasi Android yang dirancang untuk menganalisis dan mendeteksi apakah suatu kalimat termasuk scam, spam, atau hanya teks biasa. Dengan menggunakan teknologi artificial intelligence, aplikasi ini membantu pengguna untuk dengan cepat mengidentifikasi potensi ancaman dalam pesan yang diterima, memberikan perlindungan tambahan dari penipuan dan gangguan digital. Saya bertugas sebagai ML Engineer untuk membangun AI-nya.",
    techs: [10],
    role: "ML Engineer",
    year: "2023",
  },
  {
    slug: "website-profil-lsp-untan",
    thumbnail: 0,
    appname: "Website Profil LSP UNTAN",
    description:
      "Website Profil LSP UNTAN menampilkan informasi lengkap tentang skema sertifikasi, asesor, jadwal sertifikasi, dan berita terkini. Dilengkapi dengan fitur admin, website ini memungkinkan pengelolaan konten yang mudah untuk memastikan informasi yang ditampilkan selalu terupdate bagi pengguna.",
    techs: [8, 5, 6, 2],
    role: "Web Developer",
    year: "2024",
  },
  {
    slug: "website-profil-kecamatan-pemangkat",
    thumbnail: 1,
    appname: "Website Profil Kecamatan Pemangkat",
    description:
      "Website Profil Kecamatan Pemangkat menampilkan informasi penting seperti sejarah, daftar perangkat desa, lembaga desa, dan berita terkini. Dilengkapi dengan fitur admin untuk memudahkan pembaruan konten, website ini bertujuan untuk memberikan transparansi dan akses informasi yang mudah bagi masyarakat mengenai kegiatan dan kebijakan pemerintah setempat.",
    techs: [8, 5, 6, 2],
    role: "Web Developer",
    year: "2024",
  },
  {
    slug: "website-landing-page-intibioindustri",
    thumbnail: 5,
    appname: "Website Landing Page Intibioindustri",
    description:
      "Saya melakukan redesigning, add more content, dan re deployment pada platform hosting. Intibioindustri sendiri memproduksi produk biodegradable dan berkelanjutan terbuat dari Serat Daun Nanas (PLF) yang ramah lingkungan seperti eco-pads (pembalut yang mampu terurai dalam tanah).",
    techs: [14, 3, 2],
    role: "Web Developer",
    year: "2024",
  },
  {
    slug: "website-landing-page-nutrils",
    thumbnail: 6,
    appname: "Website Landing Page Nutrils",
    description:
      "Landing page dari perusahaan Nutrils with AI powered tech, startup agroteknologi yang mengembangkan solusi inovatif untuk pertanian sirkular dengan memanfaatkan sumber daya lokal secara optimal menggunakan Nutrils (Nutrient Hydrogel Cellulose), bahan berbasis ampas sagu yang meningkatkan efisiensi pupuk dan ketahanan tanaman terhadap kekeringan. Website ini juga dilengkapi dengan ai yang bisa memeriksa kematangan 11 jenis buah.",
    techs: [14, 2, 3, 10, 8, 6],
    role: "Full Stack Developer",
    year: "2025",
  },
  {
    slug: "website-pendaftaran-sertifikasi-lsp-untan",
    thumbnail: 4,
    appname: "Website Pendaftaran Sertifikasi LSP UNTAN",
    description:
      "Website pendaftaran sertifikasi LSP UNTAN memungkinkan pengguna untuk dengan mudah mengakses informasi terkait skema sertifikasi, jadwal, dan prosedur pendaftaran. Dibangun menggunakan teknologi modern, website ini memudahkan proses pendaftaran dan memberikan transparansi informasi terkait sertifikasi, serta memungkinkan pengelolaan data secara efisien melalui sisi admin.",
    techs: [8, 5, 9, 15, 6, 4],
    role: "Web Developer",
    year: "2024",
  },
].map((project) => ({
  ...project,
  // Gallery otomatis dari folder public/projects/{slug}/
  gallery: galleryManifest[project.slug] || [],
}));

export function getProjectBySlug(slug) {
  return projectsData.find((p) => p.slug === slug) || null;
}
