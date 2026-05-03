import React from "react";

function EmailScanner({
  theme,
  darkMode,
  text,
  setText,
  result,
  confidence,
  explanation,
  loading,
  handleSubmit,
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",

        background: darkMode
          ? "radial-gradient(circle at top, #0f172a, #020617)"
          : "linear-gradient(135deg, #e0f2fe, #f1f5f9)",
      }}
    >
      {/* GLOW BACKGROUND */}
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "#4f46e5",
          filter: "blur(120px)",
          borderRadius: "50%",
          top: "10%",
          left: "15%",
          opacity: 0.3,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          background: "#06b6d4",
          filter: "blur(120px)",
          borderRadius: "50%",
          bottom: "10%",
          right: "15%",
          opacity: 0.3,
        }}
      />

      {/* GLASS CARD */}
      <div
        style={{
          width: "600px",
          padding: "30px",
          borderRadius: "20px",
          position: "relative",
          zIndex: 2,

          background: darkMode
            ? "rgba(255,255,255,0.05)"
            : "rgba(255,255,255,0.7)",

          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",

          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",

          color: darkMode ? "#e5e7eb" : "#111",
        }}
      >
        {/* TITLE */}
        <h1
          style={{
            fontSize: "28px",
            marginBottom: "20px",
            background: "linear-gradient(90deg, #4f46e5, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          📧 AI Email Scanner
        </h1>

        {/* TEXTAREA */}
        <textarea
          placeholder="Paste email content here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            height: "140px",
            padding: "12px",
            borderRadius: "12px",

            border: "1px solid rgba(255,255,255,0.2)",
            outline: "none",

            background: darkMode
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.8)",

            color: darkMode ? "#fff" : "#000",
          }}
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",

            fontWeight: "bold",
            color: "white",
            background: "linear-gradient(90deg, #4f46e5, #06b6d4)",
            boxShadow: "0 8px 20px rgba(79,70,229,0.4)",
          }}
        >
          {loading ? "Scanning..." : "Scan Email"}
        </button>

        {/* RESULT */}
        {result && (
          <div style={{ marginTop: "20px" }}>
            <h3>{result}</h3>
            {confidence && <p>Confidence: {confidence}%</p>}
          </div>
        )}

        {/* EXPLANATION */}
        {explanation && (
          <div
            style={{
              marginTop: "15px",
              padding: "12px",
              borderRadius: "12px",

              background: darkMode
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.05)",

              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <strong>🧠 AI Explanation:</strong>
            <p style={{ fontSize: "13px", marginTop: "8px" }}>
              {explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailScanner;