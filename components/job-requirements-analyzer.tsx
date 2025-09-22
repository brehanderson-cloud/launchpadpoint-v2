"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface JobRequirement {
  category: "skills" | "experience" | "education" | "certifications"
  requirement: string
  importance: "critical" | "preferred" | "nice-to-have"
  yearsRequired?: number
  specificTools?: string[]
}

interface ProbingQuestion {
  id: string
  question: string
  requirement: string
  followUp?: string
  examples?: string[]
}

interface JobAnalysisProps {
  jobDescription: string
  onAnalysisComplete: (analysis: any) => void
  darkMode?: boolean
}

export default function JobRequirementsAnalyzer({
  jobDescription,
  onAnalysisComplete,
  darkMode = false,
}: JobAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [requirements, setRequirements] = useState<JobRequirement[]>([])
  const [probingQuestions, setProbingQuestions] = useState<ProbingQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userResponses, setUserResponses] = useState<Record<string, string>>({})
  const [analysisPhase, setAnalysisPhase] = useState<"parsing" | "questioning" | "assessment" | "complete">("parsing")

  const analyzeJobRequirements = async () => {
    setIsAnalyzing(true)
    setAnalysisPhase("parsing")

    try {
      console.log("[v0] Starting job requirements analysis...")
      console.log("[v0] Job description length:", jobDescription.length)

      const response = await fetch("/api/parse-job-requirements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      })

      console.log("[v0] Parse job requirements response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("[v0] Parse job requirements failed:", errorText)
        throw new Error(`Failed to analyze job requirements: ${errorText}`)
      }

      const analysis = await response.json()
      console.log("[v0] Job requirements analysis completed successfully")
      setRequirements(analysis.requirements)
      setProbingQuestions(analysis.probingQuestions)
      setAnalysisPhase("questioning")
    } catch (error) {
      console.error("[v0] Job requirements analysis error:", error)
      if (error instanceof Error) {
        if (error.message.includes("llama-3.1-70b-versatile")) {
          console.error("[v0] DEPRECATED MODEL ERROR DETECTED:", error.message)
        }
      }
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleQuestionResponse = (response: string) => {
    const currentQuestion = probingQuestions[currentQuestionIndex]
    setUserResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: response,
    }))

    if (currentQuestionIndex < probingQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setAnalysisPhase("assessment")
      generateSkillAssessment()
    }
  }

  const generateSkillAssessment = async () => {
    try {
      console.log("[v0] Starting skill assessment...")
      console.log("[v0] Requirements count:", requirements.length)
      console.log("[v0] User responses count:", Object.keys(userResponses).length)

      const response = await fetch("/api/assess-qualifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requirements,
          userResponses,
          jobDescription,
        }),
      })

      console.log("[v0] Assess qualifications response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("[v0] Assess qualifications failed:", errorText)
        throw new Error(`Failed to assess qualifications: ${errorText}`)
      }

      const assessment = await response.json()
      console.log("[v0] Skill assessment completed successfully")
      setAnalysisPhase("complete")
      onAnalysisComplete({
        requirements,
        probingQuestions,
        userResponses,
        assessment,
      })
    } catch (error) {
      console.error("[v0] Skill assessment error:", error)
      if (error instanceof Error) {
        if (error.message.includes("llama-3.1-70b-versatile")) {
          console.error("[v0] DEPRECATED MODEL ERROR DETECTED IN ASSESSMENT:", error.message)
        }
      }
    }
  }

  if (analysisPhase === "parsing") {
    return (
      <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
        <CardHeader>
          <CardTitle className={darkMode ? "text-white" : "text-gray-900"}>Analyzing Job Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
          <p className={`text-center ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Breaking down job accountabilities, skills, and experience requirements...
          </p>
          <Button onClick={analyzeJobRequirements} disabled={isAnalyzing} className="w-full">
            {isAnalyzing ? "Analyzing..." : "Start Job Analysis"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (analysisPhase === "questioning" && probingQuestions.length > 0) {
    const currentQuestion = probingQuestions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / probingQuestions.length) * 100

    return (
      <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
        <CardHeader>
          <CardTitle className={darkMode ? "text-white" : "text-gray-900"}>Skill Assessment Questions</CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Question {currentQuestionIndex + 1} of {probingQuestions.length}
              </span>
              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`p-4 rounded-lg ${darkMode ? "bg-blue-900/20" : "bg-blue-50"}`}>
            <h3 className={`font-semibold mb-2 ${darkMode ? "text-blue-400" : "text-blue-700"}`}>
              {currentQuestion.question}
            </h3>
            <p className={`text-sm mb-3 ${darkMode ? "text-blue-300" : "text-blue-600"}`}>
              <strong>Related to:</strong> {currentQuestion.requirement}
            </p>
            {currentQuestion.examples && (
              <div className={`text-xs ${darkMode ? "text-blue-200" : "text-blue-500"}`}>
                <strong>Examples:</strong> {currentQuestion.examples.join(", ")}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <textarea
              placeholder="Provide specific examples and details about your experience..."
              className={`w-full h-32 p-3 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              onChange={(e) =>
                setUserResponses((prev) => ({
                  ...prev,
                  [currentQuestion.id]: e.target.value,
                }))
              }
              value={userResponses[currentQuestion.id] || ""}
            />

            <div className="flex gap-2">
              <Button
                onClick={() => handleQuestionResponse(userResponses[currentQuestion.id] || "")}
                disabled={!userResponses[currentQuestion.id]?.trim()}
                className="flex-1"
              >
                {currentQuestionIndex === probingQuestions.length - 1 ? "Complete Assessment" : "Next Question"}
              </Button>

              {currentQuestionIndex > 0 && (
                <Button variant="outline" onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}>
                  Previous
                </Button>
              )}
            </div>
          </div>

          {currentQuestion.followUp && (
            <div
              className={`p-3 rounded-lg text-sm ${darkMode ? "bg-yellow-900/20 text-yellow-300" : "bg-yellow-50 text-yellow-700"}`}
            >
              <strong>Follow-up:</strong> {currentQuestion.followUp}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  if (analysisPhase === "assessment") {
    return (
      <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
        <CardContent className="py-8">
          <div className="text-center space-y-4">
            <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto"></div>
            <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Generating Honest Assessment
            </h3>
            <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
              Analyzing your responses and creating a realistic skill evaluation...
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
      <CardHeader>
        <CardTitle className={darkMode ? "text-white" : "text-gray-900"}>Job Requirements Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {requirements.map((req, index) => (
            <div key={index} className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex items-center justify-between mb-2">
                <Badge
                  variant={
                    req.importance === "critical"
                      ? "destructive"
                      : req.importance === "preferred"
                        ? "default"
                        : "secondary"
                  }
                >
                  {req.importance}
                </Badge>
                <Badge variant="outline">{req.category}</Badge>
              </div>
              <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{req.requirement}</p>
              {req.yearsRequired && (
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {req.yearsRequired}+ years required
                </p>
              )}
            </div>
          ))}
        </div>
        <Button onClick={analyzeJobRequirements} className="w-full mt-4">
          Start Skill Assessment
        </Button>
      </CardContent>
    </Card>
  )
}
