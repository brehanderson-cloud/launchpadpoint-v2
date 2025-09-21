// api/log-error.js
import { type NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function POST(req: NextRequest) {
  try {
    const errorData = await req.json()

    await logError(errorData)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error logging failed:", error)
    return NextResponse.json({ error: "Error logging failed" }, { status: 500 })
  }
}

async function logError(errorData: any) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    error: errorData.error,
    stack: errorData.stack,
    componentStack: errorData.componentStack,
    userAgent: errorData.userAgent,
    url: errorData.url,
    userId: errorData.userId || "anonymous",
  }

  const logsDir = path.join(process.cwd(), "logs")
  const logFile = path.join(logsDir, "errors.jsonl")

  try {
    await fs.mkdir(logsDir, { recursive: true })
    await fs.appendFile(logFile, JSON.stringify(logEntry) + "\n")
    console.log("[v0] Error logged successfully")
  } catch (error) {
    console.error("Failed to write error log:", error)
  }
}
