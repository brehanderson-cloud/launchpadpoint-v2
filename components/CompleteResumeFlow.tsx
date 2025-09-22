"use client"

import React, { useState } from "react"

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

export function generateResumeHTML(transformedData: any, resumeType = "complete"): string {
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
        ${strengths
          .map(
            (skill: any) => `<span class="skill-item">${skill.name} (${skill.yourLevel}/${skill.requiredLevel})</span>`,
          )
          .join("")}
    </div>
    `
        : ""
    }

    ${
      developing.length > 0
        ? `
    <div class="section">
        <div class="section-title">Developing Skills</div>
        ${developing
          .map(
            (skill: any) =>
              `<span class="skill-item skill-developing">${skill.name} (${skill.yourLevel}/${skill.requiredLevel})</span>`,
          )
          .join("")}
    </div>
    `
        : ""
    }

    ${
      gaps.length > 0
        ? `
    <div class="section">
        <div class="section-title">Growth Areas</div>
        ${gaps
          .map(
            (skill: any) => `<span class="skill-item skill-gap">${skill.name} - Target: ${skill.requiredLevel}</span>`,
          )
          .join("")}
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
        ${user.experience[0].achievements.map((achievement: string) => `<div class="achievement">${achievement}</div>`).join("")}
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
                (action: any) => `
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

const CompleteResumeFlow = ({ analysisResults }: { analysisResults: any }) => {
  const [currentStep, setCurrentStep] = useState("contact")
  const [contactInfo, setContactInfo] = useState(null)
  const [selectedResumeType, setSelectedResumeType] = useState(null)
  const [paymentCompleted, setPaymentCompleted] = useState(false)

  // For testing, we'll use free mode
  const FREE_MODE = true

  const handleContactSubmit = (data: any) => {
    console.log("[v0] Contact submitted:", data)
    setContactInfo(data)
    setCurrentStep("options")
  }

  const handleOptionSelection = (resumeType: string) => {
    console.log("[v0] Option selected:", resumeType)
    setSelectedResumeType(resumeType)
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
  }

  const handleBackToContact = () => {
    setCurrentStep("contact")
    setContactInfo(null)
  }

  const getStepNumber = () => {
    switch (currentStep) {
      case "contact":
        return 1
      case "options":
        return 2
      case "payment":
        return 3
      case "download":
        return 4
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
      case "payment":
        return "Secure Payment"
      case "download":
        return "Download Resume"
      default:
        return "Get Started"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
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
                  {step < 4 && <div className={`w-16 h-1 ${step < getStepNumber() ? "bg-blue-600" : "bg-gray-200"}`} />}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">{getStepTitle()}</h2>
            <p className="text-gray-600">Step {getStepNumber()} of 4</p>
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

          {currentStep === "download" && (
            <EnhancedResumeDownload
              analysisResults={analysisResults}
              contactInfo={contactInfo}
              resumeType={selectedResumeType}
              onBack={handleBackToOptions}
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
          {FREE_MODE && <p className="mt-2 text-yellow-600 font-medium">Testing Mode: Payment disabled</p>}
        </div>
      </div>
    </div>
  )
}

// Contact Collection Form Component
const ContactCollectionForm = ({ analysisResults, onSubmit }: { analysisResults: any; onSubmit: any }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("[v0] Contact submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isValid = formData.name && formData.email

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Almost Ready for Your Resume!</h2>
        <p className="text-gray-600">Just a few details needed to generate your personalized, job-targeted resume.</p>

        {/* Show assessment summary */}
        <div className="mt-4 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Your Assessment Results:</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-700">Overall Match:</span>
              <div className="font-medium">{analysisResults.overallMatch || "70%"}</div>
            </div>
            <div>
              <span className="text-blue-700">Qualification Level:</span>
              <div className="font-medium">{analysisResults.qualificationLevel || "Partially qualified"}</div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="john.smith@email.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Dallas, TX"
          />
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://linkedin.com/in/johnsmith"
          />
        </div>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-medium text-lg transition-colors ${
            isValid && !isSubmitting
              ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Processing..." : "Continue to Resume Options →"}
        </button>
      </form>
    </div>
  )
}

// Resume Option Selector Component
const ResumeOptionSelector = ({ analysisResults, contactInfo, onSelect, onBack }: any) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const getRecommendation = () => {
    const overallMatch = Number.parseInt(analysisResults.overallMatch?.replace("%", "")) || 70

    if (overallMatch >= 75) {
      return {
        recommended: "complete",
        reason: "You have strong qualifications. A complete resume will showcase your readiness effectively.",
        confidence: "high",
      }
    } else {
      return {
        recommended: "complete", // Always recommend complete for now since guided isn't implemented
        reason: "A complete resume will showcase your current qualifications and provide a development plan.",
        confidence: "high",
      }
    }
  }

  const recommendation = getRecommendation()

  const handleProceed = () => {
    if (selectedOption) {
      onSelect(selectedOption)
    }
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Resume Approach</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Based on your assessment, we'll create a complete resume that showcases your strengths and includes a
          development plan.
        </p>
      </div>

      {/* Assessment Summary */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{analysisResults.overallMatch || "70%"}</div>
            <div className="text-sm text-gray-600">Skills Match</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {analysisResults.qualificationLevel || "Partially qualified"}
            </div>
            <div className="text-sm text-gray-600">Current Level</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">{analysisResults.timeline || "6-12 months"}</div>
            <div className="text-sm text-gray-600">Development Timeline</div>
          </div>
        </div>
      </div>

      {/* Complete Resume Option */}
      <div className="max-w-2xl mx-auto">
        <div
          className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200`}
          onClick={() => setSelectedOption("complete")}
        >
          <div className="absolute -top-3 left-6">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Recommended for You
            </span>
          </div>

          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center border-blue-500 bg-blue-500`}
              >
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Complete Resume</h3>
            </div>
            <div className="text-2xl">📄</div>
          </div>

          <p className="text-gray-600 mb-4">
            Generate a full resume immediately based on your assessment. All sections included with honest
            representation of your skills and a development plan.
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-700">
              <span className="text-green-600 mr-2">✓</span>
              <span>Ready to download and use immediately</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="text-green-600 mr-2">✓</span>
              <span>Shows strengths prominently</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="text-green-600 mr-2">✓</span>
              <span>Includes development plan</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="text-green-600 mr-2">✓</span>
              <span>Professional formatting</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center space-y-4 mt-8">
        <button
          onClick={() => {
            setSelectedOption("complete")
            onSelect("complete")
          }}
          className="px-8 py-4 text-lg font-medium rounded-lg transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 shadow-lg"
        >
          Generate Complete Resume
        </button>

        <div>
          <button onClick={onBack} className="text-blue-600 hover:text-blue-800 text-sm underline">
            ← Back to Contact Information
          </button>
        </div>
      </div>
    </div>
  )
}

// Enhanced Resume Download Component
const EnhancedResumeDownload = ({ analysisResults, contactInfo, resumeType = "complete", onBack }: any) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState(null)
  const [error, setError] = useState(null)

  const handleDownload = async () => {
    setIsGenerating(true)
    setDownloadStatus(null)
    setError(null)

    try {
      console.log("[v0] Generating resume with data:", { analysisResults, contactInfo, resumeType })

      // Transform the data properly
      const transformedData = transformCompleteAssessmentData(analysisResults, contactInfo)
      console.log("[v0] Transformed data:", transformedData)

      // Generate HTML resume
      const resumeHTML = generateResumeHTML(transformedData, resumeType)

      // Create and download the resume
      const blob = new Blob([resumeHTML], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${contactInfo.name.replace(/\s+/g, "_")}_Resume_${resumeType}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setDownloadStatus("success")
    } catch (error: any) {
      console.error("[v0] Download failed:", error)
      setError(error.message)
      setDownloadStatus("error")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      {/* Back Button */}
      {onBack && (
        <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Change Resume Approach
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Resume</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your full resume with all sections completed based on your assessment.
        </p>
      </div>

      {/* Assessment Summary */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h3 className="font-semibold text-blue-900 mb-4">Your Assessment Results:</h3>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{analysisResults.overallMatch || "70%"}</div>
            <div className="text-sm text-gray-600">Skills Match</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {analysisResults.qualificationLevel || "Partially qualified"}
            </div>
            <div className="text-sm text-gray-600">Current Level</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">{analysisResults.timeline || "6-12 months"}</div>
            <div className="text-sm text-gray-600">Development Timeline</div>
          </div>
        </div>
      </div>

      {/* Features List */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Included:</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "All sections completed and ready to use",
            "Honest presentation of your qualifications",
            "Skills analysis with gap identification",
            "Professional development plan included",
            "Before/after achievement examples",
          ].map((feature, index) => (
            <div key={index} className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Download Section */}
      <div className="text-center space-y-6">
        {downloadStatus === "success" && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-800 font-medium">Resume downloaded successfully!</span>
            </div>
            <p className="text-sm text-green-700 mt-2">Check your downloads folder for your new resume file.</p>
          </div>
        )}

        {downloadStatus === "error" && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-red-800 font-medium">Download failed</span>
            </div>
            <p className="text-sm text-red-700 mt-2">{error}</p>
          </div>
        )}

        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className={`px-8 py-4 text-lg font-medium rounded-lg transition-all duration-200 ${
            isGenerating
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 shadow-lg"
          }`}
        >
          {isGenerating ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating Resume...
            </>
          ) : (
            "Download Complete Resume →"
          )}
        </button>

        {downloadStatus === "success" && (
          <div className="mt-4">
            <button onClick={handleDownload} className="text-blue-600 hover:text-blue-800 text-sm underline">
              Download Again
            </button>
          </div>
        )}
      </div>

      {/* Contact Info Summary */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-2">Resume will be generated for:</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <strong>Name:</strong> {contactInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {contactInfo.email}
          </p>
          {contactInfo.phone && (
            <p>
              <strong>Phone:</strong> {contactInfo.phone}
            </p>
          )}
          {contactInfo.location && (
            <p>
              <strong>Location:</strong> {contactInfo.location}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompleteResumeFlow
