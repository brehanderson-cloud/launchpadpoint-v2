export interface AnalysisResults {
  overallMatch: string
  qualificationLevel: string
  timeline: string
  jobTitle: string
  skillAnalysis?: Array<{
    skill: string
    yourLevel: number
    requiredLevel: number
    evidence: string
    category: string
  }>
  beforeAfterExamples?: Array<{
    before: string
    after: string
  }>
  actionPlan?: Array<{
    action: string
    priority: string
    timeline: string
  }>
}

export interface ContactInfo {
  name: string
  email: string
  phone?: string
  location?: string
  linkedin?: string
}

export interface TransformedData {
  user: {
    name: string
    email: string
    phone: string
    location: string
    linkedin: string
    targetRole: string
    experience: Array<{
      title: string
      company: string
      location: string
      startDate: string
      endDate: string
      achievements: string[]
      description: string
    }>
    education: Array<{
      degree: string
      school: string
      year: string
      field: string
    }>
  }
  jobAnalysis: {
    qualificationLevel: string
    timeline: string
    targetRole: string
    overallMatch: string
    actionPlan: Array<{
      action: string
      priority: string
      timeline: string
    }>
    beforeAfterExamples: Array<{
      before: string
      after: string
    }>
  }
  skillsAnalysis: Array<{
    name: string
    yourLevel: number
    requiredLevel: number
    category: string
    evidence: string
    gap: string
    gapPoints: number
  }>
  categorizedSkills: {
    strengths: any[]
    developing: any[]
    gaps: any[]
  }
}

export function transformCompleteAssessmentData(
  analysisResults: AnalysisResults,
  contactInfo: ContactInfo,
): TransformedData {
  console.log("[v0] Transforming assessment data:", { analysisResults, contactInfo })

  const skillAssessment = analysisResults.skillAnalysis || []

  const transformedSkills = skillAssessment.map((skill) => ({
    name: skill.skill || "Unknown Skill",
    yourLevel: skill.yourLevel || 0,
    requiredLevel: skill.requiredLevel || 0,
    category: skill.category || "general",
    evidence: skill.evidence || "",
    gap: determineGapLevel(skill),
    gapPoints: calculateGapPoints(skill),
  }))

  const { strengths, developing, gaps } = categorizeSkillsForResume(transformedSkills)

  return {
    user: {
      name: contactInfo.name,
      email: contactInfo.email,
      phone: contactInfo.phone || "",
      location: contactInfo.location || "",
      linkedin: contactInfo.linkedin || "",
      targetRole: analysisResults.jobTitle || "Professional",
      experience: [
        {
          title: "Current Position",
          company: "Current Company",
          location: "",
          startDate: "2020",
          endDate: "Present",
          achievements: analysisResults.beforeAfterExamples?.map((ex) => ex.after) || [],
          description: "",
        },
      ],
      education: [
        {
          degree: "Degree",
          school: "Institution",
          year: "Year",
          field: "",
        },
      ],
    },
    jobAnalysis: {
      qualificationLevel: analysisResults.qualificationLevel || "Partially qualified",
      timeline: analysisResults.timeline || "6-12 months",
      targetRole: analysisResults.jobTitle || "Professional",
      overallMatch: analysisResults.overallMatch || "70%",
      actionPlan: analysisResults.actionPlan || [],
      beforeAfterExamples: analysisResults.beforeAfterExamples || [],
    },
    skillsAnalysis: transformedSkills,
    categorizedSkills: { strengths, developing, gaps },
  }
}

function determineGapLevel(skill: any): string {
  const difference = (skill.requiredLevel || 0) - (skill.yourLevel || 0)
  if (difference <= 1) return "Minor Gap"
  if (difference <= 3) return "Moderate Gap"
  return "Needs Development"
}

function calculateGapPoints(skill: any): number {
  return Math.max(0, (skill.requiredLevel || 0) - (skill.yourLevel || 0))
}

function categorizeSkillsForResume(skills: any[]) {
  const strengths = skills.filter((skill) => skill.evidence && skill.yourLevel >= skill.requiredLevel - 1)
  const developing = skills.filter((skill) => skill.gap === "Minor Gap" || skill.gap === "Moderate Gap")
  const gaps = skills.filter((skill) => skill.gap === "Needs Development")
  return { strengths, developing, gaps }
}

export function generateResumeHTML(transformedData: TransformedData, resumeType = "complete"): string {
  const { user, jobAnalysis, skillsAnalysis, categorizedSkills } = transformedData
  const { strengths, developing, gaps } = categorizedSkills

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${user.name} - Resume</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 40px 20px; 
            background: #fff;
        }
        .header { 
            text-align: center; 
            border-bottom: 3px solid #2563eb; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
        }
        .name { 
            font-size: 2.5em; 
            font-weight: bold; 
            color: #1f2937; 
            margin-bottom: 10px; 
        }
        .contact { 
            font-size: 1em; 
            color: #6b7280; 
            margin-bottom: 5px; 
        }
        .section { 
            margin-bottom: 30px; 
        }
        .section-title { 
            font-size: 1.3em; 
            font-weight: bold; 
            color: #1f2937; 
            text-transform: uppercase; 
            border-bottom: 2px solid #e5e7eb; 
            padding-bottom: 5px; 
            margin-bottom: 15px; 
            letter-spacing: 0.5px; 
        }
        .assessment-summary { 
            background: #eff6ff; 
            border: 1px solid #bfdbfe; 
            padding: 20px; 
            border-radius: 8px; 
            margin-bottom: 30px; 
        }
        .assessment-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
            gap: 15px; 
            margin-top: 15px; 
        }
        .assessment-item { 
            text-align: center; 
        }
        .assessment-value { 
            font-size: 1.5em; 
            font-weight: bold; 
            color: #2563eb; 
        }
        .assessment-label { 
            font-size: 0.9em; 
            color: #6b7280; 
        }
        .skill-item { 
            background: #f3f4f6; 
            padding: 5px 10px; 
            border-radius: 4px; 
            font-size: 0.9em; 
            color: #374151; 
            margin: 4px; 
            display: inline-block;
        }
        .skill-developing { 
            background: #fef3c7; 
            color: #92400e; 
        }
        .skill-gap { 
            background: #fee2e2; 
            color: #991b1b; 
        }
        .achievement { 
            margin-left: 20px; 
            margin-bottom: 8px; 
            position: relative; 
        }
        .achievement:before { 
            content: '•'; 
            position: absolute; 
            left: -15px; 
            color: #2563eb; 
            font-weight: bold;
        }
        .development-plan { 
            background: #f0f9ff; 
            border-left: 4px solid #0ea5e9; 
            padding: 15px; 
            margin-top: 20px; 
        }
        .priority-high { 
            color: #dc2626; 
            font-weight: bold; 
        }
        .priority-medium { 
            color: #d97706; 
        }
        .priority-low { 
            color: #059669; 
        }
        @media print { 
            body { padding: 20px; } 
            .assessment-summary { break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${user.name}</div>
        <div class="contact">${user.email}</div>
        ${user.phone ? `<div class="contact">${user.phone}</div>` : ""}
        ${user.location ? `<div class="contact">${user.location}</div>` : ""}
        ${user.linkedin ? `<div class="contact">${user.linkedin}</div>` : ""}
    </div>

    <div class="assessment-summary">
        <h3 style="color: #1f2937; margin-bottom: 10px;">AI Assessment Summary</h3>
        <div class="assessment-grid">
            <div class="assessment-item">
                <div class="assessment-value">${jobAnalysis.overallMatch}</div>
                <div class="assessment-label">Overall Match</div>
            </div>
            <div class="assessment-item">
                <div class="assessment-value">${jobAnalysis.qualificationLevel}</div>
                <div class="assessment-label">Qualification Level</div>
            </div>
            <div class="assessment-item">
                <div class="assessment-value">${jobAnalysis.timeline}</div>
                <div class="assessment-label">Development Timeline</div>
            </div>
        </div>
    </div>

    ${
      strengths.length > 0
        ? `
    <div class="section">
        <div class="section-title">Core Strengths</div>
        ${strengths.map((skill) => `<span class="skill-item">${skill.name} (${skill.yourLevel}/${skill.requiredLevel})</span>`).join("")}
    </div>
    `
        : ""
    }

    ${
      developing.length > 0
        ? `
    <div class="section">
        <div class="section-title">Developing Skills</div>
        ${developing.map((skill) => `<span class="skill-item skill-developing">${skill.name} (${skill.yourLevel}/${skill.requiredLevel})</span>`).join("")}
    </div>
    `
        : ""
    }

    ${
      gaps.length > 0
        ? `
    <div class="section">
        <div class="section-title">Growth Areas</div>
        ${gaps.map((skill) => `<span class="skill-item skill-gap">${skill.name} - Target: ${skill.requiredLevel}</span>`).join("")}
    </div>
    `
        : ""
    }

    ${
      user.experience[0].achievements.length > 0
        ? `
    <div class="section">
        <div class="section-title">Professional Experience</div>
        <h4 style="font-weight: bold; margin-bottom: 10px;">${user.experience[0].title} | ${user.experience[0].company}</h4>
        <p style="color: #6b7280; margin-bottom: 10px;">${user.experience[0].startDate} - ${user.experience[0].endDate}</p>
        ${user.experience[0].achievements.map((achievement) => `<div class="achievement">${achievement}</div>`).join("")}
    </div>
    `
        : ""
    }

    ${
      jobAnalysis.actionPlan.length > 0
        ? `
    <div class="section">
        <div class="section-title">Development Plan</div>
        <div class="development-plan">
            <h4 style="margin-bottom: 10px;">Recommended Actions:</h4>
            ${jobAnalysis.actionPlan
              .map(
                (action) => `
                <div style="margin-bottom: 10px;">
                    <span class="priority-${action.priority.toLowerCase()}">[${action.priority.toUpperCase()}]</span>
                    ${action.action} <em>(${action.timeline})</em>
                </div>
            `,
              )
              .join("")}
        </div>
    </div>
    `
        : ""
    }

    <div class="section">
        <div class="section-title">Generated by AI Resume Builder</div>
        <p><em>This resume was optimized using AI analysis to match your target job requirements. Generated on ${new Date().toLocaleDateString()}.</em></p>
    </div>
</body>
</html>`
}
