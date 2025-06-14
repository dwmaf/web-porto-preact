self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : { title: 'Notifikasi', body: 'Sesuatu yang baru!', icon: '/pwa-192x192.png' };
  const title = data.title || 'Pengingat Mingguan';
  const options = {
    body: data.body || 'Ini hari Minggu!',
    icon: data.icon || '/pwa-192x192.png', // Ganti dengan ikon default Anda
    badge: '/pwa-badge-72x72.png', // Opsional: ikon kecil untuk status bar
    // data: { url: data.url } // Opsional: data tambahan, misal URL untuk dibuka saat notif diklik
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Opsional: Menangani klik notifikasi
self.addEventListener('notificationclick', event => {
  event.notification.close();
  // Contoh: membuka URL tertentu atau fokus ke tab aplikasi
  const urlToOpen = event.notification.data && event.notification.data.url ? event.notification.data.url : '/dashboard';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      // Cek jika ada window yang sudah terbuka
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Jika tidak ada, buka window baru
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});