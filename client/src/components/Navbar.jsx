import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/resume-builder', label: 'Resume Builder' },
    { path: '/job-analyzer', label: 'Job Analyzer' },
    { path: '/qualification-matcher', label: 'Qualification Matcher' }
  ];

  return (
    <nav style={{
      background: 'white',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px'
        }}>
          <Link to="/" style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#2563eb',
            textDecoration: 'none'
          }}>
            LaunchpadPoint AI
          </Link>
          
          <div style={{
            display: 'flex',
            gap: '24px'
          }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                  background: location.pathname === item.path ? '#2563eb' : 'transparent',
                  color: location.pathname === item.path ? 'white' : '#374151'
                }}
                onMouseOver={(e) => {
                  if (location.pathname !== item.path) {
                    e.target.style.color = '#2563eb';
                    e.target.style.background = '#f3f4f6';
                  }
                }}
                onMouseOut={(e) => {
                  if (location.pathname !== item.path) {
                    e.target.style.color = '#374151';
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
