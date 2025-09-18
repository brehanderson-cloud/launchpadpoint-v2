import React, { useState, useEffect } from 'react';

export function QualificationMatcher() {
  const [step, setStep] = useState(1); // 1: Upload Resume, 2: Add Job, 3: Results
  const [resumeData, setResumeData] = useState(null);
  const [jobData, setJobData] = useState(null);
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
        setStep(2);
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

  const analyzeJob = async (jobDescription) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/analyze/job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription })
      });

      const data = await response.json();
      
      if (data.success) {
        setJobData(data.data);
        await matchQualifications(resumeData, data.data);
      } else {
        setError(data.error || 'Failed to analyze job');
      }
    } catch (err) {
      setError('Failed to analyze job description');
      console.error('Job analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const matchQualifications = async (resume, job) => {
    try {
      const response = await fetch('/api/analyze/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData: resume, jobData: job })
      });

      const data = await response.json();
      
      if (data.success) {
        setMatchResults(data.data);
        setStep(3);
      } else {
        setError(data.error || 'Failed to match qualifications');
      }
    } catch (err) {
      setError('Failed to match qualifications');
      console.error('Matching error:', err);
    }
  };

  const resetMatcher = () => {
    setStep(1);
    setResumeData(null);
    setJobData(null);
    setMatchResults(null);
    setError('');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Qualification Matcher</h1>
        <p className="text-gray-600">
          Upload your resume and compare it against job requirements to see how well you match
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNum) => (
            <React.Fragment key={stepNum}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step >= stepNum 
                  ? 'bg-primary border-primary text-white' 
                  : 'border-gray-300 text-gray-500'
              }`}>
                {stepNum}
              </div>
              {stepNum < 3 && (
                <div className={`flex-1 h-1 mx-4 ${
                  step > stepNum ? 'bg-primary' : 'bg-gray-200'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={step >= 1 ? 'text-primary font-medium' : 'text-gray-500'}>
            Upload Resume
          </span>
          <span className={step >= 2 ? 'text-primary font-medium' : 'text-gray-500'}>
            Add Job Description
          </span>
          <span className={step >= 3 ? 'text-primary font-medium' : 'text-gray-500'}>
            View Results
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Step 1: Upload Resume */}
      {step === 1 && (
        <ResumeUploadStep 
          onUpload={uploadResume}
          loading={loading}
        />
      )}

      {/* Step 2: Job Description */}
      {step === 2 && (
        <JobDescriptionStep 
          onAnalyze={analyzeJob}
          loading={loading}
          resumeData={resumeData}
        />
      )}

      {/* Step 3: Results */}
      {step === 3 && (
        <MatchResultsStep 
          resumeData={resumeData}
          jobData={jobData}
          matchResults={matchResults}
          onReset={resetMatcher}
        />
      )}
    </div>
  );
}

function ResumeUploadStep({ onUpload, loading }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      onUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      onUpload(files[0]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h2 className="text-xl font-semibold mb-6 text-center">Upload Your Resume</h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          dragActive 
            ? 'border-primary bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        
        <p className="text-lg mb-2">Drop your resume here or click to browse</p>
        <p className="text-gray-500 mb-4">Supports PDF and Word documents (max 5MB)</p>
        
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
          id="resume-upload"
          disabled={loading}
        />
        
        <label
          htmlFor="resume-upload"
          className={`inline-block px-6 py-3 bg-primary text-white rounded cursor-pointer hover:bg-blue-700 transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Analyzing...' : 'Choose File'}
        </label>
      </div>
    </div>
  );
}

function JobDescriptionStep({ onAnalyze, loading, resumeData }) {
  const [jobDescription, setJobDescription] = useState('');

  const handleAnalyze = () => {
    if (jobDescription.trim()) {
      onAnalyze(jobDescription);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Resume Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Your Resume Summary</h3>
        {resumeData && (
          <div className="space-y-3">
            <div>
              <strong>Name:</strong> {resumeData.personal_info?.name || 'Not provided'}
            </div>
            <div>
              <strong>Skills:</strong>
              <div className="mt-1 flex flex-wrap gap-1">
                {resumeData.skills?.technical_skills?.slice(0, 5).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 rounded text-sm">
                    {skill}
                  </span>
                )) || <span className="text-gray-500">No skills extracted</span>}
              </div>
            </div>
            <div>
              <strong>Experience:</strong> {resumeData.experience?.length || 0} positions
            </div>
            <div>
              <strong>Education:</strong> {resumeData.education?.length || 0} entries
            </div>
          </div>
        )}
      </div>

      {/* Job Description Input */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Job Description</h3>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description you want to match against..."
          rows={10}
          className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
        />
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            {jobDescription.length} characters
          </span>
          
          <button
            onClick={handleAnalyze}
            disabled={loading || !jobDescription.trim()}
            className="px-6 py-2 bg-primary text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze Match'}
          </button>
        </div>
      </div>
    </div>
  );
}

function MatchResultsStep({ resumeData, jobData, matchResults, onReset }) {
  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Match Results</h2>
        <div className="flex items-center justify-center space-x-8">
          <div>
            <div className={`text-4xl font-bold ${
              matchResults.overall_match_score >= 80 ? 'text-green-600' :
              matchResults.overall_match_score >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {matchResults.overall_match_score}%
            </div>
            <div className="text-gray-600">Overall Match</div>
          </div>
          <div>
            <div className={`text-4xl font-bold ${
              matchResults.ats_score >= 80 ? 'text-green-600' :
              matchResults.ats_score >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {matchResults.ats_score}%
            </div>
            <div className="text-gray-600">ATS Score</div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Requirements Analysis */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Requirements Analysis</h3>
          
          {matchResults.requirement_analysis && (
            <div className="space-y-4">
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
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Improvement Suggestions</h3>
          
          {matchResults.improvement_suggestions && (
            <div className="space-y-4">
              {matchResults.improvement_suggestions.immediate_actions?.length > 0 && (
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Immediate Actions</h4>
                  <ul className="text-sm space-y-1">
                    {matchResults.improvement_suggestions.immediate_actions.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {matchResults.improvement_suggestions.skill_development?.length > 0 && (
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Skills to Develop</h4>
                  <div className="flex flex-wrap gap-2">
                    {matchResults.improvement_suggestions.skill_development.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
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
      <div className="flex justify-center space-x-4">
        <button
          onClick={onReset}
          className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
        >
          Start Over
        </button>
        <button className="px-6 py-2 bg-primary text-white rounded hover:bg-blue-700">
          Optimize Resume
        </button>
      </div>
    </div>
  );
}

function RequirementMatch({ title, data }) {
  if (!data) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">{title}</h4>
        <span className={`text-sm font-semibold ${
          data.score >= 80 ? 'text-green-600' :
          data.score >= 60 ? 'text-yellow-600' : 'text-red-600'
        }`}>
          {data.score}%
        </span>
      </div>
      
      {data.matched?.length > 0 && (
        <div className="mb-2">
          <span className="text-sm text-green-700 font-medium">Matched: </span>
          <span className="text-sm">{data.matched.join(', ')}</span>
        </div>
      )}
      
      {(data.missing?.length > 0 || data.gaps?.length > 0) && (
        <div>
          <span className="text-sm text-red-700 font-medium">Missing: </span>
          <span className="text-sm">{(data.missing || data.gaps || []).join(', ')}</span>
        </div>
      )}
    </div>
  );
}
