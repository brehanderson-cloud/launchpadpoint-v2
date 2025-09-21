import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for friend codes (resets on deployment)
const friendCodes = new Map()
const userCredits = new Map()

friendCodes.set("FRIEND-DEMO2024", {
  used: false,
  analysesRemaining: 5,
  createdAt: Date.now(),
})

friendCodes.set("FRIEND-TEST1234", {
  used: false,
  analysesRemaining: 5,
  createdAt: Date.now(),
})

friendCodes.set("FRIEND-WELCOME1", {
  used: false,
  analysesRemaining: 5,
  createdAt: Date.now(),
})

export async function POST(request: NextRequest) {
  const url = new URL(request.url)
  const body = await request.json()

  if (url.pathname.includes("generate")) {
    return generateCodes(body)
  }

  if (url.pathname.includes("validate") || body.action === "validate") {
    return validateCode(body)
  }

  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

async function generateCodes(body: any) {
  const { adminKey, quantity = 1 } = body

  if (adminKey !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const codes = []
  for (let i = 0; i < quantity; i++) {
    const code = `FRIEND-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
    friendCodes.set(code, {
      used: false,
      analysesRemaining: 5,
      createdAt: Date.now(),
    })
    codes.push(code)
  }

  return NextResponse.json({ codes })
}

async function validateCode(body: any) {
  const { code } = body
  const codeData = friendCodes.get(code)

  if (!codeData) {
    return NextResponse.json({ valid: false, message: "Invalid code" })
  }

  if (codeData.analysesRemaining <= 0) {
    return NextResponse.json({ valid: false, message: "Code expired" })
  }

  // Update in memory (fast)
  codeData.analysesRemaining--
  codeData.lastUsed = Date.now()

  return NextResponse.json({
    valid: true,
    analysesRemaining: codeData.analysesRemaining,
    message: `Code valid! ${codeData.analysesRemaining} analyses remaining`,
  })
}
