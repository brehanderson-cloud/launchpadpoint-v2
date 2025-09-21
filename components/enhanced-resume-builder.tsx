"use client"

import { useState, useEffect } from "react"
import { useTheme } from "./theme-provider"
import { ResumeParser, type ParsedResumeData } from "@/lib/resume-parser"
import ErrorBoundary from "./error-boundary"
import { useLocalStorage } from "@/hooks/use-local-storage"

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

  const [savedProgress, setSavedProgress, removeSavedProgress, isLoadingProgress] = useLocalStorage(
    "resume-builder-progress",
    null,
  )

  useEffect(() => {
    if (savedProgress && !isLoadingProgress) {
      const shouldRestore = window.confirm("We found a previous session. Would you like to restore your progress?")

      if (shouldRestore) {
        setResumeText(savedProgress.resumeText || "")
        setJobDescription(savedProgress.jobDescription || "")
        setAnalysisResults(savedProgress.analysisResults || null)
        setCurrentStep(savedProgress.currentStep || "landing")
      } else {
        removeSavedProgress()
      }
    }
  }, [savedProgress, isLoadingProgress, removeSavedProgress])

  useEffect(() => {
    if (resumeText.trim()) {
      const parsed = ResumeParser.parseResume(resumeText)
      setResumeData(parsed)
    }
  }, [resumeText])

  useEffect(() => {
    if (resumeData && jobDescription.trim() && currentStep === "analysis") {
      if (useStepByStep) {
        setIsAnalyzing(true)
      } else {
        performAIAnalysis()
      }
    }
  }, [resumeData, jobDescription, currentStep])

  const handleStepByStepComplete = (stepResults: any) => {
    console.log("[v0] Step-by-step analysis completed:", stepResults)

    // Transform step results into the expected format
    const transformedResults = {
      matchPercentage:
        Math.round(
          (stepResults.skills?.stepScore + stepResults.experience?.stepScore + stepResults.education?.stepScore) / 3,
        ) || 72,
      qualificationsAnalysis: {
        skillsAnalysis:
          stepResults.skills?.matches?.map((match: string, index: number) => ({
            skill: match,
            evidence: `Evidence from step-by-step analysis`,
            strength: stepResults.skills?.insights?.[index] || "Analyzed through step-by-step process",
          })) || [],
        gapAnalysis: Object.values(stepResults).flatMap(
          (step: any) =>
            step?.gaps?.map((gap: string) => ({
              skill: gap,
              currentLevel: "Identified through analysis",
              requiredLevel: "As per job requirements",
              developmentTime: "3-6 months",
              actionSteps: step?.quickWins?.[0] || "Focus on skill development",
            })) || [],
        ),
        beforeAfterExamples:
          stepResults.summary?.quickWins?.map((win: string, index: number) => ({
            context: `Improvement ${index + 1}`,
            before: "Original phrasing",
            after: win,
            explanation: "Enhanced through step-by-step analysis",
          })) || [],
        overallAssessment: {
          qualificationLevel: `Step-by-step analysis shows ${stepResults.summary?.stepScore || 70}% qualification match`,
          realisticTimeline: "Based on detailed step analysis, 3-6 months development recommended",
          honestRecommendation:
            stepResults.summary?.insights?.[0] || "Apply with confidence while developing identified gaps",
        },
      },
      // Add summary and other step-specific data for the new display logic
      summary: stepResults.summary,
      skills: stepResults.skills,
      experience: stepResults.experience,
      education: stepResults.education,
    }

    setAnalysisResults(transformedResults)
    setIsAnalyzing(false)
    setAnalysisError(null)

    // setTimeout(() => {
    //   setShowFeedbackDialog(true)
    // }, 2000)
  }

  const performAIAnalysis = async () => {
    if (!resumeData || !jobDescription.trim()) return

    setIsAnalyzing(true)
    setAnalysisError(null)

    try {
      console.log("[v0] Starting fast AI analysis...")
      console.log("[v0] Resume data:", resumeData ? "Present" : "Missing")
      console.log("[v0] Job description length:", jobDescription.length)

      const jobAnalysisPromise = fetch("/api/analyze-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jobDescription.substring(0, 1500) }),
      }).then(async (response) => {
        console.log("[v0] Job analysis response status:", response.status)
        if (!response.ok) {
          const errorText = await response.text()
          console.error("[v0] Job analysis error:", errorText)
          throw new Error(`Job analysis failed: ${response.status}`)
        }
        const data = await response.json()
        console.log("[v0] Job analysis completed")
        return data
      })

      const qualificationsPromise = fetch("/api/analyze-qualifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: resumeText.substring(0, 1000) || JSON.stringify(resumeData).substring(0, 1000),
          jobDescription: jobDescription.substring(0, 800),
        }),
      }).then(async (response) => {
        console.log("[v0] Qualifications analysis response status:", response.status)
        if (!response.ok) {
          const errorText = await response.text()
          console.error("[v0] Qualifications analysis error:", errorText)
          throw new Error(`Qualifications analysis failed: ${response.status}`)
        }
        const data = await response.json()
        console.log("[v0] Qualifications analysis completed")
        return data
      })

      const analysisPromise = Promise.all([jobAnalysisPromise, qualificationsPromise])

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => {
          console.error("[v0] Analysis timeout after 15 seconds")
          reject(new Error("Analysis is taking too long. Please try again."))
        }, 15000),
      )

      console.log("[v0] Waiting for analysis results...")
      const [jobAnalysis, qualificationsAnalysis] = (await Promise.race([analysisPromise, timeoutPromise])) as [
        any,
        any,
      ]

      console.log("[v0] Both analyses completed successfully")

      // Calculate match percentage based on AI analysis
      const matchPercentage =
        Math.round(
          (qualificationsAnalysis.skillsMatch +
            qualificationsAnalysis.experienceMatch +
            qualificationsAnalysis.educationMatch) /
            3,
        ) || 75

      console.log("[v0] Calculated match percentage:", matchPercentage)

      setAnalysisResults({
        matchPercentage,
        jobAnalysis,
        qualificationsAnalysis,
        resumeScore: { score: matchPercentage },
      })

      setAiEnhancements({
        suggestions: qualificationsAnalysis.improvements || [],
      })

      console.log("[v0] Analysis completed successfully!")
    } catch (error) {
      console.error("[v0] AI Analysis failed:", error)
      setAnalysisError(error as Error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const retryAnalysis = async () => {
    setAnalysisError(null)
    if (useStepByStep && resumeData) {
      setIsAnalyzing(true)
      // The step-by-step analyzer will handle its own retry logic
    } else {
      await performAIAnalysis()
    }
  }

  const handleImprovementClick = (originalText: string, improvedText: string) => {
    setCurrentImprovement({ originalText, improvedText })
    setShowVerificationDialog(true)
  }

  const handleVerificationComplete = (verifiedText: string) => {
    // Apply the verified improvement to the resume
    console.log("[v0] Applying verified improvement:", verifiedText)
    setShowVerificationDialog(false)
    setCurrentImprovement(null)
  }

  const handleVerificationClose = () => {
    setShowVerificationDialog(false)
    setCurrentImprovement(null)
  }

  const handleFeedbackSubmit = (feedback: any) => {
    console.log("[v0] Feedback submitted:", feedback)
    setFeedbackSubmitted(true)
    setShowFeedbackDialog(false)

    // Show success tracker after a delay
    setTimeout(() => {
      setShowSuccessTracker(true)
    }, 30000) // Show after 30 seconds
  }

  const handleSuccessUpdate = (outcome: any) => {
    console.log("[v0] Success outcome:", outcome)
    setShowSuccessTracker(false)

    // Send to learning API
    fetch("/api/learn-improvements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feedback: { outcome: outcome.outcome },
        improvementData: analysisResults,
        userOutcome: outcome,
      }),
    }).catch((error) => console.error("Failed to record outcome:", error))
  }

  const handleDownloadComplete = () => {
    if (!feedbackSubmitted) {
      setShowFeedbackDialog(true)
    }
  }

  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors ${
        darkMode ? "bg-gray-700 text-yellow-400 hover:bg-gray-600" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
      }`}
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  )

  const LaunchpadLogo = () => (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">AI</span>
      </div>
      <div>
        <div className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>AI Resume Builder</div>
        <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Ethical • Honest • AI-Powered</div>
      </div>
    </div>
  )

  const EthicalDisclaimer = () => (
    <div
      className={`border rounded-lg p-4 mb-6 ${
        darkMode ? "bg-blue-900/20 border-blue-700 text-blue-200" : "bg-blue-50 border-blue-200 text-blue-800"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className={`text-lg mt-0.5 flex-shrink-0 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>ℹ️</span>
        <div className="text-sm">
          <strong>Our AI Promise:</strong> We use advanced AI to help you present your authentic qualifications
          effectively. We provide honest analysis and realistic improvements—no false claims or inflated scores.
        </div>
      </div>
    </div>
  )

  const LandingPage = () => (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        darkMode ? "bg-gradient-to-br from-gray-900 to-blue-900" : "bg-gradient-to-br from-slate-50 to-blue-50"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12 pt-8">
          <LaunchpadLogo />
          <ThemeToggle />
        </div>

        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            AI-Powered Resume Analysis & Enhancement
          </h1>
          <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Get intelligent, honest analysis of how your qualifications match job requirements. Our AI provides
            realistic insights and ethical enhancements to help you succeed.
          </p>
        </div>

        <EthicalDisclaimer />

        <div className={`rounded-2xl shadow-lg p-8 mb-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h2 className={`text-2xl font-semibold mb-6 text-center ${darkMode ? "text-white" : "text-gray-900"}`}>
            AI-Enhanced Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${darkMode ? "bg-blue-900/30" : "bg-blue-100"}`}
              >
                <span className={`text-2xl ${darkMode ? "text-blue-400" : "text-blue-600"}`}>📄</span>
              </div>
              <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Smart Parsing</h3>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                AI extracts and structures your experience
              </p>
            </div>
            <div className="text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${darkMode ? "bg-purple-900/30" : "bg-purple-100"}`}
              >
                <span className={`text-2xl ${darkMode ? "text-purple-400" : "text-purple-600"}`}>🎯</span>
              </div>
              <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Job Analysis</h3>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                AI understands job requirements deeply
              </p>
            </div>
            <div className="text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${darkMode ? "bg-green-900/30" : "bg-green-100"}`}
              >
                <span className={`text-2xl ${darkMode ? "text-green-400" : "text-green-600"}`}>✅</span>
              </div>
              <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Intelligent Matching
              </h3>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Honest assessment with realistic scoring
              </p>
            </div>
            <div className="text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${darkMode ? "bg-yellow-900/30" : "bg-yellow-100"}`}
              >
                <span className={`text-2xl ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}>⭐</span>
              </div>
              <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>AI Enhancement</h3>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Ethical improvements and suggestions
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setCurrentStep("upload")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2"
          >
            Start AI Analysis <span>→</span>
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Free AI analysis • No account required • Your data stays private
          </p>
        </div>
      </div>
    </div>
  )

  const UploadInterface = () => (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        darkMode ? "bg-gradient-to-br from-gray-900 to-blue-900" : "bg-gradient-to-br from-slate-50 to-blue-50"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <LaunchpadLogo />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setCurrentStep("landing")}
              className={`hover:underline ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"}`}
            >
              ← Back
            </button>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Upload Your Information
          </h1>
          <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
            Our AI will analyze and enhance your resume for the target role
          </p>
        </div>

        <EthicalDisclaimer />

        <div className={`rounded-2xl shadow-lg p-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Resume Input Section */}
            <div className="space-y-4">
              <h3
                className={`font-semibold text-lg text-center flex items-center justify-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                <span>📄</span>
                Your Resume
              </h3>

              {/* Resume Input Method Toggle */}
              <div className={`flex rounded-lg p-1 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                <button
                  onClick={() => setResumeInputMethod("paste")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    resumeInputMethod === "paste"
                      ? `${darkMode ? "bg-gray-600 text-blue-400" : "bg-white text-blue-600"} shadow-sm`
                      : `${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"}`
                  }`}
                >
                  Copy & Paste
                </button>
                <button
                  onClick={() => setResumeInputMethod("upload")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    resumeInputMethod === "upload"
                      ? `${darkMode ? "bg-gray-600 text-blue-400" : "bg-white text-blue-600"} shadow-sm`
                      : `${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"}`
                  }`}
                >
                  Upload File
                </button>
              </div>

              {/* Resume Paste Option */}
              {resumeInputMethod === "paste" && (
                <div className="space-y-3">
                  <textarea
                    className={`w-full h-48 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                    }`}
                    placeholder="Copy and paste your resume text here..."
                    value={resumeText}
                    onChange={(e) => {
                      setResumeText(e.target.value)
                      setUploadedResume(null)
                    }}
                  />
                  <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    ⚡ AI will automatically parse and structure your information
                  </div>
                </div>
              )}

              {/* Resume Upload Option */}
              {resumeInputMethod === "upload" && (
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    darkMode ? "border-gray-600 hover:border-blue-500" : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  <span className={`text-4xl block mb-4 ${darkMode ? "text-gray-400" : "text-gray-400"}`}>📄</span>
                  <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>PDF, DOC, or DOCX format</p>
                  <input
                    type="file"
                    className="hidden"
                    id="resume-upload"
                    onChange={(e) => {
                      setUploadedResume(e.target.files?.[0] || null)
                      setResumeText("")
                    }}
                    accept=".pdf,.doc,.docx"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-block"
                  >
                    Choose File
                  </label>
                  {uploadedResume && (
                    <p className="mt-3 text-green-500 text-sm flex items-center justify-center gap-2">
                      <span>✅</span>
                      {uploadedResume.name}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Job Description Input Section */}
            <div className="space-y-4">
              <h3
                className={`font-semibold text-lg text-center flex items-center justify-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                <span>🎯</span>
                Job Description
              </h3>

              <div className="space-y-3">
                <textarea
                  className={`w-full h-48 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                  }`}
                  placeholder="Copy the job posting from a website and paste it here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  🤖 AI will analyze requirements, responsibilities, and qualifications
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setCurrentStep("analysis")}
              disabled={(!uploadedResume && !resumeText.trim()) || !jobDescription.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 inline-flex items-center gap-2"
            >
              <span className="font-bold">AI</span>
              Start AI Analysis
            </button>

            {/* Validation Messages */}
            <div className={`mt-3 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {!uploadedResume && !resumeText.trim() && <p>Please provide your resume (upload file or paste text)</p>}
              {!jobDescription.trim() && <p>Please provide the job description</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const AnalysisResults = () => (
    <div
      className={`min-h-screen p-6 transition-colors duration-300 ${
        darkMode ? "bg-gradient-to-br from-gray-900 to-blue-900" : "bg-gradient-to-br from-slate-50 to-blue-50"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <LaunchpadLogo />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setCurrentStep("upload")}
              className={`hover:underline ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"}`}
            >
              ← New Analysis
            </button>
          </div>
        </div>

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
        ) : analysisError ? (
          <div
            className={`rounded-2xl shadow-lg p-8 text-center ${darkMode ? "bg-red-900/20 border border-red-700" : "bg-red-50 border border-red-200"}`}
          >
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-red-400" : "text-red-800"}`}>
              Analysis Error
            </h2>
            <p className={`mb-4 ${darkMode ? "text-red-300" : "text-red-700"}`}>{analysisError.message}</p>
            <button
              onClick={retryAnalysis}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry Analysis
            </button>
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
            {analysisResults.qualificationsAnalysis?.skillsAnalysis && (
              <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Skills Analysis
                </h3>
                <div className="space-y-4">
                  {analysisResults.qualificationsAnalysis.skillsAnalysis.map((skill: any, index: number) => (
                    <div key={index} className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                      <h4 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {skill.skill}
                      </h4>
                      <p className={`text-sm mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        <strong>Evidence:</strong> {skill.evidence}
                      </p>
                      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        <strong>Strength:</strong> {skill.strength}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gap Analysis */}
            {analysisResults.qualificationsAnalysis?.gapAnalysis && (
              <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Gap Analysis
                </h3>
                <div className="space-y-4">
                  {analysisResults.qualificationsAnalysis.gapAnalysis.map((gap: any, index: number) => (
                    <div key={index} className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                      <h4 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>{gap.skill}</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className={`mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            <strong>Current Level:</strong>
                          </p>
                          <p className={darkMode ? "text-gray-400" : "text-gray-500"}>{gap.currentLevel}</p>
                        </div>
                        <div>
                          <p className={`mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            <strong>Required Level:</strong>
                          </p>
                          <p className={darkMode ? "text-gray-400" : "text-gray-500"}>{gap.requiredLevel}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className={`mb-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          <strong>Development Time:</strong> {gap.developmentTime}
                        </p>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          <strong>Action Steps:</strong> {gap.actionSteps}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Before/After Examples */}
            {analysisResults.qualificationsAnalysis?.beforeAfterExamples && (
              <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  AI-Enhanced Resume Preview
                </h3>
                <div className="space-y-6">
                  {analysisResults.qualificationsAnalysis.beforeAfterExamples.map((example: any, index: number) => (
                    <div key={index} className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                      <h4 className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {example.context}
                      </h4>
                      <div className="space-y-3">
                        <div
                          className={`p-3 rounded border-l-4 border-red-400 ${darkMode ? "bg-red-900/20" : "bg-red-50"}`}
                        >
                          <p className={`text-sm font-medium mb-1 ${darkMode ? "text-red-400" : "text-red-700"}`}>
                            Before:
                          </p>
                          <p className={`text-sm ${darkMode ? "text-red-300" : "text-red-600"}`}>{example.before}</p>
                        </div>
                        <div
                          className={`p-3 rounded border-l-4 border-green-400 ${darkMode ? "bg-green-900/20" : "bg-green-50"}`}
                        >
                          <p className={`text-sm font-medium mb-1 ${darkMode ? "text-green-400" : "text-green-700"}`}>
                            After:
                          </p>
                          <p className={`text-sm ${darkMode ? "text-green-300" : "text-green-600"}`}>{example.after}</p>
                        </div>
                        <div className={`p-3 rounded ${darkMode ? "bg-blue-900/20" : "bg-blue-50"}`}>
                          <p className={`text-sm font-medium mb-1 ${darkMode ? "text-blue-400" : "text-blue-700"}`}>
                            Why this works:
                          </p>
                          <p className={`text-sm ${darkMode ? "text-blue-300" : "text-blue-600"}`}>
                            {example.explanation}
                          </p>
                        </div>
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
                      {analysisResults.qualificationsAnalysis.overallAssessment.qualificationLevel}
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? "bg-yellow-900/20" : "bg-yellow-50"}`}>
                    <h4 className={`font-semibold mb-2 ${darkMode ? "text-yellow-400" : "text-yellow-700"}`}>
                      Realistic Timeline
                    </h4>
                    <p className={`text-sm ${darkMode ? "text-yellow-300" : "text-yellow-600"}`}>
                      {analysisResults.qualificationsAnalysis.overallAssessment.realisticTimeline}
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${darkMode ? "bg-green-900/20" : "bg-green-50"}`}>
                    <h4 className={`font-semibold mb-2 ${darkMode ? "text-green-400" : "text-green-700"}`}>
                      Honest Recommendation
                    </h4>
                    <p className={`text-sm ${darkMode ? "text-green-300" : "text-green-600"}`}>
                      {analysisResults.qualificationsAnalysis.overallAssessment.honestRecommendation}
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
            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
              Click "Start AI Analysis" to begin the process
            </p>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <ErrorBoundary>
      <div>
        {currentStep === "landing" && <LandingPage />}
        {currentStep === "upload" && <UploadInterface />}
        {currentStep === "analysis" && <AnalysisResults />}
      </div>
    </ErrorBoundary>
  )
}

export default EnhancedResumeBuilder
