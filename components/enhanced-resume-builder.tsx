"use client"
import { useState, useEffect } from "react"
import { useTheme } from "./theme-provider"
import type { ParsedResumeData } from "@/lib/resume-parser"
import ErrorBoundary from "./error-boundary"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Button } from "@/components/ui/button"
import AIAssistant from "./ai-assistant"
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
  const [showAIAssistant, setShowAIAssistant] = useState(false)

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
      // Step 1: Analyze job description
      console.log("[v0] Calling job analysis API...")
      const jobResponse = await fetch("/api/analyze-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription }),
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

      // Step 2: Analyze qualifications
      console.log("[v0] Calling qualifications analysis API...")
      const qualificationsResponse = await fetch("/api/analyze-qualifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeText, jobDescription }),
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

      // Combine results
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
      }

      console.log("[v0] Combined analysis results:", combinedResults)

      setAnalysisResults(combinedResults)
      setAiEnhancements({
        suggestions: qualificationsAnalysis.beforeAfterExamples || [],
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

  const handleImprovementClick = (improvement: any) => {
    const transformedImprovement = {
      originalText: improvement.before || improvement.originalText || "Original text not available",
      improvedText: improvement.after || improvement.improvedText || "Improved text not available",
    }
    setCurrentImprovement(transformedImprovement)
    setShowVerificationDialog(true)
  }

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
          onClick={async () => {
            if (resumeText.trim() && jobDescription.trim()) {
              setCurrentStep("analysis")
              await performRealAnalysis(resumeText.trim(), jobDescription.trim())
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
                  <div
                    key={index}
                    className={`p-4 rounded-lg cursor-pointer transition-all hover:shadow-md ${darkMode ? "bg-blue-900/20 hover:bg-blue-900/30" : "bg-blue-50 hover:bg-blue-100"}`}
                    onClick={() => handleImprovementClick(example)}
                  >
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
                    <div className="mt-2 text-xs text-blue-500 font-medium">Click to verify this improvement →</div>
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
                      "Well-qualified with minor gaps"}
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-green-900/20" : "bg-green-50"}`}>
                  <h4 className={`font-semibold mb-2 ${darkMode ? "text-green-400" : "text-green-700"}`}>
                    Realistic Timeline
                  </h4>
                  <p className={`text-sm ${darkMode ? "text-green-300" : "text-green-600"}`}>
                    {analysisResults.qualificationsAnalysis.overallAssessment?.realisticTimeline ||
                      "Ready to apply now"}
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-purple-900/20" : "bg-purple-50"}`}>
                  <h4 className={`font-semibold mb-2 ${darkMode ? "text-purple-400" : "text-purple-700"}`}>
                    Honest Recommendation
                  </h4>
                  <p className={`text-sm ${darkMode ? "text-purple-300" : "text-purple-600"}`}>
                    {analysisResults.qualificationsAnalysis.overallAssessment?.honestRecommendation ||
                      "Strong candidate, address employer branding and onboarding skills"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Resume Preview & Next Steps */}
          <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Resume Preview & Next Steps
            </h3>

            <div className="space-y-6">
              {/* Resume Preview */}
              <div className={`p-4 rounded-lg ${darkMode ? "bg-green-900/20" : "bg-green-50"}`}>
                <h4 className={`font-semibold mb-3 ${darkMode ? "text-green-400" : "text-green-700"}`}>
                  Your Optimized Resume Will Include:
                </h4>
                <ul className={`space-y-2 text-sm ${darkMode ? "text-green-300" : "text-green-600"}`}>
                  <li>• Enhanced bullet points with quantified achievements</li>
                  <li>• ATS-optimized keywords from the job description</li>
                  <li>• Tailored content that highlights relevant experience</li>
                  <li>• Professional formatting that passes applicant tracking systems</li>
                </ul>
              </div>

              {/* Action Items */}
              <div className={`p-4 rounded-lg ${darkMode ? "bg-blue-900/20" : "bg-blue-50"}`}>
                <h4 className={`font-semibold mb-3 ${darkMode ? "text-blue-400" : "text-blue-700"}`}>
                  What You Need to Do Next:
                </h4>
                <ol className={`space-y-2 text-sm ${darkMode ? "text-blue-300" : "text-blue-600"}`}>
                  <li>1. Update your resume with the suggested improvements</li>
                  <li>2. Address any skill gaps identified in the analysis</li>
                  <li>3. Use our Learning Center to develop missing competencies</li>
                  <li>4. Track your progress and application success rate</li>
                </ol>
              </div>

              {/* Completion Checklist */}
              <div className={`p-4 rounded-lg ${darkMode ? "bg-purple-900/20" : "bg-purple-50"}`}>
                <h4 className={`font-semibold mb-3 ${darkMode ? "text-purple-400" : "text-purple-700"}`}>
                  Complete Your Application Package:
                </h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className={`font-medium mb-2 ${darkMode ? "text-purple-300" : "text-purple-600"}`}>
                      Before Applying:
                    </h5>
                    <ul className={`space-y-1 ${darkMode ? "text-purple-200" : "text-purple-500"}`}>
                      <li>□ Update resume with improvements</li>
                      <li>□ Customize cover letter</li>
                      <li>□ Prepare for common interview questions</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className={`font-medium mb-2 ${darkMode ? "text-purple-300" : "text-purple-600"}`}>
                      Skill Development:
                    </h5>
                    <ul className={`space-y-1 ${darkMode ? "text-purple-200" : "text-purple-500"}`}>
                      <li>□ Complete identified training</li>
                      <li>□ Build portfolio examples</li>
                      <li>□ Get relevant certifications</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className={`font-medium mb-2 ${darkMode ? "text-purple-300" : "text-purple-600"}`}>
                      Job Search:
                    </h5>
                    <ul className={`space-y-1 ${darkMode ? "text-purple-200" : "text-purple-500"}`}>
                      <li>□ Apply to target positions</li>
                      <li>□ Follow up on applications</li>
                      <li>□ Track response rates</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Button onClick={() => setShowSuccessTracker(true)} className="bg-green-600 hover:bg-green-700">
                  Track My Progress
                </Button>
                <Button onClick={() => setShowAIAssistant(true)} variant="outline">
                  Get More AI Advice
                </Button>
                <Button
                  onClick={() => {
                    const improvements = analysisResults?.qualificationsAnalysis?.beforeAfterExamples || []
                    const text = improvements.map((imp: any) => `${imp.context}: ${imp.after}`).join("\n\n")
                    navigator.clipboard.writeText(text)
                  }}
                  variant="outline"
                >
                  Copy All Improvements
                </Button>
              </div>
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

          {/* AI Assistant floating button */}
          <div className="fixed bottom-6 right-6 z-50">
            <Button
              onClick={() => setShowAIAssistant(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-200"
              aria-label="Open AI Assistant"
            >
              🤖
            </Button>
          </div>

          <div className="fixed bottom-4 left-4 flex gap-2 z-50">
            <Button
              onClick={runComprehensiveTest}
              className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
              size="lg"
            >
              🧪 Run Comprehensive Test
            </Button>
          </div>

          {/* AI Assistant and Verification Dialog components */}
          <AIAssistant
            isOpen={showAIAssistant}
            onClose={() => setShowAIAssistant(false)}
            analysisResults={analysisResults}
            resumeText={resumeText}
            jobDescription={jobDescription}
          />

          <VerificationDialog
            improvement={currentImprovement}
            onVerify={(verifiedText) => {
              console.log("Improvement verified:", verifiedText)
              setShowVerificationDialog(false)
            }}
            onClose={() => setShowVerificationDialog(false)}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default EnhancedResumeBuilder
