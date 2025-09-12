// Advanced resume analysis utilities
export const analyzeResume = (resumeData) => {
  const analysis = {
    score: calculateATSScore(resumeData),
    suggestions: generateSuggestions(resumeData),
    keywordMatches: findKeywordMatches(resumeData),
    skillGaps: identifySkillGaps(resumeData)
  };
  
  return analysis;
};

export const calculateATSScore = (resumeData) => {
  let score = 0;
  const { personal, skills, experience, education } = resumeData;
  
  // Points for complete personal info
  if (personal.fullName && personal.email && personal.phone) score += 20;
  if (personal.summary && personal.summary.length > 50) score += 10;
  
  // Points for skills
  if (skills.length >= 5) score += 15;
  if (skills.length >= 10) score += 10;
  
  // Points for experience
  if (experience.length > 0) score += 20;
  if (experience.length >= 2) score += 15;
  
  // Points for education
  if (education.length > 0) score += 10;
  
  // Bonus points for specific keywords
  const bonusKeywords = ['react', 'node', 'python', 'aws', 'docker', 'kubernetes'];
  const allText = JSON.stringify(resumeData).toLowerCase();
  bonusKeywords.forEach(keyword => {
    if (allText.includes(keyword)) score += 2;
  });
  
  return Math.min(score, 100);
};

export const generateSuggestions = (resumeData) => {
  const suggestions = [];
  const { personal, skills, experience } = resumeData;
  
  if (!personal.summary || personal.summary.length < 100) {
    suggestions.push('Add a more detailed professional summary (100+ characters)');
  }
  
  if (skills.length < 8) {
    suggestions.push('Include at least 8 relevant skills');
  }
  
  if (experience.length === 0) {
    suggestions.push('Add your work experience');
  }
  
  if (!skills.includes('JavaScript') && !skills.includes('React')) {
    suggestions.push('Consider adding JavaScript and React skills (high demand)');
  }
  
  return suggestions;
};

export const findKeywordMatches = (resumeData) => {
  const highValueKeywords = [
    'react', 'javascript', 'typescript', 'node', 'python', 
    'aws', 'azure', 'docker', 'kubernetes', 'ci/cd',
    'agile', 'scrum', 'rest api', 'graphql', 'microservices'
  ];
  
  const allText = JSON.stringify(resumeData).toLowerCase();
  return highValueKeywords.filter(keyword => allText.includes(keyword));
};

export const identifySkillGaps = (resumeData) => {
  const trendingSkills = [
    'TypeScript', 'GraphQL', 'Next.js', 'Serverless', 
    'Machine Learning', 'Cloud Architecture', 'DevOps',
    'TensorFlow', 'PyTorch', 'Kubernetes', 'Docker',
    'AWS Lambda', 'Azure Functions', 'CI/CD Pipelines'
  ];
  
  const currentSkills = resumeData.skills.map(skill => skill.toLowerCase());
  return trendingSkills.filter(skill => 
    !currentSkills.includes(skill.toLowerCase())
  );
};

export const optimizeForJobDescription = (resumeData, jobDescription) => {
  const jobKeywords = extractKeywords(jobDescription);
  const optimizedResume = { ...resumeData };
  
  // Add missing keywords to skills if they're relevant
  jobKeywords.forEach(keyword => {
    if (!optimizedResume.skills.includes(keyword) && 
        isTechnicalSkill(keyword)) {
      optimizedResume.skills.push(keyword);
    }
  });
  
  // Enhance summary with relevant keywords
  if (optimizedResume.personal.summary) {
    const summary = optimizedResume.personal.summary.toLowerCase();
    jobKeywords.forEach(keyword => {
      if (!summary.includes(keyword.toLowerCase()) && 
          isSummaryRelevant(keyword)) {
        optimizedResume.personal.summary += ` Experienced with ${keyword}.`;
      }
    });
  }
  
  return optimizedResume;
};

const extractKeywords = (text) => {
  const words = text.toLowerCase().split(/\s+/);
  const stopWords = new Set(['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for']);
  return [...new Set(words.filter(word => 
    word.length > 3 && !stopWords.has(word) && /[a-z]/.test(word)
  ))];
};

const isTechnicalSkill = (skill) => {
  const technicalTerms = ['javascript', 'python', 'react', 'node', 'aws', 'docker'];
  return technicalTerms.some(term => skill.toLowerCase().includes(term));
};

const isSummaryRelevant = (keyword) => {
  const relevantTerms = ['development', 'engineering', 'architecture', 'design', 'management'];
  return relevantTerms.some(term => keyword.toLowerCase().includes(term));
};

// Combined AI-powered resume analysis function
export const analyzeResumeWithAI = (resumeData, jobDescription = '') => {
  const atsScore = calculateATSScore(resumeData);
  const suggestions = generateSuggestions(resumeData);
  const keywordMatches = findKeywordMatches(resumeData);
  
  // Calculate additional scores
  const contentScore = Math.min(100, atsScore + (suggestions.length > 0 ? 10 : 0));
  const jobMatchScore = jobDescription ? calculateJobMatchScore(resumeData, jobDescription) : 0;
  const overallScore = Math.round((atsScore + contentScore + jobMatchScore) / 3);
  
  return {
    suggestions: enhanceSuggestionsWithDetails(suggestions),
    scores: {
      ats: atsScore,
      jobMatch: jobMatchScore,
      overall: overallScore,
      content: contentScore
    }
  };
};

const calculateJobMatchScore = (resumeData, jobDescription) => {
  const jobKeywords = extractKeywords(jobDescription);
  const resumeText = JSON.stringify(resumeData).toLowerCase();
  const matches = jobKeywords.filter(keyword => resumeText.includes(keyword.toLowerCase()));
  return Math.min(100, Math.round((matches.length / jobKeywords.length) * 100));
};

const enhanceSuggestionsWithDetails = (suggestions) => {
  return suggestions.map((suggestion, index) => ({
    id: `suggestion-${index}`,
    type: index % 4 === 0 ? 'critical' : index % 3 === 0 ? 'job-match' : index % 2 === 0 ? 'enhancement' : 'structure',
    title: suggestion,
    message: `${suggestion} - Click for more details on how to improve this aspect of your resume.`,
    category: 'improvement',
    action: 'View Details'
  }));
};
