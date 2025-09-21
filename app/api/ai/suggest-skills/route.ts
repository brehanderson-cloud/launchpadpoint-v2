import { groq } from "@ai-sdk/groq"
import { generateObject } from "ai"
import { z } from "zod"

const skillsSchema = z.object({
  skills: z.array(z.string()).describe("Array of relevant skills for the job role"),
})

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
  `

  const { object } = await generateObject({
    model: groq("llama-3.1-8b-instant"),
    schema: skillsSchema,
    prompt,
    maxOutputTokens: 300,
  })

  return Response.json({ suggestedSkills: object.skills })
}
