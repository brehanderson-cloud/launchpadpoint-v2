import React, { useState } from 'react';
import Navigation from './components/Navigation';
import DashboardPage from './pages/DashboardPage';
import BuilderPage from './pages/BuilderPage';
import JobsPage from './pages/JobsPage';
import { UserProvider } from './contexts/UserContext';
import { ResumeProvider } from './contexts/ResumeContext';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <UserProvider>
      <ResumeProvider>
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-slate-800 dark:to-indigo-900 text-gray-900 dark:text-white">
            <Navigation 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
            
            <main className="pt-20 pb-8 px-4 max-w-7xl mx-auto">
              {currentPage === 'dashboard' && <DashboardPage />}
              {currentPage === 'builder' && <BuilderPage />}
              {currentPage === 'jobs' && <JobsPage />}
              {currentPage === 'analytics' && <div className="text-center py-20"><h2 className="text-2xl font-bold">Analytics Dashboard Coming Soon</h2></div>}
              {currentPage === 'network' && <div className="text-center py-20"><h2 className="text-2xl font-bold">Professional Network Coming Soon</h2></div>}
            </main>
          </div>
        </div>
      </ResumeProvider>
    </UserProvider>
  );
}

export default App;
