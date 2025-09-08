import React, { useState } from "react";
import "./index.css";

const NAV_ITEMS = [
  { label: "Dashboard", icon: "🏠" },
  { label: "Resume", icon: "📄" },
  { label: "Jobs", icon: "💼" },
  { label: "Analytics", icon: "📊" },
  { label: "Network", icon: "👥" },
];

function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  // Example section content (customize as needed)
  const sectionContent = {
    Dashboard: (
      <>
        <div className="profile">
          <div className="name">John Doe</div>
          <div className="title">Senior Software Engineer</div>
          <div className="title">JD</div>
        </div>
        <div className="career-score-title">Career Intelligence Score</div>
        <div className="stat">Your comprehensive career performance metric</div>
        <div className="metrics">
          <div className="metric-card">
            <div className="metric-label">Score</div>
            <div className="metric-value">87</div>
            <div className="metric-label" style={{ color: "#22c55e" }}>
              ↑ +5 this week
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Skills</div>
            <div className="metric-value">92%</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Market</div>
            <div className="metric-value">89%</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Complete</div>
            <div className="metric-value">78%</div>
          </div>
        </div>
        <div className="section-title">Market Value</div>
        <div className="stat">
          <span role="img" aria-label="money">
            $
          </span>{" "}
          <span className="highlight">$118,000</span>
        </div>
        <div className="stat" style={{ color: "#22c55e" }}>
          <span role="img" aria-label="growth">
            💰
          </span>{" "}
          +$3,000 this month
        </div>
        <div className="section-title">Opportunities</div>
        <div className="stat">156</div>
        <div className="stat">
          <span role="img" aria-label="briefcase">
            💼
          </span>{" "}
          <span className="highlight">12 new today</span>
        </div>
      </>
    ),
    Resume: (
      <div>
        <h2>Resume</h2>
        <p>Your resume content goes here.</p>
      </div>
    ),
    Jobs: (
      <div>
        <h2>Jobs</h2>
        <p>Job opportunities and applications will be shown here.</p>
      </div>
    ),
    Analytics: (
      <div>
        <h2>Analytics</h2>
        <p>Career analytics and graphs will be displayed here.</p>
      </div>
    ),
    Network: (
      <div>
        <h2>Network</h2>
        <p>Your professional network insights appear here.</p>
      </div>
    ),
  };

  return (
    <div>
      <header className="header">
        <h1>
          <span role="img" aria-label="rocket">
            🚀
          </span>{" "}
          LaunchpadPoint
        </h1>
        <div className="desc">Career Intelligence Platform</div>
      </header>
      <nav>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            className={`nav-btn${activeNav === item.label ? " active" : ""}`}
            onClick={() => setActiveNav(item.label)}
            type="button"
          >
            <span>{item.icon}</span> {item.label}
          </button>
        ))}
      </nav>
      <div className="secondary-nav">
        <button className="nav-btn" type="button">
          <span role="img" aria-label="bell">
            🔔
          </span>{" "}
          3
        </button>
        <button className="nav-btn" type="button">
          <span role="img" aria-label="moon">
            🌙
          </span>
        </button>
      </div>
      <main className="main-content">{sectionContent[activeNav]}</main>
    </div>
  );
}

export default App;
