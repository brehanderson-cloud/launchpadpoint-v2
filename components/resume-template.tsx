"use client"
import type React from "react"
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.4,
  },

  // Header styles
  header: {
    marginBottom: 20,
    borderBottom: "2pt solid #2563eb",
    paddingBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 6,
  },
  contactInfo: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 2,
  },

  // Section styles
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
    textTransform: "uppercase",
    borderBottom: "1pt solid #e5e7eb",
    paddingBottom: 4,
    letterSpacing: 0.5,
  },

  // Summary styles
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#374151",
    textAlign: "justify",
    marginBottom: 4,
  },

  // Skills styles
  skillsContainer: {
    flexDirection: "column",
    gap: 6,
  },
  skillCategory: {
    marginBottom: 8,
  },
  skillCategoryTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  skillItem: {
    fontSize: 9,
    backgroundColor: "#f3f4f6",
    padding: "3 6",
    borderRadius: 2,
    color: "#374151",
    marginBottom: 3,
    marginRight: 6,
  },
  strengthSkill: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
  developingSkill: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
  },

  // Experience styles
  experienceItem: {
    marginBottom: 14,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  companyInfo: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 6,
  },
  bulletPoint: {
    fontSize: 10,
    marginLeft: 12,
    marginBottom: 3,
    color: "#374151",
    lineHeight: 1.4,
  },

  // Education styles
  educationItem: {
    fontSize: 10,
    marginBottom: 4,
    color: "#374151",
  },

  // Development plan styles
  developmentPlan: {
    backgroundColor: "#f0f9ff",
    padding: 8,
    borderLeft: "3pt solid #0ea5e9",
    marginTop: 4,
  },
  planItem: {
    fontSize: 9,
    marginBottom: 3,
    color: "#374151",
  },
  priorityHigh: {
    color: "#dc2626",
    fontWeight: "bold",
  },
  priorityMedium: {
    color: "#ea580c",
  },
  priorityLow: {
    color: "#059669",
  },
})

interface ResumeTemplateProps {
  userData: {
    name: string
    email: string
    phone?: string
    location?: string
    linkedin?: string
    targetRole?: string
    experience: Array<{
      title: string
      company: string
      location?: string
      startDate: string
      endDate: string
      achievements?: string[]
    }>
    education: Array<{
      degree: string
      school: string
      year: string
    }>
    skills: string[]
  }
  jobAnalysis: {
    qualificationLevel?: string
    timeline?: string
    actionPlan?: Array<{
      priority: string
      action: string
      timeline?: string
    }>
  }
  skillsAnalysis: Array<{
    name: string
    evidence?: string
    yourLevel?: number
    requiredLevel?: number
    gap?: string
  }>
}

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ userData, jobAnalysis, skillsAnalysis }) => {
  const categorizeSkills = () => {
    if (!skillsAnalysis || !Array.isArray(skillsAnalysis)) {
      return { strengths: [], developing: [] }
    }

    const strengths = skillsAnalysis.filter(
      (skill) => skill.evidence && (skill.yourLevel || 0) >= (skill.requiredLevel || 0) - 1,
    )

    const developing = skillsAnalysis.filter(
      (skill) => skill.gap === "Minor Gap" && (skill.yourLevel || 0) >= (skill.requiredLevel || 0) - 3,
    )

    return { strengths, developing }
  }

  const { strengths, developing } = categorizeSkills()

  // Generate professional summary
  const generateSummary = () => {
    const topSkills = strengths
      .slice(0, 3)
      .map((s) => s.name)
      .join(", ")
    const experience = calculateExperience(userData.experience || [])

    return `${userData.targetRole || "Professional"} with ${experience} years of experience${topSkills ? ` in ${topSkills}` : ""}. ${jobAnalysis?.qualificationLevel || "Well-qualified candidate"}${jobAnalysis?.timeline ? ` with a ${jobAnalysis.timeline} development timeline` : ""}. Proven track record of delivering results${
      strengths.length >= 2
        ? ` through ${strengths
            .slice(0, 2)
            .map((s) => s.name)
            .join(" and ")}`
        : ""
    }.`
  }

  const calculateExperience = (experience: any[]) => {
    if (!experience || experience.length === 0) return "3+"

    const years = experience.reduce((total, job) => {
      const startYear = Number.parseInt(job.startDate) || new Date().getFullYear() - 2
      const endYear =
        job.endDate === "Present" ? new Date().getFullYear() : Number.parseInt(job.endDate) || new Date().getFullYear()
      return total + Math.max(0, endYear - startYear)
    }, 0)

    return `${Math.max(1, years)}+`
  }

  // Enhance achievement based on skill evidence
  const enhanceAchievement = (achievement: string, evidencedSkills: any[]) => {
    const enhanced = achievement

    evidencedSkills.forEach((skill) => {
      if (achievement.toLowerCase().includes(skill.name.toLowerCase())) {
        // This achievement demonstrates an evidenced skill - keep it prominent
        return achievement
      }
    })

    return enhanced
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{userData.name || "Professional Name"}</Text>
          <Text style={styles.contactInfo}>
            {userData.email || "email@example.com"}
            {userData.phone ? ` | ${userData.phone}` : ""}
          </Text>
          {userData.location && <Text style={styles.contactInfo}>{userData.location}</Text>}
          {userData.linkedin && <Text style={styles.contactInfo}>{userData.linkedin}</Text>}
        </View>

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{generateSummary()}</Text>
        </View>

        {/* Skills & Expertise */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills & Expertise</Text>
          <View style={styles.skillsContainer}>
            {/* Core Strengths */}
            {strengths.length > 0 && (
              <View style={styles.skillCategory}>
                <Text style={styles.skillCategoryTitle}>Core Strengths</Text>
                <View style={styles.skillsRow}>
                  {strengths.map((skill, index) => (
                    <Text key={index} style={[styles.skillItem, styles.strengthSkill]}>
                      {skill.name}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {/* Developing Skills */}
            {developing.length > 0 && (
              <View style={styles.skillCategory}>
                <Text style={styles.skillCategoryTitle}>Developing Skills</Text>
                <View style={styles.skillsRow}>
                  {developing.map((skill, index) => (
                    <Text key={index} style={[styles.skillItem, styles.developingSkill]}>
                      {skill.name}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {/* Default Skills if no analysis available */}
            {strengths.length === 0 && developing.length === 0 && userData.skills && (
              <View style={styles.skillCategory}>
                <Text style={styles.skillCategoryTitle}>Key Skills</Text>
                <View style={styles.skillsRow}>
                  {userData.skills.map((skill, index) => (
                    <Text key={index} style={styles.skillItem}>
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Professional Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {(userData.experience || []).map((job, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{job.title || "Position Title"}</Text>
              <Text style={styles.companyInfo}>
                {job.company || "Company Name"}
                {job.location ? ` | ${job.location}` : ""} | {job.startDate || "Start"} - {job.endDate || "End"}
              </Text>
              {job.achievements &&
                job.achievements.map((achievement, i) => (
                  <Text key={i} style={styles.bulletPoint}>
                    • {enhanceAchievement(achievement, strengths)}
                  </Text>
                ))}
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {(userData.education || []).map((edu, index) => (
            <Text key={index} style={styles.educationItem}>
              {edu.degree || "Degree"} - {edu.school || "School"} ({edu.year || "Year"})
            </Text>
          ))}
        </View>

        {/* Professional Development Plan */}
        {jobAnalysis?.actionPlan && jobAnalysis.actionPlan.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Development Plan</Text>
            <View style={styles.developmentPlan}>
              <Text style={[styles.planItem, { fontWeight: "bold", marginBottom: 6 }]}>
                Target Timeline: {jobAnalysis.timeline || "To be determined"}
              </Text>
              {jobAnalysis.actionPlan.slice(0, 3).map((action, index) => (
                <Text
                  key={index}
                  style={[
                    styles.planItem,
                    action.priority === "high"
                      ? styles.priorityHigh
                      : action.priority === "medium"
                        ? styles.priorityMedium
                        : styles.priorityLow,
                  ]}
                >
                  {action.priority?.toUpperCase() || "PRIORITY"}: {action.action || "Action item"}
                  {action.timeline && ` (${action.timeline})`}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  )
}

export default ResumeTemplate
