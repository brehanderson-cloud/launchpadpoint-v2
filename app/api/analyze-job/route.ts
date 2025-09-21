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
  console.log("[v0] Job analysis API called")

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 115000) // 115 seconds

  try {
    const { jobDescription } = await request.json()
    console.log("[v0] Job description received, length:", jobDescription?.length || 0)

    if (!jobDescription?.trim()) {
      console.log("[v0] Job description missing")
      clearTimeout(timeoutId)
      return NextResponse.json({ error: "Job description is required" }, { status: 400 })
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("[v0] GROQ_API_KEY missing")
      clearTimeout(timeoutId)
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    console.log("[v0] Starting Groq analysis...")

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: `Analyze this job posting and return a JSON object with the following structure:

{
  "requirements": ["requirement1", "requirement2", ...],
  "responsibilities": ["responsibility1", "responsibility2", ...],
  "skills": ["skill1", "skill2", ...],
  "experience": "experience level description",
  "education": "education requirements",
  "companyInfo": "brief company context"
}

Job posting:
${jobDescription.substring(0, 1500)}

Extract the top 5 most important requirements, main responsibilities, essential skills, experience level, education needs, and company type. Be concise and focus on the most critical elements. Return only valid JSON.`,
      abortSignal: controller.signal,
    })

    // Parse the JSON response with better error handling
    let analysis
    try {
      // First try direct parsing
      analysis = JSON.parse(text)
    } catch (parseError) {
      // Try to clean the text and extract JSON
      let cleanedText = text.trim()

      // Remove markdown code blocks if present
      if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "")
      } else if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "")
      }

      // Try parsing the cleaned text
      try {
        analysis = JSON.parse(cleanedText)
      } catch (secondParseError) {
        // Last resort: extract JSON object from text
        const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          analysis = JSON.parse(jsonMatch[0])
        } else {
          throw new Error("Could not parse JSON response")
        }
      }
    }

    clearTimeout(timeoutId)
    console.log("[v0] Job analysis completed successfully")
    return NextResponse.json(analysis)
  } catch (error) {
    clearTimeout(timeoutId)
    console.error("[v0] Job analysis error:", error)

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
