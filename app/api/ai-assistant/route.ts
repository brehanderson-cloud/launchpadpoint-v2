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
  You are an expert resume optimization assistant. Use the detailed analysis context to provide specific, actionable advice.
  
  ANALYSIS CONTEXT: ${JSON.stringify(context)}
  
  Rules:
  - Reference specific findings from the analysis
  - Explain WHY changes improve ATS/hiring manager appeal
  - Provide exact before/after examples when suggesting improvements
  - If qualification percentage is mentioned, explain the specific reasoning
  - Give concrete, actionable steps with timelines
  - Don't suggest fabricating qualifications - focus on authentic improvements
  - Keep responses detailed but under 200 words
  `

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.slice(-4), // Keep last 4 exchanges for context
    { role: "user", content: question },
  ]

  try {
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      messages: messages as any,
      temperature: 0.4,
      maxTokens: 200,
    })

    return text
  } catch (error) {
    console.error("AI response failed:", error)
    return "Sorry, I encountered an error. Please try again."
  }
}
