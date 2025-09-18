import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  // Rocket SVG fallback logo
  const RocketLogo = () => (
    <svg width="40" height="40" viewBox="0 0 100 100" style={{ marginRight: 10, borderRadius: 8, boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 4px', marginBottom: 10 }}>
      <path d="M50 15 C55 15 60 20 60 25 L60 70 C60 75 55 80 50 80 C45 80 40 75 40 70 L40 25 C40 20 45 15 50 15 Z" fill="url(#rocketGradient)" stroke="#1e293b" strokeWidth="3" />
      <path d="M40 25 C40 15 45 10 50 10 C55 10 60 15 60 25 Z" fill="url(#noseGradient)" stroke="#1e293b" strokeWidth="3" />
      <path d="M35 55 L40 45 L40 75 L35 70 Z" fill="url(#wingGradient)" stroke="#1e293b" strokeWidth="3" />
      <path d="M60 45 L65 55 L65 70 L60 75 Z" fill="url(#wingGradient)" stroke="#1e293b" strokeWidth="3" />
      <circle cx="50" cy="35" r="6" fill="#87ceeb" stroke="#1e293b" strokeWidth="2" />
      <path d="M42 80 L46 90 L50 85 L54 90 L58 80 L54 95 L50 88 L46 95 Z" fill="url(#flameGradient)" />
      <defs>
        <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="noseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <div className="landing-container" style={{ textAlign: "center", minHeight: "100vh", background: 'linear-gradient(90deg, #4f46e5 0%, #667eea 50%, #764ba2 100%)', color: "#fff", paddingTop: 0 }}>
      <div style={{ marginTop: 40, marginBottom: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <RocketLogo />
        <h1 style={{ fontWeight: "800", fontSize: "2.8rem", margin: "2rem 0 1rem" }}>Transform Your Career with AI</h1>
        <p style={{ fontSize: "1.2rem", maxWidth: 680, margin: "auto", color: "#e0e0e0" }}>
          LaunchpadPoint combines artificial intelligence, comprehensive analysis, and professional optimization
          to accelerate your career development journey.
        </p>
      </div>
      <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center" }}>
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
            margin: '0 auto',
            display: 'block'
          }}
          onClick={() => navigate('/resume-builder')}
        >
          Create Professional Resume
        </button>
      </div>
    </div>
  );
}