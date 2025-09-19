import React, { useState, useEffect } from 'react';

const styles = {
  container: {
    maxWidth: '1152px',
    margin: '0 auto',
    padding: '32px 0'
  },
  header: {
    marginBottom: '32px',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: '800',
    marginBottom: '8px',
    color: 'white'
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#d1d5db'
  }
};

export function QualificationMatcher() {
  const [resumeData, setResumeData] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [matchResults, setMatchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const uploadResume = async (file) => {
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch('/api/analyze/resume', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        setResumeData(data.data);
      } else {
        setError(data.error || 'Failed to analyze resume');
      }
    } catch (err) {
      setError('Failed to upload resume');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const analyzeMatch = async () => {
    if (!resumeData || !jobDescription.trim()) {
      setError('Please upload a resume and enter a job description');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // First analyze the job
      const jobResponse = await fetch('/api/analyze/job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription })
      });

      const jobData = await jobResponse.json();
      
      if (!jobData.success) {
        setError(jobData.error || 'Failed to analyze job');
        return;
      }

      // Then match qualifications
      const matchResponse = await fetch('/api/analyze/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData, jobData: jobData.data })
      });

      const matchData = await matchResponse.json();
      
      if (matchData.success) {
        setMatchResults(matchData.data);
      } else {
        setError(matchData.error || 'Failed to match qualifications');
      }
    } catch (err) {
      setError('Failed to analyze match');
      console.error('Match analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetMatcher = () => {
    setResumeData(null);
    setJobDescription('');
    setMatchResults(null);
    setError('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>See How Your Experience Matches</h1>
        <p style={styles.subtitle}>Upload your resume and paste a job description. Get detailed analysis of how your qualifications match their requirements.</p>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{ 
          marginBottom: '24px',
          border: '1px solid #dc2626'
        }} className="glass-card">
          <p style={{ color: '#f87171' }}>{error}</p>
        </div>
      )}

      {/* Progress Indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '24px',
        gap: '16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px',
          borderRadius: '20px',
          background: resumeData ? '#dcfce7' : '#f3f4f6',
          border: `2px solid ${resumeData ? '#059669' : '#d1d5db'}`,
          fontSize: '0.875rem',
          fontWeight: '500',
          color: resumeData ? '#047857' : '#6b7280'
        }}>
          {resumeData ? '✅' : '1️⃣'} Resume
        </div>
        <div style={{
          width: '32px',
          height: '2px',
          background: (resumeData && jobDescription.trim()) ? '#059669' : '#d1d5db'
        }}></div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px',
          borderRadius: '20px',
          background: jobDescription.trim() ? '#dcfce7' : '#f3f4f6',
          border: `2px solid ${jobDescription.trim() ? '#059669' : '#d1d5db'}`,
          fontSize: '0.875rem',
          fontWeight: '500',
          color: jobDescription.trim() ? '#047857' : '#6b7280'
        }}>
          {jobDescription.trim() ? '✅' : '2️⃣'} Job Description
        </div>
        <div style={{
          width: '32px',
          height: '2px',
          background: matchResults ? '#059669' : '#d1d5db'
        }}></div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px',
          borderRadius: '20px',
          background: matchResults ? '#dcfce7' : '#f3f4f6',
          border: `2px solid ${matchResults ? '#059669' : '#d1d5db'}`,
          fontSize: '0.875rem',
          fontWeight: '500',
          color: matchResults ? '#047857' : '#6b7280'
        }}>
          {matchResults ? '✅' : '3️⃣'} Results
        </div>
      </div>

      {/* Main Input Section - Always Visible */}
      {!matchResults && (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            marginBottom: '32px'
          }}>
            {/* Resume Upload */}
            <div className="dashed-box">
              <div className="card-icon">📄</div>
              <div className="card-title">Step 1: Upload Resume</div>
              <div className="card-desc">
                {resumeData ? '✅ Resume uploaded successfully' : 'PDF, DOC, or DOCX'}
              </div>
              <ResumeUploadStep 
                onUpload={uploadResume} 
                loading={loading} 
                hasResume={!!resumeData}
              />
            </div>

            {/* Job Description */}
            <div className="dashed-box">
              <div className="card-icon">🎯</div>
              <div className="card-title">Step 2: Add Job Description</div>
              <div className="card-desc">Copy and paste job posting</div>
              <JobDescriptionInput 
                value={jobDescription}
                onChange={setJobDescription}
                loading={loading}
              />
            </div>
          </div>

          {/* Analyze Button - Centered and only visible when both inputs are ready */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
            <button 
              className="analyze-btn" 
              onClick={analyzeMatch}
              disabled={loading || !resumeData || !jobDescription.trim()}
              style={{
                opacity: (!resumeData || !jobDescription.trim()) ? 0.5 : 1,
                cursor: (!resumeData || !jobDescription.trim()) ? 'not-allowed' : 'pointer',
                fontSize: '1.125rem',
                padding: '16px 32px',
                minWidth: '300px'
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span>🔄</span> Analyzing Match...
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span>🚀</span> Analyze Qualification Match
                </span>
              )}
            </button>
          </div>

          {/* Helpful Tips */}
          {(!resumeData || !jobDescription.trim()) && (
            <div style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center',
              color: '#93c5fd'
            }}>
              <h4 style={{ margin: '0 0 8px 0', fontWeight: '600' }}>💡 Tips for Best Results:</h4>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '0.875rem', lineHeight: '1.5' }}>
                <li>• Upload your most recent resume in PDF format</li>
                <li>• Include the complete job description with requirements</li>
                <li>• Our AI will analyze skills, experience, and education matches</li>
              </ul>
            </div>
          )}
        </>
      )}

      {/* Results Section */}
      {matchResults && (
        <MatchResultsStep 
          resumeData={resumeData} 
          matchResults={matchResults} 
          onReset={resetMatcher} 
        />
      )}
    </div>
  );
}

function ResumeUploadStep({ onUpload, loading, hasResume }) {
  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      onUpload(files[0]);
    }
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        id="resume-upload"
        disabled={loading}
      />
      <label
        htmlFor="resume-upload"
        className={hasResume ? "btn-primary" : "btn-secondary"}
        style={{
          width: '100%',
          textAlign: 'center',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.5 : 1
        }}
      >
        {loading ? 'Uploading...' : hasResume ? 'Change Resume' : 'Choose Resume File'}
      </label>
    </div>
  );
}

function JobDescriptionInput({ value, onChange, loading }) {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description you want to match against..."
        rows={6}
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: `2px solid ${value.trim() ? '#059669' : '#60a5fa'}`,
          borderRadius: '16px',
          background: 'rgba(156, 163, 175, 0.3)',
          color: 'white',
          opacity: loading ? 0.5 : 1,
          resize: 'vertical',
          minHeight: '120px'
        }}
        onFocus={(e) => e.target.style.outline = '2px solid #2563eb'}
        onBlur={(e) => e.target.style.outline = 'none'}
      />
      {value.trim() && (
        <div style={{
          marginTop: '8px',
          fontSize: '0.875rem',
          color: '#059669',
          fontWeight: '500'
        }}>
          ✅ Job description ready
        </div>
      )}
    </div>
  );
}

function MatchResultsStep({ resumeData, matchResults, onReset }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Overall Score */}
      <div style={{
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px' }}>Match Results</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
          <div>
            <div style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              color: matchResults.overall_match_score >= 80 ? '#059669' :
                     matchResults.overall_match_score >= 60 ? '#d97706' : '#dc2626'
            }}>
              {matchResults.overall_match_score}%
            </div>
            <div style={{ color: '#6b7280' }}>Overall Match</div>
          </div>
          <div>
            <div style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              color: matchResults.ats_score >= 80 ? '#059669' :
                     matchResults.ats_score >= 60 ? '#d97706' : '#dc2626'
            }}>
              {matchResults.ats_score}%
            </div>
            <div style={{ color: '#6b7280' }}>ATS Score</div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        {/* Requirements Analysis */}
        <div style={{
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '16px' }}>Requirements Analysis</h3>
          
          {matchResults.requirement_analysis && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <RequirementMatch
                title="Technical Skills"
                data={matchResults.requirement_analysis.technical_skills}
              />
              <RequirementMatch
                title="Experience"
                data={matchResults.requirement_analysis.experience}
              />
              <RequirementMatch
                title="Education"
                data={matchResults.requirement_analysis.education}
              />
            </div>
          )}
        </div>

        {/* Improvement Suggestions */}
        <div style={{
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '16px' }}>Improvement Suggestions</h3>
          
          {matchResults.improvement_suggestions && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {matchResults.improvement_suggestions.immediate_actions?.length > 0 && (
                <div>
                  <h4 style={{ fontWeight: '500', color: '#047857', marginBottom: '8px' }}>Immediate Actions</h4>
                  <ul style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {matchResults.improvement_suggestions.immediate_actions.map((action, index) => (
                      <li key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <span style={{ color: '#059669', marginRight: '8px' }}>•</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {matchResults.improvement_suggestions.skill_development?.length > 0 && (
                <div>
                  <h4 style={{ fontWeight: '500', color: '#1d4ed8', marginBottom: '8px' }}>Skills to Develop</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {matchResults.improvement_suggestions.skill_development.map((skill, index) => (
                      <span key={index} style={{
                        padding: '4px 8px',
                        background: '#dbeafe',
                        color: '#1e40af',
                        borderRadius: '4px',
                        fontSize: '0.875rem'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={onReset}
          style={{
            padding: '12px 24px',
            border: '2px solid #d1d5db',
            borderRadius: '8px',
            background: 'white',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#f3f4f6';
            e.target.style.borderColor = '#9ca3af';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'white';
            e.target.style.borderColor = '#d1d5db';
          }}
        >
          🔄 Analyze Another Match
        </button>
        <button 
          onClick={() => window.open('/resume-builder', '_blank')}
          style={{
            padding: '12px 24px',
            background: '#059669',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#047857'}
          onMouseOut={(e) => e.target.style.background = '#059669'}
        >
          🚀 Optimize Resume
        </button>
        <button 
          onClick={() => {
            const resultsText = `Match Results:\n\nOverall Match: ${matchResults.overall_match_score}%\nATS Score: ${matchResults.ats_score}%\n\nGenerated by LaunchpadPoint AI`;
            navigator.clipboard.writeText(resultsText);
            alert('Results copied to clipboard!');
          }}
          style={{
            padding: '12px 24px',
            background: '#2563eb',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
          onMouseOut={(e) => e.target.style.background = '#2563eb'}
        >
          📋 Share Results
        </button>
      </div>
    </div>
  );
}

function RequirementMatch({ title, data }) {
  if (!data) return null;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h4 style={{ fontWeight: '500' }}>{title}</h4>
        <span style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: data.score >= 80 ? '#059669' :
                 data.score >= 60 ? '#d97706' : '#dc2626'
        }}>
          {data.score}%
        </span>
      </div>
      
      {data.matched?.length > 0 && (
        <div style={{ marginBottom: '8px' }}>
          <span style={{ fontSize: '0.875rem', color: '#047857', fontWeight: '500' }}>Matched: </span>
          <span style={{ fontSize: '0.875rem' }}>{data.matched.join(', ')}</span>
        </div>
      )}
      
      {(data.missing?.length > 0 || data.gaps?.length > 0) && (
        <div>
          <span style={{ fontSize: '0.875rem', color: '#b91c1c', fontWeight: '500' }}>Missing: </span>
          <span style={{ fontSize: '0.875rem' }}>{(data.missing || data.gaps || []).join(', ')}</span>
        </div>
      )}
    </div>
  );
}
