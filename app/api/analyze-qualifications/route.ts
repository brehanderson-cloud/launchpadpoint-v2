import { type NextRequest, NextResponse } from "next/server"
import { createGroq } from "@ai-sdk/groq"
import { generateText } from "ai"

export const maxDuration = 120 // 2 minutes max

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  console.log("[v0] Qualifications analysis API called")

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 115000) // 115 seconds

  try {
    const { resumeText, jobDescription } = await request.json()
    console.log("[v0] Resume length:", resumeText?.length || 0)
    console.log("[v0] Job description length:", jobDescription?.length || 0)

    if (!resumeText?.trim() || !jobDescription?.trim()) {
      console.log("[v0] Missing resume or job description")
      clearTimeout(timeoutId)
      return NextResponse.json({ error: "Resume and job description are required" }, { status: 400 })
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("[v0] GROQ_API_KEY missing")
      clearTimeout(timeoutId)
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    console.log("[v0] Starting qualifications analysis...")

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: `Analyze how well this resume matches the job requirements and return a JSON object with this exact structure:

{
  "skillsMatch": 75,
  "experienceMatch": 80,
  "educationMatch": 90,
  "skillsAnalysis": [
    {
      "skill": "JavaScript",
      "evidence": "3 years experience building web apps",
      "strength": "Strong"
    }
  ],
  "gapAnalysis": [
    {
      "skill": "Python",
      "currentLevel": "Beginner",
      "requiredLevel": "Intermediate",
      "developmentTime": "3-6 months",
      "actionSteps": "Take online course, build projects"
    }
  ],
  "beforeAfterExamples": [
    {
      "context": "Technical skills section",
      "before": "Knows JavaScript",
      "after": "3+ years JavaScript development with React, Node.js, building scalable web applications",
      "explanation": "More specific and quantified"
    }
  ],
  "overallAssessment": {
    "qualificationLevel": "Well-qualified with minor gaps",
    "realisticTimeline": "Ready to apply now",
    "honestRecommendation": "Strong candidate, address Python skills"
  },
  "improvements": ["Quantify achievements", "Add specific technologies", "Include project outcomes"]
}

RESUME (first 1000 chars):
${resumeText.substring(0, 1000)}

JOB REQUIREMENTS (first 800 chars):
${jobDescription.substring(0, 800)}

Provide honest, realistic assessment. Match percentages should be based on actual alignment. Include top 3 matching skills with evidence, top 2 skill gaps, 2 resume improvement examples, and honest recommendation. Return only valid JSON.`,
      abortSignal: controller.signal,
    })

    // Parse the JSON response
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
    console.log("[v0] Qualifications analysis completed successfully")
    return NextResponse.json(analysis)
  } catch (error) {
    clearTimeout(timeoutId)
    console.error("[v0] Qualifications analysis error:", error)

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
