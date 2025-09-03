// Enhanced Resume Analysis and Suggestion System

// Resume quality benchmarks based on industry standards
const RESUME_BENCHMARKS = {
  experience: {
    bulletPoints: {
      ideal: { min: 3, max: 5 },
      quantified: { percentage: 70 }, // 70% should have numbers/metrics
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
    relevance: { jobMatch: 0.4 } // 40% should match job requirements
  },
  sections: {
    required: ['personal', 'experience', 'skills'],
    recommended: ['education', 'projects', 'certifications'],
    optional: ['awards', 'publications', 'languages']
  },
  atsOptimization: {
    keywords: { density: { min: 0.02, max: 0.04 } }, // 2-4% keyword density
    formatting: ['consistent dates', 'standard headers', 'no tables', 'no graphics'],
    fileFormat: ['pdf', 'docx']
  }
};

// Industry-specific resume patterns
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
  }
};

// Advanced resume analyzer
class ResumeAnalyzer {
  constructor(resumeData, jobDescription = '') {
    this.resume = resumeData;
    this.jobDesc = jobDescription.toLowerCase();
    this.suggestions = [];
    this.scores = {
      overall: 0,
      ats: 0,
      jobMatch: 0,
      structure: 0,
      content: 0
    };
  }

  // Extract job requirements and keywords
  analyzeJobDescription() {
    const requirements = {
      skills: [],
      experience: [],
      keywords: [],
      industry: null,
      level: null
    };

    if (!this.jobDesc) return requirements;

    // Extract required skills
    const skillPatterns = [
      /(?:experience with|proficient in|knowledge of|skilled in)\s+([^,.]+)/gi,
      /(?:required|must have|should have):\s*([^.]+)/gi
    ];

    skillPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(this.jobDesc)) !== null) {
        requirements.skills.push(match[1].trim());
      }
    });

    // Extract years of experience
    const expMatch = this.jobDesc.match(/(\d+)[\+\s]*years?\s+(?:of\s+)?experience/i);
    if (expMatch) {
      requirements.experience.push(parseInt(expMatch[1]));
    }

    // Industry detection
    if (this.jobDesc.includes('software') || this.jobDesc.includes('developer') || this.jobDesc.includes('engineer')) {
      requirements.industry = 'technology';
    } else if (this.jobDesc.includes('marketing') || this.jobDesc.includes('campaign')) {
      requirements.industry = 'marketing';
    } else if (this.jobDesc.includes('financial') || this.jobDesc.includes('accounting')) {
      requirements.industry = 'finance';
    }

    // Level detection
    if (this.jobDesc.includes('senior') || this.jobDesc.includes('lead') || this.jobDesc.includes('principal')) {
      requirements.level = 'senior';
    } else if (this.jobDesc.includes('junior') || this.jobDesc.includes('entry')) {
      requirements.level = 'junior';
    } else {
      requirements.level = 'mid';
    }

    return requirements;
  }

  // Analyze experience section quality
  analyzeExperience() {
    if (!this.resume.experience) return;

    this.resume.experience.forEach((job, index) => {
      const achievements = job.achievements || [];
      const quantifiedCount = achievements.filter(achievement => 
        /\d+[\%\$\+]|\d+\s*(percent|dollars|users|team|people)/i.test(achievement)
      ).length;

      // Check for weak achievements
      if (achievements.length < 3) {
        this.suggestions.push({
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
      const quantificationRate = quantifiedCount / achievements.length;
      if (quantificationRate < 0.5) {
        this.suggestions.push({
          id: `exp-metrics-${index}`,
          type: 'enhancement',
          category: 'Impact Metrics',
          title: 'Quantify Your Achievements',
          message: `Only ${Math.round(quantificationRate * 100)}% of achievements include specific metrics. Aim for 70%+.`,
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
      const weakVerbs = ['worked on', 'helped with', 'responsible for', 'assisted'];
      const hasWeakVerbs = achievements.some(achievement => 
        weakVerbs.some(verb => achievement.toLowerCase().includes(verb))
      );

      if (hasWeakVerbs) {
        this.suggestions.push({
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
            'assisted': 'Supported, Facilitated, Enabled'
          }
        });
      }
    });
  }

  // Analyze job relevance
  analyzeJobRelevance() {
    if (!this.jobDesc) return;

    const jobReqs = this.analyzeJobDescription();
    const allSkills = [
      ...(this.resume.skills?.technical || []),
      ...(this.resume.skills?.soft || [])
    ].map(skill => skill.toLowerCase());

    // Check skill gaps
    const missingSkills = jobReqs.skills.filter(skill => 
      !allSkills.some(resumeSkill => 
        resumeSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(resumeSkill)
      )
    ).slice(0, 3); // Top 3 missing skills

    if (missingSkills.length > 0) {
      this.suggestions.push({
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
    if (jobReqs.experience.length > 0) {
      const requiredYears = Math.max(...jobReqs.experience);
      const resumeYears = this.estimateExperienceYears();
      
      if (resumeYears < requiredYears) {
        this.suggestions.push({
          id: 'experience-gap',
          type: 'job-match',
          category: 'Experience Level',
          title: 'Highlight Relevant Experience',
          message: `This role requires ${requiredYears}+ years of experience. Emphasize your most relevant achievements and any accelerated learning.`,
          priority: 'high',
          action: 'Optimize Experience',
          recommendation: 'Consider adding internships, projects, or volunteer work that demonstrates relevant skills.'
        });
      }
    }

    // Industry-specific suggestions
    if (jobReqs.industry && INDUSTRY_PATTERNS[jobReqs.industry]) {
      const pattern = INDUSTRY_PATTERNS[jobReqs.industry];
      
      if (pattern.projectsImportant && !this.resume.projects) {
        this.suggestions.push({
          id: 'missing-projects',
          type: 'structure',
          category: 'Missing Section',
          title: 'Add Projects Section',
          message: `${jobReqs.industry} roles typically expect to see relevant projects showcasing your skills.`,
          priority: 'high',
          action: 'Add Projects',
          recommendation: 'Include 2-3 relevant projects with descriptions of technologies used and outcomes achieved.'
        });
      }

      if (pattern.portfolioExpected) {
        this.suggestions.push({
          id: 'portfolio-link',
          type: 'enhancement',
          category: 'Portfolio',
          title: 'Include Portfolio Link',
          message: `${jobReqs.industry} professionals typically include portfolio links to showcase their work.`,
          priority: 'medium',
          action: 'Add Portfolio',
          recommendation: 'Add your portfolio URL to the contact section and mention key projects in your experience.'
        });
      }
    }
  }

  // Analyze ATS optimization
  analyzeATS() {
    const issues = [];

    // Check for consistent date formatting
    if (this.resume.experience) {
      const dateFormats = this.resume.experience.map(job => job.duration);
      const hasInconsistentDates = !dateFormats.every(date => 
        /\d{4}\s*-\s*(\d{4}|Present)/.test(date)
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

    if (issues.length > 0) {
      this.suggestions.push({
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
  }

  // Calculate overall scores
  calculateScores() {
    let structureScore = 85;
    let contentScore = 75;
    let atsScore = 90;
    let jobMatchScore = 0;

    // Adjust scores based on suggestions
    this.suggestions.forEach(suggestion => {
      if (suggestion.type === 'critical') {
        structureScore -= 15;
        atsScore -= 20;
      } else if (suggestion.type === 'enhancement') {
        contentScore -= 10;
      } else if (suggestion.type === 'job-match') {
        jobMatchScore = Math.min(jobMatchScore + 20, 85);
      }
    });

    // Job match score calculation
    if (this.jobDesc) {
      const jobReqs = this.analyzeJobDescription();
      const skillMatchRate = this.calculateSkillMatchRate(jobReqs);
      jobMatchScore = Math.max(jobMatchScore, skillMatchRate);
    }

    this.scores = {
      structure: Math.max(structureScore, 40),
      content: Math.max(contentScore, 40),
      ats: Math.max(atsScore, 50),
      jobMatch: jobMatchScore,
      overall: Math.round((structureScore + contentScore + atsScore + jobMatchScore) / 4)
    };
  }

  // Helper methods
  estimateExperienceYears() {
    if (!this.resume.experience) return 0;
    
    return this.resume.experience.reduce((total, job) => {
      const duration = job.duration || '';
      const match = duration.match(/(\d{4})\s*-\s*(\d{4}|Present)/);
      if (match) {
        const startYear = parseInt(match[1]);
        const endYear = match[2] === 'Present' ? new Date().getFullYear() : parseInt(match[2]);
        return total + (endYear - startYear);
      }
      return total;
    }, 0);
  }

  calculateSkillMatchRate(jobReqs) {
    if (jobReqs.skills.length === 0) return 0;
    
    const resumeSkills = [
      ...(this.resume.skills?.technical || []),
      ...(this.resume.skills?.soft || [])
    ].map(skill => skill.toLowerCase());

    const matchingSkills = jobReqs.skills.filter(reqSkill =>
      resumeSkills.some(skill => 
        skill.includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(skill)
      )
    );

    return Math.round((matchingSkills.length / jobReqs.skills.length) * 100);
  }

  // Main analysis method
  analyze() {
    this.analyzeExperience();
    this.analyzeJobRelevance();
    this.analyzeATS();
    this.calculateScores();

    return {
      suggestions: this.suggestions,
      scores: this.scores,
      summary: {
        totalSuggestions: this.suggestions.length,
        criticalIssues: this.suggestions.filter(s => s.type === 'critical').length,
        jobMatchIssues: this.suggestions.filter(s => s.type === 'job-match').length,
        enhancementOpportunities: this.suggestions.filter(s => s.type === 'enhancement').length
      }
    };
  }
}

// Usage in ResumeBuilder component
export function analyzeResumeWithAI(resumeData, jobDescription = '') {
  const analyzer = new ResumeAnalyzer(resumeData, jobDescription);
  return analyzer.analyze();
}