import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(request: Request) {
  try {
    const { resumeData, jobDescription } = await request.json()

    if (!resumeData || !jobDescription) {
      return Response.json({ error: "Resume data and job description are required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      prompt: `You are a resume optimization AI. You MUST respond with valid JSON only, no additional text.

Analyze this resume against the job description and provide optimization recommendations:

Resume Data:
${JSON.stringify(resumeData, null, 2)}

Job Description:
${jobDescription}

IMPORTANT: Respond with ONLY the JSON object below, no explanatory text before or after:

{
  "overallScore": 85,
  "skillsMatch": 75,
  "experienceRelevance": 90,
  "suggestions": [
    {
      "type": "add",
      "section": "summary",
      "content": "specific suggestion text",
      "reason": "explanation why this helps",
      "priority": "high"
    }
  ],
  "optimizedSummary": "improved professional summary",
  "suggestedSkills": ["skill1", "skill2"],
  "improvedResponsibilities": {
    "exp-0": ["improved responsibility 1", "improved responsibility 2"]
  }
}

Return ONLY valid JSON. Do not include any text before or after the JSON object.`,
    })

    try {
      console.log("[v0] AI Response:", text.substring(0, 200) + "...")
      const optimization = JSON.parse(text)
      return Response.json({ optimization })
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError)
      console.error("Raw response:", text)

      const fallbackOptimization = {
        overallScore: 70,
        skillsMatch: 65,
        experienceRelevance: 75,
        suggestions: [
          {
            type: "modify",
            section: "summary",
            content: "Tailor your professional summary to better match the job requirements",
            reason: "A targeted summary increases relevance to the specific role",
            priority: "high",
          },
        ],
        optimizedSummary: "Professional with relevant experience seeking to contribute to organizational success",
        suggestedSkills: ["Communication", "Problem Solving", "Teamwork"],
        improvedResponsibilities: {},
      }

      return Response.json({ optimization: fallbackOptimization })
    }
  } catch (error) {
    console.error("Resume optimization error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
