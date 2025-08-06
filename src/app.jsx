import { useState, useRef, useEffect } from "preact/hooks";
import "./app.css";
import { Home } from "./pages/home";
// import { Test } from "./pages/test";
// import { Test2 } from "./pages/test2";
// import { Test3 } from "./pages/test3";
// import { Login } from "./pages/login";
// import { Dashboard } from "./pages/dashboard";
// import { Crudexperiences } from "./pages/crudexperiences";
// import { Crudprojects } from "./pages/crudprojects";
// import { Createexp } from "./components/crudexp/createexp";
// import { Updateexp } from "./components/crudexp/updateexp";
// import { Createproject } from "./components/crudproject/createproject";
// import { Updateproject } from "./components/crudproject/updateproject";
import { Router, Route, route } from "preact-router";
import supabase from "../supabaseClient";

export function App() {
  // const [session, setSession] = useState(null);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
  //     // Ganti nama variabel agar tidak konflik
  //     setSession(currentSession);
  //   });

  //   const {
  //     data: { subscription: authSubscription },
  //   } = supabase.auth.onAuthStateChange((_event, newSession) => {
  //     setSession(newSession);
  //     if (!newSession) {
  //       const publicRoutes = ["/", "/login"];
  //       const currentPath = window.location.pathname;
  //       if (!publicRoutes.includes(currentPath)) {
  //         route("/login");
  //       }
  //     }
  //   });

  //   return () => {
  //     authSubscription.unsubscribe();
  //   };
  // }, []);

  // // cek apakah pengguna sudah login sebelum memberikan akses ke rute tertentu
  // const ProtectedRoute = ({ component: Component, ...props }) => {
  //   if (!session) {
  //     route("/login");
  //     return null;
  //   }
  //   return <Component {...props} />;
  // };

  return (
    <>
      <Router>
        {/* Middleware public */}
        <Route path="/" component={Home} />
        {/* <Route path="/test" component={Test} />
        <Route path="/test2" component={Test2} />
        <Route path="/test3" component={Test3} /> */}
        {/* <Route
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
        /> */}

        {/* Middleware authenticated */}
        {/* <Route path="/dashboard" component={Dashboard} />
        <Route path="/crudexperiences" component={Crudexperiences} />
        <Route path="/createexp" component={Createexp} /> */}
        {/* <Route
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
        /> */}
      </Router>
    </>
  );
}
