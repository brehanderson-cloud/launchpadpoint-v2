;<path
  fillRule="evenodd"
  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
  clipRule="evenodd"
/>
</svg>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900">Guided Enhancement</h3>
            </div>
            <div className="text-2xl">🔧</div>
          </div>

          <p className="text-gray-600 mb-4">
            Answer targeted questions to strengthen your resume. 
            We\'ll help you provide specific examples and quantify achievements.
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-700">
              <span className="text-blue-600 mr-2">✓</span>
              <span>5-7 targeted questions</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="text-blue-600 mr-2">✓</span>
\
              <span>Help
with specific examples
</span>
</div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Stronger final resume</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Better interview preparation</span>
            </div>
          </div>
        </div>
      </div>

{
  /* Recommendation */
}
;<div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-8">
  <div className="flex items-start">
    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 mt-0.5">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <div>
      <h4 className="font-semibold text-green-800 mb-2">
        Our Recommendation: {recommendation.recommended === "complete" ? "Complete Resume" : "Guided Enhancement"}
      </h4>
      <p className="text-sm text-green-700">{recommendation.reason}</p>
    </div>
  </div>
</div>

{
  /* Action Buttons */
}
;<div className="text-center space-y-4">
  <button
    onClick={handleProceed}
    disabled={!selectedOption}
    className={`px-8 py-4 text-lg font-medium rounded-lg transition-all duration-200 ${
      selectedOption
        ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 shadow-lg"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
  >
    {selectedOption === "complete"
      ? "Generate Complete Resume"
      : selectedOption === "guided"
        ? "Start Guided Questions"
        : "Select an Option Above"}
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

\
// Guided Questioning Component
const GuidedQuestioningFlow: React.FC<{
  analysisResults: AnalysisResults
  contactInfo: ContactInfo
  onComplete: (enhancedData: any) => void
  onBack: () => void
}> = ({ analysisResults, contactInfo, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [currentResponse, setCurrentResponse] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate questions based on gaps and missing evidence
  const generateQuestions = () => {
    const questions = []
    const skillAnalysis = analysisResults.skillAnalysis || []

    // Questions for skills with no evidence
    const skillsWithoutEvidence = skillAnalysis.filter((skill) => !skill.evidence || skill.evidence.trim() === "")
    skillsWithoutEvidence.forEach((skill) => {
      questions.push({
        id: `skill_${skill.skill}`,
        type: "skill_evidence",
        skill: skill.skill,
        question: `Tell me about a time you used ${skill.skill} in your work. What specific actions did you take and what were the results?`,
        helpText: `Even if you haven't used ${skill.skill} extensively, think about any situation where you applied similar concepts or had to learn quickly.`,
      })
    })

    // Questions for low-scoring skills (gaps)
    const gapSkills = skillAnalysis.filter((skill) => skill.requiredLevel - skill.yourLevel >= 3)
    gapSkills.forEach((skill) => {
      questions.push({
        id: `gap_${skill.skill}`,
        type: "skill_development",
        skill: skill.skill,
        question: `How have you been developing your ${skill.skill} skills? Include any training, projects, or learning experiences.`,
        helpText: `This could include courses, certifications, self-study, or any practical application you've attempted.`,
      })
    })

    // Questions for quantifying achievements
    questions.push({
      id: "quantify_achievements",
      type: "achievement_metrics",
      question:
        "Can you provide specific numbers or percentages for any of your accomplishments? Think about cost savings, efficiency improvements, team sizes, project timelines, etc.",
      helpText: "Numbers make your achievements more credible. Even estimates are better than vague statements.",
    })

    // Questions for leadership/soft skills
    const hasLeadershipGap = skillAnalysis.some(
      (skill) =>
        (skill.skill.toLowerCase().includes("management") || skill.skill.toLowerCase().includes("leadership")) &&
        skill.requiredLevel - skill.yourLevel >= 2,
    )

    if (hasLeadershipGap) {
      questions.push({
        id: "leadership_examples",
        type: "leadership",
        question:
          "Describe a situation where you had to lead others, influence decisions, or take initiative without formal authority. What was the outcome?",
        helpText: "Leadership can include mentoring colleagues, leading projects, or driving process improvements.",
      })
    }

    return questions.slice(0, 5) // Limit to 5 questions to avoid fatigue
  }

  const questions = generateQuestions()
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleNextQuestion = () => {
    if (currentResponse.trim()) {
      setResponses((prev) => ({
        ...prev,
        [currentQuestion.id]: currentResponse.trim(),
      }))
      setCurrentResponse("")

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
      } else {
        handleComplete()
      }
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setCurrentResponse(responses[questions[currentQuestionIndex - 1].id] || "")
    }
  }

  const handleComplete = async () => {
    setIsSubmitting(true)

    try {
      // Enhance the analysis data with responses
      const enhancedSkillAnalysis = (analysisResults.skillAnalysis || []).map((skill) => {
        const skillResponse = responses[`skill_${skill.skill}`]
        const gapResponse = responses[`gap_${skill.skill}`]

        return {
          ...skill,
          evidence: skillResponse || skill.evidence || "",
          developmentPlan: gapResponse || "",
          enhanced: true,
        }
      })

      // Add new achievements from quantification
      const quantifyResponse = responses["quantify_achievements"]
      const leadershipResponse = responses["leadership_examples"]

      const enhancedBeforeAfter = [
        ...(analysisResults.beforeAfterExamples || []),
        ...(quantifyResponse
          ? [
              {
                before: "General achievements mentioned",
                after: quantifyResponse,
              },
            ]
          : []),
        ...(leadershipResponse
          ? [
              {
                before: "Leadership experience",
                after: leadershipResponse,
              },
            ]
          : []),
      ]

      const enhancedData = {
        ...analysisResults,
        skillAnalysis: enhancedSkillAnalysis,
        beforeAfterExamples: enhancedBeforeAfter,
        guidedResponses: responses,
        enhanced: true,
      }

      onComplete(enhancedData)
    } catch (error) {
      console.error("Error processing guided responses:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Additional Questions Needed</h2>
        <p className="text-gray-600 mb-6">Your assessment already provides sufficient detail for a strong resume.</p>
        <button
          onClick={() => onComplete(analysisResults)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Proceed to Resume Generation
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-700">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Content */}
      <div className="mb-8">
        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-2">
            {currentQuestion.type.replace("_", " ").toUpperCase()}
          </span>
          {currentQuestion.skill && (
            <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-2 ml-2">
              {currentQuestion.skill}
            </span>
          )}
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4">{currentQuestion.question}</h2>

        <p className="text-gray-600 mb-6">{currentQuestion.helpText}</p>

        <textarea
          value={currentResponse}
          onChange={(e) => setCurrentResponse(e.target.value)}
          placeholder="Share your experience here... Be specific about actions you took and results you achieved."
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />

        <div className="mt-2 text-sm text-gray-500">
          {currentResponse.length > 0 && <span>{currentResponse.length} characters</span>}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-800 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Options
          </button>

          {currentQuestionIndex > 0 && (
            <button onClick={handlePrevQuestion} className="text-blue-600 hover:text-blue-800 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous Question
            </button>
          )}
        </div>

        <div className="flex space-x-4">
          {currentResponse.trim() && (
            <button
              onClick={() => {
                setResponses((prev) => ({
                  ...prev,
                  [currentQuestion.id]: currentResponse.trim(),
                }))
                setCurrentResponse("")
                // Skip to end
                setCurrentQuestionIndex(questions.length - 1)
              }}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              Skip Remaining Questions
            </button>
          )}

          <button
            onClick={handleNextQuestion}
            disabled={!currentResponse.trim() || isSubmitting}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentResponse.trim() && !isSubmitting
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting
              ? "Processing..."
              : currentQuestionIndex === questions.length - 1
                ? "Complete & Generate Resume"
                : "Next Question"}
          </button>
        </div>
      </div>

      {/* Current Responses Summary */}
      {Object.keys(responses).length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Your Progress ({Object.keys(responses).length} responses provided)
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(responses).map((questionId) => (
              <span
                key={questionId}
                className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded"
              >
                ✓ {questionId.replace("_", " ")}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Resume Download Component
const ResumeDownload: React.FC<{
  analysisResults: AnalysisResults
  contactInfo: ContactInfo
  resumeType?: string
  onBack: () => void
}> = ({ analysisResults, contactInfo, resumeType = "complete", onBack }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    setIsGenerating(true)
    setDownloadStatus(null)
    setError(null)

    try {
      console.log("Generating resume with data:", { analysisResults, contactInfo, resumeType })

      // Transform the data
      const transformedData = transformCompleteAssessmentData(analysisResults, contactInfo)
      console.log("Transformed data:", transformedData)

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
    } catch (error) {
      console.error("Download failed:", error)
      setError(error instanceof Error ? error.message : "Unknown error")
      setDownloadStatus("error")
    } finally {
      setIsGenerating(false)
    }
  }

  const getResumeTypeInfo = () => {
    if (resumeType === "complete") {
      return {
        title: "Complete Resume",
        description: "Your full resume with all sections completed based on your assessment.",
        icon: "📄",
      }
    } else {
      return {
        title: "Enhanced Resume",
        description: "Your resume enhanced with guided responses and specific examples.",
        icon: "🔧",
      }
    }
  }

  const resumeInfo = getResumeTypeInfo()

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Previous Step
      </button>

      <div className="text-center mb-8">
        <div className="text-4xl mb-4">{resumeInfo.icon}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your {resumeInfo.title} is Ready</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{resumeInfo.description}</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Based on Your Assessment:</h3>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{analysisResults.overallMatch || "70%"}</div>
            <div className="text-sm text-gray-600">Skills Match</div>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="text-lg font-semibold text-gray-900">
              {analysisResults.qualificationLevel || "Partially qualified"}
            </div>
            <div className="text-sm text-gray-600">Current Level</div>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="text-lg font-semibold text-gray-900">{analysisResults.timeline || "6-12 months"}</div>
            <div className="text-sm text-gray-600">Development Timeline</div>
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className={`inline-flex items-center px-8 py-4 text-lg font-medium rounded-lg transition-all duration-200 ${
            isGenerating
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 shadow-lg hover:shadow-xl"
          }`}
        >
          {isGenerating ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
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
              Generating Your Resume...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download {resumeInfo.title}
            </>
          )}
        </button>
      </div>

      {downloadStatus === "success" && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-800 font-medium">Resume downloaded successfully!</span>
          </div>
          <p className="text-green-700 text-sm">Your resume includes your assessment results and is ready to use.</p>
        </div>
      )}

      {downloadStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-red-800 font-medium">Download failed</span>
          </div>
          <p className="text-red-700 text-sm mb-3">
            {error || "Please try again. If the problem persists, contact support."}
          </p>
          <button onClick={handleDownload} className="text-sm text-red-600 hover:text-red-800 underline">
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}

// Main Flow Controller
const CompleteResumeFlow: React.FC<CompleteResumeFlowProps> = ({ analysisResults }) => {
  const [currentStep, setCurrentStep] = useState("contact")
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [selectedResumeType, setSelectedResumeType] = useState<string | null>(null)
  const [enhancedData, setEnhancedData] = useState<any>(null)

  const handleContactSubmit = (data: ContactInfo) => {
    console.log("Contact submitted:", data)
    setContactInfo(data)
    setCurrentStep("options")
  }

  const handleOptionSelection = (resumeType: string, data?: any) => {
    console.log("Option selected:", resumeType, data)
    setSelectedResumeType(resumeType)

    if (resumeType === "complete") {
      setEnhancedData(data || analysisResults)
      setCurrentStep("download")
    } else {
      setCurrentStep("guided")
    }
  }

  const handleGuidedComplete = (data: any) => {
    console.log("Guided questioning complete:", data)
    setEnhancedData(data)
    setCurrentStep("download")
  }

  const handleBackToContact = () => {
    setCurrentStep("contact")
    setContactInfo(null)
    setSelectedResumeType(null)
    setEnhancedData(null)
  }

  const handleBackToOptions = () => {
    setCurrentStep("options")
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
      case "download":
        return selectedResumeType === "complete" ? 3 : 4
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
      case "download":
        return "Download Resume"
      default:
        return "Get Started"
    }
  }

  const getTotalSteps = () => {
    return selectedResumeType === "complete" ? 3 : 4
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

          {currentStep === "options" && contactInfo && (
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

          {currentStep === "download" && contactInfo && enhancedData && (
            <ResumeDownload
              analysisResults={enhancedData}
              contactInfo={contactInfo}
              resumeType={selectedResumeType || "complete"}
              onBack={selectedResumeType === "guided" ? handleBackToGuided : handleBackToOptions}
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
          <p className="mt-2 text-yellow-600 font-medium">Testing Mode: All features enabled</p>
        </div>
      </div>
    </div>
  )
}

export default CompleteResumeFlow
;("use client")

import React, { useState } from "react"

// All interfaces
interface AnalysisResults {
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

interface ContactInfo {
  name: string
  email: string
  phone: string
  location: string
  linkedin: string
}

interface CompleteResumeFlowProps {
  analysisResults: AnalysisResults
}

// Data transformation functions
const transformCompleteAssessmentData = (analysisResults: AnalysisResults, contactInfo: ContactInfo) => {
  console.log("Transforming assessment data:", { analysisResults, contactInfo })

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
          achievements: analysisResults.beforeAfterExamples?.map((ex) => ex.after) || [
            "Achievement to be detailed based on assessment",
          ],
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

// HTML Resume Generator
const generateResumeHTML = (transformedData: any, resumeType = "complete") => {
  const { user, jobAnalysis, categorizedSkills } = transformedData
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
            margin-top: 10px; 
        }
        .plan-item { 
            margin-bottom: 8px; 
            font-size: 0.95em; 
        }
        .priority-high { color: #dc2626; font-weight: bold; }
        .priority-medium { color: #ea580c; }
        .priority-low { color: #059669; }
        .enhanced-section {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 15px;
            margin: 10px 0;
            border-radius: 6px;
        }
        .enhanced-label {
            font-size: 0.8em;
            color: #3b82f6;
            font-weight: bold;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${user.name}</div>
        <div class="contact">${user.email}${user.phone ? ` | ${user.phone}` : ""}</div>
        ${user.location ? `<div class="contact">${user.location}</div>` : ""}
        ${user.linkedin ? `<div class="contact">${user.linkedin}</div>` : ""}
    </div>

    <div class="assessment-summary">
        <h3 style="margin-bottom: 15px; color: #1e40af;">AI Assessment Results</h3>
        <div class="assessment-grid">
            <div class="assessment-item">
                <div class="assessment-value">${jobAnalysis.overallMatch}</div>
                <div class="assessment-label">Skills Match</div>
            </div>
            <div class="assessment-item">
                <div class="assessment-value" style="font-size: 1.2em;">${jobAnalysis.qualificationLevel}</div>
                <div class="assessment-label">Current Level</div>
            </div>
            <div class="assessment-item">
                <div class="assessment-value" style="font-size: 1.2em;">${jobAnalysis.timeline}</div>
                <div class="assessment-label">Development Timeline</div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Professional Summary</div>
        <div>
            ${user.targetRole} with demonstrated experience and skills relevant to the target role. 
            Currently ${jobAnalysis.qualificationLevel.toLowerCase()} with a ${jobAnalysis.timeline} development timeline. 
            ${
              developing.length > 0
                ? `Strong capabilities in ${developing
                    .slice(0, 2)
                    .map((s: any) => s.name)
                    .join(" and ")}.`
                : ""
            }
            ${
              gaps.length > 0
                ? ` Developing expertise in ${gaps
                    .slice(0, 2)
                    .map((s: any) => s.name)
                    .join(" and ")}.`
                : ""
            }
        </div>
    </div>

    <div class="section">
        <div class="section-title">Skills & Expertise</div>
        ${
          strengths.length > 0
            ? `
        <div style="margin-bottom: 15px;">
            <h4 style="font-weight: bold; margin-bottom: 8px; color: #059669;">✓ Core Strengths</h4>
            ${strengths.map((skill: any) => `<span class="skill-item" style="background: #dcfce7; color: #166534;">${skill.name} (${skill.yourLevel}/${skill.requiredLevel})</span>`).join("")}
        </div>`
            : ""
        }
        
        ${
          developing.length > 0
            ? `
        <div style="margin-bottom: 15px;">
            <h4 style="font-weight: bold; margin-bottom: 8px; color: #ea580c;">⚡ Developing Skills</h4>
            ${developing.map((skill: any) => `<span class="skill-item skill-developing">${skill.name} (${skill.yourLevel}/${skill.requiredLevel})</span>`).join("")}
        </div>`
            : ""
        }
        
        ${
          resumeType === "complete" && gaps.length > 0
            ? `
        <div style="margin-bottom: 15px;">
            <h4 style="font-weight: bold; margin-bottom: 8px; color: #dc2626;">📈 Growth Areas</h4>
            ${gaps.map((skill: any) => `<span class="skill-item skill-gap">${skill.name} (Target: ${skill.requiredLevel})</span>`).join("")}
        </div>`
            : ""
        }
    </div>

    <div class="section">
        <div class="section-title">Professional Experience</div>
        ${user.experience
          .map(
            (job: any) => `
        <div style="margin-bottom: 25px;">
            <h4 style="font-size: 1.2em; font-weight: bold; margin-bottom: 5px;">${job.title}</h4>
            <div style="color: #6b7280; margin-bottom: 10px;">${job.company}${job.location ? ` | ${job.location}` : ""} | ${job.startDate} - ${job.endDate}</div>
            ${job.achievements.map((achievement: string) => `<div class="achievement">${achievement}</div>`).join("")}
        </div>`,
          )
          .join("")}
    </div>

    <div class="section">
        <div class="section-title">Education</div>
        ${user.education
          .map(
            (edu: any) => `
        <div style="margin-bottom: 10px;">
            ${edu.degree} - ${edu.school} (${edu.year})
        </div>`,
          )
          .join("")}
    </div>

    ${
      jobAnalysis.actionPlan && jobAnalysis.actionPlan.length > 0
        ? `
    <div class="section">
        <div class="section-title">Professional Development Plan</div>
        <div class="development-plan">
            <div style="font-weight: bold; margin-bottom: 15px;">Target Timeline: ${jobAnalysis.timeline}</div>
            ${jobAnalysis.actionPlan
              .slice(0, 4)
              .map(
                (action: any) => `
            <div class="plan-item priority-${action.priority}">
                ${action.priority?.toUpperCase()}: ${action.action}
                ${action.timeline ? ` (${action.timeline})` : ""}
            </div>`,
              )
              .join("")}
        </div>
    </div>`
        : ""
    }

    <div style="margin-top: 40px; text-align: center; font-size: 0.9em; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        <p>Generated by AI Resume Builder - LaunchpadPoint.com</p>
        <p>This resume was optimized using AI analysis to match your target job requirements.</p>
        <p style="margin-top: 10px; font-style: italic;">Resume Type: ${resumeType === "complete" ? "Complete Assessment-Based Resume" : "Enhanced with Guided Responses"}</p>
    </div>
</body>
</html>`
}

// Contact Collection Form Component
const ContactCollectionForm: React.FC<{
  analysisResults: AnalysisResults
  onSubmit: (data: ContactInfo) => void
}> = ({ analysisResults, onSubmit }) => {
  const [formData, setFormData] = useState<ContactInfo>({
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
      console.log("Submitting contact data:", formData)
      await onSubmit(formData)
    } catch (error) {
      console.error("Contact submission error:", error)
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
const ResumeOptionSelector: React.FC<{
  analysisResults: AnalysisResults;
  contactInfo: ContactInfo;
  onSelect: (resumeType: string, data?: any) => void;
  onBack: () => void;
}> = ({ analysisResults, contactInfo, onSelect, onBack }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const getRecommendation = () => {
    const overallMatch = Number.parseInt(analysisResults.overallMatch?.replace('%', '')) || 70;
    const skillAnalysis = analysisResults.skillAnalysis || [];
    const hasEvidenceGaps = skillAnalysis.some(skill => !skill.evidence || skill.evidence.trim() === '');
    
    if (overallMatch >= 75 && !hasEvidenceGaps) {
      return {
        recommended: 'complete',
        reason: 'You have strong qualifications and evidence for most required skills. A complete resume will showcase your readiness effectively.',
        confidence: 'high'
      };
    } else {
      return {
        recommended: 'guided',
        reason: 'A guided approach will help you provide specific examples and strengthen areas where evidence is missing.',
        confidence: 'high'
      };
    }
  };

  const recommendation = getRecommendation();

  const handleProceed = () => {
    if (selectedOption) {
      if (selectedOption === 'complete') {
        onSelect('complete', analysisResults);
      } else {
        onSelect('guided');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Resume Approach
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Based on your assessment, we can create your resume in two ways. 
          We'll recommend the best approach for your situation.
        </p>
      </div>

      {/* Assessment Summary */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {analysisResults.overallMatch || '70%'}
            </div>
            <div className="text-sm text-gray-600">Skills Match</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {analysisResults.qualificationLevel || 'Partially qualified'}
            </div>
            <div className="text-sm text-gray-600">Current Level</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {analysisResults.timeline || '6-12 months'}
            </div>
            <div className="text-sm text-gray-600">Development Timeline</div>
          </div>
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        
        {/* Complete Resume Option */}
        <div 
          className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedOption === 'complete' 
              ? 'border-blue-500 bg-blue-50 shadow-lg' 
              : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
          } ${
            recommendation.recommended === 'complete' ? 'ring-2 ring-blue-200' : ''
          }`}
          onClick={() => setSelectedOption('complete')}
        >
          {recommendation.recommended === 'complete' && (
            <div className="absolute -top-3 left-6">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Recommended for You
              </span>
            </div>
          )}

          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                selectedOption === 'complete' 
                  ? 'border-blue-500 bg-blue-500' 
                  : 'border-gray-300'
              }`}>
                {selectedOption === 'complete' && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900">Complete Resume</h3>
            </div>
            <div className="text-2xl">📄</div>
          </div>

          <p className="text-gray-600 mb-4">
            Generate a full resume immediately based on your current assessment. 
            Uses existing information without additional questions.
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-700">
              <span className="text-green-600 mr-2">✓</span>
              <span>Ready to download immediately</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="text-green-600 mr-2">✓</span>
              <span>Uses current assessment data</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="text-green-600 mr-2">✓</span>
              <span>Professional formatting</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="text-green-600 mr-2">✓</span>
              <span>Development plan included</span>
            </div>
          </div>
        </div>

        {/* Guided Resume Option */}
        <div 
          className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedOption === 'guided' 
              ? 'border-blue-500 bg-blue-50 shadow-lg' 
              : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
          } ${
            recommendation.recommended === 'guided' ? 'ring-2 ring-blue-200' : ''
          }`}
          onClick={() => setSelectedOption('guided')}
        >
          {recommendation.recommended === 'guided' && (
            <div className="absolute -top-3 left-6">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Recommended for You
              </span>
            </div>
          )}

          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                selectedOption === 'guided' 
                  ? 'border-blue-500 bg-blue-500' 
                  : 'border-gray-300'
              }`}>
                {selectedOption === 'guided' && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenod\
