import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";

//! Components
import Current from "./pages/current/Current";
import Forecast from "./pages/forecast/Forecast";

import Navbar from "./pages/components/Navbar";
import ThemeController from "./pages/components/ThemeController";

function App() {
  const [theme, setTheme] = useState("emerlad");

  return (
    <div className="bg-base-200/25 h-full min-h-screen">
      <div className="fixed right-2 top-2">
        <ThemeController theme={theme} setTheme={setTheme} />
      </div>

      <Routes>
        <Route path="/" element={<Current />} />
        <Route path="/current" element={<Current />} />
        <Route path="/forecast" element={<Forecast theme={theme} />} />
      </Routes>
      <div className="fixed">
        <Navbar />
      </div>
    </div>
  );
}

export default App;
