"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get("session_id")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [sessionData, setSessionData] = useState(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // Check for any stored session data
        const storedData = localStorage.getItem("payment_session")
        if (storedData) {
          setSessionData(JSON.parse(storedData))
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error)
      }
    }

    if (sessionId) {
      // In a real app, you'd verify the session with Stripe
      // For now, we'll simulate success
      setTimeout(() => {
        setLoading(false)
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(
              "payment_success",
              JSON.stringify({
                sessionId,
                timestamp: Date.now(),
                status: "completed",
              }),
            )
          } catch (error) {
            console.error("Error storing payment success:", error)
          }
        }
        // Redirect back to the app with success
        setTimeout(() => {
          router.push("/?payment=success")
        }, 2000)
      }, 2000)
    } else {
      setError("Invalid session")
      setLoading(false)
    }
  }, [sessionId, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your payment...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">Payment Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to App
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-green-500 text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your credits have been added to your account and you can now start analyzing resumes.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => router.push("/")}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Start Resume Analysis
          </button>
          <p className="text-sm text-gray-500">Redirecting automatically in 2 seconds...</p>
        </div>
      </div>
    </div>
  )
}
