"use client"

import { useState } from "react"

import type React from "react"

// Add this to your CompleteResumeFlow.tsx - the missing guided approach

// Add after the ContactCollectionForm component:

// Guided Questioning Component
const GuidedQuestioningFlow: React.FC<{
  analysisResults: any // Fixed type from AnalysisResults to any
  contactInfo: any // Fixed type from ContactInfo to any
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

// Update the ResumeOptionSelector to include the guided option
const ResumeOptionSelector: React.FC<{
  analysisResults: any // Fixed type from AnalysisResults to any
  contactInfo: any // Fixed type from ContactInfo to any
  onSelect: (resumeType: string, data?: any) => void
  onBack: () => void
}> = ({ analysisResults, contactInfo, onSelect, onBack }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const getRecommendation = () => {
    const overallMatch = Number.parseInt(analysisResults.overallMatch?.replace("%", "")) || 70
    const skillAnalysis = analysisResults.skillAnalysis || []
    const hasEvidenceGaps = skillAnalysis.some((skill) => !skill.evidence || skill.evidence.trim() === "")

    if (overallMatch >= 75 && !hasEvidenceGaps) {
      return {
        recommended: "complete",
        reason:
          "You have strong qualifications and evidence for most required skills. A complete resume will showcase your readiness effectively.",
        confidence: "high",
      }
    } else {
      return {
        recommended: "guided",
        reason:
          "A guided approach will help you provide specific examples and strengthen areas where evidence is missing.",
        confidence: "high",
      }
    }
  }

  const recommendation = getRecommendation()

  const handleProceed = () => {
    if (selectedOption) {
      if (selectedOption === "complete") {
        onSelect("complete", analysisResults)
      } else {
        onSelect("guided")
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Resume Approach</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Based on your assessment, we can create your resume in two ways. We'll recommend the best approach for your
          situation.
        </p>
      </div>

      {/* Assessment Summary */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{analysisResults.overallMatch || "70%"}</div>
            <div className="text-sm text-gray-600">Skills Match</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {analysisResults.qualificationLevel || "Partially qualified"}
            </div>
            <div className="text-sm text-gray-600">Current Level</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">{analysisResults.timeline || "6-12 months"}</div>
            <div className="text-sm text-gray-600">Development Timeline</div>
          </div>
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Complete Resume Option */}
        <div
          className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
            selectedOption === "complete"
              ? "border-blue-500 bg-blue-50 shadow-lg"
              : "border-gray-200 hover:border-blue-300 hover:shadow-md"
          } ${recommendation.recommended === "complete" ? "ring-2 ring-blue-200" : ""}`}
          onClick={() => setSelectedOption("complete")}
        >
          {recommendation.recommended === "complete" && (
            <div className="absolute -top-3 left-6">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Recommended for You
              </span>
            </div>
          )}

          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                  selectedOption === "complete" ? "border-blue-500 bg-blue-500" : "border-gray-300"
                }`}
              >
                {selectedOption === "complete" && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900">Complete Resume</h3>
            </div>
            <div className="text-2xl">📄</div>
          </div>

          <p className="text-gray-600 mb-4">
            Generate a full resume immediately based on your current assessment. Uses existing information without
            additional questions.
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
            selectedOption === "guided"
              ? "border-blue-500 bg-blue-50 shadow-lg"
              : "border-gray-200 hover:border-blue-300 hover:shadow-md"
          } ${recommendation.recommended === "guided" ? "ring-2 ring-blue-200" : ""}`}
          onClick={() => setSelectedOption("guided")}
        >
          {recommendation.recommended === "guided" && (
            <div className="absolute -top-3 left-6">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Recommended for You
              </span>
            </div>
          )}

          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                  selectedOption === "guided" ? "border-blue-500 bg-blue-500" : "border-gray-300"
                }`}
              >
                {selectedOption === "guided" && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
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
            Answer targeted questions to strengthen your resume. We'll help you provide specific examples and quantify
            achievements.
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-700">
              <span className="text-blue-600 mr-2">✓</span>
              <span>5-7 targeted questions</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="text-blue-600 mr-2">✓</span>
              <span>Help with specific examples</span>
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

      {/* Recommendation */}
      <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-8">
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

      {/* Action Buttons */}
      <div className="text-center space-y-4">
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
