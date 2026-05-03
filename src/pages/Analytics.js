import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { getAnalytics } from "../api";

function Analytics({ darkMode, theme }) {
  const [data, setData] = useState([]);
  const [view, setView] = useState("pie");

  const [stats, setStats] = useState({
    total: 0,
    spam: 0,
    safe: 0,
  });

  useEffect(() => {
    const fetchData = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) return;

      getAnalytics(user.id)
        .then((res) => {
          const spam = Number(res.data.spam) || 0;
          const safe = Number(res.data.safe) || 0;
          const total = spam + safe;

          setData([
            { name: "Safe Emails", value: safe },
            { name: "Spam Emails", value: spam },
          ]);

          setStats({ total, spam, safe });
        })
        .catch((err) => console.log(err));
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const COLORS = ["#22c55e", "#ef4444"];

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
      {/* GLOW EFFECTS */}
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
          width: "900px",
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
          textAlign: "center",
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
          📊 Analytics Dashboard
        </h1>

        {/* TOGGLE BUTTON */}
        <button
          onClick={() => setView(view === "pie" ? "bar" : "pie")}
          style={{
            padding: "10px 18px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            background: "linear-gradient(90deg, #4f46e5, #06b6d4)",
            color: "white",
            fontWeight: "bold",
            marginBottom: "20px",
            boxShadow: "0 8px 20px rgba(79,70,229,0.4)",
          }}
        >
          Switch to {view === "pie" ? "Bar Chart" : "Pie Chart"}
        </button>

        {/* STATS CARDS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          <Stat title="Total Emails" value={stats.total} darkMode={darkMode} />
          <Stat title="Safe Emails" value={stats.safe} color="#22c55e" darkMode={darkMode} />
          <Stat title="Spam Emails" value={stats.spam} color="#ef4444" darkMode={darkMode} />
        </div>

        {/* CHART */}
        <div style={{ width: "100%", height: 350 }}>
          {view === "pie" ? (
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  outerRadius={120}
                  label
                  isAnimationActive={true}
                  animationDuration={900}
                >
                  {data.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

/* STAT CARD */
const Stat = ({ title, value, color, darkMode }) => (
  <div
    style={{
      padding: "15px",
      borderRadius: "14px",

      background: darkMode
        ? "rgba(255,255,255,0.05)"
        : "rgba(255,255,255,0.7)",

      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",

      border: "1px solid rgba(255,255,255,0.2)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",

      color: darkMode ? "#e5e7eb" : "#111",
      minWidth: "150px",
      textAlign: "center",
      transition: "0.3s",
      cursor: "pointer",
    }}
    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <h4 style={{ marginBottom: "5px" }}>{title}</h4>
    <h2 style={{ color }}>{value}</h2>
  </div>
);

export default Analytics;