"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (sessionId) {
      // In a real app, you'd verify the session with Stripe
      // For now, we'll simulate success
      setTimeout(() => {
        setLoading(false)
        // Redirect back to the app with success
        window.location.href = "/?payment=success"
      }, 2000)
    } else {
      setError("Invalid session")
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Processing your payment...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Return to App
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-green-500 text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-4">Your credits have been added to your account.</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Start Analysis
        </button>
      </div>
    </div>
  )
}
