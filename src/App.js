import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ResumeBuilder from './pages/ResumeBuilder';
import AdvancedAICareerAssistant from './pages/AdvancedAICareerAssistant';
import UploadPage from './pages/UploadPage';
import { ResumeProvider } from './contexts/ResumeContext'; // <-- Import here

function App() {
  return (
    <Router>
      <ResumeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/ai-assistant" element={<AdvancedAICareerAssistant />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </ResumeProvider>
    </Router>
  );
}

export default App;