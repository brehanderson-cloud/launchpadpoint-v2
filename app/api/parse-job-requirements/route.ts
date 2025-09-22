import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { jobDescription } = await request.json()

    if (!jobDescription?.trim()) {
      return NextResponse.json({ error: "Job description is required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: `Analyze this job description and extract specific requirements, then create probing questions to assess if a candidate truly has these skills.

Job Description:
${jobDescription}

Return a JSON object with this exact structure:
{
  "requirements": [
    {
      "category": "skills|experience|education|certifications",
      "requirement": "specific requirement text",
      "importance": "critical|preferred|nice-to-have",
      "yearsRequired": number or null,
      "specificTools": ["tool1", "tool2"] or null
    }
  ],
  "probingQuestions": [
    {
      "id": "unique_id",
      "question": "Specific probing question like 'Do you have 10+ years experience using SuccessFactors/SAP?'",
      "requirement": "which requirement this relates to",
      "followUp": "follow-up question to dig deeper",
      "examples": ["example1", "example2"]
    }
  ]
}

Focus on:
1. Breaking down EVERY skill, tool, and experience mentioned
2. Creating specific questions that reveal true competency
3. Asking for concrete examples and evidence
4. Identifying years of experience requirements
5. Probing for depth of knowledge, not just familiarity

Make questions direct and specific - avoid generic questions.`,
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
    console.error("Job requirements parsing error:", error)
    return NextResponse.json({ error: "Failed to parse job requirements" }, { status: 500 })
  }
}
