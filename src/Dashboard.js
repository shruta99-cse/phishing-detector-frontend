import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ darkMode }) {
  const [stats, setStats] = useState(null);
  const [recentScans, setRecentScans] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/analytics/${user.id}`
      );

      const spam = res.data.spam || 0;
      const safe = res.data.safe || 0;
      const total = spam + safe;

      const accuracy = total === 0 ? 0 : ((safe / total) * 100).toFixed(1);

      setStats({ total, spam, safe, accuracy });

      const scanRes = await axios.get(
        `http://127.0.0.1:5000/recent/${user.id}`
      ).catch(() => ({ data: [] }));

      setRecentScans(scanRes.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!stats) {
    return <div style={{ color: "#fff", padding: 20 }}>Loading...</div>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: darkMode
          ? "#0b1220"
          : "#f4f7ff",
      }}
    >
      {/* TITLE */}
      <h1 style={{
        textAlign: "center",
        fontSize: "30px",
        marginBottom: "30px",
        color: darkMode ? "#ffffff" : "#111"
      }}>
        AI Security Dashboard
      </h1>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "15px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <Card label="Total Scans" value={stats.total} darkMode={darkMode} />
        <Card label="Spam" value={stats.spam} darkMode={darkMode} danger />
        <Card label="Safe" value={stats.safe} darkMode={darkMode} success />
        <Card label="Safe" value={`${stats.accuracy}%`} darkMode={darkMode} />
      </div>

      {/* RECENT */}
      <div
        style={{
          marginTop: "30px",
          maxWidth: "1000px",
          marginInline: "auto",
          padding: "20px",
          borderRadius: "15px",
          background: darkMode ? "#121a2b" : "#ffffff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <h3 style={{ color: darkMode ? "#fff" : "#000" }}>
          📩 Recent Scans
        </h3>

        {recentScans.length === 0 ? (
          <p style={{ color: darkMode ? "#aaa" : "#444" }}>
            No data available
          </p>
        ) : (
          recentScans.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                marginTop: "10px",
                borderRadius: "10px",
                background: darkMode ? "#1a2438" : "#f0f4ff",
                color: darkMode ? "#fff" : "#111",
              }}
            >
              <span>{item.email_text}</span>
              <strong
                style={{
                  color: item.prediction === "spam" ? "#ff4d4d" : "#22c55e",
                }}
              >
                {item.prediction}
              </strong>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* CARD */
function Card({ label, value, darkMode, danger, success }) {
  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "15px",
        background: darkMode ? "#121a2b" : "#ffffff",
        color: darkMode ? "#fff" : "#111",
        boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          color: danger ? "#ff4d4d" : success ? "#22c55e" : "#4f46e5",
        }}
      >
        {value}
      </h2>
      <p>{label}</p>
    </div>
  );
}

export default Dashboard;