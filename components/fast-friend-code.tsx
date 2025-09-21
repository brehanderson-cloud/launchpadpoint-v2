"use client"

import { useState } from "react"

interface FastFriendCodeProps {
  onSuccess?: (analysesRemaining: number) => void
}

export default function FastFriendCode({ onSuccess }: FastFriendCodeProps) {
  const [code, setCode] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const validateCode = async () => {
    if (!code.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/friend-codes-fast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.toUpperCase(),
          action: "validate",
        }),
      })

      const result = await response.json()
      setMessage(result.message)

      if (result.valid && onSuccess) {
        onSuccess(result.analysesRemaining)
      }
    } catch (error) {
      setMessage("Network error. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
      <h3 className="font-semibold text-green-800 mb-2">Friend Code</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="FRIEND-XXXXXXXX"
          className="flex-1 p-2 border rounded text-sm"
          maxLength={16}
        />
        <button
          onClick={validateCode}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "..." : "Apply"}
        </button>
      </div>
      {message && (
        <p className={`text-sm mt-2 ${message.includes("valid") ? "text-green-600" : "text-red-600"}`}>{message}</p>
      )}
    </div>
  )
}
