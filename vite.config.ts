import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import preact from '@preact/preset-vite'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    tailwindcss(), preact(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff,woff2}'],
        runtimeCaching: [],
      },
      manifest: {
        name: 'Portofolio Dawam Agung Fathoni',
        short_name: 'Porto Dawam',
        description: 'Website Portofolio Dawam Agung Fathoni',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        theme_color: '#ffffff', // Ganti dengan warna tema aplikasi Anda
        background_color: '#ffffff', // Ganti dengan warna latar belakang splash screen
        icons: [
          {
            src: '/oc.png', // Pastikan file ini ada di folder public
            sizes: '192x192',
            type: 'image/png'
          },
        ],
      },
    }),
  ],
});
