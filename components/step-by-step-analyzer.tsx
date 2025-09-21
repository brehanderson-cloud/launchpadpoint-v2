// components/StepByStepAnalyzer.tsx
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { CheckCircle, Clock, Target, FileText, User, BarChart3 } from "lucide-react"

interface AnalysisStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  status: "pending" | "in-progress" | "completed" | "error"
  result?: any
}

interface StepByStepAnalyzerProps {
  resumeData: any
  jobDescription: string
  onComplete: (results: any) => void
  darkMode: boolean
}

export default function StepByStepAnalyzer({
  resumeData,
  jobDescription,
  onComplete,
  darkMode,
}: StepByStepAnalyzerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [steps, setSteps] = useState<AnalysisStep[]>([
    {
      id: "skills",
      title: "Skills Analysis",
      description: "Analyzing your technical and soft skills against job requirements",
      icon: <Target className="w-5 h-5" />,
      status: "pending",
    },
    {
      id: "experience",
      title: "Experience Review",
      description: "Evaluating work experience alignment and impact",
      icon: <FileText className="w-5 h-5" />,
      status: "pending",
    },
    {
      id: "education",
      title: "Education & Certifications",
      description: "Assessing educational background and qualifications",
      icon: <User className="w-5 h-5" />,
      status: "pending",
    },
    {
      id: "summary",
      title: "Final Assessment",
      description: "Generating comprehensive analysis and recommendations",
      icon: <BarChart3 className="w-5 h-5" />,
      status: "pending",
    },
  ])

  const [analysisResults, setAnalysisResults] = useState<any>({})

  useEffect(() => {
    if (currentStepIndex < steps.length) {
      performStepAnalysis(steps[currentStepIndex])
    } else {
      // All steps completed, compile final results
      onComplete(analysisResults)
    }
  }, [currentStepIndex])

  const performStepAnalysis = async (step: AnalysisStep) => {
    // Update step status to in-progress
    setSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, status: "in-progress" } : s)))

    try {
      const response = await fetch("/api/analyze-step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: step.id,
          resumeSection: getResumeSection(step.id),
          jobRequirements: jobDescription,
          previousSteps: analysisResults,
        }),
      })

      const stepResult = await response.json()

      // Update analysis results
      setAnalysisResults((prev) => ({
        ...prev,
        [step.id]: stepResult,
      }))

      // Update step status to completed
      setSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, status: "completed", result: stepResult } : s)))

      // Move to next step after a brief delay
      setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1)
      }, 1500)
    } catch (error) {
      console.error(`Step ${step.id} failed:`, error)

      // Update step status to error
      setSteps((prev) => prev.map((s) => (s.id === step.id ? { ...s, status: "error" } : s)))

      // Continue to next step even if one fails
      setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1)
      }, 1000)
    }
  }

  const getResumeSection = (stepId: string) => {
    switch (stepId) {
      case "skills":
        return JSON.stringify(resumeData?.skills || {})
      case "experience":
        return JSON.stringify(resumeData?.experience || [])
      case "education":
        return JSON.stringify(resumeData?.education || [])
      case "summary":
        return JSON.stringify(resumeData)
      default:
        return ""
    }
  }

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-500 animate-spin" />
      case "error":
        return (
          <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-white text-xs">!</span>
          </div>
        )
      default:
        return <div className={`w-5 h-5 rounded-full border-2 ${darkMode ? "border-gray-600" : "border-gray-300"}`} />
    }
  }

  return (
    <div className={`rounded-2xl shadow-lg p-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className="text-center mb-8">
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
          AI Analysis in Progress
        </h2>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Breaking down your analysis into focused steps for better insights
        </p>
      </div>

      {/* Progress Steps */}
      <div className="space-y-4 mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-4 relative">
            {/* Step Icon */}
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                step.status === "completed"
                  ? "bg-green-100 text-green-600"
                  : step.status === "in-progress"
                    ? "bg-blue-100 text-blue-600"
                    : step.status === "error"
                      ? "bg-red-100 text-red-600"
                      : darkMode
                        ? "bg-gray-700 text-gray-400"
                        : "bg-gray-100 text-gray-400"
              }`}
            >
              {step.status === "completed" || step.status === "in-progress" || step.status === "error"
                ? getStepStatusIcon(step.status)
                : step.icon}
            </div>

            {/* Step Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{step.title}</h3>
                {step.status === "in-progress" && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Analyzing...</span>
                )}
                {step.status === "completed" && step.result?.stepScore && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Score: {step.result.stepScore}%
                  </span>
                )}
              </div>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{step.description}</p>

              {/* Step Results Preview */}
              {step.status === "completed" && step.result && (
                <div className="mt-2 space-y-1">
                  {step.result.matches?.length > 0 && (
                    <div className="text-xs">
                      <span className="text-green-600 font-medium">✓ Matches: </span>
                      <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                        {step.result.matches.slice(0, 2).join(", ")}
                        {step.result.matches.length > 2 && ` +${step.result.matches.length - 2} more`}
                      </span>
                    </div>
                  )}
                  {step.result.gaps?.length > 0 && (
                    <div className="text-xs">
                      <span className="text-orange-600 font-medium">⚠ Missing: </span>
                      <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                        {step.result.gaps.slice(0, 2).join(", ")}
                        {step.result.gaps.length > 2 && ` +${step.result.gaps.length - 2} more`}
                      </span>
                    </div>
                  )}
                  {step.result.quickWins?.length > 0 && (
                    <div className="text-xs">
                      <span className="text-blue-600 font-medium">💡 Quick Win: </span>
                      <span className={darkMode ? "text-gray-300" : "text-gray-700"}>{step.result.quickWins[0]}</span>
                    </div>
                  )}
                  {step.result.detailedExplanation && (
                    <div className="text-xs mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <span className="font-medium">Analysis: </span>
                      <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                        {step.result.detailedExplanation.substring(0, 100)}...
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div
                className={`absolute left-6 top-12 w-0.5 h-8 ${
                  step.status === "completed" ? "bg-green-300" : darkMode ? "bg-gray-600" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Current Step Details */}
      {currentStepIndex < steps.length && (
        <div
          className={`border rounded-lg p-4 ${
            darkMode ? "bg-blue-900/20 border-blue-700" : "bg-blue-50 border-blue-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className={`w-4 h-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            <span className={`text-sm font-medium ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
              Currently Analyzing
            </span>
          </div>
          <p className={`text-sm ${darkMode ? "text-blue-200" : "text-blue-800"}`}>
            {steps[currentStepIndex]?.description}
          </p>

          {steps[currentStepIndex]?.result?.nextStepPreview && (
            <p className={`text-xs mt-2 ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
              Next: {steps[currentStepIndex].result.nextStepPreview}
            </p>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Analysis Progress
          </span>
          <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {Math.min(currentStepIndex, steps.length)} of {steps.length} steps
          </span>
        </div>
        <div className={`w-full bg-gray-200 rounded-full h-2 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(Math.min(currentStepIndex, steps.length) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
