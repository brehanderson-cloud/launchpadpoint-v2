"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ResumeParser, type ParsedResumeData } from "@/lib/resume-parser"
import { AIEngine, type ResumeOptimization, type JobAnalysis } from "@/lib/ai-engine"

interface ResumeFormProps {
  resumeData: ParsedResumeData
  setResumeData: (data: ParsedResumeData) => void
}

export function ResumeForm({ resumeData, setResumeData }: ResumeFormProps) {
  const [aiLoading, setAiLoading] = useState<string | null>(null)
  const [currentResume, setCurrentResume] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [optimization, setOptimization] = useState<ResumeOptimization | null>(null)
  const [jobAnalysis, setJobAnalysis] = useState<JobAnalysis | null>(null)
  const [resumeScore, setResumeScore] = useState<{ score: number; breakdown: any } | null>(null)

  const parseResumeText = (text: string) => {
    if (!text.trim()) return

    const parsedData = ResumeParser.parseResume(text)
    setResumeData(parsedData)
  }

  const runAIAnalysis = async () => {
    if (!currentResume.trim() || !jobDescription.trim()) return

    setAiLoading("comprehensive-analysis")

    try {
      // Run multiple AI analyses in parallel
      const [jobAnalysisResult, optimizationResult, scoreResult] = await Promise.all([
        AIEngine.analyzeJob(jobDescription),
        AIEngine.optimizeResume(resumeData, jobDescription),
        AIEngine.scoreResume(resumeData, jobDescription),
      ])

      if (jobAnalysisResult) setJobAnalysis(jobAnalysisResult)
      if (optimizationResult) {
        setOptimization(optimizationResult)

        // Apply AI improvements automatically
        if (optimizationResult.optimizedSummary) {
          setResumeData({
            ...resumeData,
            personalInfo: {
              ...resumeData.personalInfo,
              summary: optimizationResult.optimizedSummary,
            },
          })
        }

        if (optimizationResult.suggestedSkills?.length > 0) {
          setResumeData({
            ...resumeData,
            skills: {
              ...resumeData.skills,
              technical: [...new Set([...resumeData.skills.technical, ...optimizationResult.suggestedSkills])],
            },
          })
        }
      }

      if (scoreResult) setResumeScore(scoreResult)
    } catch (error) {
      console.error("AI analysis failed:", error)
    } finally {
      setAiLoading(null)
    }
  }

  const handleResumeTextChange = (text: string) => {
    setCurrentResume(text)
    parseResumeText(text)

    // Auto-trigger analysis after delay
    if (text.trim() && jobDescription.trim()) {
      clearTimeout((window as any).analysisTimeout)
      ;(window as any).analysisTimeout = setTimeout(() => {
        runAIAnalysis()
      }, 2000)
    }
  }

  const handleJobDescriptionChange = (text: string) => {
    setJobDescription(text)

    if (text.trim() && currentResume.trim()) {
      clearTimeout((window as any).analysisTimeout)
      ;(window as any).analysisTimeout = setTimeout(() => {
        runAIAnalysis()
      }, 2000)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-accent">🧠</span>
            AI-Powered Resume Intelligence
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Advanced AI system that parses, analyzes, and optimizes your resume for maximum impact.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeScore && (
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <span>📊</span>
                  Resume Score
                </h3>
                <div className="text-2xl font-bold text-accent">{resumeScore.score}%</div>
              </div>
              <Progress value={resumeScore.score} className="mb-3" aria-label={`Resume score: ${resumeScore.score}%`} />
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(resumeScore.breakdown).map(([key, value]: [string, any]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                    <span className="font-medium">{value.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Tabs defaultValue="resume" className="w-full">
            <TabsList className="grid w-full grid-cols-2" role="tablist">
              <TabsTrigger value="resume" className="flex items-center gap-2" role="tab">
                <span>📄</span>
                Your Resume
              </TabsTrigger>
              <TabsTrigger value="job" className="flex items-center gap-2" role="tab">
                <span>💼</span>
                Job Description
              </TabsTrigger>
            </TabsList>

            <TabsContent value="resume" className="space-y-4 mt-6" role="tabpanel">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-accent">📄</span>
                  <Label htmlFor="resume-textarea" className="text-base font-medium">
                    Paste Your Current Resume
                  </Label>
                </div>
                <Textarea
                  id="resume-textarea"
                  value={currentResume}
                  onChange={(e) => handleResumeTextChange(e.target.value)}
                  placeholder="Paste your current resume text here..."
                  rows={12}
                  className="min-h-[300px]"
                  aria-describedby="resume-help"
                  aria-required="true"
                />
                <span id="resume-help" className="sr-only">
                  Paste your complete resume text for AI analysis and optimization
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentResume("")}
                  disabled={!currentResume.trim()}
                  aria-label="Clear resume text"
                >
                  Clear
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="job" className="space-y-4 mt-6" role="tabpanel">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span>💼</span>
                  <Label htmlFor="job-textarea" className="text-base font-medium">
                    Target Job Description
                  </Label>
                </div>
                <Textarea
                  id="job-textarea"
                  value={jobDescription}
                  onChange={(e) => handleJobDescriptionChange(e.target.value)}
                  placeholder="Paste the complete job description you're applying for here..."
                  rows={12}
                  className="min-h-[300px]"
                  aria-describedby="job-help"
                  aria-required="true"
                />
                <span id="job-help" className="sr-only">
                  Paste the complete job description to analyze requirements and match with your resume
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setJobDescription("")}
                  disabled={!jobDescription.trim()}
                  aria-label="Clear job description text"
                >
                  Clear
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center pt-4">
            <Button
              onClick={runAIAnalysis}
              disabled={aiLoading === "comprehensive-analysis" || !currentResume.trim() || !jobDescription.trim()}
              className="bg-accent hover:bg-accent/90 text-white px-8"
              aria-describedby="analysis-help"
              aria-disabled={aiLoading === "comprehensive-analysis" || !currentResume.trim() || !jobDescription.trim()}
            >
              {aiLoading === "comprehensive-analysis" ? (
                <span className="mr-2" aria-hidden="true">
                  ⏳
                </span>
              ) : (
                <span className="mr-2" aria-hidden="true">
                  🧠
                </span>
              )}
              {aiLoading === "comprehensive-analysis" ? "Analyzing..." : "Run AI Analysis"}
            </Button>
            <span id="analysis-help" className="sr-only">
              Start comprehensive AI analysis of your resume against the job requirements
            </span>
          </div>

          {optimization && (
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-accent">🎯</span>
                <h3 className="text-lg font-semibold">AI Optimization Results</h3>
                <Badge variant="secondary" className="ml-auto">
                  Overall Score: {optimization.overallScore}%
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-green-200 bg-green-50/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <span className="text-green-600">✅</span>
                      Skills Match: {optimization.skillsMatch}%
                    </CardTitle>
                  </CardHeader>
                </Card>

                <Card className="border-blue-200 bg-blue-50/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <span className="text-blue-600">📈</span>
                      Experience Relevance: {optimization.experienceRelevance}%
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>

              {optimization.suggestions.length > 0 && (
                <Card className="border-accent/20">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <span className="text-accent">💡</span>
                      AI Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div role="list" aria-label="AI recommendations for resume improvement">
                      {optimization.suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-white rounded-lg border"
                          role="listitem"
                        >
                          <Badge
                            variant={
                              suggestion.priority === "high"
                                ? "destructive"
                                : suggestion.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className="text-xs"
                            aria-label={`Priority: ${suggestion.priority}`}
                          >
                            {suggestion.priority}
                          </Badge>
                          <div className="flex-1">
                            <p className="text-sm font-medium capitalize">
                              {suggestion.type} {suggestion.section}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">{suggestion.content}</p>
                            <p className="text-xs text-muted-foreground mt-1 italic">{suggestion.reason}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {jobAnalysis && (
            <Card className="border-purple-200 bg-purple-50/50">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <span className="text-purple-600">🔍</span>
                  Job Analysis Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Experience Level: {jobAnalysis.experienceLevel}</p>
                  <p className="text-sm font-medium mb-2">Required Skills ({jobAnalysis.requiredSkills.length}):</p>
                  <div className="flex flex-wrap gap-1" role="list" aria-label="Required skills from job analysis">
                    {jobAnalysis.requiredSkills.slice(0, 8).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs" role="listitem">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
