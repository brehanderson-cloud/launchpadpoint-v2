// components/SuccessTracker.tsx
"use client"

import { useState } from "react"
import { CheckCircle, TrendingUp, Users, Calendar, X } from "lucide-react"

interface SuccessTrackerProps {
  onClose: () => void
  onSubmit: (outcome: any) => void
  darkMode: boolean
}

export default function SuccessTracker({ onClose, onSubmit, darkMode }: SuccessTrackerProps) {
  const [outcome, setOutcome] = useState("")
  const [details, setDetails] = useState("")
  const [timeframe, setTimeframe] = useState("")
  const [improvements, setImprovements] = useState<string[]>([])

  const outcomeOptions = [
    { value: "interview", label: "Got an interview", icon: <Users className="w-4 h-4" /> },
    { value: "job-offer", label: "Received job offer", icon: <CheckCircle className="w-4 h-4" /> },
    { value: "no-response", label: "No response yet", icon: <Calendar className="w-4 h-4" /> },
    { value: "rejection", label: "Application rejected", icon: <X className="w-4 h-4" /> },
    { value: "still-applying", label: "Still applying", icon: <TrendingUp className="w-4 h-4" /> },
  ]

  const improvementOptions = [
    "Rewrote resume using suggestions",
    "Focused on skill development",
    "Applied to more suitable roles",
    "Improved interview preparation",
    "Networked more effectively",
    "Adjusted salary expectations",
  ]

  const handleImprovementToggle = (improvement: string) => {
    setImprovements((prev) =>
      prev.includes(improvement) ? prev.filter((i) => i !== improvement) : [...prev, improvement],
    )
  }

  const handleSubmit = () => {
    const outcomeData = {
      outcome,
      details,
      timeframe,
      improvements,
      timestamp: new Date().toISOString(),
    }

    onSubmit(outcomeData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`rounded-lg max-w-lg w-full ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Follow-up: How did it go?
            </h3>
            <button
              onClick={onClose}
              className={`${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Outcome selection */}
            <div>
              <label className={`block text-sm font-medium mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                What happened after using our analysis?
              </label>
              <div className="space-y-2">
                {outcomeOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border hover:bg-opacity-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="outcome"
                      value={option.value}
                      checked={outcome === option.value}
                      onChange={(e) => setOutcome(e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className={`${darkMode ? "text-blue-400" : "text-blue-600"}`}>{option.icon}</div>
                    <span className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Timeframe */}
            {outcome && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  How long after using our analysis?
                </label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className={`w-full p-2 border rounded-lg ${
                    darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">Select timeframe...</option>
                  <option value="within-week">Within a week</option>
                  <option value="1-2-weeks">1-2 weeks</option>
                  <option value="3-4-weeks">3-4 weeks</option>
                  <option value="1-2-months">1-2 months</option>
                  <option value="longer">Longer than 2 months</option>
                </select>
              </div>
            )}

            {/* Actions taken */}
            {outcome && (
              <div>
                <label className={`block text-sm font-medium mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  What actions did you take based on our suggestions?
                </label>
                <div className="space-y-2">
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
            )}

            {/* Additional details */}
            {outcome && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Any additional details?
                </label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={3}
                  placeholder="Share any specific feedback about what worked or didn't work..."
                  className={`w-full p-3 border rounded-lg resize-none ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>
            )}

            {/* Submit button */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSubmit}
                disabled={!outcome}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Share Update
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
