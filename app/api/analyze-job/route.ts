import { type NextRequest, NextResponse } from "next/server"
import { createGroq } from "@ai-sdk/groq"
import { generateObject } from "ai"
import { z } from "zod"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

const JobAnalysisSchema = z.object({
  requirements: z.array(z.string()).describe("Key requirements and qualifications"),
  responsibilities: z.array(z.string()).describe("Main job responsibilities"),
  skills: z.array(z.string()).describe("Required technical and soft skills"),
  experience: z.string().describe("Required experience level"),
  education: z.string().describe("Education requirements"),
  companyInfo: z.string().describe("Brief company context"),
})

export async function POST(request: NextRequest) {
  try {
    const { jobDescription } = await request.json()

    if (!jobDescription?.trim()) {
      return NextResponse.json({ error: "Job description is required" }, { status: 400 })
    }

    const { object: analysis } = await generateObject({
      model: groq("llama-3.1-8b-instant"), // Faster model
      schema: JobAnalysisSchema,
      prompt: `Quickly analyze this job posting:\n\n${jobDescription.substring(0, 1500)}\n\nExtract key info:\n- Top 5 requirements\n- Main responsibilities\n- Essential skills\n- Experience level\n- Education needs\n- Company type\n\nBe concise and focus on most important elements.`,
    })

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Job analysis error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
