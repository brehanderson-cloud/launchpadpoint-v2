// api/verify-qualifications.js
import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(req: NextRequest) {
  try {
    const { originalText, proposedImprovement, userContext } = await req.json()

    const verification = await verifyAuthenticity(originalText, proposedImprovement, userContext)
    return NextResponse.json(verification)
  } catch (error) {
    console.error("Verification failed:", error)
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}

async function verifyAuthenticity(original: string, improved: string, context: string) {
  const prompt = `
  Analyze if this resume improvement is authentic and ethical:

  ORIGINAL: "${original}"
  PROPOSED: "${improved}"
  USER CONTEXT: "${context}"

  Return JSON:
  {
    "authentic": boolean,
    "riskLevel": "low|medium|high",
    "concerns": ["specific concerns if any"],
    "verificationQuestions": ["questions to ask user to verify claims"],
    "alternativePhrasing": ["more authentic alternatives if needed"],
    "recommendation": "approve|modify|reject"
  }

  Rules:
  - Flag any fabricated qualifications
  - Identify unsupported claims
  - Suggest authentic alternatives
  - Ask clarifying questions when needed
  `

  try {
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt,
      temperature: 0.2,
      maxTokens: 800,
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("AI verification failed:", error)
    return {
      authentic: false,
      riskLevel: "high",
      concerns: ["Unable to verify authenticity"],
      recommendation: "reject",
    }
  }
}
