import React, { useState, useEffect } from "react";

// Rocket Logo Component
const RocketLogo = ({ size = 32, className = "" }) => (
  <div
    className={className}
    style={{
      width: size,
      height: size,
      background:
        "linear-gradient(135deg, #00A8FF 0%, #0078FF 50%, #7B68EE 100%)",
      borderRadius: "50% 50% 50% 0",
      position: "relative",
      transform: "rotate(-45deg)",
      display: "inline-block",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "30%",
        left: "30%",
        width: "40%",
        height: "40%",
        background: "#40E0D0",
        borderRadius: "50%",
        opacity: 0.8,
      }}
    ></div>
    <div
      style={{
        position: "absolute",
        bottom: "-10px",
        left: "20%",
        width: "20%",
        height: "30%",
        background: "linear-gradient(135deg, #7B68EE 0%, #9932CC 100%)",
        borderRadius: "0 0 50% 50%",
      }}
    ></div>
    <div
      style={{
        position: "absolute",
        bottom: "-8px",
        right: "20%",
        width: "15%",
        height: "25%",
        background: "linear-gradient(135deg, #7B68EE 0%, #9932CC 100%)",
        borderRadius: "0 0 50% 50%",
      }}
    ></div>
  </div>
);

// Mobile-Optimized Landing Page Component
const MobileLandingPage = ({ isDarkMode, setIsDarkMode }) => {
  const [isDyslexiaFont, setIsDyslexiaFont] = useState(false);

  const fontFamily = isDyslexiaFont
    ? "OpenDyslexic, Arial, sans-serif"
    : "Inter, -apple-system, BlinkMacSystemFont, sans-serif";

  const background = isDarkMode
    ? "linear-gradient(135deg, #1f2937 0%, #111827 100%)"
    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

  return (
    <div
      style={{
        minHeight: "100vh",
        background,
        color: "white",
        display: "flex",
        flexDirection: "column",
        fontFamily,
        transition: "all 0.3s ease",
      }}
    >
      {/* Mobile Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          <RocketLogo size={32} />
          <span>LaunchpadPoint</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={() => setIsDyslexiaFont(!isDyslexiaFont)}
            style={{
              background: isDyslexiaFont
                ? "rgba(64, 224, 208, 0.3)"
                : "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: `1px solid ${
                isDyslexiaFont ? "#40E0D0" : "rgba(255, 255, 255, 0.3)"
              }`,
              borderRadius: "8px",
              padding: "0.5rem",
              cursor: "pointer",
              fontSize: "0.7rem",
              fontWeight: "600",
              transition: "all 0.3s ease",
              minWidth: "70px",
              textAlign: "center",
            }}
          >
            Dyslexia Font
          </button>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "8px",
              padding: "0.5rem",
              cursor: "pointer",
              fontSize: "0.7rem",
              fontWeight: "600",
              transition: "all 0.3s ease",
              minWidth: "70px",
              textAlign: "center",
            }}
          >
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      {/* Mobile Hero Section */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem 1rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <RocketLogo size={80} />
        </div>

        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            lineHeight: 1.2,
            maxWidth: "100%",
          }}
        >
          Transform Your Career with AI
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            marginBottom: "2rem",
            opacity: 0.9,
            lineHeight: 1.5,
            maxWidth: "90%",
          }}
        >
          LaunchpadPoint combines artificial intelligence, comprehensive analysis,
          and professional optimization to accelerate your career development
          journey.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            maxWidth: "320px",
            marginBottom: "2rem",
          }}
        >
          <button
            onClick={() => window.location.href = '/resume-builder.html'}
            style={{
              background: "linear-gradient(135deg, #00A8FF 0%, #0078FF 100%)",
              color: "white",
              padding: "1rem",
              border: "none",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0, 168, 255, 0.4)",
              transition: "all 0.3s ease",
              width: "100%",
            }}
          >
            <div style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>
              Create Professional Resume
            </div>
            <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>
              $29.99 • Instant Access
            </div>
          </button>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={() => alert("Free Trial - Coming Soon!")}
              style={{
                flex: 1,
                background: "rgba(255, 255, 255, 0.15)",
                color: "white",
                padding: "0.75rem",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "10px",
                fontSize: "0.9rem",
                fontWeight: "600",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
            >
              Start Free Trial
            </button>

            <button
              onClick={() => window.location.href = '/ai-assistant.html'}
              style={{
                flex: 1,
                background: "transparent",
                color: "white",
                padding: "0.75rem",
                border: "2px solid white",
                borderRadius: "10px",
                fontSize: "0.9rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Try AI Assistant
            </button>
          </div>
        </div>
      </main>

      <footer
        style={{
          padding: "1.5rem 1rem",
          textAlign: "center",
          background: "rgba(0, 0, 0, 0.2)",
          marginTop: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "0.75rem",
          }}
        >
          <RocketLogo size={20} />
          <span style={{ fontSize: "0.95rem", fontWeight: "bold" }}>
            LaunchpadPoint
          </span>
        </div>
        <p style={{ opacity: 0.8, fontSize: "0.8rem", lineHeight: 1.4 }}>
          Empowering careers through intelligent, accessible technology
        </p>
      </footer>
    </div>
  );
};

// Main App Component
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      style={{
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        minHeight: "100vh",
      }}
    >
      <MobileLandingPage 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
      />
    </div>
  );
}

export default App;
