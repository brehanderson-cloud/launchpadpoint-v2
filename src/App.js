import React from "react";
import "./index.css";

function App() {
  return (
    <div>
      <header className="header">
        <h1>🚀 LaunchpadPoint</h1>
        <div className="desc">Career Intelligence Platform</div>
      </header>
      <nav>
        <button className="nav-btn active">🏠 Dashboard</button>
        <button className="nav-btn">📄 Resume</button>
        <button className="nav-btn">💼 Jobs</button>
        <button className="nav-btn">📊 Analytics</button>
        <button className="nav-btn">👥 Network</button>
        <button className="nav-btn">🔔 3</button>
        <button className="nav-btn">🌙</button>
      </nav>
      <main className="main-content">
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
            <div className="metric-label" style={{color:"#22c55e"}}>↑ +5 this week</div>
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
          <span role="img" aria-label="money">$</span> <span className="highlight">$118,000</span>
        </div>
        <div className="stat" style={{color:"#22c55e"}}>
          <span role="img" aria-label="growth">💰</span> +$3,000 this month
        </div>
        <div className="section-title">Opportunities</div>
        <div className="stat">156</div>
        <div className="stat">
          <span role="img" aria-label="briefcase">💼</span> <span className="highlight">12 new today</span>
        </div>
      </main>
    </div>
  );
}

export default App;
