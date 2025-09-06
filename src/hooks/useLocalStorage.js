import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  useEffect(() => {
    const className = 'dark';
    if (darkMode) {
      document.documentElement.classList.add(className);
    } else {
      document.documentElement.classList.remove(className);
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
};
