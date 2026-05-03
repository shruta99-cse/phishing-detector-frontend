import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function Reports() {
  const [data, setData] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/analytics/${user.id}`
      );

      const spam = Number(res.data.spam) || 0;
      const safe = Number(res.data.safe) || 0;
      const total = spam + safe;

      const safeRate =
        total > 0 ? ((safe / total) * 100).toFixed(1) : "0.0";

      setData({
        spam,
        safe,
        total,
        safeRate,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  // 📄 PDF DOWNLOAD
  const downloadPDF = () => {
    if (!data) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("AI Security Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`User: ${user.email}`, 20, 40);
    doc.text(`System: Phishing Detection AI`, 20, 50);

    doc.text("----- Summary -----", 20, 70);
    doc.text(`Total Emails: ${data.total}`, 20, 80);
    doc.text(`Spam: ${data.spam}`, 20, 90);
    doc.text(`Safe: ${data.safe}`, 20, 100);
    doc.text(`Safe Rate: ${data.safeRate}%`, 20, 110);

    let level =
      data.safeRate > 70
        ? "High 🔒"
        : data.safeRate > 40
        ? "Medium ⚠️"
        : "Low 🚨";

    doc.text(`Security Level: ${level}`, 20, 130);

    doc.save("AI_Security_Report.pdf");
  };

  if (!data) {
    return (
      <div style={{ color: "#fff", padding: 20 }}>
        Loading report...
      </div>
    );
  }

  const level =
    data.safeRate > 70
      ? "High 🔒"
      : data.safeRate > 40
      ? "Medium ⚠️"
      : "Low 🚨";

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        padding: "40px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle at top, #0f172a, #020617)",
      }}
    >
      {/* GLOW */}
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

      {/* CARD */}
      <div
        style={{
          width: "600px",
          padding: "30px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#e5e7eb",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            background:
              "linear-gradient(90deg,#4f46e5,#06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "28px",
          }}
        >
          📄 AI Security Report
        </h1>

        <p><b>User:</b> {user.email}</p>
        <p><b>System:</b> Phishing Detection AI</p>

        <hr />

        <p><b>Total Emails:</b> {data.total}</p>
        <p style={{ color: "red" }}><b>Spam:</b> {data.spam}</p>
        <p style={{ color: "green" }}><b>Safe:</b> {data.safe}</p>

        <h3>
          Safe Rate: {data.safeRate}%
        </h3>

        <h3>Security Level: {level}</h3>

        {/* DOWNLOAD BUTTON */}
        <button
          onClick={downloadPDF}
          style={{
            marginTop: "20px",
            padding: "10px 18px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            background:
              "linear-gradient(90deg,#4f46e5,#06b6d4)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          ⬇ Download PDF Report
        </button>
      </div>
    </div>
  );
}

export default Reports;