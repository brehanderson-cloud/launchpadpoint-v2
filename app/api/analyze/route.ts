import { type NextRequest, NextResponse } from "next/server"
import { createGroq } from "@ai-sdk/groq"
import { generateText } from "ai"

export const config = {
  maxDuration: 120, // 2 minutes max
}

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  console.log("[v0] General analyze API called")

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 115000) // 115 seconds

  try {
    const { resume, jobDescription } = await request.json()
    console.log("[v0] Analysis starting...", {
      resumeLength: resume?.length || 0,
      jobDescLength: jobDescription?.length || 0,
    })

    if (!resume?.trim() || !jobDescription?.trim()) {
      console.log("[v0] Missing required data")
      clearTimeout(timeoutId)
      return NextResponse.json({ error: "Both resume and job description are required" }, { status: 400 })
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("[v0] GROQ_API_KEY missing")
      clearTimeout(timeoutId)
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    console.log("[v0] Starting Groq analysis...")

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: `Analyze this resume against the job description and return a JSON object:

RESUME:
${resume.substring(0, 2000)}

JOB DESCRIPTION:
${jobDescription.substring(0, 1500)}

Return this exact JSON structure:
{
  "matchPercentage": 75,
  "strengths": ["strength1", "strength2", "strength3", "strength4", "strength5"],
  "improvements": ["improvement1", "improvement2", "improvement3", "improvement4", "improvement5"],
  "missingSkills": ["skill1", "skill2", "skill3"],
  "score": 78
}

Provide:
- Match percentage (0-100)
- Top 5 strengths
- Top 5 improvement suggestions
- Missing skills from job requirements
- Overall score (0-100)

Be specific and actionable. Return only valid JSON.`,
      abortSignal: controller.signal,
    })

    // Parse the JSON response
    let analysis
    try {
      analysis = JSON.parse(text)
    } catch (parseError) {
      console.error("[v0] JSON parsing failed, attempting to extract JSON from text")
      // Try to extract JSON from the response if it's wrapped in other text
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("Could not parse JSON response")
      }
    }

    clearTimeout(timeoutId)
    console.log("[v0] General analysis completed successfully")
    return NextResponse.json(analysis)
  } catch (error) {
    clearTimeout(timeoutId)
    console.error("[v0] General analysis error:", error)

    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json({ error: "Request timeout" }, { status: 408 })
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Analysis failed",
      },
      { status: 500 },
    )
  }
}
