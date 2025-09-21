import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Simple in-memory session tracking
const activeSessions = new Map()

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { priceType } = body
  const userId = body.userId || `user_${Date.now()}`

  const prices = {
    single: { amount: 499, name: "Single Analysis", credits: 1 },
    pack: { amount: 1999, name: "5 Analysis Pack", credits: 5 },
    monthly: { amount: 999, name: "Monthly Unlimited", credits: 999 },
  }

  const selectedPrice = prices[priceType as keyof typeof prices]
  if (!selectedPrice) {
    return NextResponse.json({ error: "Invalid price type" }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: selectedPrice.name },
            unit_amount: selectedPrice.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/pricing`,
      metadata: { userId, priceType, credits: selectedPrice.credits.toString() },
    })

    // Store session info in memory temporarily
    activeSessions.set(session.id, {
      userId,
      credits: selectedPrice.credits,
      priceType,
      created: Date.now(),
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    return NextResponse.json({ error: "Payment setup failed" }, { status: 500 })
  }
}
