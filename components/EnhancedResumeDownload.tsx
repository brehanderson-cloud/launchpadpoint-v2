"use client"

import type React from "react"
import { useState } from "react"
import { transformCompleteAssessmentData, generateResumeHTML } from "./CompleteResumeFlow"

interface EnhancedResumeDownloadProps {
  analysisResults: any
  contactInfo: any
  resumeType?: string
  onBack: () => void
  paymentCompleted?: boolean
}

const EnhancedResumeDownload: React.FC<EnhancedResumeDownloadProps> = ({
  analysisResults,
  contactInfo,
  resumeType = "complete",
  onBack,
  paymentCompleted,
}) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    setIsGenerating(true)
    setDownloadStatus(null)
    setError(null)

    try {
      console.log("[v0] Generating resume with data:", { analysisResults, contactInfo, resumeType })

      // Transform the data properly
      const transformedData = transformCompleteAssessmentData(analysisResults, contactInfo)
      console.log("[v0] Transformed data:", transformedData)

      // Generate HTML resume
      const resumeHTML = generateResumeHTML(transformedData, resumeType)

      // Create and download the resume
      const blob = new Blob([resumeHTML], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${contactInfo.name.replace(/\s+/g, "_")}_Resume_${resumeType}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setDownloadStatus("success")
    } catch (error: any) {
      console.error("[v0] Download failed:", error)
      setError(error.message)
      setDownloadStatus("error")
    } finally {
      setIsGenerating(false)
    }
  }

  const getResumeTypeInfo = () => {
    if (resumeType === "complete") {
      return {
        title: "Complete Resume",
        description: "Your full resume with all sections completed based on your assessment.",
        icon: "📄",
      }
    } else {
      return {
        title: "Enhanced Resume",
        description: "Your resume enhanced with guided responses and specific examples.",
        icon: "🔧",
      }
    }
  }

  const resumeInfo = getResumeTypeInfo()

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      {/* Back Button */}
      {onBack && (
        <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Change Resume Approach
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">{resumeInfo.icon}</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{resumeInfo.title}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{resumeInfo.description}</p>
      </div>

      {/* Assessment Summary */}
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h3 className="font-semibold text-blue-900 mb-4">Your Assessment Results:</h3>
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

      {/* Features List */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Included:</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "All sections completed and ready to use",
            "Honest presentation of your qualifications",
            "Skills analysis with gap identification",
            "Professional development plan included",
            "Before/after achievement examples",
          ].map((feature, index) => (
            <div key={index} className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Download Section */}
      <div className="text-center space-y-6">
        {downloadStatus === "success" && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-800 font-medium">Resume downloaded successfully!</span>
            </div>
            <p className="text-sm text-green-700 mt-2">Check your downloads folder for your new resume file.</p>
          </div>
        )}

        {downloadStatus === "error" && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-red-800 font-medium">Download failed</span>
            </div>
            <p className="text-sm text-red-700 mt-2">{error}</p>
          </div>
        )}

        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className={`px-8 py-4 text-lg font-medium rounded-lg transition-all duration-200 ${
            isGenerating
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 shadow-lg"
          }`}
        >
          {isGenerating ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating Resume...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download {resumeInfo.title}
            </>
          )}
        </button>

        {downloadStatus === "success" && (
          <div className="mt-4">
            <button onClick={handleDownload} className="text-blue-600 hover:text-blue-800 text-sm underline">
              Download Again
            </button>
          </div>
        )}
      </div>

      {/* Contact Info Summary */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-2">Resume will be generated for:</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <strong>Name:</strong> {contactInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {contactInfo.email}
          </p>
          {contactInfo.phone && (
            <p>
              <strong>Phone:</strong> {contactInfo.phone}
            </p>
          )}
          {contactInfo.location && (
            <p>
              <strong>Location:</strong> {contactInfo.location}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default EnhancedResumeDownload
