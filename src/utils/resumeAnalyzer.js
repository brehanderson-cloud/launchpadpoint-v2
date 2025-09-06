// Enhanced Resume Analysis and Suggestion System with optimized parsing and NLP capabilities

// Enhanced Resume quality benchmarks
const RESUME_BENCHMARKS = {
  experience: {
    bulletPoints: {
      ideal: { min: 3, max: 5 },
      quantified: { percentage: 70 },
      actionVerbs: ['Led', 'Managed', 'Developed', 'Implemented', 'Optimized', 'Increased', 'Reduced', 'Streamlined']
    },
    achievements: {
      impactKeywords: ['increased', 'reduced', 'improved', 'saved', 'generated', 'delivered'],
      metricTypes: ['%', '$', 'time', 'team size', 'users', 'revenue']
    }
  },
  skills: {
    technical: { ideal: { min: 6, max: 12 } },
    soft: { ideal: { min: 4, max: 8 } },
    relevance: { jobMatch: 0.4 }
  },
  sections: {
    required: ['personal', 'experience', 'skills'],
    recommended: ['education', 'projects', 'certifications'],
    optional: ['awards', 'publications', 'languages']
  },
  atsOptimization: {
    keywords: { density: { min: 0.02, max: 0.04 } },
    formatting: ['consistent dates', 'standard headers', 'no tables', 'no graphics'],
    fileFormat: ['pdf', 'docx']
  }
};

// Enhanced Industry-specific resume patterns with more industries
const INDUSTRY_PATTERNS = {
  technology: {
    essentialSkills: ['programming languages', 'frameworks', 'databases', 'cloud platforms'],
    projectsImportant: true,
    portfolioExpected: true,
    certifications: ['AWS', 'Google Cloud', 'Microsoft', 'Cisco']
  },
  marketing: {
    essentialSkills: ['analytics', 'campaign management', 'content creation', 'social media'],
    metricsImportant: ['ROI', 'conversion rates', 'engagement', 'reach'],
    portfolioExpected: true
  },
  finance: {
    essentialSkills: ['financial modeling', 'analysis', 'reporting', 'compliance'],
    certifications: ['CPA', 'CFA', 'FRM'],
    educationImportant: true
  },
  healthcare: {
    essentialSkills: ['patient care', 'medical terminology', 'EMR systems', 'clinical procedures'],
    certifications: ['RN', 'BLS', 'ACLS', 'CPR'],
    educationImportant: true
  },
  education: {
    essentialSkills: ['curriculum development', 'classroom management', 'student assessment', 'differentiated instruction'],
    certifications: ['teaching license', 'subject area endorsement'],
    educationImportant: true
  }
};

// NLP utility functions for text processing
const NLPUtils = {
  // Tokenize text with caching for efficiency
  tokenize: (function() {
    const tokenCache = new Map();
    return function(text, useCache = true) {
      if (useCache && tokenCache.has(text)) {
        return tokenCache.get(text);
      }
      
      const tokens = text.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(token => token.length > 1);
      
      if (useCache) {
        tokenCache.set(text, tokens);
      }
      
      return tokens;
    };
  })(),
  
  // Extract keywords with TF-IDF like approach
  extractKeywords: function(text, maxKeywords = 20) {
    const tokens = this.tokenize(text);
    const frequencyMap = new Map();
    
    tokens.forEach(token => {
      frequencyMap.set(token, (frequencyMap.get(token) || 0) + 1);
    });
    
    // Filter out common stop words
    const stopWords = new Set(['the', 'and', 'or', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
    const filtered = Array.from(frequencyMap.entries())
      .filter(([word]) => !stopWords.has(word) && word.length > 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxKeywords)
      .map(([word]) => word);
    
    return filtered;
  },
  
  // Calculate similarity between two texts using cosine similarity
  calculateSimilarity: function(text1, text2) {
    const tokens1 = this.tokenize(text1);
    const tokens2 = this.tokenize(text2);
    
    const allTokens = new Set([...tokens1, ...tokens2]);
    const vector1 = [];
    const vector2 = [];
    
    allTokens.forEach(token => {
      vector1.push(tokens1.filter(t => t === token).length);
      vector2.push(tokens2.filter(t => t === token).length);
    });
    
    // Calculate dot product
    let dotProduct = 0;
    for (let i = 0; i < vector1.length; i++) {
      dotProduct += vector1[i] * vector2[i];
    }
    
    // Calculate magnitudes
    const mag1 = Math.sqrt(vector1.reduce((sum, val) => sum + val * val, 0));
    const mag2 = Math.sqrt(vector2.reduce((sum, val) => sum + val * val, 0));
    
    // Return cosine similarity
    return mag1 && mag2 ? dotProduct / (mag1 * mag2) : 0;
  }
};

// Job Description Parser with enhanced extraction capabilities
class JobDescriptionParser {
  constructor(jobDescription) {
    this.jobDesc = jobDescription.toLowerCase();
    this.parsedData = this.parseJobDescription();
  }
  
  parseJobDescription() {
    const requirements = {
      skills: new Set(),
      experience: [],
      keywords: [],
      industry: null,
      level: null,
      education: null,
      responsibilities: []
    };
    
    if (!this.jobDesc) return requirements;
    
    // Extract skills with multiple patterns
    const skillPatterns = [
      /(?:experience with|proficient in|knowledge of|skilled in|familiarity with|expertise in)\s+([^,.]+)/gi,
      /(?:required|must have|should have|qualifications|requirements):\s*([^.!?]+)/gi,
      /(?:ability to|capable of)\s+([^,.]+)/gi
    ];
    
    skillPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(this.jobDesc)) !== null) {
        const skills = match[1].split(/[,;]| and /).map(s => s.trim());
        skills.forEach(skill => requirements.skills.add(skill));
      }
    });
    
    // Extract years of experience with various patterns
    const expPatterns = [
      /(\d+)[\+\s]*years?\s+(?:of\s+)?experience/gi,
      /at least\s+(\d+)\s+years/gi,
      /minimum\s+of\s+(\d+)\s+years/gi
    ];
    
    expPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(this.jobDesc)) !== null) {
        requirements.experience.push(parseInt(match[1]));
      }
    });
    
    // Extract education requirements
    const eduPatterns = [
      /(bachelor|master|phd|doctorate|associate|degree|diploma)[\s\w]* in ([^,.]+)/gi,
      /(ba|bs|ma|ms|phd|mba)[\s\w]* in ([^,.]+)/gi
    ];
    
    eduPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(this.jobDesc)) !== null) {
        requirements.education = match[0];
      }
    });
    
    // Industry detection with more patterns
    const industryKeywords = {
      technology: ['software', 'developer', 'engineer', 'programming', 'code', 'technical', 'it', 'system'],
      marketing: ['marketing', 'campaign', 'brand', 'social media', 'seo', 'content', 'digital'],
      finance: ['financial', 'accounting', 'finance', 'banking', 'investment', 'cpa', 'cfa'],
      healthcare: ['healthcare', 'medical', 'patient', 'clinical', 'nursing', 'hospital'],
      education: ['education', 'teaching', 'teacher', 'classroom', 'student', 'curriculum']
    };
    
    for (const [industry, keywords] of Object.entries(industryKeywords)) {
      if (keywords.some(keyword => this.jobDesc.includes(keyword))) {
        requirements.industry = industry;
        break;
      }
    }
    
    // Level detection
    if (this.jobDesc.includes('senior') || this.jobDesc.includes('lead') || this.jobDesc.includes('principal') || this.jobDesc.includes('director')) {
      requirements.level = 'senior';
    } else if (this.jobDesc.includes('junior') || this.jobDesc.includes('entry') || this.jobDesc.includes('associate')) {
      requirements.level = 'junior';
    } else {
      requirements.level = 'mid';
    }
    
    // Extract keywords using NLP
    requirements.keywords = NLPUtils.extractKeywords(this.jobDesc);
    
    // Convert Set to Array
    requirements.skills = Array.from(requirements.skills);
    
    return requirements;
  }
  
  getParsedData() {
    return this.parsedData;
  }
}

// Enhanced Resume analyzer with optimized processing
class ResumeAnalyzer {
  constructor(resumeData, jobDescription = '') {
    this.resume = resumeData;
    this.jobDesc = jobDescription;
    this.jobRequirements = jobDescription ? new JobDescriptionParser(jobDescription).getParsedData() : null;
    this.suggestions = [];
    this.scores = {
      overall: 0,
      ats: 0,
      jobMatch: 0,
      structure: 0,
      content: 0
    };
    
    // Cache for expensive operations
    this.cache = new Map();
  }
  
  // Memoization helper for expensive functions
  memoize(key, fn) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    const result = fn();
    this.cache.set(key, result);
    return result;
  }

  // Analyze experience section quality with enhanced metrics
  analyzeExperience() {
    return this.memoize('experience-analysis', () => {
      if (!this.resume.experience) return;
      
      const suggestions = [];
      
      this.resume.experience.forEach((job, index) => {
        const achievements = job.achievements || [];
        const quantifiedCount = achievements.filter(achievement => 
          /\d+[\%\$\+]|\d+\s*(percent|dollars|users|team|people|hours|days|months|years)/i.test(achievement)
        ).length;

        // Check for weak achievements
        if (achievements.length < RESUME_BENCHMARKS.experience.bulletPoints.ideal.min) {
          suggestions.push({
            id: `exp-bullets-${index}`,
            type: 'critical',
            category: 'Experience',
            title: 'Add More Achievement Details',
            message: `${job.position} only has ${achievements.length} bullet points. Add 3-5 specific achievements with measurable results.`,
            priority: 'high',
            action: 'Add Achievements',
            before: achievements.join('\n'),
            after: 'Example:\n• Led development of microservices architecture serving 100K+ users\n• Reduced application load time by 45% through code optimization\n• Mentored team of 5 junior developers, improving code review efficiency by 60%'
          });
        }

        // Check for lack of quantification
        const quantificationRate = achievements.length > 0 ? quantifiedCount / achievements.length : 0;
        if (quantificationRate < RESUME_BENCHMARKS.experience.bulletPoints.quantified.percentage / 100) {
          suggestions.push({
            id: `exp-metrics-${index}`,
            type: 'enhancement',
            category: 'Impact Metrics',
            title: 'Quantify Your Achievements',
            message: `Only ${Math.round(quantificationRate * 100)}% of achievements include specific metrics. Aim for ${RESUME_BENCHMARKS.experience.bulletPoints.quantified.percentage}%+.`,
            priority: 'high',
            action: 'Add Metrics',
            examples: [
              'Instead of: "Improved system performance"',
              'Write: "Improved system performance by 45%, reducing load time from 3.2s to 1.8s"',
              '',
              'Instead of: "Managed a team"', 
              'Write: "Managed team of 8 developers across 3 time zones, delivering 12 features on schedule"'
            ]
          });
        }

        // Check for weak action verbs
        const weakVerbs = ['worked on', 'helped with', 'responsible for', 'assisted', 'participated in'];
        const hasWeakVerbs = achievements.some(achievement => 
          weakVerbs.some(verb => achievement.toLowerCase().includes(verb))
        );

        if (hasWeakVerbs) {
          suggestions.push({
            id: `exp-verbs-${index}`,
            type: 'enhancement',
            category: 'Action Verbs',
            title: 'Strengthen Action Verbs',
            message: 'Replace weak verbs with strong action verbs that demonstrate leadership and impact.',
            priority: 'medium',
            action: 'Improve Verbs',
            replacements: {
              'worked on': 'Developed, Built, Created, Designed',
              'helped with': 'Collaborated on, Contributed to, Supported',
              'responsible for': 'Managed, Led, Oversaw, Directed',
              'assisted': 'Supported, Facilitated, Enabled',
              'participated in': 'Contributed to, Engaged in, Took part in'
            }
          });
        }
      });
      
      return suggestions;
    });
  }

  // Analyze job relevance with enhanced matching
  analyzeJobRelevance() {
    return this.memoize('job-relevance-analysis', () => {
      if (!this.jobDesc) return [];
      
      const suggestions = [];
      const allSkills = [
        ...(this.resume.skills?.technical || []),
        ...(this.resume.skills?.soft || [])
      ].map(skill => skill.toLowerCase());

      // Check skill gaps with improved matching
      const missingSkills = this.jobRequirements.skills.filter(reqSkill => {
        const reqSkillLower = reqSkill.toLowerCase();
        return !allSkills.some(resumeSkill => 
          resumeSkill.includes(reqSkillLower) || 
          reqSkillLower.includes(resumeSkill) ||
          NLPUtils.calculateSimilarity(resumeSkill, reqSkillLower) > 0.7
        );
      }).slice(0, 5); // Top 5 missing skills

      if (missingSkills.length > 0) {
        suggestions.push({
          id: 'skill-gaps',
          type: 'job-match',
          category: 'Skill Alignment',
          title: 'Address Key Skill Gaps',
          message: `This role requires skills not prominently featured in your resume.`,
          priority: 'high',
          action: 'Add Missing Skills',
          missingSkills: missingSkills,
          recommendation: 'If you have experience with these skills, add them to your skills section and mention them in relevant job achievements.'
        });
      }

      // Check experience level alignment
      if (this.jobRequirements.experience.length > 0) {
        const requiredYears = Math.max(...this.jobRequirements.experience);
        const resumeYears = this.estimateExperienceYears();
        
        if (resumeYears < requiredYears) {
          suggestions.push({
            id: 'experience-gap',
            type: 'job-match',
            category: 'Experience Level',
            title: 'Highlight Relevant Experience',
            message: `This role requires ${requiredYears}+ years of experience. Emphasize your most relevant achievements and any accelerated learning.`,
            priority: 'high',
            action: 'Optimize Experience',
            recommendation: 'Consider adding internships, projects, or volunteer work that demonstrates relevant skills. Highlight transferable skills from other experiences.'
          });
        }
      }

      // Industry-specific suggestions
      if (this.jobRequirements.industry && INDUSTRY_PATTERNS[this.jobRequirements.industry]) {
        const pattern = INDUSTRY_PATTERNS[this.jobRequirements.industry];
        
        if (pattern.projectsImportant && !this.resume.projects) {
          suggestions.push({
            id: 'missing-projects',
            type: 'structure',
            category: 'Missing Section',
            title: 'Add Projects Section',
            message: `${this.jobRequirements.industry} roles typically expect to see relevant projects showcasing your skills.`,
            priority: 'high',
            action: 'Add Projects',
            recommendation: 'Include 2-3 relevant projects with descriptions of technologies used and outcomes achieved.'
          });
        }

        if (pattern.portfolioExpected && !this.resume.personal?.portfolio) {
          suggestions.push({
            id: 'portfolio-link',
            type: 'enhancement',
            category: 'Portfolio',
            title: 'Include Portfolio Link',
            message: `${this.jobRequirements.industry} professionals typically include portfolio links to showcase their work.`,
            priority: 'medium',
            action: 'Add Portfolio',
            recommendation: 'Add your portfolio URL to the contact section and mention key projects in your experience.'
          });
        }
        
        // Check for industry-specific certifications
        if (pattern.certifications && this.resume.certifications) {
          const missingCerts = pattern.certifications.filter(cert => 
            !this.resume.certifications.some(resumeCert => 
              resumeCert.name.toLowerCase().includes(cert.toLowerCase())
            )
          );
          
          if (missingCerts.length > 0) {
            suggestions.push({
              id: 'industry-certifications',
              type: 'enhancement',
              category: 'Certifications',
              title: 'Consider Industry Certifications',
              message: `The ${this.jobRequirements.industry} industry values these certifications.`,
              priority: 'low',
              action: 'Explore Certifications',
              recommendedCerts: missingCerts.slice(0, 3)
            });
          }
        }
      }
      
      // Keyword optimization
      const resumeText = this.generateResumeText();
      const keywordDensity = this.calculateKeywordDensity(
        resumeText, 
        this.jobRequirements.keywords
      );
      
      if (keywordDensity < RESUME_BENCHMARKS.atsOptimization.keywords.density.min) {
        suggestions.push({
          id: 'keyword-optimization',
          type: 'job-match',
          category: 'Keyword Optimization',
          title: 'Increase Relevant Keywords',
          message: `Your resume has low density of keywords from the job description.`,
          priority: 'medium',
          action: 'Add Keywords',
          recommendation: 'Naturally incorporate relevant keywords from the job description into your resume, especially in skills and experience sections.',
          lowDensityKeywords: this.jobRequirements.keywords.slice(0, 10)
        });
      }
      
      return suggestions;
    });
  }

  // Analyze ATS optimization
  analyzeATS() {
    return this.memoize('ats-analysis', () => {
      const issues = [];
      const suggestions = [];

      // Check for consistent date formatting
      if (this.resume.experience) {
        const dateFormats = this.resume.experience.map(job => job.duration);
        const hasInconsistentDates = !dateFormats.every(date => 
          /\d{4}\s*-\s*(\d{4}|Present|Current)/.test(date)
        );

        if (hasInconsistentDates) {
          issues.push('Inconsistent date formatting');
        }
      }

      // Check for standard section headers
      const requiredSections = RESUME_BENCHMARKS.sections.required;
      const missingSections = requiredSections.filter(section => !this.resume[section]);

      if (missingSections.length > 0) {
        issues.push(`Missing required sections: ${missingSections.join(', ')}`);
      }
      
      // Check for recommended sections
      const recommendedSections = RESUME_BENCHMARKS.sections.recommended;
      const missingRecommended = recommendedSections.filter(section => !this.resume[section]);
      
      if (missingRecommended.length > 0) {
        suggestions.push({
          id: 'recommended-sections',
          type: 'enhancement',
          category: 'Resume Structure',
          title: 'Add Recommended Sections',
          message: 'Your resume is missing some recommended sections that could strengthen your application.',
          priority: 'medium',
          action: 'Add Sections',
          missingSections: missingRecommended
        });
      }

      if (issues.length > 0) {
        suggestions.push({
          id: 'ats-optimization',
          type: 'critical',
          category: 'ATS Compatibility',
          title: 'Fix ATS Issues',
          message: 'Several formatting issues may prevent ATS systems from reading your resume correctly.',
          priority: 'critical',
          action: 'Fix ATS Issues',
          issues: issues,
          fixes: {
            'Inconsistent date formatting': 'Use format: "2022 - Present" or "2020 - 2022"',
            'Missing required sections': 'Add all required sections with appropriate headers'
          }
        });
      }
      
      return suggestions;
    });
  }

  // Calculate overall scores with enhanced algorithm
  calculateScores() {
    return this.memoize('score-calculation', () => {
      let structureScore = 85;
      let contentScore = 75;
      let atsScore = 90;
      let jobMatchScore = this.jobDesc ? 30 : 0;

      // Get all suggestions
      const experienceSuggestions = this.analyzeExperience();
      const jobRelevanceSuggestions = this.analyzeJobRelevance();
      const atsSuggestions = this.analyzeATS();
      
      const allSuggestions = [
        ...experienceSuggestions,
        ...jobRelevanceSuggestions,
        ...atsSuggestions
      ];

      // Adjust scores based on suggestions
      allSuggestions.forEach(suggestion => {
        if (suggestion.type === 'critical') {
          structureScore -= 15;
          atsScore -= 20;
        } else if (suggestion.type === 'enhancement') {
          contentScore -= 5;
        } else if (suggestion.type === 'job-match') {
          jobMatchScore = Math.min(jobMatchScore + 15, 95);
        }
      });

      // Job match score calculation with multiple factors
      if (this.jobDesc) {
        const skillMatchRate = this.calculateSkillMatchRate();
        const keywordMatchRate = this.calculateKeywordMatchRate();
        const experienceMatchRate = this.calculateExperienceMatchRate();
        
        jobMatchScore = Math.max(
          jobMatchScore, 
          (skillMatchRate * 0.5) + (keywordMatchRate * 0.3) + (experienceMatchRate * 0.2)
        );
      }

      return {
        structure: Math.max(structureScore, 40),
        content: Math.max(contentScore, 40),
        ats: Math.max(atsScore, 50),
        jobMatch: jobMatchScore,
        overall: Math.round((structureScore + contentScore + atsScore + jobMatchScore) / 4)
      };
    });
  }

  // Enhanced helper methods
  estimateExperienceYears() {
    if (!this.resume.experience) return 0;
    
    let totalYears = 0;
    const positions = [];
    
    this.resume.experience.forEach(job => {
      const duration = job.duration || '';
      const match = duration.match(/(\d{4})\s*-\s*(\d{4}|Present|Current)/i);
      
      if (match) {
        const startYear = parseInt(match[1]);
        const endYear = match[2].toLowerCase() === 'present' || match[2].toLowerCase() === 'current' 
          ? new Date().getFullYear() 
          : parseInt(match[2]);
        
        const yearsInRole = endYear - startYear;
        totalYears += yearsInRole;
        positions.push({ title: job.position, years: yearsInRole });
      }
    });
    
    // Adjust for overlapping positions
    const adjustedYears = positions.length > 0 
      ? Math.max(...positions.map(p => p.years)) + (totalYears / positions.length) * 0.5
      : totalYears;
    
    return Math.round(adjustedYears * 10) / 10;
  }

  calculateSkillMatchRate() {
    if (!this.jobRequirements || this.jobRequirements.skills.length === 0) return 0;
    
    const resumeSkills = [
      ...(this.resume.skills?.technical || []),
      ...(this.resume.skills?.soft || [])
    ].map(skill => skill.toLowerCase());

    const matchingSkills = this.jobRequirements.skills.filter(reqSkill => {
      const reqSkillLower = reqSkill.toLowerCase();
      return resumeSkills.some(skill => 
        skill.includes(reqSkillLower) || 
        reqSkillLower.includes(skill) ||
        NLPUtils.calculateSimilarity(skill, reqSkillLower) > 0.7
      );
    });

    return (matchingSkills.length / this.jobRequirements.skills.length) * 100;
  }
  
  calculateKeywordMatchRate() {
    if (!this.jobRequirements || this.jobRequirements.keywords.length === 0) return 0;
    
    const resumeText = this.generateResumeText();
    const resumeKeywords = NLPUtils.extractKeywords(resumeText, 50);
    
    const matchingKeywords = this.jobRequirements.keywords.filter(keyword => 
      resumeKeywords.some(k => 
        k.includes(keyword) || keyword.includes(k) ||
        NLPUtils.calculateSimilarity(k, keyword) > 0.7
      )
    );
    
    return (matchingKeywords.length / this.jobRequirements.keywords.length) * 100;
  }
  
  calculateExperienceMatchRate() {
    if (!this.jobRequirements || !this.jobRequirements.industry) return 0;
    
    const industry = this.jobRequirements.industry;
    const pattern = INDUSTRY_PATTERNS[industry];
    
    if (!pattern) return 0;
    
    let matchScore = 0;
    
    // Check for industry-specific skills
    if (pattern.essentialSkills) {
      const resumeSkills = [
        ...(this.resume.skills?.technical || []),
        ...(this.resume.skills?.soft || [])
      ].map(skill => skill.toLowerCase());
      
      const essentialSkillsMatch = pattern.essentialSkills.filter(skill => 
        resumeSkills.some(s => s.includes(skill.toLowerCase()))
      ).length;
      
      matchScore += (essentialSkillsMatch / pattern.essentialSkills.length) * 40;
    }
    
    // Check for industry-specific certifications
    if (pattern.certifications && this.resume.certifications) {
      const certsMatch = pattern.certifications.filter(cert => 
        this.resume.certifications.some(c => 
          c.name.toLowerCase().includes(cert.toLowerCase())
        )
      ).length;
      
      matchScore += (certsMatch / pattern.certifications.length) * 30;
    }
    
    // Check for industry-specific projects
    if (pattern.projectsImportant && this.resume.projects) {
      matchScore += 30;
    }
    
    return matchScore;
  }
  
  calculateKeywordDensity(resumeText, keywords) {
    if (!keywords || keywords.length === 0) return 0;
    
    const tokens = NLPUtils.tokenize(resumeText, false);
    if (tokens.length === 0) return 0;
    
    const keywordCount = tokens.filter(token => 
      keywords.some(keyword => 
        token.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(token)
      )
    ).length;
    
    return keywordCount / tokens.length;
  }
  
  generateResumeText() {
    let text = '';
    
    // Add personal info
    if (this.resume.personal) {
      text += `${this.resume.personal.name || ''} ${this.resume.personal.email || ''} ${this.resume.personal.phone || ''} `;
    }
    
    // Add experience
    if (this.resume.experience) {
      this.resume.experience.forEach(job => {
        text += `${job.position || ''} ${job.company || ''} ${job.duration || ''} `;
        if (job.achievements) {
          text += job.achievements.join(' ') + ' ';
        }
      });
    }
    
    // Add skills
    if (this.resume.skills) {
      text += `${this.resume.skills.technical ? this.resume.skills.technical.join(' ') : ''} `;
      text += `${this.resume.skills.soft ? this.resume.skills.soft.join(' ') : ''} `;
    }
    
    // Add education
    if (this.resume.education) {
      this.resume.education.forEach(edu => {
        text += `${edu.degree || ''} ${edu.institution || ''} ${edu.year || ''} `;
      });
    }
    
    return text;
  }

  // Main analysis method with optimized processing
  analyze() {
    // Run analyses in parallel (conceptually - in JS we use memoization for efficiency)
    const experienceSuggestions = this.analyzeExperience();
    const jobRelevanceSuggestions = this.analyzeJobRelevance();
    const atsSuggestions = this.analyzeATS();
    const scores = this.calculateScores();
    
    const allSuggestions = [
      ...experienceSuggestions,
      ...jobRelevanceSuggestions,
      ...atsSuggestions
    ];
    
    // Sort suggestions by priority
    const priorityWeights = { critical: 3, high: 2, medium: 1, low: 0 };
    allSuggestions.sort((a, b) => priorityWeights[b.priority] - priorityWeights[a.priority]);

    return {
      suggestions: allSuggestions,
      scores: scores,
      summary: {
        totalSuggestions: allSuggestions.length,
        criticalIssues: allSuggestions.filter(s => s.priority === 'critical').length,
        jobMatchIssues: allSuggestions.filter(s => s.type === 'job-match').length,
        enhancementOpportunities: allSuggestions.filter(s => s.type === 'enhancement').length
      },
      jobRequirements: this.jobRequirements
    };
  }
}

// Batch processing for multiple resumes
class ResumeBatchProcessor {
  constructor() {
    this.jobDescriptionCache = new Map();
    this.analysisCache = new Map();
  }
  
  // Pre-process job description for multiple resumes
  preprocessJobDescription(jobDescription) {
    const cacheKey = jobDescription.substring(0, 100) + jobDescription.length;
    
    if (this.jobDescriptionCache.has(cacheKey)) {
      return this.jobDescriptionCache.get(cacheKey);
    }
    
    const parser = new JobDescriptionParser(jobDescription);
    const parsed = parser.getParsedData();
    
    this.jobDescriptionCache.set(cacheKey, parsed);
    return parsed;
  }
  
  // Analyze multiple resumes for the same job
  analyzeBatch(resumes, jobDescription) {
    const jobReqs = this.preprocessJobDescription(jobDescription);
    const results = [];
    
    resumes.forEach(resume => {
      const analyzer = new ResumeAnalyzer(resume, jobDescription);
      analyzer.jobRequirements = jobReqs; // Use pre-parsed requirements
      
      results.push(analyzer.analyze());
    });
    
    // Sort by job match score
    results.sort((a, b) => b.scores.jobMatch - a.scores.jobMatch);
    
    return results;
  }
}

// Usage in ResumeBuilder component
export function analyzeResumeWithAI(resumeData, jobDescription = '') {
  const analyzer = new ResumeAnalyzer(resumeData, jobDescription);
  return analyzer.analyze();
}

export function analyzeResumeBatch(resumes, jobDescription) {
  const processor = new ResumeBatchProcessor();
  return processor.analyzeBatch(resumes, jobDescription);
}
