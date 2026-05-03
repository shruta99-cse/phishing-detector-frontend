import React from "react";

function Profile({ theme }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // fake enterprise metrics (you can later connect backend)
  const securityScore = 87;
  const riskLevel = securityScore > 80 ? "Low Risk" : "Medium Risk";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b1220",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* GLOW BACKGROUND */}
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: "#4f46e5",
          filter: "blur(140px)",
          borderRadius: "50%",
          top: "10%",
          left: "10%",
          opacity: 0.25,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "#06b6d4",
          filter: "blur(140px)",
          borderRadius: "50%",
          bottom: "10%",
          right: "10%",
          opacity: 0.25,
        }}
      />

      {/* MAIN CARD */}
      <div
        style={{
          width: "800px",
          padding: "30px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(25px)",
          WebkitBackdropFilter: "blur(25px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          color: "#e5e7eb",
          zIndex: 2,
        }}
      >
        {/* HEADER */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "28px",
            marginBottom: "25px",
            background: "linear-gradient(90deg,#4f46e5,#06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "700",
          }}
        >
          👤 Enterprise Profile Dashboard
        </h1>

        {/* TOP SECTION */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          {/* PROFILE BOX */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "linear-gradient(90deg,#4f46e5,#06b6d4)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "26px",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </div>

            <p><b>Email:</b> {user?.email}</p>
            <p><b>User ID:</b> {user?.id}</p>
            <p><b>Status:</b> <span style={{ color: "#22c55e" }}>Active</span></p>
          </div>

          {/* SECURITY SCORE */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              textAlign: "center",
            }}
          >
            <h3>🛡 Security Score</h3>

            <div
              style={{
                fontSize: "42px",
                fontWeight: "bold",
                color: "#06b6d4",
                marginTop: "10px",
              }}
            >
              {securityScore}%
            </div>

            <p style={{ marginTop: "10px", color: "#22c55e" }}>
              {riskLevel}
            </p>
          </div>
        </div>

        {/* ACTIVITY SECTION */}
        <div
          style={{
            padding: "20px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>📊 Account Activity</h3>

          <div style={{ display: "grid", gap: "10px" }}>
            <div>📩 Emails Scanned: <b>128</b></div>
            <div>🚨 Threats Blocked: <b>42</b></div>
            <div>✅ Safe Emails: <b>86</b></div>
            <div>⚡ System Uptime: <b>99.9%</b></div>
          </div>
        </div>

        {/* FOOTER */}
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "12px",
            opacity: 0.6,
          }}
        >
          Enterprise Security System • AI Powered Protection 🔒
        </div>
      </div>
    </div>
  );
}

export default Profile;