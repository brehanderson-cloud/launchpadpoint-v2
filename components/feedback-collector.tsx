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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-dialog-title"
    >
      <div
        className={`rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto ${darkMode ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3
              className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
              id="feedback-dialog-title"
            >
              Help Us Improve
            </h3>
            <button
              onClick={onClose}
              className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}
              aria-label="Close feedback dialog"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
              role="form"
            >
              {/* Overall Rating */}
              <div>
                <fieldset>
                  <legend className={`block text-sm font-medium mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    How helpful was this analysis? *
                  </legend>
                  <div className="flex gap-2" role="radiogroup" aria-required="true" aria-describedby="rating-help">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`p-1 transition-colors ${
                          star <= rating ? "text-yellow-500" : darkMode ? "text-gray-600" : "text-gray-300"
                        }`}
                        aria-label={`Rate ${star} out of 5 stars`}
                        aria-pressed={star <= rating}
                        role="radio"
                        aria-checked={star === rating}
                      >
                        <Star size={24} fill={star <= rating ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                  <p
                    className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    id="rating-help"
                    aria-live="polite"
                  >
                    {rating === 0 && "Please rate your experience"}
                    {rating === 1 && "Not helpful at all"}
                    {rating === 2 && "Somewhat helpful"}
                    {rating === 3 && "Moderately helpful"}
                    {rating === 4 && "Very helpful"}
                    {rating === 5 && "Extremely helpful"}
                  </p>
                </fieldset>
              </div>

              {/* What was helpful */}
              <div>
                <fieldset>
                  <legend className={`block text-sm font-medium mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    What aspects were most helpful?
                  </legend>
                  <div className="grid grid-cols-1 gap-2" role="group">
                    {helpfulOptions.map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={helpfulAspects.includes(option)}
                          onChange={() => handleHelpfulToggle(option)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          aria-describedby={`helpful-${option.replace(/\s+/g, "-").toLowerCase()}-desc`}
                        />
                        <span
                          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                          id={`helpful-${option.replace(/\s+/g, "-").toLowerCase()}-desc`}
                        >
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Areas for improvement */}
              <div>
                <fieldset>
                  <legend className={`block text-sm font-medium mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    What could be improved?
                  </legend>
                  <div className="grid grid-cols-1 gap-2" role="group">
                    {improvementOptions.map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={improvements.includes(option)}
                          onChange={() => handleImprovementToggle(option)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          aria-describedby={`improvement-${option.replace(/\s+/g, "-").toLowerCase()}-desc`}
                        />
                        <span
                          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                          id={`improvement-${option.replace(/\s+/g, "-").toLowerCase()}-desc`}
                        >
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              {/* Expected outcome */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                  htmlFor="outcome-select"
                >
                  What do you plan to do with these insights?
                </label>
                <select
                  id="outcome-select"
                  value={outcomeExpected}
                  onChange={(e) => setOutcomeExpected(e.target.value)}
                  className={`w-full p-2 border rounded-lg ${
                    darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                  }`}
                  aria-describedby="outcome-help"
                >
                  <option value="">Select...</option>
                  <option value="apply-immediately">Apply to jobs immediately</option>
                  <option value="revise-resume">Revise resume first</option>
                  <option value="develop-skills">Focus on skill development</option>
                  <option value="seek-feedback">Get additional feedback</option>
                  <option value="explore-options">Explore other opportunities</option>
                </select>
                <span id="outcome-help" className="sr-only">
                  Select what you plan to do with the analysis insights
                </span>
              </div>

              {/* Additional comments */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                  htmlFor="comments-textarea"
                >
                  Additional comments or suggestions
                </label>
                <textarea
                  id="comments-textarea"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={3}
                  placeholder="Any specific feedback or suggestions for improvement..."
                  className={`w-full p-3 border rounded-lg resize-none ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  aria-describedby="comments-help"
                />
                <span id="comments-help" className="sr-only">
                  Optional field for additional feedback or suggestions
                </span>
              </div>

              {/* Submit button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={rating === 0 || submitting}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  aria-describedby="submit-help"
                  aria-disabled={rating === 0 || submitting}
                >
                  {submitting ? (
                    <>
                      <div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                        aria-hidden="true"
                      />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} aria-hidden="true" />
                      <span>Submit Feedback</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  aria-label="Skip feedback and close dialog"
                >
                  Skip
                </button>
              </div>
              <span id="submit-help" className="sr-only">
                Submit your feedback to help improve the AI analysis system
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
