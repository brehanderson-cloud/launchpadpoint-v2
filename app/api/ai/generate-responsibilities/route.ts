import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(req: Request) {
  const { jobTitle, company, currentResponsibilities } = await req.json()

  const prompt = `
    Generate professional job responsibilities for a resume based on the following:
    
    Job Title: ${jobTitle}
    Company: ${company}
    Current Responsibilities: ${currentResponsibilities || "None provided"}
    
    Requirements:
    - Generate 3-5 bullet points
    - Use action verbs to start each bullet point
    - Include quantifiable achievements when possible
    - Make them specific to the role and industry
    - Keep each bullet point concise but impactful
    - Format as bullet points with • symbol
    
    Return only the bullet points, no additional text or explanations.
  `

  const { text } = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt,
    maxTokens: 300,
    temperature: 0.7,
  })

  return Response.json({ responsibilities: text.trim() })
}
