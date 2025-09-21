"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface LearningFeedbackSystemProps {
  analysisResults: any
  isOpen: boolean
  onClose: () => void
  darkMode?: boolean
}

interface FeedbackData {
  rating: number
  accuracy: number
  helpfulness: number
  suggestions: string
  wouldRecommend: boolean
  mostValuable: string
  improvements: string
}

interface SuccessMetrics {
  interviewsScheduled: number
  jobApplications: number
  positiveResponses: number
  salaryIncrease: number
  timeToHire: number
}

export default function LearningFeedbackSystem({
  analysisResults,
  isOpen,
  onClose,
  darkMode = false,
}: LearningFeedbackSystemProps) {
  const [currentTab, setCurrentTab] = useState<"feedback" | "success" | "learning">("feedback")
  const [feedback, setFeedback] = useState<FeedbackData>({
    rating: 0,
    accuracy: 0,
    helpfulness: 0,
    suggestions: "",
    wouldRecommend: false,
    mostValuable: "",
    improvements: "",
  })
  const [successMetrics, setSuccessMetrics] = useState<SuccessMetrics>({
    interviewsScheduled: 0,
    jobApplications: 0,
    positiveResponses: 0,
    salaryIncrease: 0,
    timeToHire: 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [learningInsights, setLearningInsights] = useState<any>(null)

  useEffect(() => {
    if (isOpen) {
      loadUserProgress()
      generateLearningInsights()
    }
  }, [isOpen])

  const loadUserProgress = () => {
    const userId = localStorage.getItem("userId") || "anonymous"
    const savedMetrics = localStorage.getItem(`success_metrics_${userId}`)
    if (savedMetrics) {
      setSuccessMetrics(JSON.parse(savedMetrics))
    }
  }

  const saveUserProgress = () => {
    const userId = localStorage.getItem("userId") || "anonymous"
    localStorage.setItem(`success_metrics_${userId}`, JSON.stringify(successMetrics))
  }

  const generateLearningInsights = () => {
    if (!analysisResults) return

    const insights = {
      personalizedTips: [
        `Based on your ${analysisResults.matchPercentage}% match score, focus on strengthening your weakest areas first.`,
        "Consider updating your resume every 3-6 months to reflect new skills and achievements.",
        "Tailor your resume for each application - generic resumes get 40% fewer responses.",
      ],
      industryTrends: [
        "Remote work skills are increasingly valued across all industries.",
        "Data analysis and digital literacy are becoming essential in most roles.",
        "Soft skills like adaptability and communication are highly sought after.",
      ],
      nextSteps: [
        "Apply the suggested improvements to your resume",
        "Practice interviewing with the enhanced resume",
        "Track your application success rate",
        "Gather feedback from hiring managers",
      ],
    }

    setLearningInsights(insights)
  }

  const submitFeedback = async () => {
    setIsSubmitting(true)

    try {
      // Store feedback locally (in a real app, this would go to a backend)
      const userId = localStorage.getItem("userId") || "anonymous"
      const feedbackData = {
        ...feedback,
        userId,
        timestamp: new Date().toISOString(),
        analysisId: `analysis_${Date.now()}`,
        matchPercentage: analysisResults?.matchPercentage || 0,
      }

      const existingFeedback = JSON.parse(localStorage.getItem("user_feedback") || "[]")
      existingFeedback.push(feedbackData)
      localStorage.setItem("user_feedback", JSON.stringify(existingFeedback))

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitted(true)
      console.log("[v0] Feedback submitted:", feedbackData)
    } catch (error) {
      console.error("[v0] Feedback submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateSuccessMetrics = () => {
    saveUserProgress()
    console.log("[v0] Success metrics updated:", successMetrics)
  }

  const StarRating = ({
    value,
    onChange,
    label,
  }: { value: number; onChange: (rating: number) => void; label: string }) => (
    <div className="space-y-2">
      <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            className={`text-2xl transition-colors ${
              star <= value ? "text-yellow-400" : darkMode ? "text-gray-600" : "text-gray-300"
            } hover:text-yellow-400`}
          >
            ⭐
          </button>
        ))}
      </div>
    </div>
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex justify-between items-center">
            <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Learning & Feedback Center
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              ✕
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mt-4">
            {[
              { id: "feedback", label: "Give Feedback", icon: "💬" },
              { id: "success", label: "Track Success", icon: "📈" },
              { id: "learning", label: "Learning Insights", icon: "🎓" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentTab === tab.id
                    ? "bg-blue-500 text-white"
                    : darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentTab === "feedback" && (
            <div className="space-y-6">
              {submitted ? (
                <div className={`text-center p-8 rounded-lg ${darkMode ? "bg-green-900/20" : "bg-green-50"}`}>
                  <div className="text-4xl mb-4">🙏</div>
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-green-400" : "text-green-700"}`}>
                    Thank You for Your Feedback!
                  </h3>
                  <p className={`${darkMode ? "text-green-300" : "text-green-600"}`}>
                    Your input helps us improve our AI analysis and provide better insights for everyone.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      How was your experience with the AI analysis?
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <StarRating
                        value={feedback.rating}
                        onChange={(rating) => setFeedback((prev) => ({ ...prev, rating }))}
                        label="Overall Experience"
                      />

                      <StarRating
                        value={feedback.accuracy}
                        onChange={(accuracy) => setFeedback((prev) => ({ ...prev, accuracy }))}
                        label="Analysis Accuracy"
                      />

                      <StarRating
                        value={feedback.helpfulness}
                        onChange={(helpfulness) => setFeedback((prev) => ({ ...prev, helpfulness }))}
                        label="Helpfulness of Suggestions"
                      />

                      <div className="space-y-2">
                        <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Would you recommend this tool?
                        </label>
                        <div className="flex gap-4">
                          <button
                            onClick={() => setFeedback((prev) => ({ ...prev, wouldRecommend: true }))}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              feedback.wouldRecommend
                                ? "bg-green-500 text-white"
                                : darkMode
                                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            👍 Yes
                          </button>
                          <button
                            onClick={() => setFeedback((prev) => ({ ...prev, wouldRecommend: false }))}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              !feedback.wouldRecommend && feedback.wouldRecommend !== undefined
                                ? "bg-red-500 text-white"
                                : darkMode
                                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            👎 No
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        What was most valuable about the analysis?
                      </label>
                      <Textarea
                        value={feedback.mostValuable}
                        onChange={(e) => setFeedback((prev) => ({ ...prev, mostValuable: e.target.value }))}
                        placeholder="e.g., The gap analysis helped me identify specific skills to develop..."
                        className={`${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        How can we improve the analysis?
                      </label>
                      <Textarea
                        value={feedback.improvements}
                        onChange={(e) => setFeedback((prev) => ({ ...prev, improvements: e.target.value }))}
                        placeholder="e.g., More industry-specific insights, better formatting suggestions..."
                        className={`${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Additional suggestions or comments
                      </label>
                      <Textarea
                        value={feedback.suggestions}
                        onChange={(e) => setFeedback((prev) => ({ ...prev, suggestions: e.target.value }))}
                        placeholder="Any other feedback or feature requests..."
                        className={`${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      onClick={onClose}
                      variant="outline"
                      className={darkMode ? "border-gray-600 text-gray-300 hover:text-white" : ""}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={submitFeedback}
                      disabled={isSubmitting || feedback.rating === 0}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Feedback"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}

          {currentTab === "success" && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Track Your Job Search Success
                </h3>
                <p className={`text-sm mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Help us understand the impact of our analysis by tracking your progress
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className={`p-4 ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Job Applications Sent
                  </label>
                  <input
                    type="number"
                    value={successMetrics.jobApplications}
                    onChange={(e) =>
                      setSuccessMetrics((prev) => ({ ...prev, jobApplications: Number.parseInt(e.target.value) || 0 }))
                    }
                    className={`w-full p-2 rounded-lg border ${darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300"}`}
                    min="0"
                  />
                </Card>

                <Card className={`p-4 ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Positive Responses Received
                  </label>
                  <input
                    type="number"
                    value={successMetrics.positiveResponses}
                    onChange={(e) =>
                      setSuccessMetrics((prev) => ({
                        ...prev,
                        positiveResponses: Number.parseInt(e.target.value) || 0,
                      }))
                    }
                    className={`w-full p-2 rounded-lg border ${darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300"}`}
                    min="0"
                  />
                </Card>

                <Card className={`p-4 ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Interviews Scheduled
                  </label>
                  <input
                    type="number"
                    value={successMetrics.interviewsScheduled}
                    onChange={(e) =>
                      setSuccessMetrics((prev) => ({
                        ...prev,
                        interviewsScheduled: Number.parseInt(e.target.value) || 0,
                      }))
                    }
                    className={`w-full p-2 rounded-lg border ${darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300"}`}
                    min="0"
                  />
                </Card>

                <Card className={`p-4 ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Salary Increase Achieved ($)
                  </label>
                  <input
                    type="number"
                    value={successMetrics.salaryIncrease}
                    onChange={(e) =>
                      setSuccessMetrics((prev) => ({ ...prev, salaryIncrease: Number.parseInt(e.target.value) || 0 }))
                    }
                    className={`w-full p-2 rounded-lg border ${darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300"}`}
                    min="0"
                    step="1000"
                  />
                </Card>

                <Card className={`p-4 ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Time to Hire (days)
                  </label>
                  <input
                    type="number"
                    value={successMetrics.timeToHire}
                    onChange={(e) =>
                      setSuccessMetrics((prev) => ({ ...prev, timeToHire: Number.parseInt(e.target.value) || 0 }))
                    }
                    className={`w-full p-2 rounded-lg border ${darkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300"}`}
                    min="0"
                  />
                </Card>
              </div>

              {/* Success Rate Display */}
              {successMetrics.jobApplications > 0 && (
                <Card
                  className={`p-4 ${darkMode ? "bg-green-900/20 border-green-700" : "bg-green-50 border-green-200"}`}
                >
                  <h4 className={`font-semibold mb-2 ${darkMode ? "text-green-400" : "text-green-700"}`}>
                    Your Success Metrics
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className={`${darkMode ? "text-green-300" : "text-green-600"}`}>
                        <strong>Response Rate:</strong>
                        <br />
                        {Math.round((successMetrics.positiveResponses / successMetrics.jobApplications) * 100)}%
                      </p>
                    </div>
                    <div>
                      <p className={`${darkMode ? "text-green-300" : "text-green-600"}`}>
                        <strong>Interview Rate:</strong>
                        <br />
                        {Math.round((successMetrics.interviewsScheduled / successMetrics.jobApplications) * 100)}%
                      </p>
                    </div>
                    <div>
                      <p className={`${darkMode ? "text-green-300" : "text-green-600"}`}>
                        <strong>Salary Increase:</strong>
                        <br />${successMetrics.salaryIncrease.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className={`${darkMode ? "text-green-300" : "text-green-600"}`}>
                        <strong>Time to Hire:</strong>
                        <br />
                        {successMetrics.timeToHire} days
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              <div className="flex justify-end">
                <Button onClick={updateSuccessMetrics} className="bg-green-600 hover:bg-green-700 text-white">
                  Save Progress
                </Button>
              </div>
            </div>
          )}

          {currentTab === "learning" && (
            <div className="space-y-6">
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Personalized Learning Insights
                </h3>
                <p className={`text-sm mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Based on your analysis results and industry trends
                </p>
              </div>

              {learningInsights && (
                <div className="space-y-6">
                  <Card className={`p-6 ${darkMode ? "bg-blue-900/20 border-blue-700" : "bg-blue-50 border-blue-200"}`}>
                    <h4 className={`font-semibold mb-3 ${darkMode ? "text-blue-400" : "text-blue-700"}`}>
                      💡 Personalized Tips
                    </h4>
                    <ul className="space-y-2">
                      {learningInsights.personalizedTips.map((tip: string, index: number) => (
                        <li key={index} className={`text-sm ${darkMode ? "text-blue-300" : "text-blue-600"}`}>
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Card
                    className={`p-6 ${darkMode ? "bg-purple-900/20 border-purple-700" : "bg-purple-50 border-purple-200"}`}
                  >
                    <h4 className={`font-semibold mb-3 ${darkMode ? "text-purple-400" : "text-purple-700"}`}>
                      📊 Industry Trends
                    </h4>
                    <ul className="space-y-2">
                      {learningInsights.industryTrends.map((trend: string, index: number) => (
                        <li key={index} className={`text-sm ${darkMode ? "text-purple-300" : "text-purple-600"}`}>
                          • {trend}
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Card
                    className={`p-6 ${darkMode ? "bg-green-900/20 border-green-700" : "bg-green-50 border-green-200"}`}
                  >
                    <h4 className={`font-semibold mb-3 ${darkMode ? "text-green-400" : "text-green-700"}`}>
                      🎯 Recommended Next Steps
                    </h4>
                    <ul className="space-y-2">
                      {learningInsights.nextSteps.map((step: string, index: number) => (
                        <li key={index} className={`text-sm ${darkMode ? "text-green-300" : "text-green-600"}`}>
                          {index + 1}. {step}
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {/* Progress Tracking */}
                  <Card className={`p-6 ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}`}>
                    <h4 className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      📈 Your Learning Journey
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          Resume Analysis Completed
                        </span>
                        <span className="text-green-500 font-semibold">✓</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          Improvements Identified
                        </span>
                        <span className="text-green-500 font-semibold">✓</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          Action Plan Created
                        </span>
                        <span className="text-yellow-500 font-semibold">⏳</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                          Resume Updated
                        </span>
                        <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Pending</span>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
