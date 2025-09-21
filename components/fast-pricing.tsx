"use client"

import { useState, useEffect } from "react"

export default function FastPricing() {
  const [loading, setLoading] = useState<string | null>(null)
  const [userId, setUserId] = useState<string>("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId") || `user_${Date.now()}`
      setUserId(storedUserId)
    }
  }, [])

  const handlePurchase = async (priceType: string) => {
    setLoading(priceType)

    try {
      const response = await fetch("/api/stripe-checkout-fast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceType,
          userId: userId || `user_${Date.now()}`,
        }),
      })

      const { sessionId } = await response.json()

      // Redirect to Stripe Checkout
      if (typeof window !== "undefined") {
        window.location.href = `https://checkout.stripe.com/pay/${sessionId}`
      }
    } catch (error) {
      setLoading(null)
      alert("Payment setup failed. Please try again.")
    }
  }

  const plans = [
    { id: "single", name: "Single Analysis", price: "$4.99", desc: "One detailed analysis" },
    { id: "pack", name: "5-Pack", price: "$19.99", desc: "Save $5 - Best value", featured: true },
    { id: "monthly", name: "Monthly", price: "$9.99", desc: "Unlimited for 30 days" },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`border rounded-lg p-4 text-center ${
            plan.featured ? "border-blue-500 bg-blue-50" : "border-gray-200"
          }`}
        >
          {plan.featured && (
            <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded mb-2 inline-block">BEST VALUE</div>
          )}
          <h3 className="font-semibold">{plan.name}</h3>
          <div className="text-2xl font-bold text-blue-600 my-2">{plan.price}</div>
          <p className="text-gray-600 text-sm mb-4">{plan.desc}</p>
          <button
            onClick={() => handlePurchase(plan.id)}
            disabled={loading === plan.id}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading === plan.id ? "Loading..." : "Purchase"}
          </button>
        </div>
      ))}
    </div>
  )
}
