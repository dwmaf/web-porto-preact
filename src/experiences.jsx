import { useState, useEffect, forwardRef } from "preact/compat";
import { Exp } from "./components/exp";
import supabase from "../supabaseClient";
export const Experiences = forwardRef((props, ref) => {
  const [experiences, setExperiences] = useState([]);
  useEffect(() => {
    getExperiences();
  }, []);
  async function getExperiences() {
    const { data } = await supabase.from("experiences").select();
    setExperiences(data);
  }

  if (experiences.length === 0) {
    return <div>No experiences found</div>;
  }

  return (
    <>
      <h2 ref={ref} className="text-sm font-bold text-slate-200 mb-4 mt-24">
        EXPERIENCE
      </h2>
      {experiences.map((exp) => (
        <Exp
          key={exp.id}
          duration={exp.duration}
          timestamp={exp.timestamp}
          position={exp.position}
          place={exp.place}
          description={exp.description}
          techs={exp.techs}
        />
      ))}
      {/* <Exp
        duration="4 months"
        timestamp="Agustus - Desember 2023"
        position="Machine Learning Cohort"
        place="Bangkit Academy"
        description="Terpilih sebagai mahasiswa untuk mengikuti studi independen bersertifikat pada platform Kampus Merdeka.
Berkesempatan untuk belajar membangun model machine learning menggunakan Tensorflow, termasuk juga membangun deteksi gambar, pemrosesan bahasa alami, dan menggunakan transfer learning.
"
        techs={["kotlin", "tensorflow"]}
      />
      <Exp
        duration="3 months"
        timestamp="Maret - Mei 2024"
        position="Kerja Praktik"
        place="LSP UNTAN"
        description="Berkesempatan untuk kerja praktik di Lembaga Sertifikasi Profesi Universitas Tanjungpura, di sini saya membangun website profil LSP UNTAN sehingga mahasiswa yang ingin mengambil sertifikasi tidak perlu datang langsung dan bertanya perihal administrasi sertifikasi"
        techs={["php", "laravel", "bootstrap"]}
      />
      <Exp
        duration="2 months"
        timestamp="November - Desember 2024"
        position="Full Stack Developer"
        place="Kecamatan Pemangkat"
        description="Di sini posisi saya sebagai tim it, kami bertugas membangun website profil kecamatan pemangkat guna meningkatkan transparansi perangkat pemerintahan kecamatan pemangkat terhadap masyarakat"
        techs={["php", "laravel", "bootstrap"]}
      /> */}
    </>
  );
});
