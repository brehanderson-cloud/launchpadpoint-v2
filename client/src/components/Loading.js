import React from 'react';

const Loading = ({ message = "Loading LaunchpadPoint..." }) => {
  return (
    <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          display: 'inline-block',
          animation: 'spin 1s linear infinite',
          borderRadius: '50%',
          height: '48px',
          width: '48px',
          borderBottom: '2px solid #60a5fa',
          marginBottom: '16px'
        }}></div>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          color: 'white', 
          marginBottom: '8px' 
        }}>
          🚀 {message}
        </h3>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '4px' 
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            background: '#60a5fa',
            borderRadius: '50%',
            animation: 'bounce 1s infinite'
          }}></div>
          <div style={{
            width: '8px',
            height: '8px',
            background: '#a78bfa',
            borderRadius: '50%',
            animation: 'bounce 1s infinite',
            animationDelay: '0.1s'
          }}></div>
          <div style={{
            width: '8px',
            height: '8px',
            background: '#818cf8',
            borderRadius: '50%',
            animation: 'bounce 1s infinite',
            animationDelay: '0.2s'
          }}></div>
        </div>
      </div>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -30px, 0);
          }
          70% {
            transform: translate3d(0, -15px, 0);
          }
          90% {
            transform: translate3d(0,-4px,0);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
