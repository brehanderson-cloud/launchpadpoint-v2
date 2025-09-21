"use client"
import { useState, useEffect } from "react"
import { useTheme } from "./theme-provider"
import type { ParsedResumeData } from "@/lib/resume-parser"
import ErrorBoundary from "./error-boundary"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Button } from "@/components/ui/button"
import AIChatAssistant from "./ai-chat-assistant"
import StepByStepAnalysis from "./step-by-step-analysis"
import LearningFeedbackSystem from "./learning-feedback-system"
import VerificationDialog from "./verification-dialog"

const EnhancedResumeBuilder = () => {
  const { darkMode, toggleTheme } = useTheme()
  const [currentStep, setCurrentStep] = useState("landing")
  const [uploadedResume, setUploadedResume] = useState<File | null>(null)
  const [resumeText, setResumeText] = useState("")
  const [resumeInputMethod, setResumeInputMethod] = useState("paste")
  const [jobDescription, setJobDescription] = useState("")
  const [jobInputMethod, setJobInputMethod] = useState("paste")
  const [resumeData, setResumeData] = useState<ParsedResumeData | null>(null)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiEnhancements, setAiEnhancements] = useState<any>(null)
  const [showVerificationDialog, setShowVerificationDialog] = useState(false)
  const [currentImprovement, setCurrentImprovement] = useState<any>(null)
  const [useStepByStep, setUseStepByStep] = useState(true)
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)
  const [showSuccessTracker, setShowSuccessTracker] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [analysisError, setAnalysisError] = useState<Error | null>(null)
  const [timeoutError, setTimeoutError] = useState(false)
  const [hasCredits, setHasCredits] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [creditsRemaining, setCreditsRemaining] = useState(0)
  const [showAIChat, setShowAIChat] = useState(false)
  const [showStepByStep, setShowStepByStep] = useState(false)
  const [showLearningFeedback, setShowLearningFeedback] = useState(false)

  const [savedProgress, setSavedProgress, removeSavedProgress, isLoadingProgress] = useLocalStorage(
    "resume-builder-progress",
    null,
  )

  const runComprehensiveTest = async () => {
    console.log("[v0] Starting comprehensive test of analysis flow...")

    try {
      // Add test data first
      const testResumeData = {
        personalInfo: {
          fullName: "Herbert Essien, SHRM-CP",
          email: "Herbertessien01@gmail.com",
          phone: "(346) 530-3020",
          location: "North America",
        },
        summary:
          "Results-driven Talent Acquisition Business Partner & HR Manager with expertise in strategic workforce planning, recruitment, and HR operations across North America. Proven track record in reducing time-to-fill by 25%, enhancing candidate quality by 30%, and driving HR process improvements that optimize talent strategies.",
        experience: [
          {
            company: "AkzoNobel",
            position: "TA Business Partner / HR Manager",
            duration: "09/2021 – Present",
            responsibilities: [
              "Led end-to-end recruitment strategies that decreased time-to-fill by 25% and improved offer acceptance rates to 95%",
              "Partnered with 50+ hiring managers to align hiring strategies with evolving workforce needs across North America",
            ],
          },
        ],
        skills: ["Talent Acquisition", "Workforce Planning", "HR Operations", "SuccessFactors"],
        education: [
          {
            degree: "Bachelor of Science, Sport Administration",
            school: "Louisiana State University",
            year: "December 2013",
          },
        ],
      }

      const testJobDescription = `Director, Talent Acquisition
NRG Energy, Inc
Houston, TX (Hybrid)

We're looking for a dynamic Director of Talent Acquisition to lead our high-volume recruiting efforts.

What You'll Bring:
- Bachelor's degree in HR, Business, or related field, with 10+ years in talent acquisition
- 5+ years in high-volume recruiting
- Experience with ATS (SuccessFactors) systems
- Team management experience
- Data analysis skills`

      console.log("[v0] Setting test data...")
      setResumeData(testResumeData)
      setResumeText(JSON.stringify(testResumeData, null, 2))
      setJobDescription(testJobDescription.trim())
      setCurrentStep("analysis")

      // Clear any previous errors
      setAnalysisError(null)
      setTimeoutError(false)

      // Wait a moment for state to update
      await new Promise((resolve) => setTimeout(resolve, 100))

      console.log("[v0] Starting real analysis with test data...")
      await performRealAnalysis(JSON.stringify(testResumeData, null, 2), testJobDescription.trim())
    } catch (error) {
      console.error("[v0] Comprehensive test failed:", error)
      setAnalysisError(error instanceof Error ? error : new Error("Test failed"))
      setCurrentStep("analysis")
    }
  }

  const performRealAnalysis = async (resumeText: string, jobDescription: string) => {
    console.log("[v0] Starting real API analysis...")
    console.log("[v0] Resume text length:", resumeText.length)
    console.log("[v0] Job description length:", jobDescription.length)

    setIsAnalyzing(true)
    setAnalysisError(null)
    setTimeoutError(false)

    try {
      // Step 1: Analyze job description with salary insights
      console.log("[v0] Calling job analysis API...")
      const jobResponse = await fetch("/api/analyze-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription,
          includeSalaryAnalysis: true,
          includeMarketData: true,
        }),
      })

      console.log("[v0] Job analysis response status:", jobResponse.status)

      if (!jobResponse.ok) {
        const errorText = await jobResponse.text()
        console.error("[v0] Job analysis failed:", errorText)
        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch {
          errorData = { error: errorText }
        }
        throw new Error(errorData.error || `Job analysis failed: ${jobResponse.status}`)
      }

      const jobAnalysis = await jobResponse.json()
      console.log("[v0] Job analysis completed:", jobAnalysis)

      // Step 2: Analyze qualifications with comprehensive gap analysis
      console.log("[v0] Calling qualifications analysis API...")
      const qualificationsResponse = await fetch("/api/analyze-qualifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
          includeGapAnalysis: true,
          includeSalaryImpact: true,
          includeClickableExamples: true,
        }),
      })

      console.log("[v0] Qualifications analysis response status:", qualificationsResponse.status)

      if (!qualificationsResponse.ok) {
        const errorText = await qualificationsResponse.text()
        console.error("[v0] Qualifications analysis failed:", errorText)
        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch {
          errorData = { error: errorText }
        }
        throw new Error(errorData.error || `Qualifications analysis failed: ${qualificationsResponse.status}`)
      }

      const qualificationsAnalysis = await qualificationsResponse.json()
      console.log("[v0] Qualifications analysis completed:", qualificationsAnalysis)

      // Combine results with enhanced data
      const combinedResults = {
        matchPercentage: Math.round(
          (qualificationsAnalysis.skillsMatch +
            qualificationsAnalysis.experienceMatch +
            qualificationsAnalysis.educationMatch) /
            3,
        ),
        jobAnalysis,
        qualificationsAnalysis,
        resumeScore: {
          score: Math.round(
            (qualificationsAnalysis.skillsMatch +
              qualificationsAnalysis.experienceMatch +
              qualificationsAnalysis.educationMatch) /
              3,
          ),
        },
        salaryInsights: {
          currentRange: qualificationsAnalysis.salaryInsights?.currentRange || "Not available",
          potentialRange: qualificationsAnalysis.salaryInsights?.potentialRange || "Not available",
          gapValue: qualificationsAnalysis.salaryInsights?.gapValue || 0,
          improvementActions: qualificationsAnalysis.salaryInsights?.improvementActions || [],
        },
      }

      console.log("[v0] Combined analysis results:", combinedResults)

      setAnalysisResults(combinedResults)
      setAiEnhancements({
        suggestions: qualificationsAnalysis.beforeAfterExamples || [],
        clickableImprovements: qualificationsAnalysis.clickableImprovements || [],
      })

      console.log("[v0] Real API analysis completed successfully")
    } catch (error) {
      console.error("[v0] Analysis error:", error)
      setAnalysisError(error instanceof Error ? error : new Error("Analysis failed"))

      if (error instanceof Error && error.message.includes("timeout")) {
        setTimeoutError(true)
      }
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleStepByStepComplete = (results: any) => {
    console.log("[v0] Step-by-step analysis completed:", results)
    setAnalysisResults(results)
    setShowStepByStep(false)
    setCurrentStep("analysis")
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId") || `user_${Date.now()}`
    localStorage.setItem("userId", userId)

    const storedCredits = localStorage.getItem(`credits_${userId}`)
    if (storedCredits && Number.parseInt(storedCredits) > 0) {
      setHasCredits(true)
      setCreditsRemaining(Number.parseInt(storedCredits))
    } else if (!storedCredits) {
      // New user - give 3 free credits
      const freeCredits = 3
      localStorage.setItem(`credits_${userId}`, freeCredits.toString())
      setHasCredits(true)
      setCreditsRemaining(freeCredits)
      console.log("[v0] New user detected - granted 3 free credits")
    } else {
      // Existing user with 0 credits
      setHasCredits(false)
      setCreditsRemaining(0)
    }
  }, [])

  const LandingPage = () => (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h1 className={`text-4xl md:text-5xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
          AI Resume Builder
        </h1>
        <p className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}>
          Get honest, AI-powered analysis of your resume against job descriptions. Improve your chances with data-driven
          insights.
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => setCurrentStep("upload")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          aria-label="Start AI analysis process"
        >
          Start AI Analysis
        </button>

        <div className="text-sm text-gray-500">Upload your resume and job description to get started</div>
      </div>
    </div>
  )

  const UploadInterface = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Upload Your Documents
        </h2>
        <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Provide your resume and the job description you're targeting
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div
          className={`p-6 rounded-lg border-2 border-dashed ${darkMode ? "border-gray-600 bg-gray-800" : "border-gray-300 bg-white"}`}
        >
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Your Resume</h3>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here..."
            className={`w-full h-64 p-4 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"} resize-none`}
            aria-label="Resume text input"
          />
        </div>

        <div
          className={`p-6 rounded-lg border-2 border-dashed ${darkMode ? "border-gray-600 bg-gray-800" : "border-gray-300 bg-white"}`}
        >
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Job Description</h3>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className={`w-full h-64 p-4 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"} resize-none`}
            aria-label="Job description text input"
          />
        </div>
      </div>

      <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Choose Analysis Method
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              useStepByStep
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : darkMode
                  ? "border-gray-600 hover:border-gray-500"
                  : "border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => setUseStepByStep(true)}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  useStepByStep ? "border-blue-500 bg-blue-500" : "border-gray-400"
                }`}
              >
                {useStepByStep && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
              </div>
              <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Step-by-Step Analysis</h4>
            </div>
            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Progressive analysis with detailed insights for each section (Skills, Experience, Education, Summary)
            </p>
          </div>

          <div
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              !useStepByStep
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : darkMode
                  ? "border-gray-600 hover:border-gray-500"
                  : "border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => setUseStepByStep(false)}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  !useStepByStep ? "border-blue-500 bg-blue-500" : "border-gray-400"
                }`}
              >
                {!useStepByStep && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
              </div>
              <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Quick Analysis</h4>
            </div>
            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Fast comprehensive analysis with all results shown at once
            </p>
          </div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <button
          onClick={async () => {
            if (resumeText.trim() && jobDescription.trim()) {
              if (useStepByStep) {
                setShowStepByStep(true)
              } else {
                setCurrentStep("analysis")
                await performRealAnalysis(resumeText.trim(), jobDescription.trim())
              }
            } else {
              alert("Please provide both resume and job description")
            }
          }}
          disabled={!resumeText.trim() || !jobDescription.trim()}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          aria-label="Analyze resume and job description"
        >
          {useStepByStep ? "Start Step-by-Step Analysis" : "Analyze Resume"}
        </button>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setCurrentStep("landing")}
            className={`px-4 py-2 rounded-lg ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )

  const AnalysisResults = () => (
    <div className="max-w-6xl mx-auto space-y-6">
      {isAnalyzing ? (
        <div className={`rounded-2xl shadow-lg p-8 text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            AI Analysis in Progress
          </h2>
          <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
            Our AI is analyzing your resume and the job requirements...
          </p>
          <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            This may take up to 2 minutes
          </p>
        </div>
      ) : analysisError ? (
        <div className={`rounded-2xl shadow-lg p-8 text-center ${darkMode ? "bg-red-900/20" : "bg-red-50"}`}>
          <h2 className={`text-xl font-semibold mb-2 ${darkMode ? "text-red-400" : "text-red-700"}`}>
            Analysis Failed
          </h2>
          <p className={`mb-4 ${darkMode ? "text-red-300" : "text-red-600"}`}>{analysisError.message}</p>
          <details className={`text-left mb-4 ${darkMode ? "text-red-300" : "text-red-600"}`}>
            <summary className="cursor-pointer font-semibold">Technical Details</summary>
            <pre className="mt-2 text-xs bg-black/20 p-2 rounded overflow-auto">
              {analysisError.stack || analysisError.message}
            </pre>
          </details>
          <div className="space-x-4">
            <button
              onClick={() => {
                setAnalysisError(null)
                if (resumeText.trim() && jobDescription.trim()) {
                  performRealAnalysis(resumeText.trim(), jobDescription.trim())
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => setCurrentStep("upload")}
              className={`px-6 py-2 rounded-lg border ${darkMode ? "border-gray-600 text-gray-300 hover:text-white" : "border-gray-300 text-gray-600 hover:text-gray-900"}`}
            >
              Back to Upload
            </button>
          </div>
        </div>
      ) : analysisResults ? (
        <div className="space-y-6">
          {/* Match Score Header with Salary Insights */}
          <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div
                    className={`text-4xl font-bold ${
                      analysisResults.matchPercentage >= 80
                        ? "text-green-500"
                        : analysisResults.matchPercentage >= 60
                          ? "text-yellow-500"
                          : "text-red-500"
                    }`}
                  >
                    {analysisResults.matchPercentage}%
                  </div>
                  <div>
                    <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Qualification Match
                    </h2>
                    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Based on AI analysis</p>
                  </div>
                </div>
              </div>

              {/* Salary Insights */}
              {analysisResults.salaryInsights && (
                <div className={`p-4 rounded-lg ${darkMode ? "bg-green-900/20" : "bg-green-50"}`}>
                  <h3 className={`font-semibold mb-2 ${darkMode ? "text-green-400" : "text-green-700"}`}>
                    💰 Salary Impact Analysis
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className={darkMode ? "text-green-300" : "text-green-600"}>
                      <strong>Current Range:</strong> {analysisResults.salaryInsights.currentRange}
                    </p>
                    <p className={darkMode ? "text-green-300" : "text-green-600"}>
                      <strong>Potential Range:</strong> {analysisResults.salaryInsights.potentialRange}
                    </p>
                    {analysisResults.salaryInsights.gapValue > 0 && (
                      <p className={`font-semibold ${darkMode ? "text-green-200" : "text-green-800"}`}>
                        <strong>Potential Increase:</strong> ${analysisResults.salaryInsights.gapValue.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* AI Chat Assistant button */}
            <div className="mt-4 text-center">
              <Button
                onClick={() => setShowAIChat(true)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                size="lg"
              >
                🤖 Ask AI Assistant
              </Button>
              <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Get personalized advice about your analysis results
              </p>
            </div>
          </div>

          {/* Comprehensive Gap Analysis */}
          {analysisResults?.qualificationsAnalysis?.gapAnalysis && (
            <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                🎯 Comprehensive Gap Analysis
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {analysisResults.qualificationsAnalysis.gapAnalysis.map((gap: any, index: number) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      gap.priority === "high"
                        ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                        : gap.priority === "medium"
                          ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                          : "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4
                        className={`font-semibold ${
                          gap.priority === "high"
                            ? "text-red-700 dark:text-red-400"
                            : gap.priority === "medium"
                              ? "text-yellow-700 dark:text-yellow-400"
                              : "text-blue-700 dark:text-blue-400"
                        }`}
                      >
                        {gap?.skill || "Skill not specified"}
                      </h4>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          gap.priority === "high"
                            ? "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200"
                            : gap.priority === "medium"
                              ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200"
                              : "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                        }`}
                      >
                        {gap.priority || "medium"} priority
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            <strong>Current:</strong> {gap?.currentLevel || "Not assessed"}
                          </p>
                          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            <strong>Required:</strong> {gap?.requiredLevel || "Not specified"}
                          </p>
                        </div>
                        <div>
                          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            <strong>Timeline:</strong> {gap?.developmentTime || "Not estimated"}
                          </p>
                          {gap.salaryImpact && (
                            <p className={`font-semibold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                              <strong>💰 Impact:</strong> ${gap.salaryImpact.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className={`p-2 rounded ${darkMode ? "bg-gray-700" : "bg-white"}`}>
                        <p className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          <strong>Action Steps:</strong> {gap?.actionSteps || "No steps provided"}
                        </p>
                      </div>

                      {gap.resources && gap.resources.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {gap.resources.map((resource: string, idx: number) => (
                            <span
                              key={idx}
                              className={`text-xs px-2 py-1 rounded ${darkMode ? "bg-gray-600 text-gray-200" : "bg-gray-200 text-gray-700"}`}
                            >
                              {resource}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clickable Resume Improvement Examples */}
          {aiEnhancements?.clickableImprovements && aiEnhancements.clickableImprovements.length > 0 && (
            <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                ✨ Clickable Resume Improvements
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {aiEnhancements.clickableImprovements.map((improvement: any, index: number) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 hover:border-blue-500"
                        : "bg-gray-50 border-gray-200 hover:border-blue-500"
                    }`}
                    onClick={() => {
                      setCurrentImprovement(improvement)
                      navigator.clipboard.writeText(improvement.improvedText || improvement.after)
                      // Show toast or feedback
                      const toast = document.createElement("div")
                      toast.textContent = "Copied to clipboard!"
                      toast.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50"
                      document.body.appendChild(toast)
                      setTimeout(() => document.body.removeChild(toast), 2000)
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`font-semibold ${darkMode ? "text-blue-400" : "text-blue-700"}`}>
                        {improvement?.section || improvement?.context || "Resume Section"}
                      </h4>
                      <span
                        className={`text-xs px-2 py-1 rounded ${darkMode ? "bg-blue-800 text-blue-200" : "bg-blue-200 text-blue-800"}`}
                      >
                        Click to copy
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className={`p-2 rounded ${darkMode ? "bg-red-900/30" : "bg-red-100"}`}>
                        <p className={`text-sm ${darkMode ? "text-red-300" : "text-red-700"}`}>
                          <strong>Before:</strong>{" "}
                          {improvement?.before || improvement?.originalText || "No before example"}
                        </p>
                      </div>
                      <div className={`p-2 rounded ${darkMode ? "bg-green-900/30" : "bg-green-100"}`}>
                        <p className={`text-sm ${darkMode ? "text-green-300" : "text-green-700"}`}>
                          <strong>After:</strong>{" "}
                          {improvement?.after || improvement?.improvedText || "No after example"}
                        </p>
                      </div>

                      {improvement.impact && (
                        <div className={`p-2 rounded ${darkMode ? "bg-purple-900/30" : "bg-purple-100"}`}>
                          <p className={`text-xs ${darkMode ? "text-purple-300" : "text-purple-700"}`}>
                            <strong>💡 Impact:</strong> {improvement.impact}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Analysis */}
          {analysisResults?.qualificationsAnalysis?.skillsAnalysis && (
            <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Skills Analysis
              </h3>
              <div className="space-y-4">
                {analysisResults.qualificationsAnalysis.skillsAnalysis.map((skill: any, index: number) => (
                  <div key={index} className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                    <h4 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {skill?.skill || "Skill not specified"}
                    </h4>
                    <p className={`text-sm mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      <strong>Evidence:</strong> {skill?.evidence || "No evidence provided"}
                    </p>
                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      <strong>Strength:</strong> {skill?.strength || "Strength not assessed"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gap Analysis */}
          {analysisResults?.qualificationsAnalysis?.gapAnalysis && (
            <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Gap Analysis
              </h3>
              <div className="space-y-4">
                {analysisResults.qualificationsAnalysis.gapAnalysis.map((gap: any, index: number) => (
                  <div key={index} className={`p-4 rounded-lg ${darkMode ? "bg-yellow-900/20" : "bg-yellow-50"}`}>
                    <h4 className={`font-semibold mb-2 ${darkMode ? "text-yellow-400" : "text-yellow-700"}`}>
                      {gap?.skill || "Skill not specified"}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className={`${darkMode ? "text-yellow-300" : "text-yellow-600"}`}>
                          <strong>Current:</strong> {gap?.currentLevel || "Not assessed"}
                        </p>
                        <p className={`${darkMode ? "text-yellow-300" : "text-yellow-600"}`}>
                          <strong>Required:</strong> {gap?.requiredLevel || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <p className={`${darkMode ? "text-yellow-300" : "text-yellow-600"}`}>
                          <strong>Timeline:</strong> {gap?.developmentTime || "Not estimated"}
                        </p>
                        <p className={`${darkMode ? "text-yellow-300" : "text-yellow-600"}`}>
                          <strong>Action:</strong> {gap?.actionSteps || "No steps provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Before/After Examples */}
          {analysisResults?.qualificationsAnalysis?.beforeAfterExamples && (
            <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Resume Improvement Examples
              </h3>
              <div className="space-y-4">
                {analysisResults.qualificationsAnalysis.beforeAfterExamples.map((example: any, index: number) => (
                  <div key={index} className={`p-4 rounded-lg ${darkMode ? "bg-blue-900/20" : "bg-blue-50"}`}>
                    <h4 className={`font-semibold mb-2 ${darkMode ? "text-blue-400" : "text-blue-700"}`}>
                      {example?.context || "Context not provided"}
                    </h4>
                    <div className="space-y-2">
                      <div className={`p-2 rounded ${darkMode ? "bg-red-900/30" : "bg-red-100"}`}>
                        <p className={`text-sm ${darkMode ? "text-red-300" : "text-red-700"}`}>
                          <strong>Before:</strong> {example?.before || "No before example"}
                        </p>
                      </div>
                      <div className={`p-2 rounded ${darkMode ? "bg-green-900/30" : "bg-green-100"}`}>
                        <p className={`text-sm ${darkMode ? "text-green-300" : "text-green-700"}`}>
                          <strong>After:</strong> {example?.after || "No after example"}
                        </p>
                      </div>
                      <p className={`text-xs ${darkMode ? "text-blue-300" : "text-blue-600"}`}>
                        <strong>Why:</strong> {example?.explanation || "No explanation provided"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Overall Assessment */}
          {analysisResults.qualificationsAnalysis?.overallAssessment && (
            <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Honest Assessment
              </h3>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${darkMode ? "bg-blue-900/20" : "bg-blue-50"}`}>
                  <h4 className={`font-semibold mb-2 ${darkMode ? "text-blue-400" : "text-blue-700"}`}>
                    Qualification Level
                  </h4>
                  <p className={`text-sm ${darkMode ? "text-blue-300" : "text-blue-600"}`}>
                    {analysisResults.qualificationsAnalysis.overallAssessment?.qualificationLevel ||
                      "Assessment not available"}
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-green-900/20" : "bg-green-50"}`}>
                  <h4 className={`font-semibold mb-2 ${darkMode ? "text-green-400" : "text-green-700"}`}>
                    Realistic Timeline
                  </h4>
                  <p className={`text-sm ${darkMode ? "text-green-300" : "text-green-600"}`}>
                    {analysisResults.qualificationsAnalysis.overallAssessment?.realisticTimeline ||
                      "Timeline not available"}
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-purple-900/20" : "bg-purple-50"}`}>
                  <h4 className={`font-semibold mb-2 ${darkMode ? "text-purple-400" : "text-purple-700"}`}>
                    Honest Recommendation
                  </h4>
                  <p className={`text-sm ${darkMode ? "text-purple-300" : "text-purple-600"}`}>
                    {analysisResults.qualificationsAnalysis.overallAssessment?.honestRecommendation ||
                      "Recommendation not available"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div
            className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-700" : "bg-gradient-to-br from-white to-gray-50"} border-2 ${darkMode ? "border-blue-500/30" : "border-blue-200"}`}
          >
            <div className="text-center mb-6">
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                🎯 Your Optimized Resume Preview
              </h3>
              <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Ready to implement your improvements? Here's what you need to do next.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Resume Preview Section */}
              <div
                className={`p-4 rounded-lg ${darkMode ? "bg-gray-700 border border-gray-600" : "bg-white border border-gray-200"} shadow-sm`}
              >
                <h4
                  className={`font-semibold mb-3 flex items-center gap-2 ${darkMode ? "text-blue-400" : "text-blue-700"}`}
                >
                  📄 Updated Resume Preview
                </h4>
                <div
                  className={`p-3 rounded border-2 border-dashed ${darkMode ? "border-gray-500 bg-gray-800" : "border-gray-300 bg-gray-50"} text-sm`}
                >
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-2`}>
                    <strong>Your resume with AI improvements:</strong>
                  </p>
                  <ul className={`space-y-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    <li>• Enhanced bullet points with quantified achievements</li>
                    <li>• Optimized keywords for ATS systems</li>
                    <li>• Improved formatting and structure</li>
                    <li>• Tailored content for target role</li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-gray-400">
                    <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      💡 Copy the improved text from the sections above and update your resume document
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Items Section */}
              <div
                className={`p-4 rounded-lg ${darkMode ? "bg-gray-700 border border-gray-600" : "bg-white border border-gray-200"} shadow-sm`}
              >
                <h4
                  className={`font-semibold mb-3 flex items-center gap-2 ${darkMode ? "text-green-400" : "text-green-700"}`}
                >
                  ✅ Next Action Items
                </h4>
                <div className="space-y-3">
                  <div className={`p-2 rounded ${darkMode ? "bg-green-900/20" : "bg-green-50"}`}>
                    <p className={`text-sm font-medium ${darkMode ? "text-green-300" : "text-green-700"}`}>
                      1. Update Your Resume
                    </p>
                    <p className={`text-xs ${darkMode ? "text-green-400" : "text-green-600"}`}>
                      Copy the improved text from clickable sections above
                    </p>
                  </div>
                  <div className={`p-2 rounded ${darkMode ? "bg-blue-900/20" : "bg-blue-50"}`}>
                    <p className={`text-sm font-medium ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
                      2. Address Skill Gaps
                    </p>
                    <p className={`text-xs ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                      Follow the development timeline in gap analysis
                    </p>
                  </div>
                  <div className={`p-2 rounded ${darkMode ? "bg-purple-900/20" : "bg-purple-50"}`}>
                    <p className={`text-sm font-medium ${darkMode ? "text-purple-300" : "text-purple-700"}`}>
                      3. Track Your Progress
                    </p>
                    <p className={`text-xs ${darkMode ? "text-purple-400" : "text-purple-600"}`}>
                      Use the Learning Center to monitor improvements
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Completion Checklist */}
            <div
              className={`p-4 rounded-lg ${darkMode ? "bg-yellow-900/20 border border-yellow-600" : "bg-yellow-50 border border-yellow-200"}`}
            >
              <h4
                className={`font-semibold mb-3 flex items-center gap-2 ${darkMode ? "text-yellow-400" : "text-yellow-700"}`}
              >
                📋 Completion Checklist
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <p className={`font-medium ${darkMode ? "text-yellow-300" : "text-yellow-700"}`}>Before Applying:</p>
                  <ul className={`space-y-1 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}>
                    <li>□ Copy all improved text</li>
                    <li>□ Update resume document</li>
                    <li>□ Proofread for errors</li>
                    <li>□ Save as PDF</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className={`font-medium ${darkMode ? "text-yellow-300" : "text-yellow-700"}`}>
                    Skill Development:
                  </p>
                  <ul className={`space-y-1 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}>
                    <li>□ Start high-priority gaps</li>
                    <li>□ Find learning resources</li>
                    <li>□ Set development timeline</li>
                    <li>□ Track progress weekly</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className={`font-medium ${darkMode ? "text-yellow-300" : "text-yellow-700"}`}>Job Search:</p>
                  <ul className={`space-y-1 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}>
                    <li>□ Apply to target roles</li>
                    <li>□ Track applications</li>
                    <li>□ Follow up on responses</li>
                    <li>□ Report back results</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Button
                onClick={() => setShowLearningFeedback(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                size="lg"
              >
                📚 Track Your Progress
              </Button>
              <Button
                onClick={() => setShowAIChat(true)}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                size="lg"
              >
                🤖 Get More AI Advice
              </Button>
              <Button
                onClick={() => {
                  // Create a summary of all improvements for easy copying
                  const improvements = aiEnhancements?.clickableImprovements || []
                  const summaryText = improvements
                    .map(
                      (imp: any, idx: number) =>
                        `${idx + 1}. ${imp.section || "Section"}: ${imp.after || imp.improvedText || ""}`,
                    )
                    .join("\n\n")

                  navigator.clipboard.writeText(summaryText)

                  // Show feedback
                  const toast = document.createElement("div")
                  toast.textContent = "All improvements copied to clipboard!"
                  toast.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50"
                  document.body.appendChild(toast)
                  setTimeout(() => document.body.removeChild(toast), 3000)
                }}
                variant="outline"
                size="lg"
                className={`${darkMode ? "border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700" : "border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
              >
                📋 Copy All Improvements
              </Button>
            </div>

            <div className="text-center mt-4">
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                💡 <strong>Pro Tip:</strong> Come back after applying to jobs and share your results in the Learning
                Center to help improve our AI!
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setCurrentStep("upload")}
              className={`px-6 py-2 rounded-lg ${darkMode ? "text-gray-300 hover:text-white border border-gray-600" : "text-gray-600 hover:text-gray-900 border border-gray-300"}`}
            >
              Analyze Another Resume
            </button>
          </div>
        </div>
      ) : (
        <div className={`rounded-2xl shadow-lg p-8 text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h2 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Ready for Analysis
          </h2>
          <p className={darkMode ? "text-gray-300" : "text-gray-600"}>Click "Analyze Resume" to begin the process</p>
        </div>
      )}
    </div>
  )

  return (
    <ErrorBoundary>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark" : ""}`}>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
          {/* Header */}
          <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Resume Builder</h1>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Learning & Feedback button when analysis is available */}
                  {analysisResults && (
                    <Button
                      onClick={() => setShowLearningFeedback(true)}
                      variant="outline"
                      size="sm"
                      className={`${darkMode ? "border-gray-600 text-gray-300 hover:text-white" : "border-gray-300 text-gray-600 hover:text-gray-900"}`}
                    >
                      📚 Learning Center
                    </Button>
                  )}
                  {/* AI chat button in header when analysis is available */}
                  {analysisResults && (
                    <Button
                      onClick={() => setShowAIChat(true)}
                      variant="outline"
                      size="sm"
                      className={`${darkMode ? "border-gray-600 text-gray-300 hover:text-white" : "border-gray-300 text-gray-600 hover:text-gray-900"}`}
                    >
                      🤖 AI Assistant
                    </Button>
                  )}
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    aria-pressed={darkMode}
                  >
                    {darkMode ? "🌞" : "🌙"}
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            role="main"
            aria-label="Resume builder application"
          >
            <div>
              {currentStep === "landing" && <LandingPage />}
              {currentStep === "upload" && <UploadInterface />}
              {currentStep === "analysis" && <AnalysisResults />}
              {showStepByStep && (
                <StepByStepAnalysis
                  resumeText={resumeText}
                  jobDescription={jobDescription}
                  onComplete={handleStepByStepComplete}
                  onCancel={() => setShowStepByStep(false)}
                  darkMode={darkMode}
                />
              )}
            </div>
          </main>

          <div className="fixed bottom-4 right-4 flex gap-2 z-50">
            <Button
              onClick={runComprehensiveTest}
              className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
              size="lg"
            >
              🧪 Run Comprehensive Test
            </Button>
          </div>

          {/* AI Chat Assistant component */}
          <AIChatAssistant
            analysisResults={analysisResults}
            resumeData={resumeData}
            isOpen={showAIChat}
            onClose={() => setShowAIChat(false)}
            darkMode={darkMode}
          />

          {/* Learning & Feedback System component */}
          <LearningFeedbackSystem
            analysisResults={analysisResults}
            isOpen={showLearningFeedback}
            onClose={() => setShowLearningFeedback(false)}
            darkMode={darkMode}
          />

          {/* Verification Dialog component */}
          <VerificationDialog
            isOpen={showVerificationDialog}
            onClose={() => setShowVerificationDialog(false)}
            darkMode={darkMode}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default EnhancedResumeBuilder
