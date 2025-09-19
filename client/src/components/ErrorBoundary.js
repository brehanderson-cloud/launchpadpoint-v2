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
        <div className="glass-card responsive-container">
          <div className="text-center">
            <div className="text-6xl mb-4">🚨</div>
            <h2 className="section-title text-red-400">Oops! Something went wrong</h2>
            <p className="text-gray-300 mb-6">
              Don't worry, we're working on fixing this issue.
            </p>
            <div className="space-y-3">
              <button 
                className="gradient-btn w-full"
                onClick={() => window.location.reload()}
              >
                🔄 Refresh Page
              </button>
              <button 
                className="gradient-btn-secondary w-full"
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
