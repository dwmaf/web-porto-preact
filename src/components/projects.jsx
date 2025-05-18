import { forwardRef } from "preact/compat";
import { Project } from "./project";
export const Projects = forwardRef((props, ref) => {
  return (
    <>
      <h2 ref={ref} className="text-sm font-bold text-slate-200 mb-4 mt-24">
        PROJECTS
      </h2>
    
      <Project
        thumbnail="/"
        alt="saputipu-mockup-image"
        appname="Saputipu"
        description="Aplikasi Android yang dirancang untuk menganalisis dan mendeteksi apakah suatu kalimat termasuk scam, spam, atau hanya teks biasa. Dengan menggunakan teknologi artificial intelligence, aplikasi ini membantu pengguna untuk dengan cepat mengidentifikasi potensi ancaman dalam pesan yang diterima, memberikan perlindungan tambahan dari penipuan dan gangguan digital."
        techs={["Kotlin", "Tensorflow"]}
      />
      <Project
        thumbnail="/web-profil-lsp.webp"
        alt=""
        appname="Website Profil LSP UNTAN"
        description="Website Profil LSP UNTAN menampilkan informasi lengkap tentang skema sertifikasi, asesor, jadwal sertifikasi, dan berita terkini. Dilengkapi dengan fitur admin, website ini memungkinkan pengelolaan konten yang mudah untuk memastikan informasi yang ditampilkan selalu terupdate bagi pengguna."
        techs={["PHP", "Laravel", "Bootstrap","MySQL"]}
      />
      <Project
        thumbnail="/web-profil-pmgkt.webp"
        alt=""
        appname="Website Profil Kecamatan Pemangkat"
        description="Website Profil Kecamatan Pemangkat menampilkan informasi penting seperti sejarah, daftar perangkat desa, lembaga desa, dan berita terkini. Dilengkapi dengan fitur admin untuk memudahkan pembaruan konten, website ini bertujuan untuk memberikan transparansi dan akses informasi yang mudah bagi masyarakat mengenai kegiatan dan kebijakan pemerintah setempat."
        techs={["PHP", "Laravel", "Bootstrap","MySQL"]}
      />
      <Project
        thumbnail="/web-porto.png"
        alt=""
        appname="Website Portofolio"
        description="Website portofolio ini dibangun menggunakan Preact untuk pengembangan antarmuka pengguna yang cepat dan ringan, Tailwind CSS untuk desain responsif dan modern, serta Supabase untuk backend yang menyediakan layanan database real-time. Website ini menampilkan berbagai proyek saya, lengkap dengan fitur interaktif dan data yang dinamis, memberikan pengalaman pengguna yang mulus dan efisien."
        techs={["JavaScript", "Preact", "Tailwind", "Supabase", "PostgreSQL"]}
      />
      <Project
        thumbnail=""
        alt="web-pendaftaran-LSP-untan-mockup-image"
        appname="Website Pendaftaran Sertifikasi LSP UNTAN"
        description="Website pendaftaran sertifikasi LSP UNTAN memungkinkan pengguna untuk dengan mudah mengakses informasi terkait skema sertifikasi, jadwal, dan prosedur pendaftaran. Dibangun menggunakan teknologi modern, website ini memudahkan proses pendaftaran dan memberikan transparansi informasi terkait sertifikasi, serta memungkinkan pengelolaan data secara efisien melalui sisi admin."
        techs={["PHP", "Laravel", "Tailwind", "AlpineJS","MySQL"]}
      />
    </>
  );
});
