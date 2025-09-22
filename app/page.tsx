"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThemeToggle } from "@/components/theme-toggle"
import CompleteResumeFlow from "@/components/CompleteResumeFlow"

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

export default function Home() {
  const [currentView, setCurrentView] = useState("landing") // 'landing', 'analysis', 'resume'
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)

  const handleStartAnalysis = () => {
    setCurrentView("analysis")
  }

  const handleAnalyzeSubmit = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      alert("Please provide both your resume and job description")
      return
    }

    setIsAnalyzing(true)

    try {
      console.log("[v0] Starting analysis with:", { resumeLength: resumeText.length, jobLength: jobDescription.length })

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume: resumeText,
          jobDescription: jobDescription,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("[v0] API Response Error:", response.status, errorText)
        throw new Error(`Analysis failed: ${response.status} ${errorText}`)
      }

      const results = await response.json()
      console.log("[v0] Analysis results received:", results)

      // Validate that we have the required data structure
      if (!results.overallMatch || !results.qualificationLevel) {
        console.warn("[v0] Analysis results missing required fields, using defaults")
        results.overallMatch = results.overallMatch || "70%"
        results.qualificationLevel = results.qualificationLevel || "Partially qualified"
        results.timeline = results.timeline || "6-12 months"
        results.jobTitle = results.jobTitle || "Target Position"
      }

      setAnalysisResults(results)
      setCurrentView("resume")
    } catch (error) {
      console.error("[v0] Analysis error:", error)
      alert(`Analysis failed: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleBackToAnalysis = () => {
    setCurrentView("analysis")
  }

  const handleBackToLanding = () => {
    setCurrentView("landing")
    setAnalysisResults(null)
    setResumeText("")
    setJobDescription("")
  }

  // Resume flow view
  if (currentView === "resume" && analysisResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToLanding}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Home
                </button>
                <h1 className="text-xl font-semibold text-gray-900">Resume Generation</h1>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <CompleteResumeFlow analysisResults={analysisResults} />
      </div>
    )
  }

  // Analysis view
  if (currentView === "analysis") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToLanding}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Home
                </button>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">AI Resume Analysis</h1>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Upload Your Resume & Job Description
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our AI will analyze how well your resume matches the job requirements
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="h-fit">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Your Resume</h3>
                <Textarea
                  placeholder="Paste your resume text here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="min-h-[300px] w-full resize-none"
                />
                <p className="text-sm text-gray-500 mt-2">Copy and paste your resume content</p>
              </CardContent>
            </Card>

            <Card className="h-fit">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Target Job Description</h3>
                <Textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[300px] w-full resize-none"
                />
                <p className="text-sm text-gray-500 mt-2">Copy the full job posting you're applying for</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button
              onClick={handleAnalyzeSubmit}
              disabled={isAnalyzing || !resumeText.trim() || !jobDescription.trim()}
              className="px-8 py-3 text-lg font-medium"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                "Start AI Analysis"
              )}
            </Button>
          </div>

          {/* Debug Info */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Debug Info:</h4>
              <p className="text-sm text-yellow-700">Resume length: {resumeText.length} characters</p>
              <p className="text-sm text-yellow-700">Job description length: {jobDescription.length} characters</p>
              <p className="text-sm text-yellow-700">API endpoint: /api/analyze</p>
            </div>
          )}
        </main>
      </div>
    )
  }

  // Landing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">AI Resume Builder</h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Build Your Perfect Resume with AI
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Get honest feedback on your qualifications and build a targeted resume that showcases your strengths while
            addressing skill gaps.
          </p>
          <Button onClick={handleStartAnalysis} size="lg" className="px-8 py-3 text-lg font-medium">
            Start AI Analysis
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Honest Assessment</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Get realistic feedback on your qualifications with specific skill gap analysis
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Optimization</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Transform your experience into job-specific achievements that match requirements
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Professional Resume</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Download a polished, ATS-friendly resume with development plan included
            </p>
          </Card>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                1
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Upload Resume & Job</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Paste your current resume and target job description
              </p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                2
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">AI Analysis</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Get detailed skill matching and gap analysis</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                3
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Contact Information</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Provide details for your personalized resume</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                4
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Download Resume</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Get your optimized, professional resume</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
