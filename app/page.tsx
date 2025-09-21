"use client"

import { Suspense } from "react"
import EnhancedResumeBuilder from "@/components/enhanced-resume-builder"
import { ThemeProvider } from "@/components/theme-provider"

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 animate-pulse">
          <div className="text-4xl">🤖</div>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Loading AI Resume Builder</h2>
        <p className="text-gray-600">Initializing intelligent analysis system...</p>
      </div>
    </div>
  )
}

function ErrorFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4">
          <div className="text-4xl">⚠️</div>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Something went wrong</h2>
        <p className="text-gray-600 mb-4">Please refresh the page to try again.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  )
}

export default function ResumePage() {
  try {
    return (
      <ThemeProvider>
        <Suspense fallback={<LoadingFallback />}>
          <EnhancedResumeBuilder />
        </Suspense>
      </ThemeProvider>
    )
  } catch (error) {
    console.error("Resume page error:", error)
    return <ErrorFallback />
  }
}
