import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"

export async function POST(req: Request) {
  const { currentSummary, jobTitle, experience } = await req.json()

  const prompt = `
    Improve this professional summary for a resume. Make it more compelling and professional.
    
    Current Summary: ${currentSummary || "No summary provided"}
    Job Title/Role: ${jobTitle || "Not specified"}
    Years of Experience: ${experience || "Not specified"}
    
    Requirements:
    - Keep it concise (2-3 sentences)
    - Highlight key strengths and achievements
    - Use action words and quantifiable results when possible
    - Make it ATS-friendly
    - Sound professional but engaging
    
    Return only the improved summary text, no additional formatting or explanations.
  `

  const { text } = await generateText({
    model: groq("llama-3.1-8b-instant"),
    prompt,
    maxOutputTokens: 200,
    temperature: 0.7,
  })

  return Response.json({ improvedSummary: text.trim() })
}
