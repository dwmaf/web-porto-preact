import { render } from 'preact';
import './index.css';
import { App } from './app.jsx';
import { registerSW } from 'virtual:pwa-register';

const checkIfAdmin = () => {
    return localStorage.getItem('isAdmin') === 'true';
};

const updateSW = registerSW({
  onNeedRefresh() {
    // Logika untuk memberitahu pengguna bahwa ada pembaruan
    // dan meminta mereka untuk me-refresh.
    console.log("PWA: Konten baru tersedia, perlu refresh.");
    if (checkIfAdmin()) {
        if (confirm("Versi baru aplikasi tersedia. Muat ulang sekarang?")) {
          updateSW(true); // Memberitahu service worker untuk mengaktifkan versi baru dan memuat ulang
        }
    } else {
        console.log("PWA: Pembaruan tersedia, notifikasi UI hanya untuk admin"); 
    }
  },
  onOfflineReady() {
    // Logika untuk memberitahu pengguna bahwa aplikasi siap digunakan secara offline.
    console.log("PWA: Aplikasi siap digunakan secara offline.");
    if (checkIfAdmin()) {
        console.log("PWA: Notifikasi offline ready ditampilkan untuk admin");
    } else {
        console.log("PWA: Aplikasi offline ready, notifikasi UI hanya untuk admin.");
    }
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
