// components/FeedbackCollector.tsx
"use client"

import { useState } from "react"
import { Star, X, Send } from "lucide-react"

interface FeedbackCollectorProps {
  analysisResults: any
  onClose: () => void
  onSubmit: (feedback: any) => void
  darkMode: boolean
}

export default function FeedbackCollector({ analysisResults, onClose, onSubmit, darkMode }: FeedbackCollectorProps) {
  const [rating, setRating] = useState(0)
  const [helpfulAspects, setHelpfulAspects] = useState<string[]>([])
  const [improvements, setImprovements] = useState<string[]>([])
  const [comments, setComments] = useState("")
  const [outcomeExpected, setOutcomeExpected] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const helpfulOptions = [
    "Skills analysis was accurate",
    "Gap analysis was realistic",
    "Before/after examples were useful",
    "Overall assessment was honest",
    "Recommendations were actionable",
    "Step-by-step process was clear",
  ]

  const improvementOptions = [
    "More specific examples needed",
    "Analysis was too generic",
    "Missing important skills",
    "Unrealistic timeline estimates",
    "Suggestions were not actionable",
    "Interface was confusing",
  ]

  const handleHelpfulToggle = (aspect: string) => {
    setHelpfulAspects((prev) => (prev.includes(aspect) ? prev.filter((a) => a !== aspect) : [...prev, aspect]))
  }

  const handleImprovementToggle = (improvement: string) => {
    setImprovements((prev) =>
      prev.includes(improvement) ? prev.filter((i) => i !== improvement) : [...prev, improvement],
    )
  }

  const handleSubmit = async () => {
    if (rating === 0) return

    setSubmitting(true)

    const feedbackData = {
      rating,
      helpfulAspects,
      improvements,
      comments,
      outcomeExpected,
      analysisData: {
        matchPercentage: analysisResults?.matchPercentage,
        skillsCount: analysisResults?.qualificationsAnalysis?.skillsAnalysis?.length || 0,
        gapsCount: analysisResults?.qualificationsAnalysis?.gapAnalysis?.length || 0,
        examplesCount: analysisResults?.qualificationsAnalysis?.beforeAfterExamples?.length || 0,
      },
      timestamp: new Date().toISOString(),
    }

    try {
      await fetch("/api/learn-improvements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feedback: feedbackData,
          improvementData: analysisResults,
          userOutcome: outcomeExpected,
        }),
      })

      onSubmit(feedbackData)
    } catch (error) {
      console.error("Failed to submit feedback:", error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Help Us Improve</h3>
            <button
              onClick={onClose}
              className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Overall Rating */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                How helpful was this analysis? *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`p-1 transition-colors ${
                      star <= rating ? "text-yellow-500" : darkMode ? "text-gray-600" : "text-gray-300"
                    }`}
                  >
                    <Star size={24} fill={star <= rating ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
              <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                {rating === 0 && "Please rate your experience"}
                {rating === 1 && "Not helpful at all"}
                {rating === 2 && "Somewhat helpful"}
                {rating === 3 && "Moderately helpful"}
                {rating === 4 && "Very helpful"}
                {rating === 5 && "Extremely helpful"}
              </p>
            </div>

            {/* What was helpful */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                What aspects were most helpful?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {helpfulOptions.map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={helpfulAspects.includes(option)}
                      onChange={() => handleHelpfulToggle(option)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Areas for improvement */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                What could be improved?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {improvementOptions.map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={improvements.includes(option)}
                      onChange={() => handleImprovementToggle(option)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Expected outcome */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                What do you plan to do with these insights?
              </label>
              <select
                value={outcomeExpected}
                onChange={(e) => setOutcomeExpected(e.target.value)}
                className={`w-full p-2 border rounded-lg ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option value="">Select...</option>
                <option value="apply-immediately">Apply to jobs immediately</option>
                <option value="revise-resume">Revise resume first</option>
                <option value="develop-skills">Focus on skill development</option>
                <option value="seek-feedback">Get additional feedback</option>
                <option value="explore-options">Explore other opportunities</option>
              </select>
            </div>

            {/* Additional comments */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Additional comments or suggestions
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
                placeholder="Any specific feedback or suggestions for improvement..."
                className={`w-full p-3 border rounded-lg resize-none ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>

            {/* Submit button */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSubmit}
                disabled={rating === 0 || submitting}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Feedback
                  </>
                )}
              </button>
              <button
                onClick={onClose}
                className={`px-6 py-3 rounded-lg font-medium ${
                  darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
