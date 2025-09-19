import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('LaunchpadPoint Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🚨</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#f87171', marginBottom: '8px' }}>
              Oops! Something went wrong
            </h2>
            <p style={{ color: '#d1d5db', marginBottom: '24px' }}>
              Don't worry, we're working on fixing this issue.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                className="btn-primary"
                style={{ width: '100%' }}
                onClick={() => window.location.reload()}
              >
                🔄 Refresh Page
              </button>
              <button 
                className="btn-secondary"
                style={{ width: '100%' }}
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                ↩️ Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
