import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ darkMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menu = [
    { name: "Dashboard", icon: "🏠", path: "/dashboard" },
    { name: "Email Scanner", icon: "📧", path: "/scanner" },
    { name: "Analytics", icon: "📊", path: "/analytics" },
    { name: "Reports", icon: "🧾", path: "/reports" },
    { name: "Insights", icon: "🔥", path: "/insights" },
    { name: "Profile", icon: "👤", path: "/profile" },
  ];

  const isActive = (path) => location.pathname === path;

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* HAMBURGER */}
      {isMobile && (
        <button
          onClick={() => setOpen(!open)}
          style={{
            position: "fixed",
            top: 15,
            left: 15,
            zIndex: 2000,
            fontSize: "26px",
            background: "transparent",
            border: "none",
            color: darkMode ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
      )}

      {/* BACKDROP */}
      {open && isMobile && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
        />
      )}

      {/* SIDEBAR */}
      <div
        style={{
          position: "fixed",
          left: isMobile ? (open ? 0 : "-260px") : 0,
          top: 0,
          width: "240px",
          height: "100vh",
          padding: "20px",
          zIndex: 1000,
          transition: "0.3s",

          background: darkMode
            ? "linear-gradient(180deg, #020617, #0f172a)"
            : "#fff",

          color: darkMode ? "#e5e7eb" : "#111",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* LOGO */}
        <h2
          style={{
            marginBottom: "25px",
            background: "linear-gradient(90deg,#4f46e5,#06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          📧 PhishGuard AI
        </h2>

        {/* MENU */}
        {menu.map((item, i) => (
          <div
            key={i}
            onClick={() => {
              navigate(item.path);
              if (isMobile) setOpen(false);
            }}
            style={{
              padding: "10px",
              margin: "6px 0",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "0.3s",

              background: isActive(item.path)
                ? "linear-gradient(90deg,#4f46e5,#06b6d4)"
                : "transparent",

              color: isActive(item.path)
                ? "#fff"
                : darkMode
                ? "#e5e7eb"
                : "#111",
            }}
          >
            {item.icon} {item.name}
          </div>
        ))}

        {/* LOGOUT */}
        <div
          onClick={logout}
          style={{
            marginTop: "20px",
            padding: "10px",
            borderRadius: "10px",
            cursor: "pointer",
            color: "#ef4444",
            border: "1px solid rgba(239,68,68,0.3)",
          }}
        >
          🚪 Logout
        </div>
      </div>
    </>
  );
}

export default Sidebar;