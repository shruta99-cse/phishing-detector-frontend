import React, { useEffect, useState } from "react";
import axios from "axios";

function ThreatHistory({ darkMode }) {
  const [data, setData] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line
  }, []);

  const fetchHistory = async () => {
    if (!user) return;

    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/history/${user.id}`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: darkMode
          ? "radial-gradient(circle at top, #0f172a, #020617)"
          : "linear-gradient(135deg, #e0f2fe, #f1f5f9)",
      }}
    >
      {/* MAIN CONTENT AREA */}
      <div
        style={{
          flex: 1,
          padding: "40px",
          position: "relative",
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

        {/* CONTENT */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {/* TITLE */}
          <h1
            style={{
              fontSize: "32px",
              marginBottom: "30px",
              textAlign: "center",
              background: "linear-gradient(90deg, #4f46e5, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            📜 Threat History
          </h1>

          {/* EMPTY STATE */}
          {data.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px",
                opacity: 0.7,
              }}
            >
              No history found yet 🚫
            </div>
          ) : (
            data.map((item) => (
              <div
                key={item.id}
                style={{
                  background: darkMode
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(20px)",
                  padding: "18px",
                  marginBottom: "15px",
                  borderRadius: "18px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                  color: darkMode ? "#e5e7eb" : "#111",
                }}
              >
                <p>
                  <b>Status:</b>{" "}
                  <span
                    style={{
                      color:
                        item.prediction === "spam"
                          ? "#ef4444"
                          : "#22c55e",
                      fontWeight: "bold",
                    }}
                  >
                    {item.prediction.toUpperCase()}
                  </span>
                </p>

                <p style={{ fontSize: "14px", opacity: 0.9 }}>
                  {item.email_text}
                </p>

                <p style={{ fontSize: "13px" }}>
                  Confidence: {item.confidence}%
                </p>

                <p style={{ fontSize: "11px", opacity: 0.6 }}>
                  {item.created_at}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ThreatHistory;