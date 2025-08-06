import { useState, useEffect, forwardRef, useRef } from "preact/compat";
import { Exp } from "./exp";
import { Subheader } from "./subheader";
import supabase from "../../supabaseClient";
export const Experiences = forwardRef((props, ref) => {
  const [experiences, setExperiences] = useState([]);
  // 2. Tambahkan state yang dibutuhkan oleh Subheader
  const [hoverStates, setHoverStates] = useState([
    { isHovering: false, wasHovering: false },
  ]);
  useEffect(() => {
    getExperiences();
  }, []);
  async function getExperiences() {
    const { data } = await supabase
      .from("experiences")
      .select()
      .order("date", { ascending: true });
    setExperiences(data);
  }

  return (
    <section>
      <div>
        <Subheader
          label="EXPERIENCES"
          index={0} // Karena ini satu-satunya, index-nya 0
          hoverStates={hoverStates}
          setHoverStates={setHoverStates}
          // onClick bisa dikosongkan jika tidak ada aksi
          onClick={() => {}}
        />

        <div className="flex flex-col gap-4">
          <Exp
            key={1}
            duration={"6 months"}
            timestamp={"July 2025 - Jan 2026"}
            position={"Ai and Data Engineer"}
            place={"Studyo io (Remote)"}
            description={
              "Saya bertugas sebagai ai engineer yang membangun reinforcement learning untuk mempersonalisasi pembelajaran adaptif pada platform android untuk belajar matematika dan mengelola google analytic"
            }
            techs={["tensorflow", "google analytics"]}
          />
          <Exp
            key={2}
            duration={"2 months"}
            timestamp={"Nov - Dec 2024"}
            position={"Web Developer"}
            place={"Kecamatan Pemangkat"}
            description={
              "Di sini posisi saya sebagai tim it, kami bertugas membangun website profil kecamatan pemangkat guna meningkatkan transparansi perangkat pemerintahan kecamatan pemangkat terhadap masyarakat"
            }
            techs={["php", "laravel","bootstrap"]}
          />
          <Exp
            key={3}
            duration={"3 months"}
            timestamp={"Mar - May 2024"}
            position={"Web Developer"}
            place={"LSP UNTAN"}
            description={
              "Berkesempatan untuk kerja praktik di Lembaga Sertifikasi Profesi Universitas Tanjungpura, di sini saya membangun website profil LSP UNTAN sehingga mahasiswa yang ingin mengambil sertifikasi tidak perlu datang langsung dan bertanya perihal administrasi sertifikasi"
            }
            techs={["php", "laravel","bootstrap"]}
          />
          <Exp
            key={4}
            duration={"5 months"}
            timestamp={"Aug - Dec 2023"}
            position={"Machine Learning Cohort"}
            place={"Bangkit Academy (Remote)"}
            description={
              "Terpilih sebagai mahasiswa untuk mengikuti studi independen bersertifikat pada platform Kampus Merdeka. Berkesempatan untuk belajar membangun model machine learning menggunakan Tensorflow, termasuk juga membangun deteksi gambar, pemrosesan bahasa alami, dan menggunakan transfer learning."
            }
            techs={["tensorflow"]}
          />
        </div>
      </div>
    </section>
  );
});
