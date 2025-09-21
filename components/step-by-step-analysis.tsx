"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface StepByStepAnalysisProps {
  resumeText: string
  jobDescription: string
  onComplete: (results: any) => void
  onCancel: () => void
  darkMode?: boolean
}

interface AnalysisPhase {
  id: string
  title: string
  description: string
  icon: string
  status: "pending" | "analyzing" | "complete" | "error"
  results?: any
}

export default function StepByStepAnalysis({
  resumeText,
  jobDescription,
  onComplete,
  onCancel,
  darkMode = false,
}: StepByStepAnalysisProps) {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [phases, setPhases] = useState<AnalysisPhase[]>([
    {
      id: "skills",
      title: "Skills Analysis",
      description: "Analyzing your technical and soft skills against job requirements",
      icon: "🎯",
      status: "pending",
    },
    {
      id: "experience",
      title: "Experience Review",
      description: "Evaluating your work history and achievements",
      icon: "💼",
      status: "pending",
    },
    {
      id: "education",
      title: "Education & Certifications",
      description: "Reviewing your educational background and credentials",
      icon: "🎓",
      status: "pending",
    },
    {
      id: "summary",
      title: "Professional Summary",
      description: "Optimizing your professional summary and value proposition",
      icon: "📝",
      status: "pending",
    },
  ])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [combinedResults, setCombinedResults] = useState<any>({})

  const analyzePhase = async (phase: AnalysisPhase) => {
    setIsAnalyzing(true)

    // Update phase status to analyzing
    setPhases((prev) => prev.map((p) => (p.id === phase.id ? { ...p, status: "analyzing" as const } : p)))

    try {
      const response = await fetch("/api/verify-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
          phase: phase.id,
        }),
      })

      if (!response.ok) {
        throw new Error(`Analysis failed for ${phase.title}`)
      }

      const result = await response.json()

      // Update phase with results
      setPhases((prev) =>
        prev.map((p) => (p.id === phase.id ? { ...p, status: "complete" as const, results: result.analysis } : p)),
      )

      // Store results for final combination
      setCombinedResults((prev) => ({
        ...prev,
        [phase.id]: result.analysis,
      }))

      // Move to next phase or complete
      if (currentPhaseIndex < phases.length - 1) {
        setCurrentPhaseIndex((prev) => prev + 1)
      } else {
        // All phases complete - combine results and finish
        const finalResults = {
          ...combinedResults,
          [phase.id]: result.analysis,
          stepByStepComplete: true,
          overallScore: calculateOverallScore({
            ...combinedResults,
            [phase.id]: result.analysis,
          }),
        }
        onComplete(finalResults)
      }
    } catch (error) {
      console.error(`Phase ${phase.id} analysis error:`, error)
      setPhases((prev) => prev.map((p) => (p.id === phase.id ? { ...p, status: "error" as const } : p)))
    } finally {
      setIsAnalyzing(false)
    }
  }

  const calculateOverallScore = (results: any) => {
    // Simple scoring based on available results
    let totalScore = 0
    let phaseCount = 0

    Object.keys(results).forEach((key) => {
      if (key !== "stepByStepComplete" && results[key]) {
        // Extract score from analysis text or assign default
        totalScore += 75 // Default score per phase
        phaseCount++
      }
    })

    return phaseCount > 0 ? Math.round(totalScore / phaseCount) : 0
  }

  const startAnalysis = () => {
    if (phases.length > 0) {
      analyzePhase(phases[0])
    }
  }

  const retryPhase = (phaseId: string) => {
    const phase = phases.find((p) => p.id === phaseId)
    if (phase) {
      analyzePhase(phase)
    }
  }

  const skipToResults = () => {
    // Skip remaining phases and show current results
    const finalResults = {
      ...combinedResults,
      stepByStepComplete: true,
      skipped: true,
      overallScore: calculateOverallScore(combinedResults),
    }
    onComplete(finalResults)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className={`rounded-2xl shadow-lg p-6 text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Step-by-Step Analysis
        </h2>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          We'll analyze your resume in phases for comprehensive insights
        </p>
      </div>

      {/* Progress Bar */}
      <div className={`rounded-lg p-4 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}>
        <div className="flex justify-between items-center mb-4">
          <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Progress: {phases.filter((p) => p.status === "complete").length} of {phases.length} phases
          </span>
          <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {Math.round((phases.filter((p) => p.status === "complete").length / phases.length) * 100)}%
          </span>
        </div>
        <div className={`w-full bg-gray-200 rounded-full h-2 ${darkMode ? "bg-gray-700" : ""}`}>
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${(phases.filter((p) => p.status === "complete").length / phases.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Phase Cards */}
      <div className="grid gap-4">
        {phases.map((phase, index) => (
          <Card
            key={phase.id}
            className={`p-6 transition-all duration-300 ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            } ${index === currentPhaseIndex && phase.status === "analyzing" ? "ring-2 ring-blue-500 shadow-lg" : ""}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div
                  className={`text-2xl p-2 rounded-lg ${
                    phase.status === "complete"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : phase.status === "analyzing"
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : phase.status === "error"
                          ? "bg-red-100 dark:bg-red-900/30"
                          : "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  {phase.status === "complete"
                    ? "✅"
                    : phase.status === "analyzing"
                      ? "⏳"
                      : phase.status === "error"
                        ? "❌"
                        : phase.icon}
                </div>

                <div className="flex-1">
                  <h3 className={`text-lg font-semibold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {phase.title}
                  </h3>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{phase.description}</p>

                  {phase.status === "analyzing" && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
                      <span className={`text-sm ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Analyzing...</span>
                    </div>
                  )}

                  {phase.status === "complete" && phase.results && (
                    <div className={`mt-3 p-3 rounded-lg ${darkMode ? "bg-green-900/20" : "bg-green-50"}`}>
                      <p className={`text-sm ${darkMode ? "text-green-300" : "text-green-700"}`}>
                        {typeof phase.results === "string"
                          ? phase.results.substring(0, 150) + "..."
                          : "Analysis complete - detailed results available"}
                      </p>
                    </div>
                  )}

                  {phase.status === "error" && (
                    <div className={`mt-3 p-3 rounded-lg ${darkMode ? "bg-red-900/20" : "bg-red-50"}`}>
                      <p className={`text-sm ${darkMode ? "text-red-300" : "text-red-700"}`}>
                        Analysis failed. Please try again.
                      </p>
                      <Button onClick={() => retryPhase(phase.id)} size="sm" variant="outline" className="mt-2">
                        Retry
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`text-xs px-2 py-1 rounded ${
                  phase.status === "complete"
                    ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
                    : phase.status === "analyzing"
                      ? "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                      : phase.status === "error"
                        ? "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200"
                        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                }`}
              >
                {phase.status === "complete"
                  ? "Complete"
                  : phase.status === "analyzing"
                    ? "In Progress"
                    : phase.status === "error"
                      ? "Error"
                      : "Pending"}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <Button
          onClick={onCancel}
          variant="outline"
          className={darkMode ? "border-gray-600 text-gray-300 hover:text-white" : ""}
        >
          Cancel
        </Button>

        <div className="flex gap-3">
          {phases.filter((p) => p.status === "complete").length > 0 && (
            <Button
              onClick={skipToResults}
              variant="outline"
              className={darkMode ? "border-gray-600 text-gray-300 hover:text-white" : ""}
            >
              Skip to Results
            </Button>
          )}

          {phases.filter((p) => p.status === "pending").length === phases.length && (
            <Button onClick={startAnalysis} className="bg-blue-600 hover:bg-blue-700 text-white">
              Start Analysis
            </Button>
          )}

          {currentPhaseIndex < phases.length - 1 && phases[currentPhaseIndex].status === "complete" && (
            <Button
              onClick={() => analyzePhase(phases[currentPhaseIndex + 1])}
              disabled={isAnalyzing}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Continue to Next Phase
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
