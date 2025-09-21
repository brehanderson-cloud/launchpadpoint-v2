import { type NextRequest, NextResponse } from "next/server"
import { createGroq } from "@ai-sdk/groq"
import { generateObject } from "ai"
import { z } from "zod"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

const SkillAnalysisSchema = z.object({
  skill: z.string(),
  evidence: z.string(),
  strength: z.string(),
})

const GapAnalysisSchema = z.object({
  skill: z.string(),
  currentLevel: z.string(),
  requiredLevel: z.string(),
  developmentTime: z.string(),
  actionSteps: z.string(),
})

const BeforeAfterSchema = z.object({
  context: z.string(),
  before: z.string(),
  after: z.string(),
  explanation: z.string(),
})

const QualificationsAnalysisSchema = z.object({
  skillsMatch: z.number().min(0).max(100).describe("Skills match percentage"),
  experienceMatch: z.number().min(0).max(100).describe("Experience match percentage"),
  educationMatch: z.number().min(0).max(100).describe("Education match percentage"),
  skillsAnalysis: z.array(SkillAnalysisSchema).describe("Analysis of matching skills"),
  gapAnalysis: z.array(GapAnalysisSchema).describe("Skills gaps to address"),
  beforeAfterExamples: z.array(BeforeAfterSchema).describe("Resume improvement examples"),
  overallAssessment: z.object({
    qualificationLevel: z.string(),
    realisticTimeline: z.string(),
    honestRecommendation: z.string(),
  }),
  improvements: z.array(z.string()).describe("Quick improvement suggestions"),
})

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobDescription } = await request.json()

    if (!resumeText?.trim() || !jobDescription?.trim()) {
      return NextResponse.json({ error: "Resume and job description are required" }, { status: 400 })
    }

    const { object: analysis } = await generateObject({
      model: groq("llama-3.1-8b-instant"), // Faster model
      schema: QualificationsAnalysisSchema,
      prompt: `Quick analysis - how well does this resume match the job?\n\nRESUME (first 1000 chars):\n${resumeText.substring(0, 1000)}\n\nJOB (first 800 chars):\n${jobDescription.substring(0, 800)}\n\nProvide fast, honest assessment:\n1. Match % for skills/experience/education\n2. Top 3 matching skills with evidence\n3. Top 2 skill gaps to address\n4. 2 resume improvement examples\n5. Honest recommendation\n\nBe realistic - no inflated scores.`,
    })

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Qualifications analysis error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
