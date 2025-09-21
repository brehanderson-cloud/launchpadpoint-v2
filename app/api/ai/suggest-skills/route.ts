import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(req: Request) {
  const { jobTitle, currentSkills, industry } = await req.json()

  const prompt = `
    Suggest relevant skills for a ${jobTitle} position${industry ? ` in the ${industry} industry` : ""}.
    
    Current skills: ${currentSkills.join(", ") || "None"}
    
    Requirements:
    - Suggest 8-12 skills that are highly relevant to the role
    - Include both technical and soft skills
    - Don't repeat skills already listed
    - Focus on in-demand skills for this position
    - Include industry-specific tools and technologies

    Return ONLY a JSON object with this structure:
    {
      "skills": ["skill1", "skill2", "skill3", ...]
    }
  `

  const { text } = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt,
    maxTokens: 300,
  })

  try {
    const result = JSON.parse(text)
    return Response.json({ suggestedSkills: result.skills || [] })
  } catch (parseError) {
    console.error("Failed to parse AI response:", parseError)
    // Fallback skills based on job title
    const fallbackSkills = [
      "Communication",
      "Problem Solving",
      "Teamwork",
      "Time Management",
      "Leadership",
      "Analytical Thinking",
    ]
    return Response.json({ suggestedSkills: fallbackSkills })
  }
}
