import React from 'react';
import { useDarkMode } from '../hooks/useLocalStorage';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg transition-all text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      <span className="text-lg">{darkMode ? '☀️' : '🌙'}</span>
    </button>
  );
};

export default ThemeToggle;
