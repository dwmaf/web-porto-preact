import { useState, useRef, useEffect } from "preact/hooks";
import "./app.css";
import { Home } from "./pages/home";
import { Archive } from "./pages/archive";
import { ProjectDetail } from "./pages/project-detail";
import { ScrollProgress } from "./components/scroll-progress";

import { Router, Route, route } from "preact-router";
import { LanguageProvider } from "./context/language-context";
import { ThemeProvider } from "./context/theme-context";

export function App() {
  

  return (
    <LanguageProvider>
      <ThemeProvider>
        <ScrollProgress />
        <Router>
          <Route path="/" component={Home} />
          <Route path="/archive" component={Archive} />
          <Route path="/project/:slug" component={ProjectDetail} />
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}
