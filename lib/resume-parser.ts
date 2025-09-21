export interface ParsedResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    summary: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    responsibilities: string[]
    isCurrentRole: boolean
  }>
  skills: {
    technical: string[]
    soft: string[]
  }
  education: Array<{
    institution: string
    degree: string
    field: string
    graduationDate: string
  }>
  certifications: string[]
}

export class ResumeParser {
  static parseResume(resumeText: string): ParsedResumeData {
    const lines = resumeText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    return {
      personalInfo: this.extractPersonalInfo(lines),
      experience: this.extractExperience(lines),
      skills: this.extractSkills(lines),
      education: this.extractEducation(lines),
      certifications: this.extractCertifications(lines),
    }
  }

  private static extractPersonalInfo(lines: string[]) {
    const personalInfo = {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    }

    // Extract email
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
    const emailMatch = lines.find((line) => emailRegex.test(line))
    if (emailMatch) {
      const match = emailMatch.match(emailRegex)
      personalInfo.email = match ? match[0] : ""
    }

    const phoneRegex = /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/
    const phoneMatch = lines.find((line) => phoneRegex.test(line))
    if (phoneMatch) {
      const match = phoneMatch.match(phoneRegex)
      personalInfo.phone = match ? match[0] : ""
    }

    // Extract name (usually first line or line with capitalized words)
    const nameCandidate = lines.find(
      (line) =>
        line.length > 5 &&
        line.length < 50 &&
        /^[A-Z][a-z]+ [A-Z][a-z]+/.test(line) &&
        !emailRegex.test(line) &&
        !phoneRegex.test(line),
    )
    personalInfo.fullName = nameCandidate || "Your Name"

    // Extract location (look for city, state patterns)
    const locationRegex = /([A-Z][a-z]+,?\s+[A-Z]{2})|([A-Z][a-z]+,\s+[A-Z][a-z]+)/
    const locationMatch = lines.find((line) => locationRegex.test(line))
    if (locationMatch) {
      const match = locationMatch.match(locationRegex)
      personalInfo.location = match ? match[0] : ""
    }

    // Extract summary (look for summary/objective sections)
    const summaryIndex = lines.findIndex((line) => /summary|objective|profile/i.test(line) && line.length < 30)
    if (summaryIndex !== -1 && summaryIndex + 1 < lines.length) {
      const summaryLines = []
      for (let i = summaryIndex + 1; i < lines.length; i++) {
        const line = lines[i]
        if (/experience|education|skills|work/i.test(line) && line.length < 30) break
        summaryLines.push(line)
      }
      personalInfo.summary = summaryLines.join(" ").substring(0, 300)
    }

    return personalInfo
  }

  private static extractExperience(lines: string[]) {
    const experience = []
    const experienceStart = lines.findIndex(
      (line) => /experience|employment|work history/i.test(line) && line.length < 30,
    )

    if (experienceStart === -1) return experience

    let currentJob = null
    for (let i = experienceStart + 1; i < lines.length; i++) {
      const line = lines[i]

      // Stop if we hit another section
      if (/education|skills|certifications/i.test(line) && line.length < 30) break

      // Check if this looks like a job title/company line
      if (line.includes("|") || line.includes("–") || line.includes("-")) {
        if (currentJob) {
          experience.push(currentJob)
        }

        const parts = line.split(/[|–-]/).map((p) => p.trim())
        currentJob = {
          id: `exp-${experience.length}`,
          position: parts[0] || "Position",
          company: parts[1] || "Company",
          startDate: "2020",
          endDate: "Present",
          responsibilities: [],
          isCurrentRole: true,
        }
      } else if (currentJob && (line.startsWith("•") || line.startsWith("-") || line.startsWith("*"))) {
        // This is a responsibility bullet point
        currentJob.responsibilities.push(line.replace(/^[•\-*]\s*/, ""))
      }
    }

    if (currentJob) {
      experience.push(currentJob)
    }

    return experience
  }

  private static extractSkills(lines: string[]) {
    const skills = { technical: [], soft: [] }
    const skillsStart = lines.findIndex((line) => /skills|technologies|competencies/i.test(line) && line.length < 30)

    if (skillsStart === -1) return skills

    for (let i = skillsStart + 1; i < lines.length; i++) {
      const line = lines[i]

      // Stop if we hit another section
      if (/experience|education|certifications/i.test(line) && line.length < 30) break

      // Split by common delimiters and extract skills
      const skillsInLine = line
        .split(/[,;|•\-*]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 1)

      skillsInLine.forEach((skill) => {
        // Simple heuristic: technical skills often contain specific technologies
        if (/javascript|python|react|node|sql|aws|docker|git/i.test(skill)) {
          skills.technical.push(skill)
        } else if (skill.length > 3 && skill.length < 30) {
          skills.technical.push(skill)
        }
      })
    }

    return skills
  }

  private static extractEducation(lines: string[]) {
    const education = []
    const educationStart = lines.findIndex(
      (line) => /education|academic|university|college/i.test(line) && line.length < 30,
    )

    if (educationStart === -1) return education

    for (let i = educationStart + 1; i < lines.length; i++) {
      const line = lines[i]

      // Stop if we hit another section
      if (/experience|skills|certifications/i.test(line) && line.length < 30) break

      if (line.length > 10) {
        education.push({
          institution: line,
          degree: "Degree",
          field: "Field of Study",
          graduationDate: "2020",
        })
      }
    }

    return education
  }

  private static extractCertifications(lines: string[]) {
    const certifications = []
    const certStart = lines.findIndex((line) => /certifications|certificates|licenses/i.test(line) && line.length < 30)

    if (certStart === -1) return certifications

    for (let i = certStart + 1; i < lines.length; i++) {
      const line = lines[i]

      // Stop if we hit another section
      if (/experience|education|skills/i.test(line) && line.length < 30) break

      if (line.length > 5) {
        certifications.push(line)
      }
    }

    return certifications
  }
}
