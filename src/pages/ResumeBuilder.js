import React, { useState, useCallback, useRef } from 'react';
import { analyzeResumeWithAI } from '../utils/resumeAnalyzer';

const ResumeBuilder = () => {
  const [parseMethod, setParseMethod] = useState('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [previewSections, setPreviewSections] = useState([]);
  const [extractedData, setExtractedData] = useState({});
  const [atsScore, setAtsScore] = useState(0);
  const [matchScore, setMatchScore] = useState(0);
  const [overallScore, setOverallScore] = useState(0);
  const [contentScore, setContentScore] = useState(0);
  const [textInput, setTextInput] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [currentStep, setCurrentStep] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});
  const fileInputRef = useRef(null);

  const navigateBack = () => {
    window.location.href = '/dashboard';
  };

  // Rocket Logo Component
  const RocketLogo = ({ size = 24, color = "white" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill={color}/>
      <path d="M12 16L14 21H10L12 16Z" fill={color}/>
      <circle cx="8" cy="12" r="2" fill={color} opacity="0.6"/>
      <circle cx="16" cy="12" r="2" fill={color} opacity="0.6"/>
    </svg>
  );

  // Parse actual resume content
  const parseActualResumeContent = (content) => {
    const lines = content.split('\n').filter(line => line.trim());
    const data = {
      personal: {},
      experience: [],
      education: [],
      skills: { technical: [], soft: [] }
    };

    // Extract email and phone
    const emailMatch = content.match(/[\w\.-]+@[\w\.-]+\.\w+/);
    const phoneMatch = content.match(/\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/);
    
    // Extract name (assume it's one of the first few lines)
    const nameCandidate = lines.slice(0, 3).find(line => 
      line.length > 5 && line.length < 50 && !emailMatch && !phoneMatch && 
      !line.toLowerCase().includes('resume') && !line.toLowerCase().includes('cv')
    );

    data.personal = {
      name: nameCandidate || "Your Name",
      email: emailMatch ? emailMatch[0] : "your.email@email.com",
      phone: phoneMatch ? phoneMatch[0] : "(555) 123-4567",
      location: "City, State"
    };

    // Extract experience (look for company/job patterns)
    const experiencePattern = /(\d{4})\s*[-–]\s*(\d{4}|present|current)/gi;
    const experienceMatches = content.match(experiencePattern);
    
    if (experienceMatches && experienceMatches.length > 0) {
      // Try to find job titles and companies
      const jobKeywords = ['developer', 'engineer', 'manager', 'analyst', 'coordinator', 'specialist', 'director'];
      const experienceLines = lines.filter(line => 
        jobKeywords.some(keyword => line.toLowerCase().includes(keyword)) ||
        experiencePattern.test(line)
      );

      data.experience = experienceLines.slice(0, 3).map((line, i) => ({
        company: "Previous Company",
        position: line.length < 100 ? line : "Previous Role",
        duration: experienceMatches[i] || "2022 - Present",
        achievements: [
          "Key responsibility or achievement",
          "Another accomplishment with impact",
          "Third achievement with metrics"
        ]
      }));
    } else {
      data.experience = [{
        company: "Previous Company",
        position: "Your Previous Role",
        duration: "2022 - Present",
        achievements: [
          "Describe your key achievements",
          "Include specific metrics when possible",
          "Show impact of your work"
        ]
      }];
    }

    // Extract education
    const educationKeywords = ['university', 'college', 'bachelor', 'master', 'degree', 'phd'];
    const educationLines = lines.filter(line => 
      educationKeywords.some(keyword => line.toLowerCase().includes(keyword))
    );

    if (educationLines.length > 0) {
      data.education = [{
        institution: educationLines.find(line => line.toLowerCase().includes('university')) || "Your University",
        degree: educationLines.find(line => line.toLowerCase().includes('bachelor') || line.toLowerCase().includes('master')) || "Your Degree",
        year: "2020",
        gpa: ""
      }];
    } else {
      data.education = [{
        institution: "Your University",
        degree: "Your Degree",
        year: "2020",
        gpa: ""
      }];
    }

    // Extract skills (look for technical terms)
    const techSkills = ['javascript', 'python', 'java', 'react', 'node', 'sql', 'aws', 'git', 'html', 'css'];
    const softSkills = ['leadership', 'communication', 'teamwork', 'problem solving', 'project management'];
    
    const foundTechSkills = techSkills.filter(skill => 
      content.toLowerCase().includes(skill)
    );
    const foundSoftSkills = softSkills.filter(skill => 
      content.toLowerCase().includes(skill.toLowerCase())
    );

    data.skills = {
      technical: foundTechSkills.length > 0 ? foundTechSkills : ['Your', 'Technical', 'Skills'],
      soft: foundSoftSkills.length > 0 ? foundSoftSkills : ['Leadership', 'Communication', 'Problem Solving']
    };

    return data;
  };

  const parseResumeContent = useCallback(async (content, fileName = '') => {
    setIsProcessing(true);
    setParseProgress(0);
    setSuggestions([]);
    setPreviewSections([]);
    setExtractedData({});
    setCurrentStep('');

    const steps = [
      { progress: 15, message: "Reading your resume content..." },
      { progress: 30, message: "Extracting contact information..." },
      { progress: 50, message: "Analyzing work experience..." },
      { progress: 70, message: "Processing education and skills..." },
      { progress: 85, message: "Running intelligent analysis..." },
      { progress: 100, message: "Analysis complete!" }
    ];

    let parsedData = {};

    for (let step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setParseProgress(step.progress);
      setCurrentStep(step.message);
      
      if (step.progress === 30) {
        parsedData = parseActualResumeContent(content);
        setExtractedData(parsedData);
        setEditableData(parsedData);
        setPreviewSections([{ type: 'personal', data: parsedData.personal, timestamp: Date.now() }]);
      }
      
      if (step.progress === 50) {
        setPreviewSections(prev => [...prev, { type: 'experience', data: parsedData.experience, timestamp: Date.now() }]);
      }
      
      if (step.progress === 70) {
        setPreviewSections(prev => [...prev, 
          { type: 'education', data: parsedData.education, timestamp: Date.now() },
          { type: 'skills', data: parsedData.skills, timestamp: Date.now() }
        ]);
      }
      
      if (step.progress === 85) {
        // Run the intelligent analysis
        const analysisResults = analyzeResumeWithAI(parsedData, jobDescription);
        
        setSuggestions(analysisResults.suggestions);
        setAtsScore(analysisResults.scores.ats);
        setMatchScore(analysisResults.scores.jobMatch);
        setOverallScore(analysisResults.scores.overall);
        setContentScore(analysisResults.scores.content);
      }
    }

    setIsProcessing(false);
    setCurrentStep('');
  }, [jobDescription]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      alert('Please upload a PDF, DOC, DOCX, or TXT file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      parseResumeContent(e.target.result, file.name);
    };
    reader.readAsText(file);
  };

  const handleTextParse = () => {
    if (!textInput.trim()) {
      alert('Please paste your resume content first.');
      return;
    }
    parseResumeContent(textInput);
  };

  const dismissSuggestion = (id) => {
    setSuggestions(prev => prev.filter(s => s.id !== id));
  };

  const handleSuggestionAction = (suggestion) => {
    let alertMessage = `${suggestion.title}\n\n${suggestion.message}`;
    
    if (suggestion.examples) {
      alertMessage += '\n\nExamples:\n' + suggestion.examples.join('\n');
    }
    
    if (suggestion.before && suggestion.after) {
      alertMessage += '\n\nBefore:\n' + suggestion.before;
      alertMessage += '\n\nAfter:\n' + suggestion.after;
    }
    
    if (suggestion.missingSkills) {
      alertMessage += '\n\nMissing Skills: ' + suggestion.missingSkills.join(', ');
    }
    
    if (suggestion.replacements) {
      alertMessage += '\n\nSuggested Replacements:\n';
      Object.entries(suggestion.replacements).forEach(([weak, strong]) => {
        alertMessage += `• ${weak} → ${strong}\n`;
      });
    }
    
    if (suggestion.recommendation) {
      alertMessage += '\n\nRecommendation: ' + suggestion.recommendation;
    }
    
    alert(alertMessage);
    dismissSuggestion(suggestion.id);
  };

  const handleExport = (format) => {
    if (format === 'pdf') {
      window.print();
    } else if (format === 'docx') {
      alert("DOCX Export coming soon!\n\nThis will generate a Word document with professional formatting.");
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (previewSections.length > 0) {
      alert(`Resume saved successfully!\n\n✅ Overall Score: ${overallScore}%\n✅ ATS Score: ${atsScore}%\n✅ Content Score: ${contentScore}%\n✅ Sections: ${previewSections.length}\n✅ Last updated: ${new Date().toLocaleTimeString()}\n\nResume history feature coming soon!`);
    } else {
      alert("Please parse your resume first before saving.");
    }
  };

  const getSuggestionIcon = (suggestion) => {
    switch (suggestion.type) {
      case 'critical': return AlertTriangle;
      case 'job-match': return Target;
      case 'enhancement': return TrendingUp;
      case 'structure': return Edit3;
      default: return Info;
    }
  };

  const getSuggestionStyle = (suggestion) => {
    switch (suggestion.type) {
      case 'critical':
        return { borderColor: '#fca5a5', backgroundColor: '#fef2f2', iconColor: '#dc2626' };
      case 'job-match':
        return { borderColor: '#bbf7d0', backgroundColor: '#f0fdf4', iconColor: '#16a34a' };
      case 'enhancement':
        return { borderColor: '#bfdbfe', backgroundColor: '#eff6ff', iconColor: '#2563eb' };
      case 'structure':
        return { borderColor: '#c4b5fd', backgroundColor: '#f5f3ff', iconColor: '#7c3aed' };
      default:
        return { borderColor: '#d1d5db', backgroundColor: '#f9fafb', iconColor: '#6b7280' };
    }
  };

  // LaunchpadPoint brand colors
  const brandColors = {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#4f46e5'
  };

  const containerStyle = {
    minHeight: '100vh',
    background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)`,
    padding: '1rem'
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    marginBottom: '1.5rem'
  };

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header with Logo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <button 
            onClick={navigateBack} 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            <span style={{fontSize: "20px"}}>←</span>
            <span>Back to Dashboard</span>
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={handleSave} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#22c55e',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              <Save size={16} />
              <span>Save Resume</span>
            </button>
          </div>
        </div>

        {/* Title with Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <RocketLogo size={48} color="white" />
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
              LaunchpadPoint Resume Builder
            </h1>
          </div>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto' }}>
            Create professional resumes with AI-powered optimization and real-time job matching
          </p>
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth >= 1024 ? '1fr 1fr' : '1fr', gap: '2rem' }}>
          {/* Left Column */}
          <div>
            {/* Job Description Input */}
            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Target size={24} color={brandColors.accent} />
                Target Job Description
              </h2>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here to get tailored suggestions and match scoring..."
                style={{
                  width: '100%',
                  height: '120px',
                  padding: '1rem',
                  border: `2px solid ${brandColors.primary}`,
                  borderRadius: '12px',
                  resize: 'vertical',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.875rem' }}>
                <span style={{ color: '#6b7280' }}>
                  {jobDescription.length} characters {jobDescription.length > 100 && '✓ Ready for matching'}
                </span>
                <span style={{ color: brandColors.accent, fontWeight: '600' }}>
                  {jobDescription ? 'Job targeting enabled' : 'Optional but recommended'}
                </span>
              </div>
            </div>

            {/* Input Method Selection */}
            <div style={cardStyle}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>Choose Input Method</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button
                  onClick={() => setParseMethod('upload')}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: parseMethod === 'upload' ? `2px solid ${brandColors.accent}` : '2px solid #e5e7eb',
                    cursor: 'pointer',
                    textAlign: 'center',
                    background: parseMethod === 'upload' ? `${brandColors.accent}15` : 'white',
                    color: parseMethod === 'upload' ? brandColors.accent : 'inherit'
                  }}
                >
                  <Upload size={32} style={{ margin: '0 auto 0.5rem', display: 'block' }} />
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Upload File</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>PDF, DOC, DOCX, TXT</div>
                </button>
                
                <button
                  onClick={() => setParseMethod('paste')}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: parseMethod === 'paste' ? `2px solid ${brandColors.accent}` : '2px solid #e5e7eb',
                    cursor: 'pointer',
                    textAlign: 'center',
                    background: parseMethod === 'paste' ? `${brandColors.accent}15` : 'white',
                    color: parseMethod === 'paste' ? brandColors.accent : 'inherit'
                  }}
                >
                  <span style={{fontSize: "32px", margin: "0 auto 0.5rem", display: "block"}}>📋</span>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Paste Text</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Copy & Paste</div>
                </button>
              </div>
            </div>

            {/* Upload/Paste Area */}
            <div style={cardStyle}>
              {parseMethod === 'upload' ? (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt"
                    style={{ display: 'none' }}
                  />
                  <div
                    onClick={() => !isProcessing && fileInputRef.current?.click()}
                    style={{
                      padding: '3rem',
                      border: `3px dashed ${brandColors.primary}`,
                      borderRadius: '12px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: `${brandColors.primary}05`
                    }}
                  >
                    <span style={{fontSize: "48px", margin: "0 auto 1rem", color: "#667eea", display: "block"}}>📄</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                      {isProcessing ? 'Processing your resume...' : 'Drop your resume here or click to upload'}
                    </div>
                    <div style={{ color: '#6b7280' }}>
                      Supports PDF, DOC, DOCX, and TXT files up to 5MB
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label style={{ display: 'block', fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                    Paste Your Resume Content
                  </label>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Paste your complete resume content here..."
                    style={{
                      width: '100%',
                      height: '200px',
                      padding: '1rem',
                      border: `2px solid ${brandColors.primary}`,
                      borderRadius: '12px',
                      resize: 'vertical',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                    disabled={isProcessing}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {textInput.length} characters
                    </div>
                    <button
                      onClick={handleTextParse}
                      disabled={isProcessing || !textInput.trim()}
                      style={{
                        background: `linear-gradient(135deg, ${brandColors.primary}, ${brandColors.secondary})`,
                        color: 'white',
                        padding: '0.75rem 2rem',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: (isProcessing || !textInput.trim()) ? 'not-allowed' : 'pointer',
                        opacity: (isProcessing || !textInput.trim()) ? 0.5 : 1
                      }}
                    >
                      {isProcessing ? 'Processing...' : 'Parse Resume'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Processing Status */}
            {isProcessing && (
              <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151' }}>AI Processing Resume</span>
                  <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: brandColors.accent }}>{parseProgress}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ 
                    height: '100%', 
                    background: `linear-gradient(90deg, ${brandColors.primary}, ${brandColors.secondary})`, 
                    width: `${parseProgress}%`,
                    transition: 'width 0.5s ease'
                  }}></div>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', fontStyle: 'italic', marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{fontSize: "16px"}}>✨</span>
                  {currentStep}
                </div>
              </div>
            )}

            {/* Enhanced Smart Suggestions */}
            {suggestions.length > 0 && (
              <div style={cardStyle}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <RocketLogo size={24} color={brandColors.accent} />
                  LaunchpadPoint Analysis
                </h3>
                
                {/* Summary */}
                <div style={{ 
                  background: `${brandColors.primary}10`, 
                  borderRadius: '8px', 
                  padding: '1rem', 
                  marginBottom: '1.5rem',
                  fontSize: '0.875rem',
                  color: '#374151'
                }}>
                  Found {suggestions.length} improvement opportunities: {suggestions.filter(s => s.type === 'critical').length} critical issues, {suggestions.filter(s => s.type === 'job-match').length} job match improvements, {suggestions.filter(s => s.type === 'enhancement').length} content enhancements
                </div>

                <div>
                  {suggestions.map((suggestion) => {
                    const SuggestionIcon = getSuggestionIcon(suggestion);
                    const suggestionStyle = getSuggestionStyle(suggestion);
                    
                    return (
                      <div 
                        key={suggestion.id} 
                        style={{
                          border: `2px solid ${suggestionStyle.borderColor}`,
                          backgroundColor: suggestionStyle.backgroundColor,
                          borderRadius: '12px',
                          padding: '1rem',
                          marginBottom: '1rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                          <div style={{ 
                            padding: '0.5rem', 
                            borderRadius: '8px', 
                            backgroundColor: 'white',
                            color: suggestionStyle.iconColor,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                          }}>
                            <SuggestionIcon size={20} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                              <span style={{ fontWeight: 'bold', color: '#1f2937' }}>
                                {suggestion.title}
                              </span>
                              <span style={{ 
                                fontSize: '0.75rem', 
                                padding: '0.25rem 0.5rem', 
                                borderRadius: '12px',
                                background: suggestionStyle.iconColor,
                                color: 'white',
                                textTransform: 'uppercase',
                                fontWeight: '600'
                              }}>
                                {suggestion.category || suggestion.type}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '0.75rem' }}>
                              {suggestion.message}
                            </div>
                            {suggestion.matchImprovement && (
                              <div style={{ fontSize: '0.875rem', color: '#16a34a', fontWeight: '600', marginBottom: '0.75rem' }}>
                                Impact: {suggestion.matchImprovement}
                              </div>
                            )}
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button
                                onClick={() => handleSuggestionAction(suggestion)}
                                style={{
                                  padding: '0.5rem 1rem',
                                  borderRadius: '8px',
                                  border: 'none',
                                  fontWeight: '600',
                                  fontSize: '0.875rem',
                                  cursor: 'pointer',
                                  background: suggestionStyle.iconColor,
                                  color: 'white'
                                }}
                              >
                                {suggestion.action || 'View Details'}
                              </button>
                              <button
                                onClick={() => dismissSuggestion(suggestion.id)}
                                style={{
                                  padding: '0.5rem 0.75rem',
                                  background: 'none',
                                  border: 'none',
                                  color: '#6b7280',
                                  fontSize: '0.875rem',
                                  cursor: 'pointer'
                                }}
                              >
                                Dismiss
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Resume Preview */}
          <div>
            {/* Enhanced Scores Dashboard */}
            {(atsScore > 0 || matchScore > 0 || overallScore > 0) && (
              <div style={cardStyle}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <RocketLogo size={24} color={brandColors.accent} />
                  Resume Analytics Dashboard
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ textAlign: 'center', padding: '1rem', background: `${brandColors.primary}10`, borderRadius: '8px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: brandColors.accent }}>{overallScore}%</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Overall Score</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', background: `${brandColors.secondary}10`, borderRadius: '8px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>{contentScore}%</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Content Quality</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: matchScore > 0 ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151' }}>ATS Compatibility</h4>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>{atsScore}%</div>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ 
                        height: '100%', 
                        background: 'linear-gradient(90deg, #16a34a, #22c55e)', 
                        width: `${atsScore}%`,
                        transition: 'width 1s ease'
                      }}></div>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
                      {atsScore >= 80 ? 'Excellent' : atsScore >= 60 ? 'Good' : 'Needs improvement'} for ATS systems
                    </p>
                  </div>

                  {matchScore > 0 && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151' }}>Job Match Score</h4>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: brandColors.accent }}>{matchScore}%</div>
                      </div>
                      <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ 
                          height: '100%', 
                          background: `linear-gradient(90deg, ${brandColors.primary}, ${brandColors.secondary})`, 
                          width: `${matchScore}%`,
                          transition: 'width 1s ease'
                        }}></div>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
                        {matchScore >= 75 ? 'Strong' : matchScore >= 50 ? 'Moderate' : 'Weak'} match for target position
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Live Resume Preview */}
            <div style={{ ...cardStyle, overflow: 'hidden', padding: 0 }}>
              <div style={{ 
                background: `linear-gradient(135deg, ${brandColors.primary}, ${brandColors.secondary})`, 
                color: 'white', 
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <RocketLogo size={32} color="white" />
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Live Resume Preview</h3>
                  {jobDescription && (
                    <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>Optimized for target position</p>
                  )}
                </div>
              </div>
              
              <div style={{ padding: '2rem' }}>
                {previewSections.map((section, index) => (
                  <div key={`${section.type}-${section.timestamp}`} style={{ marginBottom: '2rem' }}>
                    {section.type === 'personal' && (
                      <div style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '0.75rem' }}>
                          <span style={{fontSize: "24px", color: "#667eea"}}>👤</span>
                          <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Contact Information</h4>
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>{section.data.name}</h2>
                        <div style={{ color: '#6b7280', lineHeight: 1.6 }}>
                          <p style={{ margin: '0.25rem 0' }}>{section.data.email} • {section.data.phone}</p>
                          <p style={{ margin: '0.25rem 0' }}>{section.data.location}</p>
                          {section.data.linkedin && <p style={{ margin: '0.25rem 0' }}>{section.data.linkedin}</p>}
                        </div>
                      </div>
                    )}
                    
                    {section.type === 'experience' && (
                      <div style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '0.75rem' }}>
                          <span style={{fontSize: "24px", color: "#16a34a"}}>💼</span>
                          <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Professional Experience</h4>
                        </div>
                        {section.data.map((exp, i) => (
                          <div key={i} style={{ marginBottom: '1.5rem' }}>
                            <h5 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 0.25rem 0' }}>{exp.position}</h5>
                            <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#16a34a', margin: '0 0 0.75rem 0' }}>{exp.company} • {exp.duration}</p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                              {exp.achievements.map((achievement, j) => (
                                <li key={j} style={{ color: '#374151', marginBottom: '0.25rem', paddingLeft: '1rem', position: 'relative' }}>
                                  <span style={{ position: 'absolute', left: 0, color: brandColors.accent, fontWeight: 'bold' }}>•</span>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {section.type === 'education' && (
                      <div style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '0.75rem' }}>
                          <GraduationCap size={24} color="#8b5cf6" />
                          <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Education</h4>
                        </div>
                        {section.data.map((edu, i) => (
                          <div key={i}>
                            <h5 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 0.25rem 0' }}>{edu.degree}</h5>
                            <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#8b5cf6', margin: '0 0 0.25rem 0' }}>{edu.institution} • {edu.year}</p>
                            {edu.gpa && <p style={{ color: '#6b7280', margin: '0 0 0.5rem 0' }}>GPA: {edu.gpa}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {section.type === 'skills' && (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '0.75rem' }}>
                          <Award size={24} color="#f97316" />
                          <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Skills & Competencies</h4>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                          <h6 style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '0.75rem' }}>Technical Skills</h6>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {section.data.technical.map((skill, i) => {
                              const isJobMatch = jobDescription && jobDescription.toLowerCase().includes(skill.toLowerCase());
                              return (
                                <span key={i} style={{
                                  display: 'inline-block',
                                  padding: '0.5rem 1rem',
                                  margin: '0.25rem',
                                  borderRadius: '20px',
                                  fontSize: '0.875rem',
                                  fontWeight: '600',
                                  background: isJobMatch ? '#22c55e' : brandColors.accent,
                                  color: 'white',
                                  boxShadow: isJobMatch ? '0 0 0 2px #bbf7d0' : 'none'
                                }}>
                                  {skill}
                                  {isJobMatch && <span style={{ marginLeft: '0.25rem' }}>✓</span>}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <h6 style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '0.75rem' }}>Soft Skills</h6>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {section.data.soft.map((skill, i) => {
                              const isJobMatch = jobDescription && jobDescription.toLowerCase().includes(skill.toLowerCase());
                              return (
                                <span key={i} style={{
                                  display: 'inline-block',
                                  padding: '0.5rem 1rem',
                                  margin: '0.25rem',
                                  borderRadius: '20px',
                                  fontSize: '0.875rem',
                                  fontWeight: '600',
                                  background: isJobMatch ? '#22c55e' : '#8b5cf6',
                                  color: 'white',
                                  boxShadow: isJobMatch ? '0 0 0 2px #bbf7d0' : 'none'
                                }}>
                                  {skill}
                                  {isJobMatch && <span style={{ marginLeft: '0.25rem' }}>✓</span>}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {previewSections.length === 0 && !isProcessing && (
                  <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <RocketLogo size={64} color="#d1d5db" />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem', marginTop: '1rem' }}>Ready for LaunchpadPoint Analysis</h3>
                    <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>Upload or paste your resume to get detailed AI-powered suggestions</p>
                    {jobDescription && (
                      <p style={{ color: brandColors.accent, fontSize: '0.875rem' }}>Job description loaded - your resume will be analyzed for relevance and optimized for this specific role</p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {previewSections.length > 0 && (
                <div style={{ 
                  borderTop: '1px solid #f3f4f6', 
                  backgroundColor: '#f9fafb', 
                  padding: '1rem 2rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Analyzed: {new Date().toLocaleTimeString()} • {suggestions.length} suggestions
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button 
                      onClick={() => handleExport('pdf')}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        background: '#dc2626', 
                        color: 'white', 
                        padding: '0.5rem 1rem', 
                        border: 'none', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      <Download size={16} />
                      <span>Print/PDF</span>
                    </button>
                    <button 
                      onClick={() => handleExport('docx')}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        background: brandColors.accent, 
                        color: 'white', 
                        padding: '0.5rem 1rem', 
                        border: 'none', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      <Download size={16} />
                      <span>DOCX</span>
                    </button>
                    <button 
                      onClick={handleEdit}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        background: brandColors.secondary, 
                        color: 'white', 
                        padding: '0.5rem 1rem', 
                        border: 'none', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      <Edit3 size={16} />
                      <span>{isEditing ? 'View' : 'Edit'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
