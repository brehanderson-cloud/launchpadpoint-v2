import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [systemStatus, setSystemStatus] = useState(null);
  const [recentResumes, setRecentResumes] = useState([]);

  useEffect(() => {
    // Check system status
    fetch('/api/status')
      .then(res => res.json())
      .then(data => setSystemStatus(data))
      .catch(err => console.error('Status check failed:', err));

    // Load recent resumes

    // Load recent resumes
    fetch('/api/resume')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRecentResumes(data.data.slice(0, 3));
        }
      })
      .catch(err => console.error('Failed to load resumes:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white flex flex-col items-center relative">
      {/* Floating Background Shapes */}
      <div className="absolute top-20 left-0 w-24 h-24 rounded-full bg-blue-500/10 blur-2xl animate-pulse" />
      <div className="absolute top-2/3 right-0 w-20 h-20 rounded-full bg-indigo-500/10 blur-2xl animate-pulse" />
      <div className="absolute bottom-10 left-8 w-16 h-16 rounded-full bg-blue-400/10 blur-2xl animate-pulse" />

      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2 text-2xl font-bold text-blue-400">
          LaunchpadPoint <span className="text-yellow-400">☀️</span>
        </div>
        <Link to="/get-started" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition-all">Get Started</Link>
      </header>

      {/* Accessibility Button */}
      <button className="fixed right-6 top-44 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-50" title="Accessibility Options" aria-label="Accessibility Options">
        ♿
      </button>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-center px-4 pt-8 pb-4">
        {/* System Status */}
        {systemStatus && (
          <div className="mb-6 p-3 bg-white/80 rounded-lg shadow-md w-full max-w-md mx-auto text-slate-900">
            <h2 className="text-base font-semibold mb-2">System Status</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${systemStatus.openai ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm">AI Analysis</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
                <span className="text-sm">Resume Builder</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
                <span className="text-sm">Job Matching</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
                <span className="text-sm">PDF Generation</span>
              </div>
            </div>
          </div>
        )}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">Transform Your Career with AI</h1>
        <p className="text-base sm:text-lg text-slate-300 text-center mb-8 max-w-md mx-auto">
          LaunchpadPoint combines artificial intelligence, comprehensive accessibility, and professional networking to accelerate your career development journey.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-xs mx-auto mb-8">
          <Link to="/resume-builder" className="btn btn-primary bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:scale-105 transition-all text-center relative">
            Create Professional Resume
            <span className="block text-sm opacity-90 mt-1">$29.99 • Instant Access</span>
          </Link>
          <Link to="/trial" className="btn btn-secondary bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:scale-105 transition-all text-center">Start Free Trial</Link>
          <Link to="/ai-assistant" className="btn btn-outline border-2 border-blue-500 text-blue-500 font-semibold py-4 px-6 rounded-xl shadow hover:bg-blue-500/10 transition-all text-center">Try AI Assistant</Link>
        </div>

        {/* Recent Resumes Section */}
        <section className="bg-white/90 rounded-xl shadow p-4 sm:p-5 w-full max-w-md mx-auto mb-8 text-slate-900">
          <h2 className="text-lg font-semibold mb-3">Recent Resumes</h2>
          {recentResumes.length > 0 ? (
            <div className="space-y-2">
              {recentResumes.map((resume) => (
                <div key={resume.id} className="flex justify-between items-center p-2 border rounded-lg">
                  <div>
                    <h3 className="font-medium text-base">{resume.personalInfo.name || 'Untitled Resume'}</h3>
                    <p className="text-xs text-gray-600">
                      Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Link 
                    to={`/resume-builder?id=${resume.id}`}
                    className="px-3 py-1 bg-primary text-white rounded focus:outline-none focus:ring-2 focus:ring-primary hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 mb-3">No resumes yet</p>
              <Link 
                to="/resume-builder"
                className="px-4 py-2 bg-primary text-white rounded focus:outline-none focus:ring-2 focus:ring-primary hover:bg-blue-700 text-sm"
              >
                Create Your First Resume
              </Link>
            </div>
          )}
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xs bg-slate-800 p-4 flex justify-center gap-8 border-t border-slate-700 z-40">
        <button className="nav-item w-10 h-10 bg-slate-700/50 rounded flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all">|||</button>
        <button className="nav-item w-10 h-10 bg-blue-500 text-white rounded flex items-center justify-center">○</button>
        <button className="nav-item w-10 h-10 bg-slate-700/50 rounded flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all">←</button>
        <button className="nav-item w-10 h-10 bg-slate-700/50 rounded flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all">♿</button>
      </nav>
    </div>
  );
}

export default Dashboard;
