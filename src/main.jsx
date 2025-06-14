import { render } from 'preact';
import './index.css';
import { App } from './app.jsx';
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    // Logika untuk memberitahu pengguna bahwa ada pembaruan
    // dan meminta mereka untuk me-refresh.
    console.log("PWA: Konten baru tersedia, perlu refresh.");
    if (confirm("Versi baru aplikasi tersedia. Muat ulang sekarang?")) {
      updateSW(true); // Memberitahu service worker untuk mengaktifkan versi baru dan memuat ulang
    }
  },
  onOfflineReady() {
    // Logika untuk memberitahu pengguna bahwa aplikasi siap digunakan secara offline.
    console.log("PWA: Aplikasi siap digunakan secara offline.");
    // Anda bisa menampilkan toast atau pesan kecil di sini
    // alert("Aplikasi sekarang dapat digunakan secara offline.");
  },
  onRegistered(registration) {
    // Logika setelah service worker berhasil didaftarkan.
    console.log('PWA: Service Worker berhasil didaftarkan.', registration);
    // Anda bisa melakukan logging tambahan atau inisialisasi lain di sini.
  },
  onRegisterError(error) {
    // Logika untuk menangani kesalahan saat pendaftaran service worker.
    console.error('PWA: Gagal mendaftarkan Service Worker.', error);
    // Anda bisa menampilkan pesan kesalahan kepada pengguna atau mengirim log.
  }
});

render(<App />, document.getElementById('app'));
