import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  console.log("[v0] Download API called - this should not be used for client-side downloads")

  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get("url")
    const filename = searchParams.get("filename") || "resume.html"

    console.log("[v0] Download request:", { url, filename })

    if (!url) {
      console.log("[v0] Download error: No URL provided")
      return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
    }

    if (url.startsWith("blob:")) {
      console.log("[v0] Blob URL detected - this is incorrect usage")
      return NextResponse.json(
        {
          error: "Blob URLs cannot be processed server-side",
          solution: "Use client-side download instead",
          note: "This API endpoint should not be called for resume downloads",
        },
        { status: 400 },
      )
    }

    // For regular URLs, fetch and return the content
    const response = await fetch(url)
    if (!response.ok) {
      console.log("[v0] Download error: Failed to fetch URL", response.status)
      return NextResponse.json({ error: "Failed to fetch content" }, { status: response.status })
    }

    const content = await response.text()
    console.log("[v0] Download successful, content length:", content.length)

    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("[v0] Download API error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Download failed" }, { status: 500 })
  }
}
