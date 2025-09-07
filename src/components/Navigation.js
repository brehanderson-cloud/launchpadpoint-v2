import React from 'react';
import { 
  Home, FileText, Briefcase, BarChart3, Users, Bell, Moon, Sun, Rocket 
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Navigation = ({ currentPage, setCurrentPage, darkMode, setDarkMode }) => {
  const { userData, notifications, setNotifications } = useUser();

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: Home },
    { key: 'builder', label: 'Resume', icon: FileText },
    { key: 'jobs', label: 'Jobs', icon: Briefcase },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 },
    { key: 'network', label: 'Network', icon: Users }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LaunchpadPoint
                </span>
                <div className="text-xs text-gray-500">Career Intelligence Platform</div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setCurrentPage(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                  currentPage === key
                    ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setNotifications(0)}
              className="relative p-2 rounded-lg transition-all text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg transition-all text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="flex items-center space-x-3 pl-3 border-l border-gray-300 dark:border-gray-600">
              <div className="text-right">
                <div className="text-sm font-medium">{userData.name}</div>
                <div className="text-xs text-gray-500">{userData.title}</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                {userData.avatar}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
