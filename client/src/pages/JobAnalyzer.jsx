import React, { useState } from 'react';

export function JobAnalyzer() {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeJob = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

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
        setAnalysis(data.data);
      } else {
        setError(data.error || 'Analysis failed');
      }
    } catch (err) {
      setError('Failed to analyze job description');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearAnalysis = () => {
    setAnalysis(null);
    setJobDescription('');
    setError('');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Job Description Analyzer</h1>
        <p className="text-gray-600">
          Extract requirements, skills, and qualifications from any job posting
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Paste Job Description</h2>
            
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the complete job description here..."
              rows={12}
              className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
            />
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                {jobDescription.length} characters
              </span>
              
              <div className="space-x-2">
                <button
                  onClick={clearAnalysis}
                  className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
                >
                  Clear
                </button>
                <button
                  onClick={analyzeJob}
                  disabled={loading || !jobDescription.trim()}
                  className="px-6 py-2 bg-primary text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Analyzing...' : 'Analyze Job'}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {analysis ? (
            <JobAnalysisResults analysis={analysis} />
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500">Analysis results will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function JobAnalysisResults({ analysis }) {
  return (
    <div className="space-y-4">
      {/* Job Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Job Overview</h3>
        <div className="space-y-2">
          <div><strong>Title:</strong> {analysis.title || 'Not specified'}</div>
          <div><strong>Company:</strong> {analysis.company || 'Not specified'}</div>
          <div><strong>Location:</strong> {analysis.location || 'Not specified'}</div>
          <div><strong>Type:</strong> {analysis.job_type || 'Not specified'}</div>
          <div><strong>Level:</strong> {analysis.seniority_level || 'Not specified'}</div>
          {analysis.salary_range && (
            <div><strong>Salary:</strong> {analysis.salary_range}</div>
          )}
        </div>
      </div>

      {/* Requirements Breakdown */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Requirements Analysis</h3>
        
        {analysis.requirements && (
          <div className="space-y-4">
            {analysis.requirements.technical_skills?.length > 0 && (
              <RequirementCategory
                title="Technical Skills"
                items={analysis.requirements.technical_skills}
                color="blue"
              />
            )}
            
            {analysis.requirements.soft_skills?.length > 0 && (
              <RequirementCategory
                title="Soft Skills"
                items={analysis.requirements.soft_skills}
                color="green"
              />
            )}
            
            {analysis.requirements.experience?.length > 0 && (
              <RequirementCategory
                title="Experience Requirements"
                items={analysis.requirements.experience}
                color="purple"
              />
            )}
            
            {analysis.requirements.education?.length > 0 && (
              <RequirementCategory
                title="Education Requirements"
                items={analysis.requirements.education}
                color="yellow"
              />
            )}
            
            {analysis.requirements.certifications?.length > 0 && (
              <RequirementCategory
                title="Certifications"
                items={analysis.requirements.certifications}
                color="red"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function RequirementCategory({ title, items, color }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800'
  };

  return (
    <div>
      <h4 className="font-medium mb-2">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className={`px-2 py-1 rounded-full text-sm ${colorClasses[color]}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
