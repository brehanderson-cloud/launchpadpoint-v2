export class AIEngine {
  static async analyzeJob(jobDescription: string) {
    try {
      const response = await fetch("/api/ai/analyze-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze job")
      }

      const data = await response.json()
      return data.analysis
    } catch (error) {
      console.error("Job analysis error:", error)
      return null
    }
  }

  static async scoreResume(resumeData: any, jobDescription: string) {
    try {
      const response = await fetch("/api/ai/score-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeData, jobDescription }),
      })

      if (!response.ok) {
        throw new Error("Failed to score resume")
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Resume scoring error:", error)
      return { score: 68 }
    }
  }

  static async optimizeResume(resumeData: any, jobDescription: string) {
    try {
      const response = await fetch("/api/ai/optimize-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeData, jobDescription }),
      })

      if (!response.ok) {
        throw new Error("Failed to optimize resume")
      }

      const data = await response.json()
      return data.optimization
    } catch (error) {
      console.error("Resume optimization error:", error)
      return null
    }
  }

  static async improveSummary(currentSummary: string, jobTitle: string, experience: string) {
    try {
      const response = await fetch("/api/ai/improve-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentSummary, jobTitle, experience }),
      })

      if (!response.ok) {
        throw new Error("Failed to improve summary")
      }

      const data = await response.json()
      return data.improvedSummary
    } catch (error) {
      console.error("Summary improvement error:", error)
      return currentSummary
    }
  }

  static async generateResponsibilities(jobTitle: string, company: string, currentResponsibilities?: string) {
    try {
      const response = await fetch("/api/ai/generate-responsibilities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobTitle, company, currentResponsibilities }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate responsibilities")
      }

      const data = await response.json()
      return data.responsibilities
    } catch (error) {
      console.error("Responsibilities generation error:", error)
      return "Unable to generate responsibilities at this time."
    }
  }

  static async suggestSkills(jobTitle: string, currentSkills: string[], industry?: string) {
    try {
      const response = await fetch("/api/ai/suggest-skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobTitle, currentSkills, industry }),
      })

      if (!response.ok) {
        throw new Error("Failed to suggest skills")
      }

      const data = await response.json()
      return data.suggestedSkills
    } catch (error) {
      console.error("Skills suggestion error:", error)
      return []
    }
  }
}
