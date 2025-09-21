// components/ProgressSaver.tsx
"use client"

import { useEffect } from "react"
import { Check } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface ProgressSaverProps {
  resumeText: string
  jobDescription: string
  analysisResults: any
  currentStep: string
  darkMode: boolean
}

export default function ProgressSaver({
  resumeText,
  jobDescription,
  analysisResults,
  currentStep,
  darkMode,
}: ProgressSaverProps) {
  const [savedProgress, setSavedProgress] = useLocalStorage("resume-builder-progress", null)
  const [lastSaved, setLastSaved] = useLocalStorage("resume-builder-last-saved", null)

  useEffect(() => {
    const saveProgress = () => {
      const progressData = {
        resumeText,
        jobDescription,
        analysisResults,
        currentStep,
        timestamp: new Date().toISOString(),
      }

      setSavedProgress(progressData)
      setLastSaved(new Date().toISOString())
    }

    // Auto-save every 30 seconds if there's content
    if (resumeText || jobDescription || analysisResults) {
      const interval = setInterval(saveProgress, 30000)
      return () => clearInterval(interval)
    }
  }, [resumeText, jobDescription, analysisResults, currentStep, setSavedProgress, setLastSaved])

  const formatLastSaved = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`
    return date.toLocaleDateString()
  }

  if (!lastSaved) return null

  return (
    <div
      className={`fixed bottom-4 left-4 px-3 py-2 rounded-lg shadow-lg text-xs flex items-center gap-2 ${
        darkMode ? "bg-gray-800 text-gray-300 border border-gray-700" : "bg-white text-gray-600 border border-gray-200"
      }`}
    >
      <Check className="w-3 h-3 text-green-500" />
      <span>Saved {formatLastSaved(lastSaved)}</span>
    </div>
  )
}
