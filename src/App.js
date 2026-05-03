import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./Dashboard";
import Sidebar from "./components/Sidebar";
import Analytics from "./pages/Analytics";
import EmailScanner from "./pages/EmailScanner";
import Insights from "./pages/Insights";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const theme = {
    dark: "#020617",
    light: "#f1f5f9",
    cardDark: "rgba(15, 23, 42, 0.8)",
    cardLight: "#ffffff",
    textDark: "#e5e7eb",
    textLight: "#111",
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async () => {
    if (!text.trim()) return;

    if (!user) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", {
        text,
        user_id: user.id,
      });

      setResult(
        res.data.prediction === "spam"
          ? "🚨 SPAM Email"
          : "✅ Safe Email"
      );
      setConfidence(res.data.confidence);
      setExplanation(res.data.explanation);
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      setResult("❌ Backend error");
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          zIndex: 999,
        }}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <Routes>
        <Route
          path="/"
          element={
            <Landing
              darkMode={darkMode}
              theme={theme}
              goLogin={() => navigate("/login")}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login
              darkMode={darkMode}
              theme={theme}
              goDashboard={() => navigate("/dashboard")}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <>
              <Sidebar darkMode={darkMode} theme={theme} />
              <div style={{ marginLeft: "220px" }}>
                <Dashboard
                  darkMode={darkMode}
                  theme={theme}
                  text={text}
                  setText={setText}
                  result={result}
                  confidence={confidence}
                  explanation={explanation}
                  loading={loading}
                  handleSubmit={handleSubmit}
                />
              </div>
            </>
          }
        />

        <Route
          path="/analytics"
          element={
            <>
              <Sidebar darkMode={darkMode} theme={theme} />
              <div style={{ marginLeft: "220px" }}>
                <Analytics darkMode={darkMode} theme={theme} />
              </div>
            </>
          }
        />

        <Route
          path="/scanner"
          element={
            <>
              <Sidebar darkMode={darkMode} theme={theme} />
              <div style={{ marginLeft: "220px" }}>
                <EmailScanner
                  darkMode={darkMode}
                  theme={theme}
                  text={text}
                  setText={setText}
                  result={result}
                  confidence={confidence}
                  explanation={explanation}
                  loading={loading}
                  handleSubmit={handleSubmit}
                />
              </div>
            </>
          }
        />

        <Route
          path="/insights"
          element={
            <>
              <Sidebar darkMode={darkMode} theme={theme} />
              <div style={{ marginLeft: "220px" }}>
                <Insights darkMode={darkMode} theme={theme} />
              </div>
            </>
          }
        />

        <Route
          path="/reports"
          element={
            <>
              <Sidebar darkMode={darkMode} theme={theme} />
              <div style={{ marginLeft: "220px" }}>
                <Reports theme={theme} />
              </div>
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <Sidebar darkMode={darkMode} theme={theme} />
              <div style={{ marginLeft: "220px" }}>
                <Profile theme={theme} />
              </div>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default AppWrapper;