"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface SkillData {
  skill: string
  userLevel: number
  requiredLevel: number
  hasEvidence: boolean
  gap: number
  category: "technical" | "soft" | "industry" | "tools"
}

interface SkillChartProps {
  skills: SkillData[]
  overallMatch: number
  darkMode?: boolean
}

export default function SkillChartPreview({ skills, overallMatch, darkMode = false }: SkillChartProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technical":
        return darkMode ? "bg-blue-900/20 text-blue-400" : "bg-blue-50 text-blue-700"
      case "soft":
        return darkMode ? "bg-green-900/20 text-green-400" : "bg-green-50 text-green-700"
      case "industry":
        return darkMode ? "bg-purple-900/20 text-purple-400" : "bg-purple-50 text-purple-700"
      case "tools":
        return darkMode ? "bg-orange-900/20 text-orange-400" : "bg-orange-50 text-orange-700"
      default:
        return darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
    }
  }

  const getSkillStatus = (skill: SkillData) => {
    if (skill.gap <= 0) return { status: "Strong Match", color: "text-green-500" }
    if (skill.gap <= 2) return { status: "Minor Gap", color: "text-yellow-500" }
    return { status: "Needs Development", color: "text-red-500" }
  }

  return (
    <Card className={darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
      <CardHeader>
        <CardTitle className={darkMode ? "text-white" : "text-gray-900"}>Skill Match Analysis</CardTitle>
        <div className="flex items-center gap-4">
          <div
            className={`text-2xl font-bold ${overallMatch >= 80 ? "text-green-500" : overallMatch >= 60 ? "text-yellow-500" : "text-red-500"}`}
          >
            {overallMatch}%
          </div>
          <div>
            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Overall Qualification Match</p>
            <Progress value={overallMatch} className="w-32" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.map((skill, index) => {
          const status = getSkillStatus(skill)
          return (
            <div key={index} className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{skill.skill}</h4>
                  <Badge className={getCategoryColor(skill.category)}>{skill.category}</Badge>
                </div>
                <span className={`text-sm font-medium ${status.color}`}>{status.status}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Your Level: {skill.userLevel}/10</span>
                  <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Required: {skill.requiredLevel}/10
                  </span>
                </div>

                <div className="relative">
                  <Progress value={(skill.userLevel / 10) * 100} className="h-2" />
                  <div
                    className="absolute top-0 h-2 bg-red-200 rounded-full"
                    style={{
                      left: `${(skill.userLevel / 10) * 100}%`,
                      width: `${Math.max(0, (skill.requiredLevel - skill.userLevel) / 10) * 100}%`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className={`${skill.hasEvidence ? "text-green-500" : "text-red-500"}`}>
                    {skill.hasEvidence ? "✓ Evidence provided" : "⚠ No evidence"}
                  </span>
                  {skill.gap > 0 && (
                    <span className={darkMode ? "text-yellow-400" : "text-yellow-600"}>Gap: {skill.gap} points</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
