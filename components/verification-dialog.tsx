"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle, X } from "lucide-react"

interface Improvement {
  originalText: string
  improvedText: string
}

interface VerificationResult {
  authentic: boolean
  riskLevel: "low" | "medium" | "high"
  concerns: string[]
  alternativePhrasing?: string[]
  recommendation: "approve" | "modify" | "reject"
}

interface VerificationDialogProps {
  improvement: Improvement | null
  onVerify: (text: string) => void
  onClose: () => void
}

export default function VerificationDialog({ improvement, onVerify, onClose }: VerificationDialogProps) {
  const [verification, setVerification] = useState<VerificationResult | null>(null)
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  if (!improvement) {
    return null
  }

  const handleVerify = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/verify-improvement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalText: improvement.originalText,
          proposedImprovement: improvement.improvedText,
          userContext: userAnswers,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setVerification(result)
    } catch (error) {
      console.error("Verification failed:", error)
      setVerification({
        authentic: false,
        riskLevel: "medium",
        concerns: ["Unable to verify at this time. Please try again."],
        alternativePhrasing: [],
        recommendation: "modify",
      })
    }
    setLoading(false)
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="verification-dialog-title"
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold" id="verification-dialog-title">
              Verify Improvement
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close verification dialog"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm font-medium text-gray-600">Proposed Change:</p>
              <p className="text-gray-800">{improvement.improvedText}</p>
            </div>

            {!verification && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Let's verify you can authentically support this improvement:</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="examples-textarea">
                      Can you provide specific examples of this achievement?
                    </label>
                    <textarea
                      id="examples-textarea"
                      className="w-full p-2 border rounded"
                      rows={3}
                      placeholder="Describe specific instances..."
                      onChange={(e) => setUserAnswers({ ...userAnswers, examples: e.target.value })}
                      aria-required="true"
                      aria-describedby="examples-help"
                    />
                    <span id="examples-help" className="sr-only">
                      Provide specific examples to verify the authenticity of your achievement
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="evidence-select">
                      Do you have evidence/documentation to support this?
                    </label>
                    <select
                      id="evidence-select"
                      className="w-full p-2 border rounded"
                      onChange={(e) => setUserAnswers({ ...userAnswers, evidence: e.target.value })}
                      aria-required="true"
                    >
                      <option value="">Select...</option>
                      <option value="yes-documented">Yes, I have documentation</option>
                      <option value="yes-witnessed">Yes, others can verify</option>
                      <option value="no-but-accurate">No documentation, but accurate</option>
                      <option value="unsure">I'm not sure</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleVerify}
                  disabled={loading || !userAnswers.examples}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                  aria-describedby="verify-button-help"
                  aria-disabled={loading || !userAnswers.examples}
                >
                  {loading ? "Verifying..." : "Verify Authenticity"}
                </button>
                <span id="verify-button-help" className="sr-only">
                  Click to verify the authenticity of your proposed improvement
                </span>
              </div>
            )}

            {verification && (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded flex items-start gap-3 ${
                    verification.riskLevel === "low"
                      ? "bg-green-50 border border-green-200"
                      : verification.riskLevel === "medium"
                        ? "bg-yellow-50 border border-yellow-200"
                        : "bg-red-50 border border-red-200"
                  }`}
                  role="status"
                  aria-live="polite"
                  aria-label={`Verification result: ${verification.authentic ? "Verified" : "Concerns found"}`}
                >
                  {verification.riskLevel === "low" ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" aria-hidden="true" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" aria-hidden="true" />
                  )}
                  <div>
                    <p className="font-medium">
                      {verification.authentic ? "Improvement Verified" : "Authenticity Concerns"}
                    </p>
                    {verification.concerns.length > 0 && (
                      <ul className="text-sm mt-2 space-y-1" role="list">
                        {verification.concerns.map((concern, i) => (
                          <li key={i} role="listitem">
                            • {concern}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {verification.alternativePhrasing && verification.alternativePhrasing.length > 0 && (
                  <div>
                    <p className="font-medium mb-2">Suggested Authentic Alternatives:</p>
                    <div className="space-y-2" role="group" aria-label="Alternative phrasing options">
                      {verification.alternativePhrasing.map((alt, i) => (
                        <button
                          key={i}
                          className="w-full text-left p-3 border rounded hover:bg-gray-50"
                          onClick={() => onVerify(alt)}
                          aria-label={`Select alternative phrasing: ${alt}`}
                        >
                          {alt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3" role="group" aria-label="Verification actions">
                  {verification.recommendation === "approve" && (
                    <button
                      onClick={() => onVerify(improvement.improvedText)}
                      className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                      aria-label="Apply the verified improvement to your resume"
                    >
                      Apply Improvement
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
                    aria-label="Cancel verification and close dialog"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
