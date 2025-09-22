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

  You MUST respond with valid JSON only. Do not include any explanatory text before or after the JSON.

  Return this exact JSON structure:
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
  - RESPOND ONLY WITH VALID JSON
  `

  try {
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt,
      temperature: 0.1, // Lower temperature for more consistent JSON output
      maxTokens: 800,
    })

    let parsedResponse
    try {
      // Try to find JSON in the response if it's wrapped in other text
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      const jsonText = jsonMatch ? jsonMatch[0] : text
      parsedResponse = JSON.parse(jsonText)
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", text)
      return {
        authentic: false,
        riskLevel: "high" as const,
        concerns: ["Unable to verify authenticity - AI response format error"],
        verificationQuestions: ["Please provide more context about this improvement"],
        alternativePhrasing: ["Consider using more specific, verifiable language"],
        recommendation: "modify" as const,
      }
    }

    if (!parsedResponse || typeof parsedResponse.authentic !== "boolean") {
      return {
        authentic: false,
        riskLevel: "high" as const,
        concerns: ["Invalid verification response"],
        verificationQuestions: ["Please provide more context"],
        alternativePhrasing: [],
        recommendation: "modify" as const,
      }
    }

    return parsedResponse
  } catch (error) {
    console.error("AI verification failed:", error)
    return {
      authentic: false,
      riskLevel: "high" as const,
      concerns: ["Unable to verify authenticity"],
      verificationQuestions: ["Please provide more context about this improvement"],
      alternativePhrasing: [],
      recommendation: "reject" as const,
    }
  }
}
