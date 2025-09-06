import React, { createContext, useContext, useState } from 'react';

const ResumeContext = createContext();

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: 'John Doe',
      jobTitle: 'Senior Software Engineer',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      location: 'San Francisco, CA',
      summary: 'Experienced software engineer with 5+ years of expertise in developing scalable web applications and leading development teams. Strong problem-solving skills and passion for clean code architecture.'
    },
    experience: [{
      company: 'Tech Innovations Inc.',
      position: 'Senior Software Engineer',
      startDate: '2020-01',
      endDate: '2023-08',
      description: '• Led a team of 5 developers in creating a new SaaS product\n• Improved system performance by 40% through optimization\n• Implemented CI/CD pipeline reducing deployment time by 60%'
    }],
    education: [{
      institution: 'Stanford University',
      degree: 'Master of Science in Computer Science',
      graduationDate: '2018-05',
      gpa: '3.9/4.0',
      achievements: '• Graduated with honors\n• Published research on machine learning algorithms\n• President of Computer Science Club'
    }],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS', 'Docker', 'Kubernetes', 'Team Leadership', 'Agile Methodologies']
  });

  const [careerScore, setCareerScore] = useState(87);

  const value = {
    resumeData,
    setResumeData,
    careerScore,
    setCareerScore
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};
