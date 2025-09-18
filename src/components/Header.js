import React from "react";
import logo from "../logo.png";

// Updated color palette to match ResumeBuilder
const brandColors = {
  primary: '#4f46e5',
  gradient: 'linear-gradient(90deg, #4f46e5 0%, #667eea 50%, #764ba2 100%)',
  btnPrimary: 'linear-gradient(90deg, #4f46e5 0%, #667eea 100%)',
  btnText: '#fff',
};

export default function Header({ showHome = false }) {
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: 'rgba(255,255,255,0.08)',
      borderRadius: 20,
      padding: '1.2em 2em',
      marginBottom: 24,
      boxShadow: '0 2px 12px rgba(76, 81, 255, 0.07)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        {showHome && (
          <a href="/" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: brandColors.btnPrimary,
            color: brandColors.btnText,
            border: 'none', borderRadius: 12, padding: '0.5em 1em', fontWeight: 600, fontSize: 18, textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.07)'
          }}>
            <i className="fas fa-arrow-left" style={{ marginRight: 8 }}></i> Home
          </a>
        )}
        <div className="logo" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="LaunchpadPoint Logo" className="logo-img" style={{ width: 48, marginRight: 14, borderRadius: 12, background: 'none', boxShadow: 'none' }} />
          <span style={{ fontWeight: 700, fontSize: "1.5em", color: '#fff', letterSpacing: 1 }}>LaunchpadPoint</span>
        </div>
      </div>
      <div className="header-controls" style={{ display: 'flex', gap: 16 }}>
        <button className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid #fff', borderRadius: 10, fontWeight: 600 }}>
          <i className="fas fa-font"></i> Dyslexia Font
        </button>
        <button className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid #fff', borderRadius: 10, fontWeight: 600 }}>
          <i className="fas fa-moon"></i> Dark Mode
        </button>
      </div>
    </header>
  );
}
