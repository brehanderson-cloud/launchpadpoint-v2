import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResumeBuilder from "./pages/ResumeBuilder";
import NextGenCareerPlatform from "./pages/NextGenCareerPlatform";
import AdvancedAICareerAssistant from "./pages/AdvancedAICareerAssistant";

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

// Landing Page
const LandingPage = ({ isDarkMode, setIsDarkMode }) => {
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
      {/* Dyslexia Font CSS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=OpenDyslexic:wght@400;700&display=swap');
        `}
      </style>

      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          <RocketLogo size={40} />
          <span>LaunchpadPoint</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Dyslexia Font Toggle */}
          <button
            onClick={() => setIsDyslexiaFont(!isDyslexiaFont)}
            style={{
              background: isDyslexiaFont
                ? "rgba(64, 224, 208, 0.3)"
                : "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: `2px solid ${
                isDyslexiaFont ? "#40E0D0" : "rgba(255, 255, 255, 0.3)"
              }`,
              borderRadius: "8px",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
            title="Toggle Dyslexia-Friendly Font"
          >
            {isDyslexiaFont ? "✓ Dyslexia Font" : "Dyslexia Font"}
          </button>

          {/* Dark/Light Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "8px",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
            title="Toggle Dark/Light Mode"
          >
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {/* Get Started */}
          <button
            onClick={() => (window.location.href = "/dashboard")}
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              color: "white",
              padding: "0.75rem 1.5rem",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              backdropFilter: "blur(10px)",
            }}
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <RocketLogo size={120} />
        </div>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 8vw, 4rem)",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            lineHeight: 1.2,
          }}
        >
          Transform Your Career with AI
        </h1>

        <p
          style={{
            fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
            marginBottom: "3rem",
            opacity: 0.9,
            maxWidth: "700px",
            lineHeight: 1.4,
          }}
        >
          LaunchpadPoint combines artificial intelligence, comprehensive analysis,
          and professional optimization to accelerate your career development
          journey.
        </p>
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: "2rem",
          textAlign: "center",
          background: "rgba(0, 0, 0, 0.2)",
          marginTop: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <RocketLogo size={28} />
          <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            LaunchpadPoint
          </span>
        </div>
        <p style={{ opacity: 0.8, fontSize: "0.9rem" }}>
          Empowering careers through intelligent, accessible technology
        </p>
      </footer>
    </div>
  );
};

// Dashboard
const Dashboard = () => (
  <div
    style={{ padding: "2rem", minHeight: "100vh", background: "#f7fafc" }}
  >
    <h1
      style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#2d3748" }}
    >
      Dashboard
    </h1>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
        marginBottom: "2rem",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ color: "#4a5568", marginBottom: "0.5rem" }}>
          Applications
        </h3>
        <p
          style={{ fontSize: "2rem", fontWeight: "bold", color: "#3182ce" }}
        >
          0
        </p>
      </div>
      <div
        style={{
          background: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ color: "#4a5568", marginBottom: "0.5rem" }}>
          Resume Score
        </h3>
        <p
          style={{ fontSize: "2rem", fontWeight: "bold", color: "#38a169" }}
        >
          -
        </p>
      </div>
      <div
        style={{
          background: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ color: "#4a5568", marginBottom: "0.5rem" }}>
          Job Matches
        </h3>
        <p
          style={{ fontSize: "2rem", fontWeight: "bold", color: "#8b5cf6" }}
        >
          0
        </p>
      </div>
    </div>
  </div>
);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.style.background = isDarkMode ? "#111827" : "#ffffff";
  }, [isDarkMode]);

  return (
    <Router>
      <div
        style={{
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/ai-assistant" element={<AdvancedAICareerAssistant />} />
          <Route path="/career-intelligence" element={<NextGenCareerPlatform />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
