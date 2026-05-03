import React from "react";

function Landing({ darkMode, theme, goLogin }) {
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
        color: darkMode ? theme.textDark : theme.textLight,
        fontFamily: "Arial",
        overflow: "hidden"
      }}
    >
      {/* MAIN CARD */}
      <div
        style={{
          padding: "60px",
          borderRadius: "22px",
          textAlign: "center",
          maxWidth: "520px",
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
          animation: "float 4s ease-in-out infinite"
        }}
      >
        {/* LOGO */}
        <div
          style={{
            fontSize: "40px",
            marginBottom: "10px"
          }}
        >
          📧
        </div>

        {/* TITLE */}
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
            background: "linear-gradient(90deg, #4f46e5, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          PhishGuard AI
        </h1>

        {/* SUBTITLE */}
        <p
          style={{
            opacity: 0.85,
            fontSize: "15px",
            marginBottom: "25px"
          }}
        >
          Advanced AI-powered phishing detection system for secure email protection
        </p>

        {/* FEATURES */}
        <div
          style={{
            display: "grid",
            gap: "10px",
            marginBottom: "30px"
          }}
        >
          <div style={featureBox(darkMode)}>
            ⚡ Real-time phishing detection
          </div>

          <div style={featureBox(darkMode)}>
            🧠 Machine Learning models (Naive Bayes & Random Forest)
          </div>

          <div style={featureBox(darkMode)}>
            🔐 Secure user-based history tracking
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={goLogin}
          style={{
            padding: "14px 28px",
            border: "none",
            background: "linear-gradient(90deg, #4f46e5, #06b6d4)",
            color: "white",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
            boxShadow: "0 12px 30px rgba(79,70,229,0.4)",
            transition: "0.3s"
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.07)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Go To Login  →
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

// FEATURE BOX STYLE
const featureBox = (darkMode) => ({
  padding: "12px",
  borderRadius: "12px",
  fontSize: "13px",
  background: darkMode
    ? "rgba(255,255,255,0.05)"
    : "#f8fafc",
  border: darkMode
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid #e5e7eb",
  backdropFilter: "blur(10px)"
});

export default Landing;