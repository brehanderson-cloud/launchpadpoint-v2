import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ResumeBuilder from './pages/ResumeBuilder';
import AdvancedAICareerAssistant from './pages/AdvancedAICareerAssistant';
import AIChatSidebar from './components/AIChatSidebar';
import { ResumeProvider } from './contexts/ResumeContext'; // <-- Import here

function App() {
  return (
    <Router>
      <ResumeProvider>
        <AIChatSidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/ai-assistant" element={<AdvancedAICareerAssistant />} />
        </Routes>
      </ResumeProvider>
    </Router>
  );
}

export default App;