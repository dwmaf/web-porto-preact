import { useState, useRef, useEffect } from "preact/hooks";
import "./app.css";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { Crudexperiences } from "./pages/crudexperiences";
import { Createexp } from "./components/crudexp/createexp";
import { Router, Route, route } from "preact-router";
import supabase from "../supabaseClient";

export function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Mendapatkan sesi login pengguna
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Menangani perubahan status autentikasi
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        // Jika pengguna logout, arahkan ke halaman login
        route("/login");
      } else {
        // Jika pengguna login, arahkan ke halaman dashboard
        route("/dashboard");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Jika belum ada session (pengguna belum login)
  

  return (
    <>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/crudexperiences" component={Crudexperiences} />
        <Route path="/createexp" component={Createexp} />
      </Router>
    </>
  );
}
