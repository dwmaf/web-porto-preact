import { useState, useEffect, forwardRef, useRef } from "preact/compat";
import { Exp } from "./exp";
import { Subheader } from "./subheader";

export const Experiences = forwardRef((props, ref) => {
  const [hoverStates, setHoverStates] = useState([
    { isHovering: false, wasHovering: false },
  ]);

  const experiencesData = [
    {
      duration: { id: "6 bulan", en: "6 months" },
      timestamp: "Jan - Jun 2026",
      position: "Web Developer",
      place: "UPA PK2 UNTAN",
      description: {
        id: "Saya bertugas sebagai web developer untuk membangun website self printing dan presensi menggunakan fingerprint di UPA PK2 UNTAN",
        en: "I served as a web developer building a self-printing website and fingerprint-based attendance system at UPA PK2 UNTAN."
      },
      techs: [8, 5, 15, 0]
    },
    {
      duration: { id: "1 bulan", en: "1 month" },
      timestamp: "Jul - Aug 2025",
      position: "Google Analytics Specialist",
      place: "Studyo io (Remote)",
      description: {
        id: "Saya bertugas mengelola google analytic pada sebuah platform android belajar matematika",
        en: "I was responsible for managing Google Analytics on an Android mathematics learning platform."
      },
      techs: [] // Tambahkan ID Google Analytics di techs.json jika ingin memunculkan iconnya
    },
    {
      duration: { id: "2 bulan", en: "2 months" },
      timestamp: "Nov - Dec 2024",
      position: "Web Developer",
      place: "Kecamatan Pemangkat",
      description: {
        id: "Di sini posisi saya sebagai tim it, kami bertugas membangun website profil kecamatan pemangkat guna meningkatkan transparansi perangkat pemerintahan kecamatan pemangkat terhadap masyarakat",
        en: "As part of the IT team, we were tasked with building the Pemangkat District profile website to enhance the transparency of the district government towards the community."
      },
      techs: [8, 5, 2]
    },
    {
      duration: { id: "3 bulan", en: "3 months" },
      timestamp: "Mar - May 2024",
      position: "Web Developer",
      place: "LSP UNTAN",
      description: {
        id: "Berkesempatan untuk kerja praktik di Lembaga Sertifikasi Profesi Universitas Tanjungpura, di sini saya membangun website profil LSP UNTAN sehingga mahasiswa yang ingin mengambil sertifikasi tidak perlu datang langsung dan bertanya perihal administrasi sertifikasi",
        en: "During my internship at the Professional Certification Body (LSP) of Tanjungpura University, I built the LSP UNTAN profile website so that students seeking certification wouldn't need to visit in person for administrative inquiries."
      },
      techs: [8, 5, 2]
    },
    {
      duration: { id: "5 bulan", en: "5 months" },
      timestamp: "Aug - Dec 2023",
      position: "Machine Learning Cohort",
      place: "Bangkit Academy (Remote)",
      description: {
        id: "Terpilih sebagai mahasiswa untuk mengikuti studi independen bersertifikat pada platform Kampus Merdeka. Berkesempatan untuk belajar membangun model machine learning menggunakan Tensorflow, termasuk juga membangun deteksi gambar, pemrosesan bahasa alami, dan menggunakan transfer learning.",
        en: "Selected as a student for the certified independent study at Kampus Merdeka. Had the opportunity to learn building machine learning models using TensorFlow, including image detection, natural language processing, and transfer learning."
      },
      techs: [10]
    }
  ];

  return (
    <section>
      <div>
        <Subheader
          label={{ id: "PENGALAMAN", en: "EXPERIENCES" }}
          index={0}
          number="01"
          hoverStates={hoverStates}
          setHoverStates={setHoverStates}
          onClick={() => {}}
        />

        <div className="flex flex-col gap-4">
          {experiencesData.map((exp, index) => (
            <Exp
              key={index}
              duration={exp.duration}
              timestamp={exp.timestamp}
              position={exp.position}
              place={exp.place}
              description={exp.description}
              techs={exp.techs}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
