import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(request: Request) {
  try {
    const { jobDescription } = await request.json()

    if (!jobDescription) {
      return Response.json({ error: "Job description is required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      prompt: `Analyze this job description and extract key information:

Job Description:
${jobDescription}

Please provide a detailed analysis in the following JSON format:
{
  "requiredSkills": ["skill1", "skill2", ...],
  "preferredSkills": ["skill1", "skill2", ...],
  "keyResponsibilities": ["responsibility1", "responsibility2", ...],
  "companyValues": ["value1", "value2", ...],
  "industryKeywords": ["keyword1", "keyword2", ...],
  "experienceLevel": "entry|mid|senior|executive"
}

Focus on:
- Technical skills and tools mentioned
- Soft skills and competencies
- Years of experience required
- Key responsibilities and duties
- Company culture indicators
- Industry-specific terminology

Return only valid JSON.`,
    })

    try {
      const analysis = JSON.parse(text)
      return Response.json({ analysis })
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError)
      return Response.json({ error: "Failed to analyze job description" }, { status: 500 })
    }
  } catch (error) {
    console.error("Job analysis error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
