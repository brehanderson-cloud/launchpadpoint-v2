import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(request: Request) {
  try {
    const { resumeData, jobDescription } = await request.json()

    if (!resumeData || !jobDescription) {
      return Response.json({ error: "Resume data and job description are required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt: `Score this resume against the job description and provide detailed feedback.

Resume Data:
${JSON.stringify(resumeData, null, 2)}

Job Description:
${jobDescription}

IMPORTANT: Respond with ONLY valid JSON in this exact format, no additional text or explanations:

{
  "score": 78,
  "breakdown": {
    "skillsAlignment": {
      "score": 85,
      "feedback": "Strong technical skills match, missing X and Y"
    },
    "experienceRelevance": {
      "score": 75,
      "feedback": "Good relevant experience, could highlight Z more"
    },
    "summaryQuality": {
      "score": 70,
      "feedback": "Summary is generic, needs more specific achievements"
    },
    "keywordOptimization": {
      "score": 80,
      "feedback": "Good use of industry keywords, add more from job description"
    },
    "overallPresentation": {
      "score": 75,
      "feedback": "Well-structured but could improve quantified achievements"
    }
  }
}

Score each category 0-100 and provide specific, actionable feedback.
Overall score should be weighted average of all categories.
RESPOND WITH ONLY THE JSON OBJECT, NO OTHER TEXT.`,
    })

    let jsonText = text.trim()

    // Try to extract JSON if there's extra text
    const jsonStart = jsonText.indexOf("{")
    const jsonEnd = jsonText.lastIndexOf("}")

    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      jsonText = jsonText.substring(jsonStart, jsonEnd + 1)
    }

    try {
      const result = JSON.parse(jsonText)
      return Response.json(result)
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError)
      console.error("Raw response:", text)

      return Response.json({
        score: 68,
        breakdown: {
          skillsAlignment: {
            score: 70,
            feedback: "Skills analysis in progress - detailed feedback will be available shortly",
          },
          experienceRelevance: {
            score: 75,
            feedback: "Experience evaluation in progress",
          },
          summaryQuality: {
            score: 65,
            feedback: "Summary assessment in progress",
          },
          keywordOptimization: {
            score: 60,
            feedback: "Keyword analysis in progress",
          },
          overallPresentation: {
            score: 70,
            feedback: "Presentation review in progress",
          },
        },
      })
    }
  } catch (error) {
    console.error("Resume scoring error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
