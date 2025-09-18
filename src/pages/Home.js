import React from 'react';
import AIFixedBar from '../components/AIFixedBar';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="landing-container" style={{ textAlign: "center", minHeight: "100vh", background: 'linear-gradient(90deg, #4f46e5 0%, #667eea 50%, #764ba2 100%)', color: "#fff", paddingTop: 0 }}>
  {/* Header removed for a cleaner, color-only top section */}
      <div>
        <img src="/logo192.png" alt="LaunchpadPoint Center Logo" style={{ width: 120, height: 120, borderRadius: 24, background: 'none', boxShadow: 'none', margin: "auto" }} />
        <h1 style={{ fontWeight: "800", fontSize: "2.8rem", margin: "2rem 0 1rem" }}>Transform Your Career with AI</h1>
        <p style={{ fontSize: "1.2rem", maxWidth: 680, margin: "auto", color: "#e0e0e0" }}>
          LaunchpadPoint combines artificial intelligence, comprehensive analysis, and professional optimization
          to accelerate your career development journey.
        </p>
      </div>
      <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center", gap: "1.5rem" }}>
        <button
          style={{
            background: 'linear-gradient(90deg, #4f46e5 0%, #667eea 100%)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            padding: '1em 2em',
            borderRadius: '1em',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            cursor: 'pointer',
            transition: 'transform 0.1s',
          }}
          onClick={() => navigate('/ai-assistant')}
        >
          Access AI Career Assistant
        </button>
        <button
          style={{
            background: 'linear-gradient(90deg, #4f46e5 0%, #667eea 100%)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            padding: '1em 2em',
            borderRadius: '1em',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            cursor: 'pointer',
            transition: 'transform 0.1s',
          }}
          onClick={() => navigate('/resume-builder')}
        >
          Create Professional Resume
        </button>
      </div>
      {/* Fixed AI bar at bottom of landing page */}
      <AIFixedBar />
    </div>
  );
}