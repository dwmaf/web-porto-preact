import { useState, useRef } from "preact/hooks";
import "../app.css";
import { Instagram, Github, Linkedin, ArrowUpRight, Mail } from "feather-icons-react";

// Komponen utama portofolio
export function Test3() {
  // Fungsi untuk mengirim event ke Google Analytics
  const handleButtonClick = () => {
    // Pastikan fungsi gtag ada di window (script Google Analytics sudah dimuat)
    if (typeof window.gtag === "function") {
      // Mengirim event kustom
      window.gtag("event", "test_button_click", {
        event_category: "user_interaction",
        event_label: "test_page_button",
        value: 1,
      });

      // Memberi feedback ke developer di console dan alert
      console.log("GA Event Sent: test_button_click");
      alert("Event Google Analytics telah dikirim! (Cek console log)");
    } else {
      console.error("Google Analytics (gtag.js) tidak ditemukan.");
      alert(
        "Google Analytics (gtag.js) tidak ditemukan. Pastikan script sudah terpasang di file HTML utama Anda."
      );
    }
  };

  return (
    <div className="">
      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Tambahkan onClick ke tombol */}
        <button
          onClick={handleButtonClick}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded"
        >
          Kirim Event ke GA
        </button>
      </main>
    </div>
  );
}
