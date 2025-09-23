"use client"

import type React from "react"
import { useState } from "react"

interface ResumeOptionSelectorProps {
  analysisResults: any
  contactInfo: any
  onSelect: (resumeType: string, data?: any) => void
  onBack: () => void
}

const ResumeOptionSelector: React.FC<ResumeOptionSelectorProps> = ({
  analysisResults,
  contactInfo,
  onSelect,
  onBack,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const getRecommendation = () => {
    const overallMatch = Number.parseInt(analysisResults.overallMatch?.replace("%", "")) || 70
    const skillAnalysis = analysisResults.skillAnalysis || []
    const hasEvidenceGaps = skillAnalysis.some((skill: any) => !skill.evidence || skill.evidence.trim() === "")

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

export default ResumeOptionSelector
