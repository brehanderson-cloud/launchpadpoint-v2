import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
// Simple credits storage (use your existing userCredits Map)
const userCredits = new Map()

export async function POST(request: NextRequest) {
  const buf = Buffer.from(await request.arrayBuffer())
  const sig = request.headers.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  try {
    const event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!)

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      // Quick credit addition (no file operations)
      const userId = session.metadata?.userId
      const credits = Number.parseInt(session.metadata?.credits || "0")

      if (userId) {
        const currentCredits = userCredits.get(userId) || 0
        userCredits.set(userId, currentCredits + credits)

        // Optional: Log purchase for analytics (async, non-blocking)
        logPurchase(userId, session.metadata?.priceType || "", credits)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    return NextResponse.json({ error: "Webhook failed" }, { status: 400 })
  }
}

// Non-blocking logging function
async function logPurchase(userId: string, type: string, credits: number) {
  try {
    const fs = require("fs").promises
    const logEntry = `${Date.now()},${userId},${type},${credits}\n`
    await fs.appendFile("/tmp/purchases.log", logEntry)
  } catch (error) {
    // Fail silently - don't block webhook processing
  }
}
