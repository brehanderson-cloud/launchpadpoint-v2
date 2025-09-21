import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobDescription, phase } = await request.json()

    let prompt = ""

    switch (phase) {
      case "ethical":
        prompt = `As an ethical AI resume advisor, analyze this resume for authenticity and provide honest feedback:

Resume: ${resumeText}
Job Description: ${jobDescription}

Provide a JSON response with:
{
  "ethicalScore": number (1-100),
  "concerns": string[],
  "recommendations": string[],
  "isAuthentic": boolean
}`
        break

      case "skills":
        prompt = `Analyze the skills section of this resume against the job requirements:

Resume: ${resumeText}
Job Description: ${jobDescription}

Provide detailed gap analysis with specific improvement suggestions and salary impact estimates.`
        break

      case "experience":
        prompt = `Analyze the experience section of this resume:

Resume: ${resumeText}
Job Description: ${jobDescription}

Focus on relevance, impact quantification, and missing experiences that could increase earning potential.`
        break

      case "education":
        prompt = `Analyze the education and certifications section:

Resume: ${resumeText}
Job Description: ${jobDescription}

Suggest relevant certifications, courses, or credentials that could boost salary prospects.`
        break

      case "summary":
        prompt = `Analyze the professional summary/objective:

Resume: ${resumeText}
Job Description: ${jobDescription}

Provide suggestions for a compelling summary that highlights value proposition and potential salary range.`
        break

      default:
        prompt = `Provide comprehensive resume analysis with gap analysis and improvement suggestions.`
    }

    const { text } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      prompt,
      maxTokens: 2000,
    })

    return NextResponse.json({ analysis: text })
  } catch (error) {
    console.error("Verification API error:", error)
    return NextResponse.json({ error: "Failed to verify resume" }, { status: 500 })
  }
}
