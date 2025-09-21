"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { resumeTemplates, generateResumeHTML } from "@/lib/resume-templates"
import type { ParsedResumeData } from "@/lib/resume-parser"

interface ResumePreviewProps {
  resumeData: ParsedResumeData
  onDownloadComplete?: () => void
}

function ResumePreview({ resumeData, onDownloadComplete }: ResumePreviewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("professional-modern")

  const handleDownload = () => {
    console.log("[v0] Download requested...", {
      hasResumeData: !!resumeData?.personalInfo?.fullName,
      selectedTemplate,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      location: window.location.href,
    })

    try {
      const resumeHTML = generateResumeHTML(resumeData, selectedTemplate)
      const blob = new Blob([resumeHTML], { type: "text/html" })
      const downloadUrl = URL.createObjectURL(blob)

      console.log("[v0] Download details:", {
        downloadUrl,
        filename: `${resumeData.personalInfo.fullName || "resume"}.html`,
        contentLength: resumeHTML.length,
        blobType: blob.type,
        blobSize: blob.size,
        isValidBlobUrl: downloadUrl.startsWith("blob:"),
      })

      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = `${resumeData.personalInfo.fullName || "resume"}.html`
      a.style.display = "none"
      document.body.appendChild(a)

      a.click()

      document.body.removeChild(a)
      URL.revokeObjectURL(downloadUrl)

      console.log("[v0] Download initiated successfully - no API calls needed")

      if (onDownloadComplete) {
        setTimeout(() => {
          onDownloadComplete()
        }, 1000)
      }
    } catch (error) {
      console.error("[v0] Download failed:", error)
      alert("Download failed. Please try again or contact support if the issue persists.")
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-accent/20 bg-accent/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <span className="text-accent">🎨</span>
            Smart Resume Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground">
            AI-optimized resume with real-time enhancements and professional templates.
          </p>
          <div className="flex items-center gap-2">
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                {resumeTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm" onClick={handleDownload} disabled={!resumeData.personalInfo.fullName}>
              <span className="mr-1">⬇️</span>
              Download
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full bg-white shadow-lg">
        <CardContent className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{resumeData.personalInfo.fullName || "Your Name"}</h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {resumeData.personalInfo.email && (
                <div className="flex items-center gap-1">
                  <span>📧</span>
                  {resumeData.personalInfo.email}
                </div>
              )}
              {resumeData.personalInfo.location && (
                <div className="flex items-center gap-1">
                  <span>📍</span>
                  {resumeData.personalInfo.location}
                </div>
              )}
              {resumeData.personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <span>💼</span>
                  LinkedIn
                </div>
              )}
            </div>
          </div>

          {/* AI-Enhanced Professional Summary */}
          {resumeData.personalInfo.summary && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1 flex items-center gap-2">
                Professional Summary
                <Badge variant="secondary" className="text-xs">
                  AI Enhanced
                </Badge>
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{resumeData.personalInfo.summary}</p>
            </div>
          )}

          {resumeData.experience.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1 flex items-center gap-2">
                Professional Experience
                <Badge variant="secondary" className="text-xs">
                  AI Optimized
                </Badge>
              </h2>
              <div className="space-y-4">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-accent/30 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-accent font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {exp.startDate} - {exp.isCurrentRole ? "Present" : exp.endDate}
                      </span>
                    </div>
                    {exp.responsibilities.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {exp.responsibilities.map((resp, index) => (
                          <li key={index} className="text-sm">
                            {resp}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {(resumeData.skills.technical.length > 0 || resumeData.skills.soft.length > 0) && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1 flex items-center gap-2">
                Core Competencies
                <Badge variant="secondary" className="text-xs">
                  AI Optimized
                </Badge>
              </h2>
              <div className="space-y-3">
                {resumeData.skills.technical.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.technical.map((skill) => (
                        <Badge key={skill} variant="outline" className="bg-accent/10 text-accent">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {resumeData.skills.soft.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">Professional Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.soft.map((skill) => (
                        <Badge key={skill} variant="outline" className="bg-blue-50 text-blue-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {!resumeData.personalInfo.fullName && resumeData.skills.technical.length === 0 && (
            <div className="text-center py-12 text-gray-500 space-y-4">
              <div className="text-6xl mb-4">🧠</div>
              <p className="text-lg mb-2">AI Resume Intelligence Ready</p>
              <p className="text-sm max-w-md mx-auto">
                Advanced AI system ready to parse, analyze, and optimize your resume with professional templates and
                real-time scoring.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 mt-6 max-w-sm mx-auto">
                <div className="flex items-center gap-1">
                  <span>🔍</span>
                  Smart Parsing
                </div>
                <div className="flex items-center gap-1">
                  <span>📊</span>
                  Live Scoring
                </div>
                <div className="flex items-center gap-1">
                  <span>🎯</span>
                  Job Matching
                </div>
                <div className="flex items-center gap-1">
                  <span>🎨</span>
                  Pro Templates
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ResumePreview
