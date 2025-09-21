import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(request: NextRequest) {
  try {
    const { message, context, resumeData } = await request.json()

    const prompt = `You are an expert resume and career advisor AI assistant. 

Context: ${context}
Resume Data: ${JSON.stringify(resumeData)}
User Question: ${message}

Provide helpful, specific advice about resume improvement, career development, and salary optimization. Be encouraging but honest about market realities.`

    const { text } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      prompt,
      maxTokens: 1000,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Chat assistant API error:", error)
    return NextResponse.json({ error: "Failed to get assistant response" }, { status: 500 })
  }
}
