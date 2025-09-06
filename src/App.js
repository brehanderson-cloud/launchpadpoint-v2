import React, { useState } from 'react';
import Navigation from './components/Navigation';
import AIChatSidebar from './components/AIChatSidebar';
import DashboardPage from './pages/DashboardPage';
import BuilderPage from './pages/BuilderPage';
import JobsPage from './pages/JobsPage';
import { UserProvider } from './contexts/UserContext';
import { ResumeProvider } from './contexts/ResumeContext';
import { useDarkMode } from './hooks/useLocalStorage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [darkMode] = useDarkMode();

  return (
    <UserProvider>
      <ResumeProvider>
        <div className={`min-h-screen transition-all duration-300 ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-indigo-900 text-white' 
            : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 text-gray-900'
        }`}>
          <Navigation 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
          />
          
          <main className={`pt-20 pb-8 px-4 max-w-7xl mx-auto transition-all ${aiChatOpen ? 'mr-96' : ''}`}>
            {currentPage === 'dashboard' && <DashboardPage />}
            {currentPage === 'builder' && <BuilderPage />}
            {currentPage === 'jobs' && <JobsPage />}
            {currentPage === 'analytics' && <div className="text-center py-20"><h2 className="text-2xl font-bold">Analytics Dashboard Coming Soon</h2></div>}
            {currentPage === 'network' && <div className="text-center py-20"><h2 className="text-2xl font-bold">Professional Network Coming Soon</h2></div>}
          </main>

          <AIChatSidebar 
            aiChatOpen={aiChatOpen} 
            setAiChatOpen={setAiChatOpen}
          />

          {!aiChatOpen && (
            <button
              onClick={() => setAiChatOpen(true)}
              className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50 hover:scale-110 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-500 opacity-0 hover:opacity-20 transition-opacity rounded-full"></div>
              <Sparkles className="w-7 h-7 relative z-10" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-blue-200 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-200 rounded-full opacity-80 animate-pulse delay-300"></div>
            </button>
          )}
        </div>
      </ResumeProvider>
    </UserProvider>
  );
}

export default App;
