// supabase/functions/send-sunday-notification/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import webpush from "npm:web-push"; // Anda perlu cara untuk menggunakan npm module di Deno Edge Function

// Set VAPID details (simpan di environment variables Supabase)
const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY")!;
const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY")!;

webpush.setVapidDetails(
  'mailto:dwmaf11ipa2@gmail.com', // Ganti dengan email Anda
  vapidPublicKey,
  vapidPrivateKey
);

serve(async (_req) => { // Cron job biasanya tidak menerima request body yang signifikan
  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: subscriptions, error } = await supabaseClient
      .from('admin_push_subscriptions')
      .select('endpoint, p256dh, auth');

    if (error) throw error;
    if (!subscriptions || subscriptions.length === 0) {
      return new Response("No subscriptions to send to.", { status: 200 });
    }

    const notificationPayload = JSON.stringify({
      title: 'Pengingat Mingguan',
      body: 'Halo Admin! Selamat Hari Minggu! ☀️',
      icon: '/pwa-192x192.png', // Sesuaikan
    });

    const sendPromises = subscriptions.map(sub => {
      const pushSubscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth,
        },
      };
      return webpush.sendNotification(pushSubscription, notificationPayload)
        .catch(err => {
          console.error(`Error sending notification to ${sub.endpoint}:`, err);
          // Jika error karena subscription tidak valid (misal, 404 atau 410), hapus dari database
          if (err.statusCode === 404 || err.statusCode === 410) {
            return supabaseClient.from('admin_push_subscriptions').delete().match({ endpoint: sub.endpoint });
          }
        });
    });

    await Promise.all(sendPromises);

    return new Response("Sunday notifications sent.", { status: 200 });
  } catch (e) {
    console.error("Error sending Sunday notifications:", e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
});