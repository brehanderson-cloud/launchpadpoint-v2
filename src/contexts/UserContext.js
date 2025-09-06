import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useLocalStorage('userData', {
    name: 'John Doe',
    title: 'Senior Software Engineer',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    avatar: 'JD',
    careerIntelligence: {
      overall: 87,
      skills: 92,
      market: 89,
      complete: 78,
      weeklyChange: 5
    },
    marketValue: 118000,
    monthlyIncrease: 3000,
    opportunities: 156,
    newToday: 12,
    experience: 6,
    applications: 8,
    interviews: 3,
    offers: 1
  });

  const [notifications, setNotifications] = useState(3);

  const updateCareerScore = (newScore) => {
    setUserData(prev => ({
      ...prev,
      careerIntelligence: {
        ...prev.careerIntelligence,
        overall: newScore
      }
    }));
  };

  const value = {
    userData,
    setUserData,
    notifications,
    setNotifications,
    updateCareerScore
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
