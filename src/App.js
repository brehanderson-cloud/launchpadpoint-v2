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
        {/* Logo */}
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

        {/* Controls Container */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Dyslexia Toggle */}
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
              outline: "none",
              touchAction: "manipulation",
            }}
          >
            Dyslexia Font
          </button>

          {/* Dark/Light Toggle */}
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
              outline: "none",
              touchAction: "manipulation",
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
        {/* Logo Display */}
        <div
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <RocketLogo size={80} />
        </div>

        {/* Main Heading */}
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

        {/* Subtitle */}
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

        {/* Mobile Action Buttons */}
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
          {/* Primary CTA */}
          <button
            onClick={() => alert("Resume Builder - Coming Soon!")}
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
              outline: "none",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "rgba(0, 168, 255, 0.3)",
            }}
          >
            <div style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>
              Create Professional Resume
            </div>
            <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>
              $29.99 • Instant Access
            </div>
          </button>

          {/* Secondary CTAs */}
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
                outline: "none",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              Start Free Trial
            </button>

            <button
              onClick={() => alert("AI Assistant - Coming Soon!")}
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
                outline: "none",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              Try AI Assistant
            </button>
          </div>
        </div>

        {/* Mobile Features Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1rem",
            width: "100%",
            maxWidth: "350px",
          }}
        >
          {/* Feature 1 */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "1.5rem",
              borderRadius: "12px",
              textAlign: "center",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "rgba(0, 168, 255, 0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
              }}
            >
              <RocketLogo size={24} />
            </div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", fontWeight: "bold" }}>
              AI Resume Builder
            </h3>
            <p style={{ opacity: 0.9, lineHeight: 1.5, fontSize: "0.9rem" }}>
              Create tailored, professional resumes that match job requirements with intelligent analysis.
            </p>
          </div>

          {/* Feature 2 */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "1.5rem",
              borderRadius: "12px",
              textAlign: "center",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "rgba(64, 224, 208, 0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                fontSize: "1.5rem",
              }}
            >
              🎯
            </div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", fontWeight: "bold" }}>
              Smart Job Matching
            </h3>
            <p style={{ opacity: 0.9, lineHeight: 1.5, fontSize: "0.9rem" }}>
              Find opportunities that align with your skills and get real-time compatibility scoring.
            </p>
          </div>

          {/* Feature 3 */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "1.5rem",
              borderRadius: "12px",
              textAlign: "center",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "rgba(123, 104, 238, 0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                fontSize: "1.5rem",
              }}
            >
              ♿
            </div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem", fontWeight: "bold" }}>
              Accessibility First
            </h3>
            <p style={{ opacity: 0.9, lineHeight: 1.5, fontSize: "0.9rem" }}>
              WCAG 2.1 AA compliant with dyslexia-friendly fonts ensuring everyone can access opportunities.
            </p>
          </div>
        </div>
      </main>

      {/* Mobile Footer */}
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

// Desktop Landing Page
const DesktopLandingPage = ({ isDarkMode, setIsDarkMode }) => {
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
              outline: "none",
              touchAction: "manipulation",
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
              outline: "none",
              touchAction: "manipulation",
            }}
            title="Toggle Dark/Light Mode"
          >
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {/* Get Started */}
          <button
            onClick={() => alert("Dashboard - Coming Soon!")}
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
              outline: "none",
              touchAction: "manipulation",
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

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            marginBottom: "3rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => alert("Resume Builder - Coming Soon!")}
            style={{
              background: "linear-gradient(135deg, #00A8FF 0%, #0078FF 100%)",
              color: "white",
              padding: "1rem 2rem",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0, 168, 255, 0.4)",
              transition: "all 0.3s ease",
              outline: "none",
              touchAction: "manipulation",
            }}
          >
            <div>Create Professional Resume</div>
            <div style={{ fontSize: "0.9rem", opacity: 0.9, marginTop: "0.25rem" }}>
              $29.99 • Instant Access
            </div>
          </button>

          <button
            onClick={() => alert("Free Trial - Coming Soon!")}
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              color: "white",
              padding: "1rem 2rem",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              outline: "none",
              touchAction: "manipulation",
            }}
          >
            Start Free Trial
          </button>

          <button
            onClick={() => alert("AI Assistant - Coming Soon!")}
            style={{
              background: "transparent",
              color: "white",
              padding: "1rem 2rem",
              border: "2px solid white",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              outline: "none",
              touchAction: "manipulation",
            }}
          >
            Try AI Assistant
          </button>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            maxWidth: "1000px",
            width: "100%",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "2rem",
              borderRadius: "16px",
              textAlign: "center",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "rgba(0, 168, 255, 0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
              }}
            >
              <RocketLogo size={32} />
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: "bold" }}>
              AI Resume Builder
            </h3>
            <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
              Create tailored, professional resumes that match job requirements with intelligent analysis and optimization.
            </p>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "2rem",
              borderRadius: "16px",
              textAlign: "center",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "rgba(64, 224, 208, 0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                fontSize: "2rem",
              }}
            >
              🎯
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: "bold" }}>
              Job Matching
            </h3>
            <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
              Find relevant opportunities that align with your skills and get real-time compatibility scoring.
            </p>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "2rem",
              borderRadius: "16px",
              textAlign: "center",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "rgba(123, 104, 238, 0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                fontSize: "2rem",
              }}
            >
              ♿
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: "bold" }}>
              Accessibility First
            </h3>
            <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
              WCAG 2.1 AA compliant with 15+ accessibility features including dyslexia-friendly fonts ensuring everyone can access career opportunities.
            </p>
          </div>
        </div>
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

// Responsive Landing Page Component
const ResponsiveLandingPage = ({ isDarkMode, setIsDarkMode }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? (
    <MobileLandingPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
  ) : (
    <DesktopLandingPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
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
      <ResponsiveLandingPage 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
      />
    </div>
  );
}

export default App;
