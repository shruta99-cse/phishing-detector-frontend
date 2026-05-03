import React, { useState } from "react";
import axios from "axios";

function Login({ darkMode, theme, goDashboard }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      goDashboard();
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: darkMode
          ? "radial-gradient(circle at top, #020617, #0f172a, #020617)"
          : "#f1f5f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        color: darkMode ? theme.textDark : theme.textLight,
      }}
    >
      {/* CARD */}
      <div
        style={{
          padding: "55px",
          borderRadius: "22px",
          textAlign: "center",
          width: "420px",
          background: darkMode
            ? "rgba(15,23,42,0.7)"
            : "#ffffff",
          backdropFilter: "blur(20px)",
          boxShadow: darkMode
            ? "0 30px 80px rgba(0,0,0,0.7)"
            : "0 20px 40px rgba(0,0,0,0.1)",
          border: darkMode
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid #e5e7eb",
          animation: "float 4s ease-in-out infinite",
        }}
      >
        {/* ICON */}
        <div style={{ fontSize: "38px", marginBottom: "10px" }}>🔐</div>

        {/* TITLE */}
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "8px",
            background: "linear-gradient(90deg, #4f46e5, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Login
        </h1>

        {/* SUBTEXT */}
        <p style={{ opacity: 0.8, marginBottom: "25px", fontSize: "14px" }}>
          Access your secure dashboard
        </p>

        {/* INPUTS */}
        <div style={{ display: "grid", gap: "15px", marginBottom: "25px" }}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle(darkMode)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle(darkMode)}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          style={{
            padding: "14px",
            width: "100%",
            border: "none",
            background: "linear-gradient(90deg, #4f46e5, #06b6d4)",
            color: "white",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
            boxShadow: "0 12px 30px rgba(79,70,229,0.4)",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Login →
        </button>

        {/* ANIMATION */}
        <style>
          {`
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
              100% { transform: translateY(0px); }
            }
          `}
        </style>
      </div>
    </div>
  );
}

// INPUT STYLE
const inputStyle = (darkMode) => ({
  padding: "12px",
  borderRadius: "10px",
  border: darkMode
    ? "1px solid rgba(255,255,255,0.1)"
    : "1px solid #e5e7eb",
  outline: "none",
  background: darkMode
    ? "rgba(255,255,255,0.05)"
    : "#f8fafc",
  color: darkMode ? "white" : "black",
});

export default Login;