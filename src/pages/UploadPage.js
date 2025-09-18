import React, { useState } from 'react';

const fontOptions = {
  default: { fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' },
  dyslexic: { fontFamily: 'OpenDyslexic, "Comic Sans MS", cursive, sans-serif' }
};

const LaunchpadLogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
    <svg width="50" height="50" viewBox="0 0 100 100">
      <path d="M50 15 C55 15 60 20 60 25 L60 70 C60 75 55 80 50 80 C45 80 40 75 40 70 L40 25 C40 20 45 15 50 15 Z" fill="url(#rocketGradient)" stroke="#1e293b" strokeWidth="3" />
      <path d="M40 25 C40 15 45 10 50 10 C55 10 60 15 60 25 Z" fill="url(#noseGradient)" stroke="#1e293b" strokeWidth="3" />
      <path d="M35 55 L40 45 L40 75 L35 70 Z" fill="url(#wingGradient)" stroke="#1e293b" strokeWidth="3" />
      <path d="M60 45 L65 55 L65 70 L60 75 Z" fill="url(#wingGradient)" stroke="#1e293b" strokeWidth="3" />
      <circle cx="50" cy="35" r="6" fill="#87ceeb" stroke="#1e293b" strokeWidth="2" />
      <path d="M42 80 L46 90 L50 85 L54 90 L58 80 L54 95 L50 88 L46 95 Z" fill="url(#flameGradient)" />
      <defs>
        <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="noseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
    </svg>
    <div>
      <div style={{ fontWeight: 'bold', fontSize: '24px', color: 'rgb(30, 41, 59)' }}>LAUNCHPAD</div>
      <div style={{ fontSize: '24px', color: 'rgb(30, 41, 59)', fontWeight: 'bold' }}>
        POINT<span style={{ color: 'rgb(139, 92, 246)' }}>.com</span>
      </div>
    </div>
  </div>
);

const FileUploadBox = ({ type, onFileChange }) => (
  <div style={{
    border: '2px dashed #8b5cf6',
    borderRadius: '12px',
    padding: '2rem',
    textAlign: 'center',
    background: '#f3f4f6',
    minHeight: '180px'
  }}>
    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
      {type === 'resume' ? 'Upload Resume' : 'Upload Job Description'}
    </h3>
    <input type="file" accept={type === 'resume' ? '.pdf,.doc,.docx' : '.txt,.pdf,.doc,.docx'} onChange={onFileChange} />
  </div>
);

const UploadPage = () => {
  const [selectedFont, setSelectedFont] = useState('default');
  const [resumeFile, setResumeFile] = useState(null);
  const [jobFile, setJobFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const analyzeMatch = async () => {
    // Simulate analysis logic
    setAnalysisResult({
      overallMatch: 78,
      skillsMatch: 5,
      missingSkills: 2,
      atsScore: 88,
      matchedSkills: ['Leadership', 'Project Management', 'Safety Compliance', 'Teamwork', 'Scheduling'],
      missingSkillsList: ['Blueprint Reading', 'Heavy Equipment Operation'],
      improvements: [
        {
          title: 'Add Missing Keywords',
          impact: 'High',
          description: 'Include blueprint reading and equipment operation to match job requirements',
          before: 'Managed construction site',
          after: 'Managed construction site, reading blueprints and operating heavy equipment to improve project efficiency by 25%'
        }
      ],
      marketInsights: {
        salaryRange: '$45k-$65k',
        location: 'Houston',
        role: 'Construction Worker'
      }
    });
  };

  return (
    <div style={{ 
      fontFamily: fontOptions[selectedFont].fontFamily,
      minHeight: '100vh', 
      background: '#f8fafc', 
      padding: '2rem' 
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <LaunchpadLogo />
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', margin: '2rem 0' }}>
          See How Your Experience Matches
        </h1>
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '2rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <FileUploadBox type="resume" onFileChange={e => setResumeFile(e.target.files[0])} />
            <FileUploadBox type="job" onFileChange={e => setJobFile(e.target.files[0])} />
          </div>
          <button 
            onClick={analyzeMatch}
            style={{
              width: '100%',
              marginTop: '2rem',
              padding: '1rem',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              cursor: 'pointer'
            }}
          >
            Analyze Match
          </button>
          {analysisResult && (
            <div style={{ marginTop: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem' }}>
                Analysis Results
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: '#fff7ed', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f97316', marginBottom: '0.5rem' }}>{analysisResult.overallMatch}%</div>
                  <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Overall Match</div>
                </div>
                <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>{analysisResult.skillsMatch}</div>
                  <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Skills Match</div>
                </div>
                <div style={{ background: '#fef2f2', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '0.5rem' }}>{analysisResult.missingSkills}</div>
                  <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Missing Skills</div>
                </div>
                <div style={{ background: '#faf5ff', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>{analysisResult.atsScore}%</div>
                  <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>ATS Score</div>
                </div>
              </div>
              <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '1rem' }}>
                <strong>{analysisResult.marketInsights.role}</strong> in {analysisResult.marketInsights.location} typically earn{' '}
                <strong style={{ color: '#10b981' }}>{analysisResult.marketInsights.salaryRange}</strong>
                <div style={{ marginTop: '1rem' }}>
                  <div><strong>Real Salary Range:</strong> {analysisResult.marketInsights.salaryRange}</div>
                  <div><strong>Skill Gaps:</strong> {analysisResult.missingSkillsList.join(', ')}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
