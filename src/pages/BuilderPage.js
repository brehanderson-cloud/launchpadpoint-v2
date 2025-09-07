import React, { useState } from 'react';
import { Edit3, Eye, Download } from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';

const BuilderPage = () => {
  const { resumeData, setResumeData, careerScore } = useResume();
  const [activeTab, setActiveTab] = useState('personal');

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center space-x-3">
            <Edit3 className="w-6 h-6" />
            <span>Build Your Resume</span>
          </h2>
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
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
