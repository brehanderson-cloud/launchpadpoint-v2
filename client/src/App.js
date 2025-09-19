
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Safe component loader (keeping the error handling but with Tailwind styling)
const PageFallback = ({ title }) => (
  <div className="max-w-4xl mx-auto p-8">
    <div className="glass-card text-center">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
        {title}
      </h2>
      <p className="text-xl text-gray-300 mb-6">
        This page is under development
      </p>
      <Link to="/" className="btn-secondary inline-block">
        ← Back to Home
      </Link>
    </div>
  </div>
);

// Component loading with fallbacks
let Home, DashboardPage, ResumeBuilder, JobsPage;

try {
  Home = require('./pages/Home').default;
} catch { 
  Home = () => (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Transform Your Career with AI
        </h1>
        <p className="text-xl text-gray-300 text-center mb-8 max-w-4xl mx-auto leading-relaxed">
          LaunchpadPoint combines artificial intelligence, comprehensive accessibility, 
          and professional networking to accelerate your career development journey.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link to="/resume-builder" className="btn-primary text-lg px-8 py-4">
            Create Professional Resume
            <div className="text-sm opacity-90 mt-1">$29.99 • Instant Access</div>
          </Link>
          <Link to="/dashboard" className="btn-secondary text-lg px-8 py-4">
            Start Free Trial
          </Link>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="glass-card hover:scale-105 transition-transform duration-300">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Analysis</h3>
          <p className="text-gray-300">
            Advanced algorithms analyze your resume and suggest improvements.
          </p>
        </div>
        
        <div className="glass-card hover:scale-105 transition-transform duration-300">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-xl font-semibold text-white mb-2">ATS Optimization</h3>
          <p className="text-gray-300">
            Ensure your resume passes Applicant Tracking Systems.
          </p>
        </div>
        
        <div className="glass-card hover:scale-105 transition-transform duration-300">
          <div className="text-4xl mb-4">💼</div>
          <h3 className="text-xl font-semibold text-white mb-2">Job Matching</h3>
          <p className="text-gray-300">
            Find opportunities that match your skills perfectly.
          </p>
        </div>
      </div>
      
      <div className="glass-card text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Recent Resumes</h2>
        <p className="text-xl text-gray-300 mb-6">No resumes yet</p>
        <Link to="/resume-builder" className="btn-primary">
          Create Your First Resume
        </Link>
      </div>
    </div>
  );
}

try {
  DashboardPage = require('./pages/DashboardPage').default;
} catch { DashboardPage = () => <PageFallback title="Dashboard" />; }

try {
  ResumeBuilder = require('./pages/ResumeBuilder').default;
} catch { ResumeBuilder = () => <PageFallback title="Resume Builder" />; }

try {
  JobsPage = require('./pages/JobsPage').default;
} catch { JobsPage = () => <PageFallback title="Jobs" />; }

function App() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 min-h-screen text-white">
      <Router>
        {/* Navigation with glassmorphism */}
        <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="text-3xl group-hover:animate-bounce">🚀</div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  LaunchpadPoint
                </span>
              </Link>
              
              <div className="flex flex-wrap justify-center md:justify-end space-x-2 md:space-x-6">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-white/10">
                  🏠 Home
                </Link>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-white/10">
                  📊 Dashboard
                </Link>
                <Link to="/resume-builder" className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-white/10">
                  📄 Resume Builder
                </Link>
                <Link to="/jobs" className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md hover:bg-white/10">
                  💼 Job Analyzer
                </Link>
                
                <Link to="/resume-builder" className="btn-primary ml-4 hidden md:inline-block">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="*" element={<PageFallback title="Page Not Found" />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
