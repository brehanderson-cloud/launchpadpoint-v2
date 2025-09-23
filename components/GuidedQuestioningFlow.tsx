"use client"

import type React from "react"
import { useState } from "react"

// Guided Questioning Component
const GuidedQuestioningFlow: React.FC<{
  analysisResults: any
  contactInfo: any
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
    const skillsWithoutEvidence = skillAnalysis.filter((skill: any) => !skill.evidence || skill.evidence.trim() === "")
    skillsWithoutEvidence.forEach((skill: any) => {
      questions.push({
        id: `skill_${skill.skill}`,
        type: "skill_evidence",
        skill: skill.skill,
        question: `Tell me about a time you used ${skill.skill} in your work. What specific actions did you take and what were the results?`,
        helpText: `Even if you haven't used ${skill.skill} extensively, think about any situation where you applied similar concepts or had to learn quickly.`,
      })
    })

    // Questions for low-scoring skills (gaps)
    const gapSkills = skillAnalysis.filter((skill: any) => skill.requiredLevel - skill.yourLevel >= 3)
    gapSkills.forEach((skill: any) => {
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
      (skill: any) =>
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
      const enhancedSkillAnalysis = (analysisResults.skillAnalysis || []).map((skill: any) => {
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

export default GuidedQuestioningFlow
