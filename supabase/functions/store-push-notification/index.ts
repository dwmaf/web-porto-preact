// supabase/functions/store-push-subscription/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const subscription = await req.json();
    // TODO: Validasi subscription object

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, // Gunakan service role key untuk operasi backend
    );

    // Simpan ke tabel, misalnya 'admin_push_subscriptions'
    // Pastikan tabel ini sudah Anda buat di Supabase
    const { data, error } = await supabaseClient
      .from('admin_push_subscriptions')
      .insert([
        {
          endpoint: subscription.endpoint,
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
          // user_id: (await supabaseClient.auth.getUser(req.headers.get('Authorization')?.replace('Bearer ',''))).data.user?.id // Jika ingin mengaitkan dengan user_id
        },
      ])
      .select();

    if (error) throw error;

    return new Response(JSON.stringify({ message: "Subscription stored", data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});