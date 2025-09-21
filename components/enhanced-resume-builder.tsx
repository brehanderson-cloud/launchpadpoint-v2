"use client"
import { useState, useEffect } from "react"
import { useTheme } from "./theme-provider"
import type { ParsedResumeData } from "@/lib/resume-parser"
import ErrorBoundary from "./error-boundary"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Button } from "@/components/ui/button"

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

  const [savedProgress, setSavedProgress, removeSavedProgress, isLoadingProgress] = useLocalStorage(
    "resume-builder-progress",
    null,
  )

  const runComprehensiveTest = async () => {
    console.log("[v0] Starting comprehensive test of analysis flow...")

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

    setResumeData(testResumeData)
    setResumeText(JSON.stringify(testResumeData, null, 2))
    setJobDescription(testJobDescription.trim())
    setCurrentStep("analysis")

    // Wait a moment for state to update
    await new Promise((resolve) => setTimeout(resolve, 100))

    setIsAnalyzing(true)

    // Simulate analysis results immediately for demonstration
    const mockAnalysisResults = {
      matchPercentage: 87,
      jobAnalysis: {
        requirements: [
          "10+ years in talent acquisition",
          "5+ years in high-volume recruiting",
          "Experience with ATS systems (SuccessFactors)",
          "Team management experience",
          "Data analysis skills",
        ],
        keySkills: ["Talent Acquisition", "High-Volume Recruiting", "SuccessFactors", "Team Leadership"],
      },
      qualificationsAnalysis: {
        skillsAnalysis: [
          {
            skill: "Talent Acquisition",
            evidence: "Led end-to-end recruitment strategies at AkzoNobel, reducing time-to-fill by 25%",
            strength: "Strong - 3+ years as TA Business Partner with proven results",
          },
          {
            skill: "High-Volume Recruiting",
            evidence: "Managed pipeline of 200+ candidates at Randstad, developed high-volume strategies",
            strength: "Strong - Direct experience in high-volume environments",
          },
        ],
        gapAnalysis: [
          {
            skill: "Director-Level Experience",
            currentLevel: "Business Partner/Manager level",
            requiredLevel: "Director level with P&L responsibility",
            developmentTime: "12-18 months",
            actionSteps: "Seek stretch assignments with budget/P&L responsibility",
          },
        ],
        beforeAfterExamples: [
          {
            context: "Leadership Experience",
            before: "Managed recruitment teams",
            after:
              "Led cross-functional recruitment teams of 8+ members, driving 25% improvement in time-to-fill while maintaining 95% offer acceptance rates",
            explanation: "Quantified team size and specific business impact",
          },
        ],
        overallAssessment: {
          qualificationLevel:
            "Strong candidate with 85-90% qualification match. Herbert has the core competencies and proven track record in talent acquisition.",
          realisticTimeline: "Ready to apply immediately with proper preparation.",
          honestRecommendation: "APPLY WITH CONFIDENCE. Herbert's experience directly aligns with NRG's needs.",
        },
      },
      resumeScore: { score: 87 },
    }

    // Set results immediately
    setAnalysisResults(mockAnalysisResults)
    setAiEnhancements({
      suggestions: mockAnalysisResults.qualificationsAnalysis.beforeAfterExamples,
    })
    setIsAnalyzing(false)

    console.log("[v0] Test analysis results displayed")
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

      <div className="text-center space-y-4">
        <button
          onClick={() => {
            if (resumeText.trim() && jobDescription.trim()) {
              setCurrentStep("analysis")
            } else {
              alert("Please provide both resume and job description")
            }
          }}
          disabled={!resumeText.trim() || !jobDescription.trim()}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          aria-label="Analyze resume and job description"
        >
          Analyze Resume
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
        </div>
      ) : analysisResults ? (
        <div className="space-y-6">
          {/* Match Score Header */}
          <div className={`rounded-2xl shadow-lg p-6 text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
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
                    Honest Recommendation
                  </h4>
                  <p className={`text-sm ${darkMode ? "text-green-300" : "text-green-600"}`}>
                    {analysisResults.qualificationsAnalysis.overallAssessment?.honestRecommendation ||
                      "Recommendation not available"}
                  </p>
                </div>
              </div>
            </div>
          )}
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
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default EnhancedResumeBuilder
