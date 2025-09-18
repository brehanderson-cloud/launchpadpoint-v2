import OpenAI from 'openai';

class AIAnalyzer {
  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is required');
    }
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async analyzeJobDescription(jobDescription) {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an expert job analyst. Extract and categorize job requirements from job descriptions.\n\nReturn a JSON object with:\n- title: job title\n- company: company name\n- requirements: {\n    technical_skills: array of technical skills\n    soft_skills: array of soft skills  \n    experience: array of experience requirements\n    education: array of education requirements\n    certifications: array of certifications\n  }\n- salary_range: estimated salary range if mentioned\n- location: job location\n- job_type: remote/hybrid/onsite\n- seniority_level: entry/mid/senior/executive`
          },
          {
            role: "user",
            content: jobDescription
          }
        ],
        temperature: 0.3,
        max_tokens: 1500
      });
      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('Error analyzing job description:', error);
      throw new Error('Failed to analyze job description');
    }
  }

  async analyzeResume(resumeText) {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an expert resume analyst. Extract structured information from resumes.\n\nReturn a JSON object with:\n- personal_info: {name, email, phone, location, linkedin}\n- professional_summary: brief summary\n- skills: {\n    technical_skills: array\n    soft_skills: array\n    tools_technologies: array\n  }\n- experience: array of {\n    title, company, duration, responsibilities: array, achievements: array\n  }\n- education: array of {\n    degree, institution, year, gpa_if_mentioned\n  }\n- certifications: array\n- projects: array if any\n- languages: array if mentioned`
          },
          {
            role: "user",
            content: resumeText
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      });
      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      throw new Error('Failed to analyze resume');
    }
  }

  async matchQualifications(resumeData, jobData) {
    try {
      const prompt = `\n      Compare this resume against job requirements and provide detailed matching analysis:\n\n      RESUME QUALIFICATIONS:\n      ${JSON.stringify(resumeData, null, 2)}\n\n      JOB REQUIREMENTS:\n      ${JSON.stringify(jobData, null, 2)}\n\n      Provide a JSON response with:\n      {\n        "overall_match_score": number (0-100),\n        "requirement_analysis": {\n          "technical_skills": {\n            "matched": array of matched skills,\n            "missing": array of missing skills,\n            "score": number (0-100)\n          },\n          "experience": {\n            "matched": array of matched experience,\n            "gaps": array of experience gaps,\n            "score": number (0-100)\n          },\n          "education": {\n            "meets_requirements": boolean,\n            "details": string,\n            "score": number (0-100)\n          }\n        },\n        "improvement_suggestions": {\n          "immediate_actions": array of actionable suggestions,\n          "skill_development": array of skills to develop,\n          "resume_optimization": array of resume improvements\n        },\n        "competitive_analysis": {\n          "strengths": array of candidate strengths,\n          "weaknesses": array of areas for improvement,\n          "unique_value_props": array of unique qualifications\n        }\n      }`;
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert career counselor and ATS specialist. Provide detailed, actionable qualification matching analysis."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.4,
        max_tokens: 2500
      });
      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('Error matching qualifications:', error);
      throw new Error('Failed to match qualifications');
    }
  }

  async optimizeResume(resumeData, jobData, matchingResults) {
    try {
      const prompt = `\n      Based on the resume, job requirements, and matching analysis, generate an optimized resume that better targets this specific job.\n\n      CURRENT RESUME:\n      ${JSON.stringify(resumeData, null, 2)}\n\n      JOB REQUIREMENTS:\n      ${JSON.stringify(jobData, null, 2)}\n\n      MATCHING ANALYSIS:\n      ${JSON.stringify(matchingResults, null, 2)}\n\n      Provide a JSON response with optimized resume sections:\n      {\n        "optimized_summary": "rewritten professional summary targeting this job",\n        "keyword_optimization": {\n          "added_keywords": array of important keywords to include,\n          "keyword_placement": object with section recommendations\n        },\n        "experience_improvements": array of {\n          "original": "original bullet point",\n          "optimized": "improved bullet point with better keywords and impact"\n        },\n        "skills_reordering": {\n          "prioritized_skills": array of skills to highlight first,\n          "skills_to_add": array of relevant skills to consider adding\n        },\n        "ats_optimization": {\n          "score_improvement": "estimated ATS score improvement",\n          "formatting_suggestions": array of formatting improvements,\n          "section_recommendations": array of section structure suggestions\n        }\n      }`;
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert resume writer and ATS optimization specialist. Provide specific, actionable resume improvements."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.4,
        max_tokens: 3000
      });
      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('Error optimizing resume:', error);
      throw new Error('Failed to optimize resume');
    }
  }

  calculateATSScore(resumeData, jobData) {
    let score = 0;
    const maxScore = 100;
    const jobKeywords = this.extractKeywords(jobData);
    const resumeKeywords = this.extractKeywords(resumeData);
    const keywordMatch = this.calculateKeywordMatch(jobKeywords, resumeKeywords);
    score += keywordMatch * 0.4;
    const experienceScore = this.calculateExperienceRelevance(resumeData.experience, jobData.requirements);
    score += experienceScore * 0.3;
    const educationScore = this.calculateEducationMatch(resumeData.education, jobData.requirements.education);
    score += educationScore * 0.15;
    const formatScore = this.calculateFormatScore(resumeData);
    score += formatScore * 0.15;
    return Math.round(score);
  }

  extractKeywords(data) {
    const text = JSON.stringify(data).toLowerCase();
    const keywords = text.match(/\b\w+\b/g) || [];
    return [...new Set(keywords)].filter(word => word.length > 2);
  }

  calculateKeywordMatch(jobKeywords, resumeKeywords) {
    if (!jobKeywords.length) return 0;
    const matches = jobKeywords.filter(keyword => resumeKeywords.includes(keyword));
    return (matches.length / jobKeywords.length) * 100;
  }

  calculateExperienceRelevance(experience, requirements) {
    if (!experience || !experience.length) return 0;
    const totalExperience = experience.length;
    const relevantExperience = experience.filter(exp => 
      exp.title && exp.responsibilities && exp.responsibilities.length > 0
    ).length;
    return (relevantExperience / totalExperience) * 100;
  }

  calculateEducationMatch(education, requiredEducation) {
    if (!requiredEducation || !requiredEducation.length) return 100;
    if (!education || !education.length) return 0;
    return education.some(edu => edu.degree) ? 100 : 50;
  }

  calculateFormatScore(resumeData) {
    let score = 0;
    if (resumeData.personal_info && resumeData.personal_info.name) score += 20;
    if (resumeData.professional_summary) score += 20;
    if (resumeData.experience && resumeData.experience.length > 0) score += 30;
    if (resumeData.skills) score += 20;
    if (resumeData.education) score += 10;
    return score;
  }
}

export default AIAnalyzer;
