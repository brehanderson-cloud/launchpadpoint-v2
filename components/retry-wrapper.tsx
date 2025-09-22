// components/RetryWrapper.tsx
"use client"

import type React from "react"

import { useState } from "react"

interface RetryWrapperProps {
  children: React.ReactNode
  onRetry: () => Promise<void>
  maxRetries?: number
  retryDelay?: number
  fallback?: React.ReactNode
}

export default function RetryWrapper({
  children,
  onRetry,
  maxRetries = 3,
  retryDelay = 1000,
  fallback,
}: RetryWrapperProps) {
  const [error, setError] = useState<Error | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = async () => {
    if (retryCount >= maxRetries) return

    setIsRetrying(true)
    setRetryCount((prev) => prev + 1)

    try {
      await new Promise((resolve) => setTimeout(resolve, retryDelay))
      await onRetry()
      setError(null)
      setRetryCount(0)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsRetrying(false)
    }
  }

  const resetError = () => {
    setError(null)
    setRetryCount(0)
  }

  if (error && retryCount >= maxRetries) {
    return (
      fallback || (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-5 h-5 text-red-600">⚠️</span>
            <h3 className="font-medium text-red-800">Operation Failed</h3>
          </div>
          <p className="text-red-700 text-sm mb-4">
            We've tried {maxRetries} times but couldn't complete this operation. Please check your connection and try
            again later.
          </p>
          <button
            onClick={resetError}
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
          >
            Reset and Try Again
          </button>
        </div>
      )
    )
  }

  if (error && retryCount < maxRetries) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-5 h-5 text-yellow-600">⚠️</span>
          <h3 className="font-medium text-yellow-800">Temporary Issue</h3>
        </div>
        <p className="text-yellow-700 text-sm mb-4">
          Something went wrong, but we can try again. Attempt {retryCount} of {maxRetries}.
        </p>
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-700 disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          {isRetrying ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Retrying...
            </>
          ) : (
            <>
              <span className="w-4 h-4">↻</span>
              Retry Now
            </>
          )}
        </button>
      </div>
    )
  }

  return <>{children}</>
}
