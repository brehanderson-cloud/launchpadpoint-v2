import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="responsive-container">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="header-title animate-fade-in">
          Transform Your Career with AI
        </h1>
        <p className="subtitle animate-slide-up">
          LaunchpadPoint combines artificial intelligence, comprehensive accessibility,
          and professional networking to accelerate your career development journey.
        </p>

        {/* CTA Buttons - styled to match landing page */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8 animate-slide-up">
          <Link to="/resume-builder" className="btn-primary flex flex-col items-center justify-center text-lg px-10 py-6 rounded-2xl shadow-lg">
            <span className="font-bold text-xl mb-1">🚀 Create Professional Resume</span>
            <span className="text-sm opacity-90 mt-1">$29.99 • Instant Access</span>
          </Link>
          <Link to="/dashboard" className="btn-secondary flex flex-col items-center justify-center text-lg px-10 py-6 rounded-2xl shadow-lg">
            <span className="font-bold text-xl mb-1">📊 Start Free Trial</span>
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
        <div className="glass-card flex flex-col items-center p-10">
          <div className="card-icon">📄</div>
          <div className="card-title">Upload Resume</div>
          <div className="card-desc">PDF, DOC, or DOCX</div>
        </div>
        <div className="glass-card flex flex-col items-center p-10">
          <div className="card-icon">🎯</div>
          <div className="card-title">Job Description</div>
          <div className="card-desc">Copy and paste job posting</div>
        </div>
      </div>

      {/* Analyze Button */}
      <div className="flex justify-center mb-12">
        <Link to="/qualification-matcher" className="analyze-btn">
          Analyze Qualification Match
        </Link>
      </div>

      {/* Stats Section */}
      <div className="glass-card mb-12">
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
        <Link to="/ai-assistant" className="btn-secondary text-lg px-10 py-6 rounded-2xl shadow-lg">
          🎯 Try AI Assistant
        </Link>
      </div>
    </div>
  );
};

export default Home;
