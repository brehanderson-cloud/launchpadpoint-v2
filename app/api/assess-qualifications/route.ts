import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { requirements, userResponses, jobDescription } = await request.json()

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: `Based on the user's responses to probing questions about job requirements, provide an honest assessment of their qualifications.

Job Requirements:
${JSON.stringify(requirements, null, 2)}

User Responses:
${JSON.stringify(userResponses, null, 2)}

Job Description:
${jobDescription}

Return a JSON object with this exact structure:
{
  "skillsAnalysis": [
    {
      "skill": "skill name",
      "userLevel": 1-10,
      "requiredLevel": 1-10,
      "hasEvidence": true/false,
      "gap": number,
      "category": "technical|soft|industry|tools",
      "assessment": "honest assessment of their capability",
      "developmentPlan": "specific steps to improve"
    }
  ],
  "overallMatch": 1-100,
  "honestAssessment": {
    "qualificationLevel": "honest assessment of their readiness",
    "realisticTimeline": "when they could realistically apply",
    "recommendation": "honest recommendation with specific actions",
    "strengthAreas": ["area1", "area2"],
    "developmentAreas": ["area1", "area2"]
  },
  "actionPlan": [
    {
      "priority": "high|medium|low",
      "action": "specific action to take",
      "timeline": "timeframe",
      "resources": ["resource1", "resource2"]
    }
  ]
}

Be brutally honest - if they don't have the experience, say so. If they're stretching the truth, call it out. Focus on what they can realistically do to become qualified.`,
      maxTokens: 2000,
    })

    let parsedResponse
    try {
      parsedResponse = JSON.parse(text)
    } catch (parseError) {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("No valid JSON found in response")
      }
    }

    return NextResponse.json(parsedResponse)
  } catch (error) {
    console.error("Qualification assessment error:", error)
    return NextResponse.json({ error: "Failed to assess qualifications" }, { status: 500 })
  }
}
