import { useState, useRef, useEffect } from "preact/hooks";
import "./app.css";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { Crudexperiences } from "./pages/crudexperiences";
import { Crudprojects } from "./pages/crudprojects";
import { Createexp } from "./components/crudexp/createexp";
import { Updateexp } from "./components/crudexp/updateexp";
import { Createproject } from "./components/crudproject/createproject";
import { Updateproject } from "./components/crudproject/updateproject";
import { Router, Route, route } from "preact-router";
import supabase from "../supabaseClient";
const VAPID_PUBLIC_KEY = import.meta.env.VAPID_PUBLIC_KEY;
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function subscribeAdminToPushNotifications() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.warn("Push messaging tidak didukung");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready; // Tunggu service worker aktif
    let subscription = await registration.pushManager.getSubscription();

    if (subscription === null) {
      console.log("Belum ada subscription, membuat yang baru...");
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      console.log("Push subscription berhasil dibuat:", subscription);

      // Kirim subscription ke backend (Supabase Edge Function)
      // Ganti dengan URL Edge Function Anda
      const response = await fetch("/api/store-push-subscription", {
        // Nama Edge Function Anda mungkin berbeda
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabase.auth.session()?.access_token}`, // Jika perlu otentikasi admin
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gagal mengirim subscription ke server:", errorData);
        // Mungkin hapus subscription jika gagal dikirim?
        // await subscription.unsubscribe();
        return;
      }
      console.log("Push subscription berhasil dikirim ke server.");
      localStorage.setItem("isAdminPushSubscribed", "true");
    } else {
      console.log("Admin sudah subscribe ke push notifications.");
      // Opsional: Anda bisa mengirim ulang subscription jika ingin memastikan backend memilikinya
      // atau jika applicationServerKey berubah.
    }
  } catch (error) {
    console.error("Gagal subscribe untuk push notifications:", error);
  }
}

export function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      // Ganti nama variabel agar tidak konflik
      setSession(currentSession);
      if (
        currentSession &&
        localStorage.getItem("isPwaAdmin") === "true" &&
        !localStorage.getItem("isAdminPushSubscribed")
      ) {
        // Jika admin dan belum subscribe (atau ingin memastikan)
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            subscribeAdminToPushNotifications();
          } else {
            console.warn("Izin notifikasi tidak diberikan oleh admin.");
          }
        });
      }
    });

    const {
      data: { subscription: authSubscription }, // Ganti nama variabel
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      // Ganti nama variabel
      setSession(newSession);
      if (newSession && localStorage.getItem("isPwaAdmin") === "true") {
        // Admin baru saja login atau sesi diperbarui
        if (!localStorage.getItem("isAdminPushSubscribed")) {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              subscribeAdminToPushNotifications();
            } else {
              console.warn("Izin notifikasi tidak diberikan oleh admin.");
            }
          });
        }
      } else if (!newSession) {
        // Admin logout, hapus status push subscribed
        localStorage.removeItem("isAdminPushSubscribed");
        const publicRoutes = ["/", "/login"];
        const currentPath = window.location.pathname;
        if (!publicRoutes.includes(currentPath)) {
          route("/login");
        }
      }
    });

    return () => {
      authSubscription.unsubscribe();
    };
  }, []);

  // cek apakah pengguna sudah login sebelum memberikan akses ke rute tertentu
  const ProtectedRoute = ({ component: Component, ...props }) => {
    if (!session) {
      route("/login");
      return null;
    }
    return <Component {...props} />;
  };

  return (
    <>
      <Router>
        {/* Middleware public */}
        <Route path="/" component={Home} />
        <Route
          path="/login"
          component={(props) => {
            if (session) {
              useEffect(() => {
                route("/dashboard", true);
              }, []);
              return null;
            }
            return <Login {...props} />;
          }}
        />

        {/* Middleware authenticated */}
        {/* <Route path="/dashboard" component={Dashboard} />
        <Route path="/crudexperiences" component={Crudexperiences} />
        <Route path="/createexp" component={Createexp} /> */}
        <Route
          path="/dashboard"
          component={(props) => (
            <ProtectedRoute component={Dashboard} {...props} />
          )}
        />
        <Route
          path="/crudexperiences"
          component={(props) => (
            <ProtectedRoute component={Crudexperiences} {...props} />
          )}
        />
        <Route
          path="/crudprojects"
          component={(props) => (
            <ProtectedRoute component={Crudprojects} {...props} />
          )}
        />
        <Route
          path="/createexp"
          component={(props) => (
            <ProtectedRoute component={Createexp} {...props} />
          )}
        />
        <Route
          path="/updateexp/:id"
          component={(props) => (
            <ProtectedRoute component={Updateexp} {...props} />
          )}
        />
        <Route
          path="/createproject"
          component={(props) => (
            <ProtectedRoute component={Createproject} {...props} />
          )}
        />
        <Route
          path="/updateproject/:id"
          component={(props) => (
            <ProtectedRoute component={Updateproject} {...props} />
          )}
        />
      </Router>
    </>
  );
}
