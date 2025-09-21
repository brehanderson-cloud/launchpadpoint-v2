// api/learn-improvements.js
import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function POST(req: NextRequest) {
  try {
    const { feedback, improvementData, userOutcome } = await req.json()

    await recordLearning(feedback, improvementData, userOutcome)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Learning recording failed:", error)
    return NextResponse.json({ error: "Learning recording failed" }, { status: 500 })
  }
}

async function recordLearning(feedback: any, data: any, outcome: string) {
  const learningEntry = {
    timestamp: new Date().toISOString(),
    userRating: feedback.rating, // 1-5
    helpfulAspects: feedback.helpfulAspects,
    improvements: feedback.improvements,
    comments: feedback.comments,
    outcomeExpected: outcome,
    analysisData: {
      matchPercentage: data?.matchPercentage,
      skillsCount: data?.qualificationsAnalysis?.skillsAnalysis?.length || 0,
      gapsCount: data?.qualificationsAnalysis?.gapAnalysis?.length || 0,
      examplesCount: data?.qualificationsAnalysis?.beforeAfterExamples?.length || 0,
    },
    wasHelpful: feedback.rating >= 4,
  }

  // Save to lightweight storage (avoid complex DB for now)
  const dataDir = path.join(process.cwd(), "data")
  const filePath = path.join(dataDir, "learning-data.jsonl")

  try {
    await fs.mkdir(dataDir, { recursive: true })
    await fs.appendFile(filePath, JSON.stringify(learningEntry) + "\n")
    console.log("[v0] Learning data recorded successfully")
  } catch (error) {
    console.error("Failed to save learning data:", error)
  }
}

// Separate function to process learning (run as cron job)
export async function processLearning() {
  const dataPath = path.join(process.cwd(), "data", "learning-data.jsonl")

  try {
    const data = await fs.readFile(dataPath, "utf8")
    const entries = data
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line))

    // Simple pattern analysis
    const patterns = {
      highRatedSuggestions: entries.filter((e) => e.wasHelpful),
      lowRatedSuggestions: entries.filter((e) => !e.wasHelpful),
      commonImprovements: getTopItems(entries.flatMap((e) => e.improvements)),
      helpfulAspects: getTopItems(entries.flatMap((e) => e.helpfulAspects)),
      averageRating: entries.reduce((sum, e) => sum + e.userRating, 0) / entries.length,
    }

    console.log("[v0] Learning patterns analyzed:", patterns)

    // Update suggestion weights based on patterns
    await updateWeights(patterns)
  } catch (error) {
    console.error("Learning processing failed:", error)
  }
}

function getTopItems(items: string[]) {
  const counts = items.reduce(
    (acc, item) => {
      acc[item] = (acc[item] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([item, count]) => ({ item, count }))
}

async function updateWeights(patterns: any) {
  // This would update AI model weights or prompts based on feedback patterns
  // For now, just log the insights
  console.log("[v0] Insights for AI improvement:", {
    mostHelpfulAspects: patterns.helpfulAspects,
    commonComplaints: patterns.commonImprovements,
    overallSatisfaction: patterns.averageRating,
  })
}
