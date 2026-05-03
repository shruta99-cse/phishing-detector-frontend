import React, { useEffect, useState } from "react";
import axios from "axios";

function Insights({ darkMode }) {
  const [data, setData] = useState({
    spam: 0,
    safe: 0,
    total: 0,
    riskLevel: "Low",
    spamRate: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/analytics/${user.id}`
      );

      const spam = res.data.spam || 0;
      const safe = res.data.safe || 0;
      const total = spam + safe;

      const spamRate =
        total === 0 ? 0 : ((spam / total) * 100).toFixed(1);

      let riskLevel = "Low";
      if (spamRate > 60) riskLevel = "High";
      else if (spamRate > 30) riskLevel = "Medium";

      setData({ spam, safe, total, spamRate, riskLevel });
    } catch (err) {
      console.log(err);
    }
  };

  const cards = [
    { title: "🚨 Spam Emails", value: data.spam, color: "#ef4444" },
    { title: "✅ Safe Emails", value: data.safe, color: "#22c55e" },
    { title: "📩 Total Scans", value: data.total, color: "#4f46e5" },
    { title: "⚠ Spam Rate", value: `${data.spamRate}%`, color: "#f59e0b" },
    {
      title: "🛡 Risk Level",
      value: data.riskLevel,
      color:
        data.riskLevel === "High"
          ? "#ef4444"
          : data.riskLevel === "Medium"
          ? "#f59e0b"
          : "#22c55e",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: darkMode ? "#0b1220" : "#f4f7ff",
        color: darkMode ? "#ffffff" : "#0f172a",
      }}
    >
      {/* TITLE */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "32px",
          marginBottom: "30px",
          fontWeight: "700",
          color: darkMode ? "#ffffff" : "#0f172a",
        }}
      >
        📊 Threat Insights Dashboard
      </h1>

      {/* CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {cards.map((item, i) => (
          <div
            key={i}
            className="card-pop"
            style={{
              animationDelay: `${i * 0.1}s`,
              padding: "20px",
              borderRadius: "16px",

              background: darkMode
                ? "rgba(18,26,43,0.95)"
                : "#ffffff",

              boxShadow: darkMode
                ? "0 8px 25px rgba(0,0,0,0.4)"
                : "0 8px 20px rgba(0,0,0,0.12)",

              textAlign: "center",
              cursor: "pointer",
              transition: "0.3s",
              border: darkMode
                ? "1px solid rgba(255,255,255,0.05)"
                : "1px solid rgba(0,0,0,0.05)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform =
                "translateY(-8px) scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0) scale(1)")
            }
          >
            <h4
              style={{
                marginBottom: "10px",
                color: darkMode ? "#e5e7eb" : "#0f172a",
              }}
            >
              {item.title}
            </h4>

            <h2
              style={{
                color: item.color,
                fontWeight: "800",
              }}
            >
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div
        style={{
          marginTop: "40px",
          maxWidth: "900px",
          margin: "0 auto",
          padding: "25px",
          borderRadius: "15px",

          background: darkMode
            ? "rgba(18,26,43,0.95)"
            : "#ffffff",

          color: darkMode ? "#ffffff" : "#0f172a",

          boxShadow: darkMode
            ? "0 10px 30px rgba(0,0,0,0.4)"
            : "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>
          🧠 AI Security Summary
        </h3>

        <p style={{ lineHeight: "1.6", opacity: 0.9 }}>
          System analyzed <b>{data.total}</b> emails.{" "}
          <b>{data.spamRate}%</b> are suspicious. Risk level is{" "}
          <b>{data.riskLevel}</b>.
        </p>
      </div>
    </div>
  );
}

export default Insights;