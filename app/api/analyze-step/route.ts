// api/analyze-step.js
import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(req: NextRequest) {
  try {
    const { step, resumeSection, jobRequirements, previousSteps } = await req.json()

    const stepAnalysis = await analyzeStep(step, resumeSection, jobRequirements, previousSteps)
    return NextResponse.json(stepAnalysis)
  } catch (error) {
    console.error("Step analysis failed:", error)
    return NextResponse.json({ error: "Step analysis failed" }, { status: 500 })
  }
}

async function analyzeStep(step: string, section: string, requirements: string, previous: any) {
  const stepPrompts = {
    skills: `Analyze the skills section in detail for job match. 

RESUME SKILLS: ${section}
JOB REQUIREMENTS: ${requirements}

Provide specific analysis:
- List EXACT skills from resume that match job requirements
- Identify SPECIFIC missing skills/technologies mentioned in job posting
- Suggest concrete skills to add based on job requirements
- Explain WHY each skill matters for this role`,

    experience: `Analyze work experience alignment in detail.

RESUME EXPERIENCE: ${section}
JOB REQUIREMENTS: ${requirements}

Provide specific analysis:
- Identify SPECIFIC experiences that align with job requirements
- Point out exact responsibilities that match the target role
- Highlight quantifiable achievements relevant to the position
- Identify experience gaps and suggest how to address them`,

    education: `Evaluate education and certification fit in detail.

RESUME EDUCATION: ${section}
JOB REQUIREMENTS: ${requirements}

Provide specific analysis:
- Compare degree level/field to job requirements
- Identify relevant certifications present/missing
- Suggest specific certifications that would strengthen candidacy
- Explain education's relevance to the role`,

    summary: `Create comprehensive final assessment based on all analysis.

ALL PREVIOUS ANALYSIS: ${JSON.stringify(previous)}
JOB REQUIREMENTS: ${requirements}

Provide detailed summary:
- Calculate overall qualification percentage with SPECIFIC reasoning
- List top 3 strengths with evidence from resume
- Identify top 3 critical gaps with specific examples
- Provide realistic timeline for addressing gaps
- Give honest recommendation with detailed explanation`,
  }

  const prompt = `
  ${stepPrompts[step]}

  IMPORTANT: Return ONLY valid JSON without any markdown formatting, code blocks, or additional text.

  Return detailed analysis as JSON:
  {
    "stepScore": number (0-100),
    "matches": ["specific skill/experience that matches job requirement"],
    "gaps": ["specific missing requirement with explanation"],
    "quickWins": ["specific actionable improvement with reasoning"],
    "detailedExplanation": "comprehensive explanation of findings",
    "specificEvidence": ["exact quotes or examples from resume"],
    "nextStepPreview": "what we'll analyze next",
    "canProceed": boolean,
    "insights": ["detailed insights with specific reasoning"]
  }
  `

  try {
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      prompt,
      temperature: 0.3,
      maxTokens: 600,
    })

    let cleanedText = text.trim()

    // Remove markdown code blocks if present
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "")
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "")
    }

    // Remove any leading/trailing text that isn't JSON
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      cleanedText = jsonMatch[0]
    }

    return JSON.parse(cleanedText)
  } catch (error) {
    console.error("AI step analysis failed:", error)
    // Return fallback analysis
    return {
      stepScore: 65,
      matches: [`Analysis completed for ${step}`],
      gaps: ["Unable to perform detailed analysis"],
      quickWins: ["Review and refine this section"],
      detailedExplanation: "Fallback analysis due to error",
      specificEvidence: [],
      nextStepPreview: "Moving to next analysis step",
      canProceed: true,
      insights: ["Step analysis encountered an issue but can continue"],
    }
  }
}
