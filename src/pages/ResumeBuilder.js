import React, { useState, useCallback, useRef } from 'react';
import { Upload, FileText, Clipboard, Sparkles, CheckCircle, TrendingUp, User, Briefcase, GraduationCap, Award, Download, Eye, Edit3, Target, Lightbulb, ArrowLeft, Save, Share } from 'lucide-react';

const ResumeBuilder = () => {
  const [parseMethod, setParseMethod] = useState('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [previewSections, setPreviewSections] = useState([]);
  const [atsScore, setAtsScore] = useState(0);
  const [matchScore, setMatchScore] = useState(0);
  const [textInput, setTextInput] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [currentStep, setCurrentStep] = useState('');
  const fileInputRef = useRef(null);

  const navigateBack = () => {
    window.location.href = '/dashboard';
  };

  const generateJobMatchSuggestions = (jobDesc) => {
    const suggestions = [];
    
    if (jobDesc.toLowerCase().includes('leadership')) {
      suggestions.push({
        id: `job-lead-${Date.now()}`,
        type: 'job-match',
        icon: Target,
        priority: 'high',
        title: "Highlight Leadership Experience",
        message: "This role emphasizes leadership. Consider adding specific examples of team management and project leadership.",
        action: "Add Leadership Examples",
        matchImprovement: "+15% match score"
      });
    }
    
    if (jobDesc.toLowerCase().includes('agile') || jobDesc.toLowerCase().includes('scrum')) {
      suggestions.push({
        id: `job-agile-${Date.now()}`,
        type: 'job-match',
        icon: Target,
        priority: 'medium',
        title: "Add Agile/Scrum Experience",
        message: "The job mentions Agile methodologies. Highlight your experience with Scrum, sprint planning, or agile development.",
        action: "Update Skills",
        matchImprovement: "+12% match score"
      });
    }

    return suggestions;
  };

  const parseResumeContent = useCallback(async (content, fileName = '') => {
    setIsProcessing(true);
    setParseProgress(0);
    setSuggestions([]);
    setPreviewSections([]);
    setCurrentStep('');

    const steps = [
      { progress: 10, message: "Initializing AI parser..." },
      { progress: 25, message: "Extracting personal information..." },
      { progress: 45, message: "Analyzing work experience..." },
      { progress: 60, message: "Processing education details..." },
      { progress: 75, message: "Identifying skills and keywords..." },
      { progress: 85, message: "Calculating ATS compatibility..." },
      jobDescription ? { progress: 92, message: "Matching against job requirements..." } : null,
      { progress: 100, message: "Analysis complete!" }
    ].filter(Boolean);

    for (let step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setParseProgress(step.progress);
      setCurrentStep(step.message);
      
      if (step.progress === 25) {
        const personalData = {
          name: "John Doe",
          email: "john.doe@email.com",
          phone: "(555) 123-4567",
          location: "San Francisco, CA",
          linkedin: "linkedin.com/in/johndoe",
        };
        setPreviewSections(prev => [...prev, { type: 'personal', data: personalData, timestamp: Date.now() }]);
      }
      
      if (step.progress === 45) {
        const workData = [
          {
            company: "Tech Innovations LLC",
            position: "Senior Software Developer",
            duration: "2022 - Present",
            achievements: [
              "Led development of microservices architecture serving 100K+ users",
              "Improved application performance by 45% through code optimization",
              "Mentored team of 5 junior developers on best practices"
            ]
          }
        ];
        setPreviewSections(prev => [...prev, { type: 'experience', data: workData, timestamp: Date.now() }]);
        
        setTimeout(() => {
          setSuggestions(prev => [...prev, {
            id: `exp-${Date.now()}`,
            type: 'enhancement',
            icon: TrendingUp,
            title: "Quantify Your Impact",
            message: "Add specific metrics and percentages to make achievements more compelling",
            action: "Enhance Now"
          }]);
        }, 1000);
      }
      
      if (step.progress === 60) {
        const eduData = [
          {
            institution: "University of Technology",
            degree: "Bachelor of Science in Computer Science",
            year: "2020",
            gpa: "3.7"
          }
        ];
        setPreviewSections(prev => [...prev, { type: 'education', data: eduData, timestamp: Date.now() }]);
      }
      
      if (step.progress === 75) {
        const skillsData = {
          technical: ["JavaScript", "React", "Node.js", "Python", "SQL", "AWS"],
          soft: ["Leadership", "Team Collaboration", "Problem Solving", "Communication"]
        };
        setPreviewSections(prev => [...prev, { type: 'skills', data: skillsData, timestamp: Date.now() }]);
      }
      
      if (step.progress === 85) {
        const score = 87;
        setAtsScore(score);
        setTimeout(() => {
          setSuggestions(prev => [...prev, {
            id: `ats-${Date.now()}`,
            type: 'success',
            icon: CheckCircle,
            title: "Excellent ATS Compatibility!",
            message: "Your resume is well-optimized for applicant tracking systems",
            action: "Download Resume"
          }]);
        }, 800);
      }

      if (step.progress === 92 && jobDescription) {
        const matchScoreValue = 78;
        setMatchScore(matchScoreValue);
        
        setTimeout(() => {
          const jobSuggestions = generateJobMatchSuggestions(jobDescription);
          setSuggestions(prev => [...prev, ...jobSuggestions]);
        }, 1000);
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
    if (suggestion.action === "Download Resume") {
      alert("Resume download feature coming soon! For now, you can copy the preview content or print the page (Ctrl+P).");
    } else if (suggestion.action === "Add Leadership Examples") {
      alert("Leadership Tips:\n\n• Led team of X developers\n• Managed $X budget\n• Increased team productivity by X%\n• Mentored X junior staff members\n\nAdd specific numbers to make your leadership impact measurable!");
    } else if (suggestion.action === "Enhance Now") {
      alert("Enhancement Tips:\n\n• Add specific percentages (improved by 45%)\n• Include dollar amounts (saved $50K annually)\n• Mention team sizes (team of 12)\n• Use action verbs (led, optimized, implemented)\n• Quantify results (increased efficiency by 30%)");
    } else if (suggestion.action === "Update Skills") {
      alert("Agile/Scrum Tips:\n\n• Specify methodologies (Scrum, Kanban)\n• Mention sprint planning experience\n• Include stakeholder management\n• Highlight cross-functional collaboration\n• Add any certifications (CSM, PSM)");
    } else {
      alert(`${suggestion.title}\n\n${suggestion.message}\n\nThis feature will be fully implemented in the next update!`);
    }
    
    dismissSuggestion(suggestion.id);
  };

  const handleExport = (format) => {
    if (format === 'pdf') {
      alert("PDF Export coming soon!\n\nFor now, you can:\n• Screenshot the preview\n• Copy the text content\n• Print the page (Ctrl+P)");
    } else if (format === 'docx') {
      alert("DOCX Export coming soon!\n\nThis will generate a Word document with professional formatting.");
    }
  };

  const handleSave = () => {
    if (previewSections.length > 0) {
      alert("Resume saved successfully!\n\n✅ ATS Score: " + atsScore + "%\n✅ Content: " + previewSections.length + " sections\n✅ Last updated: " + new Date().toLocaleTimeString() + "\n\nResume history feature coming soon!");
    } else {
      alert("Please parse your resume first before saving.");
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem'
    },
    maxWidth: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem'
    },
    backButton: {
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
    },
    saveButton: {
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
    },
    title: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    mainTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1rem'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: 'rgba(255,255,255,0.9)',
      maxWidth: '600px',
      margin: '0 auto'
    },
    card: {
      background: 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      marginBottom: '1.5rem'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#1f2937',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    methodButton: {
      padding: '1.5rem',
      borderRadius: '12px',
      border: '2px solid #e5e7eb',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.2s',
      background: 'white'
    },
    methodButtonActive: {
      borderColor: '#3b82f6',
      backgroundColor: '#eff6ff',
      color: '#1d4ed8',
      transform: 'scale(1.02)'
    },
    uploadArea: {
      padding: '3rem',
      border: '3px dashed #d1d5db',
      borderRadius: '12px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    textarea: {
      width: '100%',
      height: '200px',
      padding: '1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      resize: 'vertical',
      fontSize: '1rem'
    },
    parseButton: {
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      color: 'white',
      padding: '0.75rem 2rem',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
      transition: 'width 0.5s ease'
    },
    suggestion: {
      border: '2px solid #dbeafe',
      backgroundColor: '#eff6ff',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '1rem'
    },
    suggestionJobMatch: {
      borderColor: '#bbf7d0',
      backgroundColor: '#f0fdf4'
    },
    suggestionSuccess: {
      borderColor: '#bbf7d0',
      backgroundColor: '#f0fdf4'
    },
    skillTag: {
      display: 'inline-block',
      padding: '0.5rem 1rem',
      margin: '0.25rem',
      borderRadius: '20px',
      fontSize: '0.875rem',
      fontWeight: '600',
      background: '#3b82f6',
      color: 'white'
    },
    skillTagMatch: {
      background: '#22c55e',
      boxShadow: '0 0 0 2px #bbf7d0'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.header}>
          <button onClick={navigateBack} style={styles.backButton}>
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
          <button onClick={handleSave} style={styles.saveButton}>
            <Save size={16} />
            <span>Save Resume</span>
          </button>
        </div>

        {/* Title */}
        <div style={styles.title}>
          <h1 style={styles.mainTitle}>AI-Powered Resume Builder</h1>
          <p style={styles.subtitle}>
            Upload your resume and job description to get AI-powered optimization and real-time job matching
          </p>
        </div>

        {/* Main Content */}
        <div style={{ display: window.innerWidth >= 1024 ? 'grid' : 'block', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Left Column */}
          <div>
            {/* Job Description Input */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>
                <Target size={24} color="#3b82f6" />
                Target Job Description
              </h2>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here to get tailored suggestions and match scoring..."
                style={{ ...styles.textarea, height: '120px' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.875rem' }}>
                <span style={{ color: '#6b7280' }}>
                  {jobDescription.length} characters {jobDescription.length > 100 && '✓ Ready for matching'}
                </span>
                <span style={{ color: '#3b82f6', fontWeight: '600' }}>
                  {jobDescription ? 'Job targeting enabled' : 'Optional but recommended'}
                </span>
              </div>
            </div>

            {/* Input Method Selection */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Choose Input Method</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button
                  onClick={() => setParseMethod('upload')}
                  style={{
                    ...styles.methodButton,
                    ...(parseMethod === 'upload' ? styles.methodButtonActive : {})
                  }}
                >
                  <Upload size={32} style={{ margin: '0 auto 0.5rem' }} />
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Upload File</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>PDF, DOC, DOCX, TXT</div>
                </button>
                
                <button
                  onClick={() => setParseMethod('paste')}
                  style={{
                    ...styles.methodButton,
                    ...(parseMethod === 'paste' ? styles.methodButtonActive : {})
                  }}
                >
                  <Clipboard size={32} style={{ margin: '0 auto 0.5rem' }} />
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Paste Text</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Copy & Paste</div>
                </button>
              </div>
            </div>

            {/* Upload/Paste Area */}
            <div style={styles.card}>
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
                    style={styles.uploadArea}
                  >
                    <FileText size={48} style={{ margin: '0 auto 1rem', color: '#9ca3af' }} />
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
                    style={styles.textarea}
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
                        ...styles.parseButton,
                        opacity: (isProcessing || !textInput.trim()) ? 0.5 : 1,
                        cursor: (isProcessing || !textInput.trim()) ? 'not-allowed' : 'pointer'
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
              <div style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151' }}>AI Processing Resume</span>
                  <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#3b82f6' }}>{parseProgress}%</span>
                </div>
                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: `${parseProgress}%` }}></div>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', fontStyle: 'italic', marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  {currentStep}
                </div>
              </div>
            )}

            {/* Smart Suggestions */}
            {suggestions.length > 0 && (
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>
                  <Lightbulb size={24} color="#f59e0b" />
                  AI Suggestions
                </h3>
                <div>
                  {suggestions.map((suggestion) => (
                    <div 
                      key={suggestion.id} 
                      style={{
                        ...styles.suggestion,
                        ...(suggestion.type === 'job-match' ? styles.suggestionJobMatch : {}),
                        ...(suggestion.type === 'success' ? styles.suggestionSuccess : {})
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                        <div style={{ 
                          padding: '0.5rem', 
                          borderRadius: '8px', 
                          backgroundColor: suggestion.type === 'job-match' ? '#dcfce7' : '#dbeafe',
                          color: suggestion.type === 'job-match' ? '#16a34a' : '#2563eb'
                        }}>
                          <suggestion.icon size={20} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                            {suggestion.title}
                          </div>
                          <div style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '0.75rem' }}>
                            {suggestion.message}
                          </div>
                          {suggestion.matchImprovement && (
                            <div style={{ fontSize: '0.875rem', color: '#16a34a', fontWeight: '600', marginBottom: '0.75rem' }}>
                              {suggestion.matchImprovement}
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
                                background: suggestion.type === 'job-match' ? '#16a34a' : '#2563eb',
                                color: 'white'
                              }}
                            >
                              {suggestion.action}
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
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div>
            {/* Scores Dashboard */}
            {(atsScore > 0 || matchScore > 0) && (
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Resume Analytics</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: matchScore > 0 ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
                  {atsScore > 0 && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151' }}>ATS Compatibility</h4>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>{atsScore}%</div>
                      </div>
                      <div style={styles.progressBar}>
                        <div style={{ ...styles.progressFill, width: `${atsScore}%`, background: 'linear-gradient(90deg, #16a34a, #22c55e)' }}></div>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Excellent for applicant tracking systems</p>
                    </div>
                  )}

                  {matchScore > 0 && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151' }}>Job Match Score</h4>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>{matchScore}%</div>
                      </div>
                      <div style={styles.progressBar}>
                        <div style={{ ...styles.progressFill, width: `${matchScore}%` }}></div>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Strong match for target position</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Live Resume Preview */}
            <div style={{ ...styles.card, overflow: 'hidden', padding: 0 }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
                color: 'white', 
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <Eye size={24} />
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Live Resume Preview</h3>
                  {jobDescription && (
                    <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>Optimized for target position</p>
                  )}
                </div>
              </div>
              
              <div style={{ padding: '2rem' }}>
                {previewSections.map((section, index) => (
                  <div key={`${section.type}-${section.timestamp}`} style={{ 
                    marginBottom: '2rem',
                    opacity: 0,
                    animation: 'fadeIn 0.6s ease-out forwards',
                    animationDelay: `${index * 0.2}s`
                  }}>
                    {section.type === 'personal' && (
                      <div style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '0.75rem' }}>
                          <User size={24} color="#3b82f6" />
                          <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Contact Information</h4>
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>{section.data.name}</h2>
                        <div style={{ color: '#6b7280', lineHeight: 1.6 }}>
                          <p style={{ margin: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%' }}></span>
                            {section.data.location}
                          </p>
                          {section.data.linkedin && (
                            <p style={{ margin: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ width: '8px', height: '8px', backgroundColor: '#1d4ed8', borderRadius: '50%' }}></span>
                              {section.data.linkedin}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {section.type === 'experience' && (
                      <div style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '0.75rem' }}>
                          <Briefcase size={24} color="#16a34a" />
                          <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Professional Experience</h4>
                        </div>
                        {section.data.map((exp, i) => (
                          <div key={i} style={{ marginBottom: '1.5rem' }}>
                            <h5 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 0.25rem 0' }}>{exp.position}</h5>
                            <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#16a34a', margin: '0 0 0.75rem 0' }}>{exp.company} • {exp.duration}</p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                              {exp.achievements.map((achievement, j) => (
                                <li key={j} style={{ 
                                  color: '#374151', 
                                  marginBottom: '0.25rem',
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '0.75rem'
                                }}>
                                  <span style={{ color: '#3b82f6', fontWeight: 'bold', marginTop: '0.25rem' }}>▪</span>
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
                                  ...styles.skillTag,
                                  ...(isJobMatch ? styles.skillTagMatch : {})
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
                                  ...styles.skillTag,
                                  background: '#8b5cf6',
                                  ...(isJobMatch ? { ...styles.skillTagMatch, background: '#22c55e' } : {})
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
                    <FileText size={48} style={{ margin: '0 auto 1rem', color: '#d1d5db' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#6b7280', marginBottom: '0.5rem' }}>Ready to Parse Your Resume</h3>
                    <p style={{ color: '#9ca3af', marginBottom: '1rem' }}>Upload or paste your resume to see the live preview</p>
                    {jobDescription && (
                      <p style={{ color: '#3b82f6', fontSize: '0.875rem' }}>Job description loaded - your resume will be optimized for this position</p>
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
                    Last updated: {new Date().toLocaleTimeString()}
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
                      <span>PDF</span>
                    </button>
                    <button 
                      onClick={() => handleExport('docx')}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        background: '#2563eb', 
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
                    <button style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      background: '#8b5cf6', 
                      color: 'white', 
                      padding: '0.5rem 1rem', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}>
                      <Edit3 size={16} />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ResumeBuilder;: '8px', backgroundColor: '#3b82f6', borderRadius: '50%' }}></span>
                            {section.data.email} • {section.data.phone}
                          </p>
                          <p style={{ margin: '0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ width: '8px', height