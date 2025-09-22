// api/ai-assistant.js
import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(req: NextRequest) {
  try {
    const { question, analysisContext, chatHistory } = await req.json()

    const response = await getAIResponse(question, analysisContext, chatHistory)
    return NextResponse.json({ response })
  } catch (error) {
    console.error("AI assistant failed:", error)
    return NextResponse.json({ error: "AI assistant failed" }, { status: 500 })
  }
}

async function getAIResponse(question: string, context: any, history: any[]) {
  const systemPrompt = `
  You are an expert resume optimization assistant with deep knowledge of ATS systems and hiring practices. Use the detailed analysis context to provide specific, actionable advice.
  
  ANALYSIS CONTEXT: ${JSON.stringify(context)}
  
  Enhanced Rules:
  - Reference specific findings from the analysis (scores, strengths, gaps)
  - Explain WHY changes improve ATS/hiring manager appeal with specific examples
  - Provide exact before/after examples when suggesting improvements
  - If qualification percentage is mentioned, explain the specific reasoning behind the score
  - Give concrete, actionable steps with realistic timelines
  - Focus on authentic improvements - never suggest fabricating qualifications
  - When discussing missing skills, suggest learning resources or alternative ways to demonstrate competency
  - Address both technical ATS optimization and human readability
  - Keep responses detailed but under 250 words for readability
  - Use bullet points for actionable items when appropriate
  `

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.slice(-6), // Increased context window from 4 to 6 for better conversation flow
    { role: "user", content: question },
  ]

  try {
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      messages: messages as any,
      temperature: 0.3, // Reduced temperature for more consistent responses
      maxTokens: 300, // Increased token limit for more detailed responses
    })

    return text
  } catch (error) {
    console.error("AI response failed:", error)
    return "I'm having trouble connecting right now. Please try asking your question again, or feel free to refer back to your analysis results above."
  }
}
