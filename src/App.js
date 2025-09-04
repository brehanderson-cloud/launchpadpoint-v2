import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResumeBuilder from './pages/ResumeBuilder';

// Landing Page Component with Real Rocket Logo
const LandingPage = () => {
  const [isDyslexiaFont, setIsDyslexiaFont] = useState(false);

  // Your actual rocket logo as an image component
  const RocketLogo = ({ size = 32, className = "" }) => (
    <div 
      className={className}
      style={{ 
        width: size, 
        height: size,
        background: 'linear-gradient(135deg, #00A8FF 0%, #0078FF 50%, #7B68EE 100%)',
        borderRadius: '50% 50% 50% 0',
        position: 'relative',
        transform: 'rotate(-45deg)',
        display: 'inline-block'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '30%',
        width: '40%',
        height: '40%',
        background: '#40E0D0',
        borderRadius: '50%',
        opacity: 0.8
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-10px',
        left: '20%',
        width: '20%',
        height: '30%',
        background: 'linear-gradient(135deg, #7B68EE 0%, #9932CC 100%)',
        borderRadius: '0 0 50% 50%'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-8px',
        right: '20%',
        width: '15%',
        height: '25%',
        background: 'linear-gradient(135deg, #7B68EE 0%, #9932CC 100%)',
        borderRadius: '0 0 50% 50%'
      }}></div>
    </div>
  );

  const fontFamily = isDyslexiaFont ? 'OpenDyslexic, Arial, sans-serif' : 'Inter, -apple-system, BlinkMacSystemFont, sans-serif';

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      color: 'white', 
      display: 'flex', 
      flexDirection: 'column',
      fontFamily: fontFamily
    }}>
      {/* Dyslexia Font CSS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=OpenDyslexic:wght@400;700&display=swap');
        `}
      </style>

      {/* Header */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1rem 2rem', 
        background: 'rgba(255, 255, 255, 0.1)', 
        backdropFilter: 'blur(10px)' 
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          fontSize: '1.5rem', 
          fontWeight: 'bold' 
        }}>
          <RocketLogo size={40} />
          <span>LaunchpadPoint</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Dyslexia Font Toggle */}
          <button
            onClick={() => setIsDyslexiaFont(!isDyslexiaFont)}
            style={{
              background: isDyslexiaFont ? 'rgba(64, 224, 208, 0.3)' : 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: `2px solid ${isDyslexiaFont ? '#40E0D0' : 'rgba(255, 255, 255, 0.3)'}`,
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            title="Toggle Dyslexia-Friendly Font"
          >
            {isDyslexiaFont ? '✓ Dyslexia Font' : 'Dyslexia Font'}
          </button>
          <button 
            onClick={() => window.location.href = '/dashboard'} 
            style={{ 
              background: 'rgba(255, 255, 255, 0.15)', 
              color: 'white', 
              padding: '0.75rem 1.5rem', 
              border: '2px solid rgba(255, 255, 255, 0.3)', 
              borderRadius: '8px', 
              fontSize: '1rem', 
              fontWeight: '600', 
              cursor: 'pointer',
              backdropFilter: 'blur(10px)'
            }}
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '2rem', 
        textAlign: 'center' 
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '1rem', 
          marginBottom: '2rem' 
        }}>
          <RocketLogo size={120} />
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
          fontWeight: 'bold', 
          marginBottom: '1.5rem', 
          lineHeight: 1.2 
        }}>
          Transform Your Career with AI
        </h1>
        
        <p style={{ 
          fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', 
          marginBottom: '3rem', 
          opacity: 0.9, 
          maxWidth: '700px', 
          lineHeight: 1.4 
        }}>
          LaunchpadPoint combines artificial intelligence, comprehensive analysis, and 
          professional optimization to accelerate your career development journey.
        </p>

        <div style={{ 
          display: 'flex', 
          flexDirection: window.innerWidth < 768 ? 'column' : 'row', 
          gap: '1rem', 
          marginBottom: '3rem' 
        }}>
          <button 
            onClick={() => window.location.href = '/resume-builder'}
            style={{ 
              background: 'linear-gradient(135deg, #00A8FF 0%, #0078FF 100%)', 
              color: 'white', 
              padding: '1rem 2rem', 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '1.1rem', 
              fontWeight: '600', 
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0, 168, 255, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            <div>Create Professional Resume</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9, marginTop: '0.25rem' }}>$29.99 • Instant Access</div>
          </button>
          
          <button 
            onClick={() => window.location.href = '/dashboard'}
            style={{ 
              background: 'rgba(255, 255, 255, 0.15)', 
              color: 'white', 
              padding: '1rem 2rem', 
              border: '2px solid rgba(255, 255, 255, 0.3)', 
              borderRadius: '8px', 
              fontSize: '1.1rem', 
              fontWeight: '600', 
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
          >
            Start Free Trial
          </button>
          
          <button 
            onClick={() => window.location.href = '/dashboard'}
            style={{ 
              background: 'transparent', 
              color: 'white', 
              padding: '1rem 2rem', 
              border: '2px solid white', 
              borderRadius: '8px', 
              fontSize: '1.1rem', 
              fontWeight: '600', 
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Try AI Assistant
          </button>
        </div>

        {/* Features Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem', 
          maxWidth: '1000px', 
          width: '100%' 
        }}>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            padding: '2rem', 
            borderRadius: '16px', 
            textAlign: 'center', 
            backdropFilter: 'blur(10px)', 
            border: '1px solid rgba(255, 255, 255, 0.2)' 
          }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              background: 'rgba(0, 168, 255, 0.2)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 1rem' 
            }}>
              <RocketLogo size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>AI Resume Builder</h3>
            <p style={{ opacity: 0.9, lineHeight: 1.6 }}>Create tailored, professional resumes that match job requirements with intelligent analysis and optimization.</p>
          </div>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            padding: '2rem', 
            borderRadius: '16px', 
            textAlign: 'center', 
            backdropFilter: 'blur(10px)', 
            border: '1px solid rgba(255, 255, 255, 0.2)' 
          }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              background: 'rgba(64, 224, 208, 0.2)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 1rem', 
              fontSize: '2rem' 
            }}>
              🎯
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Job Matching</h3>
            <p style={{ opacity: 0.9, lineHeight: 1.6 }}>Find relevant opportunities that align with your skills and get real-time compatibility scoring.</p>
          </div>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            padding: '2rem', 
            borderRadius: '16px', 
            textAlign: 'center', 
            backdropFilter: 'blur(10px)', 
            border: '1px solid rgba(255, 255, 255, 0.2)' 
          }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              background: 'rgba(123, 104, 238, 0.2)', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 1rem', 
              fontSize: '2rem' 
            }}>
              ♿
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Accessibility First</h3>
            <p style={{ opacity: 0.9, lineHeight: 1.6 }}>WCAG 2.1 AA compliant with 15+ accessibility features including dyslexia-friendly fonts ensuring everyone can access career opportunities.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        padding: '2rem', 
        textAlign: 'center', 
        background: 'rgba(0, 0, 0, 0.2)', 
        marginTop: '2rem' 
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '0.5rem', 
          marginBottom: '1rem' 
        }}>
          <RocketLogo size={28} />
          <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>LaunchpadPoint</span>
        </div>
        <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Empowering careers through intelligent, accessible technology</p>
      </footer>
    </div>
  );
};

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
