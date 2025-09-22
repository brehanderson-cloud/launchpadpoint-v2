import { type NextRequest, NextResponse } from "next/server"
import { createGroq } from "@ai-sdk/groq"
import { generateText } from "ai"

export const maxDuration = 30 // Keep verification fast

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { originalText, proposedImprovement, userContext } = await request.json()

    if (!originalText || !proposedImprovement) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: `Analyze if this resume improvement is authentic and ethical:

ORIGINAL: "${originalText}"
PROPOSED: "${proposedImprovement}"
USER CONTEXT: "${JSON.stringify(userContext)}"

Return ONLY this JSON structure:
{
  "authentic": boolean,
  "riskLevel": "low|medium|high",
  "concerns": ["specific concerns if any"],
  "verificationQuestions": ["questions to ask user to verify claims"],
  "alternativePhrasing": ["more authentic alternatives if needed"],
  "recommendation": "approve|modify|reject",
  "reasoning": "brief explanation"
}

Rules:
- Flag any fabricated qualifications
- Identify unsupported claims  
- Suggest authentic alternatives
- Ask clarifying questions when needed
- Be helpful but honest`,
      temperature: 0.2,
    })

    // Parse JSON with error handling
    let verification
    try {
      verification = JSON.parse(text)
    } catch (parseError) {
      // Extract JSON from response if wrapped in other text
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        verification = JSON.parse(jsonMatch[0])
      } else {
        // Fallback response
        verification = {
          authentic: false,
          riskLevel: "medium",
          concerns: ["Unable to verify authenticity"],
          verificationQuestions: ["Can you provide more specific details about this achievement?"],
          alternativePhrasing: [],
          recommendation: "modify",
          reasoning: "System unable to parse verification response",
        }
      }
    }

    return NextResponse.json(verification)
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json(
      { error: "Verification failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
