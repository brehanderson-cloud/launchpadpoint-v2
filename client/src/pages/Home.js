import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="responsive-container">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="header-title animate-fade-in">
          Transform Your Career with AI
        </h1>
        <p className="subtitle animate-slide-up">
          LaunchpadPoint combines artificial intelligence, comprehensive accessibility, 
          and professional networking to accelerate your career development journey.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-slide-up">
          <Link to="/resume-builder" className="gradient-btn text-lg px-8 py-4">
            🚀 Create Professional Resume
            <div className="text-sm opacity-90 mt-1">$29.99 • Instant Access</div>
          </Link>
          <Link to="/dashboard" className="gradient-btn-outline text-lg px-8 py-4">
            📊 Start Free Trial
          </Link>
        </div>
      </div>
      
      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="feature-card">
          <div className="feature-card-icon">🤖</div>
          <h3 className="section-title text-xl">AI-Powered Analysis</h3>
          <p className="text-gray-300">
            Advanced algorithms analyze your resume and suggest improvements for better job matches.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-card-icon">✅</div>
          <h3 className="section-title text-xl">ATS Optimization</h3>
          <p className="text-gray-300">
            Ensure your resume passes Applicant Tracking Systems with our optimization tools.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-card-icon">💼</div>
          <h3 className="section-title text-xl">Job Matching</h3>
          <p className="text-gray-300">
            Find opportunities that perfectly match your skills and career goals.
          </p>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="glass-card mb-16">
        <h2 className="section-title text-center mb-8">Why Choose LaunchpadPoint?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="stat-card">
            <div className="stat-number">95%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Resumes Created</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Companies</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">AI Support</div>
          </div>
        </div>
      </div>
      
      {/* Final CTA */}
      <div className="glass-card text-center">
        <h2 className="section-title">Ready to Launch Your Career?</h2>
        <p className="subtitle">Join thousands of professionals who've transformed their careers with LaunchpadPoint.</p>
        <Link to="/ai-assistant" className="gradient-btn-secondary text-lg px-8 py-4">
          🎯 Try AI Assistant
        </Link>
      </div>
    </div>
  );
};

export default Home;
