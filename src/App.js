import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResumeBuilder from './pages/ResumeBuilder';

// Landing Page Component
const LandingPage = () => (
  <div style={{ padding: '2rem', textAlign: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
    <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '1rem' }}>LaunchpadPoint V2</h1>
    <p style={{ color: 'white', fontSize: '1.2rem', marginBottom: '2rem' }}>AI-Powered Career Development Platform</p>
    <button 
      onClick={() => window.location.href = '/dashboard'}
      style={{ 
        background: 'white', 
        color: '#667eea', 
        padding: '1rem 2rem', 
        border: 'none', 
        borderRadius: '8px', 
        fontSize: '1.1rem', 
        cursor: 'pointer',
        fontWeight: '600'
      }}
    >
      Get Started
    </button>
  </div>
);

// Dashboard Component
const Dashboard = () => (
  <div style={{ padding: '2rem', minHeight: '100vh', background: '#f7fafc' }}>
    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#2d3748' }}>Dashboard</h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#4a5568', marginBottom: '0.5rem' }}>Applications</h3>
        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3182ce' }}>0</p>
      </div>
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#4a5568', marginBottom: '0.5rem' }}>Resume Score</h3>
        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#38a169' }}>-</p>
      </div>
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#4a5568', marginBottom: '0.5rem' }}>Job Matches</h3>
        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>0</p>
      </div>
    </div>
    
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2d3748' }}>Quick Actions</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <button 
          onClick={() => window.location.href = '/resume-builder'}
          style={{ 
            background: '#3182ce', 
            color: 'white', 
            padding: '1.5rem', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '1.1rem', 
            cursor: 'pointer',
            fontWeight: '600',
            textAlign: 'left'
          }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📄</div>
          <div>Build Resume</div>
          <div style={{ fontSize: '0.9rem', opacity: '0.8', marginTop: '0.25rem' }}>AI-powered optimization</div>
        </button>
        
        <button 
          style={{ 
            background: '#e2e8f0', 
            color: '#4a5568', 
            padding: '1.5rem', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '1.1rem', 
            cursor: 'not-allowed',
            fontWeight: '600',
            textAlign: 'left',
            opacity: '0.6'
          }}
          disabled
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔍</div>
          <div>Find Jobs</div>
          <div style={{ fontSize: '0.9rem', opacity: '0.8', marginTop: '0.25rem' }}>Coming Soon</div>
        </button>
        
        <button 
          style={{ 
            background: '#e2e8f0', 
            color: '#4a5568', 
            padding: '1.5rem', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '1.1rem', 
            cursor: 'not-allowed',
            fontWeight: '600',
            textAlign: 'left',
            opacity: '0.6'
          }}
          disabled
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🤝</div>
          <div>Network</div>
          <div style={{ fontSize: '0.9rem', opacity: '0.8', marginTop: '0.25rem' }}>Coming Soon</div>
        </button>
      </div>
    </div>

    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#2d3748' }}>Recent Activity</h3>
      <div style={{ color: '#4a5568', fontStyle: 'italic' }}>
        Welcome to LaunchpadPoint V2! Start by building your resume to unlock more features.
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;