"use client"

import React, { useState } from "react"
import GuidedQuestioningFlow from "./GuidedQuestioningFlow"
import ContactCollectionForm from "./ContactCollectionForm"
import ResumeOptionSelector from "./ResumeOptionSelector"
import EnhancedResumeDownload from "./EnhancedResumeDownload"

export const transformCompleteAssessmentData = (analysisResults: any, contactInfo: any) => {
  console.log("[v0] Transforming assessment data:", { analysisResults, contactInfo })

  // Extract skill assessment from your analysis results
  const skillAssessment = analysisResults.skillAnalysis || []

  // Transform skills into our format
  const transformedSkills = skillAssessment.map((skill: any) => ({
    name: skill.skill || skill.name || "Unknown Skill",
    yourLevel: skill.yourLevel || skill.currentLevel || 0,
    requiredLevel: skill.requiredLevel || skill.targetLevel || 0,
    category: skill.category || "general",
    evidence: skill.evidence || "",
    gap: determineGapLevel(skill),
    gapPoints: calculateGapPoints(skill),
  }))

  // Categorize skills for display
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
          achievements: analysisResults.beforeAfterExamples?.map((ex: any) => ex.after) || [],
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

const determineGapLevel = (skill: any) => {
  const difference = (skill.requiredLevel || 0) - (skill.yourLevel || 0)
  if (difference <= 1) return "Minor Gap"
  if (difference <= 3) return "Moderate Gap"
  return "Needs Development"
}

const calculateGapPoints = (skill: any) => {
  return Math.max(0, (skill.requiredLevel || 0) - (skill.yourLevel || 0))
}

const categorizeSkillsForResume = (skills: any[]) => {
  const strengths = skills.filter((skill) => skill.evidence && skill.yourLevel >= skill.requiredLevel - 1)
  const developing = skills.filter((skill) => skill.gap === "Minor Gap" || skill.gap === "Moderate Gap")
  const gaps = skills.filter((skill) => skill.gap === "Needs Development")
  return { strengths, developing, gaps }
}

// Industry Detection Function
const detectIndustry = (jobTitle: string, skills: any[]) => {
  const title = jobTitle.toLowerCase()
  const skillNames = skills.map((s) => s.name.toLowerCase()).join(" ")

  // Academic/Research indicators
  if (
    title.includes("phd") ||
    title.includes("postdoc") ||
    title.includes("research") ||
    title.includes("professor") ||
    title.includes("academic") ||
    skillNames.includes("publication") ||
    skillNames.includes("research methodology")
  ) {
    return "academic"
  }

  // Laboratory/Scientific indicators
  if (
    title.includes("analyst") ||
    title.includes("chemist") ||
    title.includes("laboratory") ||
    title.includes("scientist") ||
    skillNames.includes("gc/ms") ||
    skillNames.includes("spectroscopy") ||
    skillNames.includes("chromatography")
  ) {
    return "laboratory"
  }

  // Technology indicators
  if (
    title.includes("developer") ||
    title.includes("engineer") ||
    title.includes("software") ||
    skillNames.includes("python") ||
    skillNames.includes("javascript") ||
    skillNames.includes("aws")
  ) {
    return "technology"
  }

  // Healthcare indicators
  if (
    title.includes("nurse") ||
    title.includes("medical") ||
    title.includes("clinical") ||
    title.includes("healthcare") ||
    skillNames.includes("patient care")
  ) {
    return "healthcare"
  }

  return "business"
}

// Enhanced Business Resume Template with better AI assessment positioning
const generateBusinessResumeHTML = (transformedData: any, resumeType: string) => {
  const { user, jobAnalysis, categorizedSkills } = transformedData
  const { strengths, developing, gaps } = categorizedSkills

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${user.name} - Professional Resume</title>
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
            margin-bottom: 25px; 
        }
        .name { 
            font-size: 2.5em; 
            font-weight: bold; 
            color: #1f2937; 
            margin-bottom: 10px; 
        }
        .title { 
            font-size: 1.2em; 
            color: #4b5563; 
            margin-bottom: 15px; 
        }
        .contact { 
            font-size: 0.95em; 
            color: #6b7280; 
            margin-bottom: 5px; 
        }
        .section { 
            margin-bottom: 25px; 
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
        .professional-summary { 
            background: #f8fafc; 
            padding: 20px; 
            border-left: 4px solid #2563eb; 
            margin-bottom: 25px; 
            font-style: italic; 
            font-size: 1.05em;
        }
        .assessment-highlight { 
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); 
            border: 1px solid #bfdbfe; 
            padding: 15px; 
            border-radius: 6px; 
            margin: 15px 0; 
            text-align: center;
        }
        .assessment-title { 
            font-weight: bold; 
            color: #1e40af; 
            margin-bottom: 10px; 
            font-size: 0.9em;
        }
        .assessment-grid { 
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 10px; 
        }
        .assessment-item { 
            text-align: center; 
            background: white; 
            padding: 8px; 
            border-radius: 4px; 
        }
        .assessment-value { 
            font-size: 1.2em; 
            font-weight: bold; 
            color: #2563eb; 
        }
        .assessment-label { 
            font-size: 0.7em; 
            color: #6b7280; 
        }
        .skills-section { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
            gap: 20px; 
        }
        .skill-group { 
            background: #f9fafb; 
            padding: 15px; 
            border-radius: 6px; 
        }
        .skill-group-title { 
            font-weight: bold; 
            color: #1f2937; 
            margin-bottom: 8px; 
            font-size: 1.05em; 
        }
        .skill-list { 
            font-size: 0.9em; 
            color: #4b5563; 
        }
        .experience-entry { 
            margin-bottom: 20px; 
            padding: 15px; 
            background: #f8fafc; 
            border-radius: 6px; 
        }
        .experience-header { 
            font-weight: bold; 
            color: #1f2937; 
            font-size: 1.1em; 
        }
        .experience-details { 
            color: #4b5563; 
            font-size: 0.9em; 
            margin-bottom: 8px; 
        }
        .achievement { 
            margin-left: 15px; 
            margin-bottom: 6px; 
            position: relative; 
        }
        .achievement:before { 
            content: '•'; 
            position: absolute; 
            left: -12px; 
            color: #2563eb; 
            font-weight: bold; 
        }
        @media print { 
            body { padding: 20px; } 
            .assessment-highlight { break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${user.name}</div>
        <div class="title">${user.targetRole}</div>
        <div class="contact">${user.email}${user.phone ? ` | ${user.phone}` : ""}</div>
        ${user.location ? `<div class="contact">${user.location}</div>` : ""}
        ${user.linkedin ? `<div class="contact">${user.linkedin}</div>` : ""}
    </div>

    <div class="section">
        <div class="section-title">Professional Summary</div>
        <div class="professional-summary">
            ${user.targetRole} with demonstrated expertise and ${jobAnalysis.timeline} development timeline to reach full qualification. 
            Currently ${jobAnalysis.qualificationLevel.toLowerCase()} for target position with ${jobAnalysis.overallMatch} skill alignment. 
            ${
              strengths.length > 0
                ? `Strong competencies in ${strengths
                    .slice(0, 3)
                    .map((s: any) => s.name)
                    .join(", ")}.`
                : ""
            } 
            ${
              developing.length > 0
                ? ` Actively developing expertise in ${developing
                    .slice(0, 2)
                    .map((s: any) => s.name)
                    .join(" and ")}.`
                : ""
            }
            
            <div class="assessment-highlight">
                <div class="assessment-title">AI-Powered Skills Assessment</div>
                <div class="assessment-grid">
                    <div class="assessment-item">
                        <div class="assessment-value">${jobAnalysis.overallMatch}</div>
                        <div class="assessment-label">Skills Match</div>
                    </div>
                    <div class="assessment-item">
                        <div class="assessment-value">${jobAnalysis.qualificationLevel}</div>
                        <div class="assessment-label">Current Status</div>
                    </div>
                    <div class="assessment-item">
                        <div class="assessment-value">${jobAnalysis.timeline}</div>
                        <div class="assessment-label">Timeline</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Core Competencies</div>
        <div class="skills-section">
            ${
              strengths.length > 0
                ? `
            <div class="skill-group">
                <div class="skill-group-title">Proven Strengths</div>
                <div class="skill-list">${strengths.map((skill: any) => skill.name).join(", ")}</div>
            </div>`
                : ""
            }
            ${
              developing.length > 0
                ? `
            <div class="skill-group">
                <div class="skill-group-title">Developing Skills</div>
                <div class="skill-list">${developing.map((skill: any) => skill.name).join(", ")}</div>
            </div>`
                : ""
            }
            ${
              resumeType === "complete" && gaps.length > 0
                ? `
            <div class="skill-group">
                <div class="skill-group-title">Growth Areas</div>
                <div class="skill-list">${gaps.map((skill: any) => skill.name).join(", ")}</div>
            </div>`
                : ""
            }
        </div>
    </div>

    <div class="section">
        <div class="section-title">Professional Experience</div>
        ${user.experience
          .map(
            (job: any) => `
        <div class="experience-entry">
            <div class="experience-header">${job.title}</div>
            <div class="experience-details">${job.company}${job.location ? ` | ${job.location}` : ""} | ${job.startDate} - ${job.endDate}</div>
            <div class="experience-description">
                ${job.achievements.map((achievement: string) => `<div class="achievement">${achievement}</div>`).join("")}
            </div>
        </div>`,
          )
          .join("")}
    </div>

    <div class="section">
        <div class="section-title">Education</div>
        ${user.education
          .map(
            (edu: any) => `
        <div class="experience-entry">
            <div class="experience-header">${edu.degree}</div>
            <div class="experience-details">${edu.school} | ${edu.year}</div>
        </div>`,
          )
          .join("")}
    </div>

    ${
      jobAnalysis.actionPlan && jobAnalysis.actionPlan.length > 0
        ? `
    <div class="section">
        <div class="section-title">Professional Development Strategy</div>
        <div class="professional-summary">
            <strong>Target Timeline:</strong> ${jobAnalysis.timeline}<br><br>
            ${jobAnalysis.actionPlan
              .slice(0, 4)
              .map(
                (action: any) => `
            <div class="achievement">
                <strong>${action.priority?.toUpperCase() || "PRIORITY"}:</strong> ${action.action}
                ${action.timeline ? ` <em>(${action.timeline})</em>` : ""}
            </div>`,
              )
              .join("")}
        </div>
    </div>`
        : ""
    }

    <div style="margin-top: 30px; text-align: center; font-size: 0.8em; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 15px;">
        <p>Generated by AI Resume Builder - LaunchpadPoint.com</p>
        <p>Professional resume optimized for ${user.targetRole} positions</p>
    </div>
</body>
</html>`
}

// Enhanced resume generation with industry detection
const generateIndustrySpecificHTML = (transformedData: any, resumeType = "complete", industry = "general") => {
  const { user, jobAnalysis, categorizedSkills } = transformedData
  const { strengths, developing, gaps } = categorizedSkills

  // Detect industry from job title or skills
  const detectedIndustry = detectIndustry(user.targetRole, transformedData.skillsAnalysis || [])
  const finalIndustry = industry !== "general" ? industry : detectedIndustry

  // For now, we'll use the enhanced business template for all industries
  // Additional industry-specific templates can be added later
  return generateBusinessResumeHTML(transformedData, resumeType)
}

// Updated main resume generation function
export function generateResumeHTML(transformedData: any, resumeType = "complete", industry?: string): string {
  return generateIndustrySpecificHTML(transformedData, resumeType, industry || "general")
}

const CompleteResumeFlow = ({ analysisResults }: { analysisResults: any }) => {
  const [currentStep, setCurrentStep] = useState("contact")
  const [contactInfo, setContactInfo] = useState(null)
  const [selectedResumeType, setSelectedResumeType] = useState(null)
  const [enhancedData, setEnhancedData] = useState(null)
  const [paymentCompleted, setPaymentCompleted] = useState(false)

  // For testing, we'll use free mode
  const FREE_MODE = true

  const handleContactSubmit = (data: any) => {
    console.log("[v0] Contact submitted:", data)
    setContactInfo(data)
    setCurrentStep("options")
  }

  const handleOptionSelection = (resumeType: string, data?: any) => {
    console.log("[v0] Option selected:", resumeType, data)
    setSelectedResumeType(resumeType)

    if (resumeType === "complete") {
      setEnhancedData(data || analysisResults)
      if (FREE_MODE) {
        setCurrentStep("download")
      } else {
        setCurrentStep("payment")
      }
    } else {
      setCurrentStep("guided")
    }
  }

  const handleGuidedComplete = (data: any) => {
    console.log("[v0] Guided questioning complete:", data)
    setEnhancedData(data)
    if (FREE_MODE) {
      setCurrentStep("download")
    } else {
      setCurrentStep("payment")
    }
  }

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true)
    setCurrentStep("download")
  }

  const handleBackToOptions = () => {
    setCurrentStep("options")
    setSelectedResumeType(null)
    setEnhancedData(null)
  }

  const handleBackToContact = () => {
    setCurrentStep("contact")
    setContactInfo(null)
    setSelectedResumeType(null)
    setEnhancedData(null)
  }

  const handleBackToGuided = () => {
    setCurrentStep("guided")
    setEnhancedData(null)
  }

  const getStepNumber = () => {
    switch (currentStep) {
      case "contact":
        return 1
      case "options":
        return 2
      case "guided":
        return 3
      case "payment":
        return selectedResumeType === "complete" ? 3 : 4
      case "download":
        return selectedResumeType === "complete" ? (FREE_MODE ? 3 : 4) : FREE_MODE ? 4 : 5
      default:
        return 1
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case "contact":
        return "Contact Information"
      case "options":
        return "Choose Resume Approach"
      case "guided":
        return "Guided Enhancement"
      case "payment":
        return "Secure Payment"
      case "download":
        return "Download Resume"
      default:
        return "Get Started"
    }
  }

  const getTotalSteps = () => {
    if (selectedResumeType === "complete") {
      return FREE_MODE ? 3 : 4
    } else {
      return FREE_MODE ? 4 : 5
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-4">
              {Array.from({ length: getTotalSteps() }, (_, i) => i + 1).map((step) => (
                <React.Fragment key={step}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= getStepNumber() ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step < getStepNumber() ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step
                    )}
                  </div>
                  {step < getTotalSteps() && (
                    <div className={`w-16 h-1 ${step < getStepNumber() ? "bg-blue-600" : "bg-gray-200"}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">{getStepTitle()}</h2>
            <p className="text-gray-600">
              Step {getStepNumber()} of {getTotalSteps()}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {currentStep === "contact" && (
            <ContactCollectionForm analysisResults={analysisResults} onSubmit={handleContactSubmit} />
          )}

          {currentStep === "options" && (
            <ResumeOptionSelector
              analysisResults={analysisResults}
              contactInfo={contactInfo}
              onSelect={handleOptionSelection}
              onBack={handleBackToContact}
            />
          )}

          {currentStep === "guided" && contactInfo && selectedResumeType === "guided" && (
            <GuidedQuestioningFlow
              analysisResults={analysisResults}
              contactInfo={contactInfo}
              onComplete={handleGuidedComplete}
              onBack={handleBackToOptions}
            />
          )}

          {currentStep === "download" && (
            <EnhancedResumeDownload
              analysisResults={enhancedData || analysisResults}
              contactInfo={contactInfo}
              resumeType={selectedResumeType}
              onBack={selectedResumeType === "guided" ? handleBackToGuided : handleBackToOptions}
              paymentCompleted={paymentCompleted}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>
            Need help?{" "}
            <a href="mailto:support@launchpadpoint.com" className="text-blue-600 hover:underline">
              Contact Support
            </a>
          </p>
          {FREE_MODE && <p className="mt-2 text-yellow-600 font-medium">Testing Mode: All features enabled</p>}
        </div>
      </div>
    </div>
  )
}

export default CompleteResumeFlow
