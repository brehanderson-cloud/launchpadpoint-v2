import React, { useState } from 'react';
import { Edit3, Eye, Download, Sparkles, RefreshCw, Zap, Plus, Trash2 } from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';

const BuilderPage = () => {
  const { resumeData, setResumeData, careerScore, setCareerScore } = useResume();
  const [activeTab, setActiveTab] = useState('personal');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const exportResume = () => {
    const resumeContent = `
${resumeData.personal.fullName}
${resumeData.personal.jobTitle}
${resumeData.personal.email} | ${resumeData.personal.phone} | ${resumeData.personal.location}

SUMMARY
${resumeData.personal.summary}

SKILLS
${resumeData.skills.join(', ')}

EXPERIENCE
${resumeData.experience.map(exp => `
${exp.position} at ${exp.company}
${exp.startDate} - ${exp.endDate}
${exp.description}
`).join('\n')}

EDUCATION
${resumeData.education.map(edu => `
${edu.degree}
${edu.institution} - ${edu.graduationDate}
GPA: ${edu.gpa}
${edu.achievements}
`).join('\n')}
    `;

    const element = document.createElement('a');
    const file = new Blob([resumeContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${resumeData.personal.fullName.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    }));
  };

  const removeExperience = (index) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const updateExperience = (index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center space-x-3">
            <Edit3 className="w-6 h-6" />
            <span>Build Your Resume</span>
          </h2>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>AI Help</span>
          </button>
        </div>

        <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {['personal', 'experience', 'education', 'skills'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md transition-all capitalize ${
                activeTab === tab
                  ? 'bg-white dark:bg-gray-600 shadow-sm'
                  : 'hover:bg-white/50 dark:hover:bg-gray-600/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={resumeData.personal.fullName}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  personal: { ...prev.personal, fullName: e.target.value }
                }))}
                className="input"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Professional Title</label>
              <input
                type="text"
                value={resumeData.personal.jobTitle}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  personal: { ...prev.personal, jobTitle: e.target.value }
                }))}
                className="input"
                placeholder="Senior Software Engineer"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={resumeData.personal.email}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personal: { ...prev.personal, email: e.target.value }
                  }))}
                  className="input"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={resumeData.personal.phone}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personal: { ...prev.personal, phone: e.target.value }
                  }))}
                  className="input"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={resumeData.personal.location}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  personal: { ...prev.personal, location: e.target.value }
                }))}
                className="input"
                placeholder="San Francisco, CA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Professional Summary</label>
              <textarea
                rows={4}
                value={resumeData.personal.summary}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  personal: { ...prev.personal, summary: e.target.value }
                }))}
                className="input"
                placeholder="Experienced software engineer with 5+ years of expertise..."
              />
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Experience #{index + 1}</h3>
                  {resumeData.experience.length > 1 && (
                    <button
                      onClick={() => removeExperience(index)}
                      className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      className="input"
                      placeholder="Tech Innovations Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Position</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => updateExperience(index, 'position', e.target.value)}
                      className="input"
                      placeholder="Senior Software Engineer"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Start Date</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                        className="input"
                        placeholder="2020-01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">End Date</label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                        className="input"
                        placeholder="2023-08"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      rows={3}
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      className="input"
                      placeholder="• Led a team of 5 developers...\n• Improved system performance by 40%..."
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addExperience}
              className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Experience</span>
            </button>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Skills (comma separated)</label>
              <textarea
                rows={4}
                value={resumeData.skills.join(', ')}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                }))}
                className="input"
                placeholder="JavaScript, React, Node.js, Python, SQL, AWS..."
              />
            </div>
            <button
              onClick={() => {
                setIsAnalyzing(true);
                setTimeout(() => {
                  setCareerScore(Math.min(95, careerScore + Math.floor(Math.random() * 5)));
                  setIsAnalyzing(false);
                }, 2000);
              }}
              disabled={isAnalyzing}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Analyze with AI</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24 max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center space-x-3">
            <Eye className="w-6 h-6" />
            <span>Live Preview</span>
          </h2>
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              careerScore >= 90 ? 'bg-green-100 text-green-800' :
              careerScore >= 80 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {careerScore}% ATS Score
            </div>
            <button 
              onClick={exportResume}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">{resumeData.personal.fullName}</h2>
            <p className="text-lg text-blue-600 mb-2">{resumeData.personal.jobTitle}</p>
            <p className="text-sm text-gray-600">
              {resumeData.personal.email} • {resumeData.personal.phone} • {resumeData.personal.location}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-300">Summary</h3>
              <p className="text-sm leading-relaxed">{resumeData.personal.summary}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-300">Experience</h3>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold">{exp.position}</h4>
                    <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-sm text-blue-600 mb-2">{exp.company}</p>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-300">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
