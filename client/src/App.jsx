import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import { JobAnalyzer } from './pages/JobAnalyzer';
import { QualificationMatcher } from './pages/QualificationMatcher';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            <Route path="/job-analyzer" element={<JobAnalyzer />} />
            <Route path="/qualification-matcher" element={<QualificationMatcher />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
