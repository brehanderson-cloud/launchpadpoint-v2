// Enhanced Resume Generation with Industry-Specific Templates

// Add to your CompleteResumeFlow.tsx - Replace the generateResumeHTML function

const generateIndustrySpecificHTML = (transformedData: any, resumeType = "complete", industry = "general") => {
  const { user, jobAnalysis, categorizedSkills } = transformedData
  const { strengths, developing, gaps } = categorizedSkills

  // Detect industry from job title or skills
  const detectedIndustry = detectIndustry(user.targetRole, transformedData.skillsAnalysis)
  const finalIndustry = industry !== "general" ? industry : detectedIndustry

  switch (finalIndustry) {
    case "academic":
    case "research":
      return generateAcademicResumeHTML(transformedData, resumeType)
    case "laboratory":
    case "scientific":
      return generateLaboratoryResumeHTML(transformedData, resumeType)
    case "healthcare":
    case "technology":
    default:
      return generateBusinessResumeHTML(transformedData, resumeType)
  }
}

// Industry Detection Function
const detectIndustry = (jobTitle: string, skills: any[]) => {
  const title = jobTitle.toLowerCase()
  const skillNames = skills.map((s) => s.name.toLowerCase()).join(" ")

  // Academic/Research indicators
  if (
    title.includes("phd") ||
    title.includes("postdoc") ||
    title.includes("research") ||
    title.includes("professor") ||
    title.includes("academic") ||
    skillNames.includes("publication") ||
    skillNames.includes("research methodology")
  ) {
    return "academic"
  }

  // Laboratory/Scientific indicators
  if (
    title.includes("analyst") ||
    title.includes("chemist") ||
    title.includes("laboratory") ||
    title.includes("scientist") ||
    skillNames.includes("gc/ms") ||
    skillNames.includes("spectroscopy") ||
    skillNames.includes("chromatography")
  ) {
    return "laboratory"
  }

  // Technology indicators
  if (
    title.includes("developer") ||
    title.includes("engineer") ||
    title.includes("software") ||
    skillNames.includes("python") ||
    skillNames.includes("javascript") ||
    skillNames.includes("aws")
  ) {
    return "technology"
  }

  // Healthcare indicators
  if (
    title.includes("nurse") ||
    title.includes("medical") ||
    title.includes("clinical") ||
    title.includes("healthcare") ||
    skillNames.includes("patient care")
  ) {
    return "healthcare"
  }

  return "business"
}

// Academic/Research Resume Template
const generateAcademicResumeHTML = (transformedData: any, resumeType: string) => {
  const { user, jobAnalysis, categorizedSkills } = transformedData
  const { strengths, developing, gaps } = categorizedSkills

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${user.name} - Curriculum Vitae</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Times New Roman', serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 40px 20px; 
            background: #fff;
        }
        .header { 
            text-align: center; 
            margin-bottom: 30px; 
        }
        .name { 
            font-size: 2.2em; 
            font-weight: bold; 
            color: #1f2937; 
            margin-bottom: 10px; 
        }
        .title { 
            font-size: 1.1em; 
            color: #4b5563; 
            margin-bottom: 15px; 
            font-style: italic; 
        }
        .contact { 
            font-size: 0.9em; 
            color: #6b7280; 
            margin-bottom: 5px; 
        }
        .section { 
            margin-bottom: 25px; 
        }
        .section-title { 
            font-size: 1.1em; 
            font-weight: bold; 
            color: #1f2937; 
            text-transform: uppercase; 
            border-bottom: 1px solid #d1d5db; 
            padding-bottom: 3px; 
            margin-bottom: 12px; 
            letter-spacing: 0.3px; 
        }
        .entry { 
            margin-bottom: 15px; 
        }
        .entry-header { 
            font-weight: bold; 
            color: #1f2937; 
        }
        .entry-details { 
            color: #4b5563; 
            font-style: italic; 
            font-size: 0.9em; 
        }
        .entry-description { 
            margin-top: 5px; 
            color: #374151; 
        }
        .publication { 
            margin-bottom: 10px; 
            text-align: justify; 
            line-height: 1.5; 
        }
        .publication-title { 
            font-weight: bold; 
        }
        .publication-journal { 
            font-style: italic; 
        }
        .skill-category { 
            margin-bottom: 12px; 
        }
        .skill-category-title { 
            font-weight: bold; 
            color: #1f2937; 
            margin-bottom: 5px; 
        }
        .skills-list { 
            color: #4b5563; 
        }
        .assessment-box { 
            background: #f9fafb; 
            border: 1px solid #d1d5db; 
            padding: 15px; 
            margin-bottom: 25px; 
            text-align: center; 
        }
        .assessment-title { 
            font-weight: bold; 
            color: #1e40af; 
            margin-bottom: 10px; 
        }
        .assessment-grid { 
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 15px; 
        }
        .assessment-item { 
            text-align: center; 
        }
        .assessment-value { 
            font-size: 1.3em; 
            font-weight: bold; 
            color: #2563eb; 
        }
        .assessment-label { 
            font-size: 0.8em; 
            color: #6b7280; 
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${user.name}</div>
        <div class="title">${user.targetRole}</div>
        <div class="contact">${user.email}${user.phone ? ` | ${user.phone}` : ""}</div>
        ${user.location ? `<div class="contact">${user.location}</div>` : ""}
        ${user.linkedin ? `<div class="contact">${user.linkedin}</div>` : ""}
    </div>

    <div class="assessment-box">
        <div class="assessment-title">AI-Generated Assessment Results</div>
        <div class="assessment-grid">
            <div class="assessment-item">
                <div class="assessment-value">${jobAnalysis.overallMatch}</div>
                <div class="assessment-label">Qualification Match</div>
            </div>
            <div class="assessment-item">
                <div class="assessment-value">${jobAnalysis.qualificationLevel}</div>
                <div class="assessment-label">Current Level</div>
            </div>
            <div class="assessment-item">
                <div class="assessment-value">${jobAnalysis.timeline}</div>
                <div class="assessment-label">Development Timeline</div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Research Summary</div>
        <div class="entry-description">
            ${user.targetRole} with demonstrated research experience and expertise in specialized methodologies. 
            Currently ${jobAnalysis.qualificationLevel.toLowerCase()} for target position with ${jobAnalysis.timeline} development timeline. 
            ${
              strengths.length > 0
                ? `Strong research capabilities in ${strengths
                    .slice(0, 2)
                    .map((s: any) => s.name)
                    .join(" and ")}.`
                : ""
            }
        </div>
    </div>

    <div class="section">
        <div class="section-title">Education</div>
        ${user.education
          .map(
            (edu: any) => `
        <div class="entry">
            <div class="entry-header">${edu.degree} - ${edu.school}</div>
            <div class="entry-details">${edu.year}${edu.field ? ` | ${edu.field}` : ""}</div>
        </div>`,
          )
          .join("")}
    </div>

    <div class="section">
        <div class="section-title">Research Experience</div>
        ${user.experience
          .map(
            (job: any) => `
        <div class="entry">
            <div class="entry-header">${job.title}</div>
            <div class="entry-details">${job.company}${job.location ? ` | ${job.location}` : ""} | ${job.startDate} - ${job.endDate}</div>
            <div class="entry-description">
                ${job.achievements.map((achievement: string) => `<div>• ${achievement}</div>`).join("")}
            </div>
        </div>`,
          )
          .join("")}
    </div>

    <div class="section">
        <div class="section-title">Research Skills & Expertise</div>
        ${
          strengths.length > 0
            ? `
        <div class="skill-category">
            <div class="skill-category-title">Core Research Competencies:</div>
            <div class="skills-list">${strengths.map((skill: any) => skill.name).join(", ")}</div>
        </div>`
            : ""
        }
        ${
          developing.length > 0
            ? `
        <div class="skill-category">
            <div class="skill-category-title">Developing Expertise:</div>
            <div class="skills-list">${developing.map((skill: any) => skill.name).join(", ")}</div>
        </div>`
            : ""
        }
        ${
          resumeType === "complete" && gaps.length > 0
            ? `
        <div class="skill-category">
            <div class="skill-category-title">Areas for Development:</div>
            <div class="skills-list">${gaps.map((skill: any) => skill.name).join(", ")}</div>
        </div>`
            : ""
        }
    </div>

    <div class="section">
        <div class="section-title">Selected Publications</div>
        <div class="publication">
            <span class="publication-title">[Publication titles would be generated based on user's research area and achievements]</span> 
            <span class="publication-journal">Journal Name.</span> Authors. Year.
        </div>
        <div class="publication">
            <em>Note: Actual publications would be extracted from user input during guided questioning or CV upload.</em>
        </div>
    </div>

    ${
      jobAnalysis.actionPlan && jobAnalysis.actionPlan.length > 0
        ? `
    <div class="section">
        <div class="section-title">Professional Development Plan</div>
        <div class="entry-description">
            <strong>Target Timeline:</strong> ${jobAnalysis.timeline}<br><br>
            ${jobAnalysis.actionPlan
              .slice(0, 3)
              .map(
                (action: any, index: number) => `
            <strong>${action.priority?.toUpperCase() || "PRIORITY"}:</strong> ${action.action}
            ${action.timeline ? ` <em>(${action.timeline})</em>` : ""}<br>`,
              )
              .join("")}
        </div>
    </div>`
        : ""
    }

    <div style="margin-top: 40px; text-align: center; font-size: 0.8em; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 15px;">
        <p>Generated by AI Resume Builder - LaunchpadPoint.com</p>
        <p>Academic CV optimized for ${user.targetRole} positions</p>
    </div>
</body>
</html>`
}

// Laboratory/Scientific Resume Template
const generateLaboratoryResumeHTML = (transformedData: any, resumeType: string) => {
  const { user, jobAnalysis, categorizedSkills } = transformedData
  const { strengths, developing, gaps } = categorizedSkills

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${user.name} - Scientific Resume</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Arial', 'Helvetica', sans-serif; 
            line-height: 1.5; 
            color: #333; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 30px 20px; 
            background: #fff;
        }
        .header { 
            text-align: center; 
            border-bottom: 2px solid #2563eb; 
            padding-bottom: 15px; 
            margin-bottom: 25px; 
        }
        .name { 
            font-size: 2.3em; 
            font-weight: bold; 
            color: #1f2937; 
            margin-bottom: 8px; 
        }
        .title { 
            font-size: 1.1em; 
            color: #4b5563; 
            margin-bottom: 10px; 
        }
        .contact { 
            font-size: 0.9em; 
            color: #6b7280; 
            margin-bottom: 3px; 
        }
        .section { 
            margin-bottom: 22px; 
        }
        .section-title { 
            font-size: 1.2em; 
            font-weight: bold; 
            color: #1f2937; 
            text-transform: uppercase; 
            border-bottom: 2px solid #e5e7eb; 
            padding-bottom: 4px; 
            margin-bottom: 12px; 
            letter-spacing: 0.5px; 
        }
        .summary { 
            background: #f8fafc; 
            padding: 15px; 
            border-left: 4px solid #2563eb; 
            margin-bottom: 20px; 
            font-style: italic; 
        }
        .entry { 
            margin-bottom: 18px; 
        }
        .entry-header { 
            font-weight: bold; 
            color: #1f2937; 
            font-size: 1.05em; 
        }
        .entry-details { 
            color: #4b5563; 
            font-size: 0.9em; 
            margin-bottom: 5px; 
        }
        .entry-description { 
            color: #374151; 
        }
        .achievement { 
            margin-left: 15px; 
            margin-bottom: 5px; 
            position: relative; 
        }
        .achievement:before { 
            content: '•'; 
            position: absolute; 
            left: -12px; 
            color: #2563eb; 
            font-weight: bold; 
        }
        .technical-skills { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
            gap: 15px; 
        }
        .skill-group { 
            background: #f9fafb; 
            padding: 12px; 
            border-radius: 5px; 
        }
        .skill-group-title { 
            font-weight: bold; 
            color: #1f2937; 
            margin-bottom: 6px; 
            font-size: 0.95em; 
        }
        .skill-list { 
            font-size: 0.85em; 
            color: #4b5563; 
        }
        .assessment-summary { 
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); 
            border: 1px solid #bfdbfe; 
            padding: 18px; 
            border-radius: 8px; 
            margin-bottom: 25px; 
        }
        .assessment-title { 
            font-weight: bold; 
            color: #1e40af; 
            margin-bottom: 12px; 
            text-align: center; 
        }
        .assessment-grid { 
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 12px; 
        }
        .assessment-item { 
            text-align: center; 
            background: white; 
            padding: 10px; 
            border-radius: 5px; 
        }
        .assessment-value { 
            font-size: 1.4em; 
            font-weight: bold; 
            color: #2563eb; 
        }
        .assessment-label { 
            font-size: 0.75em; 
            color: #6b7280; 
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${user.name}</div>
        <div class="title">${user.targetRole}</div>
        <div class="contact">${user.email}${user.phone ? ` | ${user.phone}` : ""}</div>
        ${user.location ? `<div class="contact">${user.location}</div>` : ""}
        ${user.linkedin ? `<div class="contact">${user.linkedin}</div>` : ""}
    </div>

    <div class="assessment-summary">
        <div class="assessment-title">AI-Powered Skills Assessment</div>
        <div class="assessment-grid">
            <div class="assessment-item">
                <div class="assessment-value">${jobAnalysis.overallMatch}</div>
                <div class="assessment-label">Technical Match</div>
            </div>
            <div class="assessment-item">
                <div class="assessment-value">${jobAnalysis.qualificationLevel}</div>
                <div class="assessment-label">Qualification Status</div>
            </div>
            <div class="assessment-item">
                <div class="assessment-value">${jobAnalysis.timeline}</div>
                <div class="assessment-label">Development Timeline</div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Professional Summary</div>
        <div class="summary">
            ${user.targetRole} with specialized expertise in analytical instrumentation and laboratory techniques. 
            Currently ${jobAnalysis.qualificationLevel.toLowerCase()} for target position with ${jobAnalysis.timeline} development timeline. 
            ${
              strengths.length > 0
                ? `Demonstrated proficiency in ${strengths
                    .slice(0, 3)
                    .map((s: any) => s.name)
                    .join(", ")}.`
                : ""
            } 
            ${
              developing.length > 0
                ? ` Currently developing expertise in ${developing
                    .slice(0, 2)
                    .map((s: any) => s.name)
                    .join(" and ")}.`
                : ""
            }
        </div>
    </div>

    <div class="section">
        <div class="section-title">Technical Skills & Instrumentation</div>
        <div class="technical-skills">
            ${
              strengths.length > 0
                ? `
            <div class="skill-group">
                <div class="skill-group-title">Core Competencies</div>
                <div class="skill-list">${strengths.map((skill: any) => skill.name).join(", ")}</div>
            </div>`
                : ""
            }
            ${
              developing.length > 0
                ? `
            <div class="skill-group">
                <div class="skill-group-title">Developing Skills</div>
                <div class="skill-list">${developing.map((skill: any) => skill.name).join(", ")}</div>
            </div>`
                : ""
            }
            ${
              resumeType === "complete" && gaps.length > 0
                ? `
            <div class="skill-group">
                <div class="skill-group-title">Areas for Development</div>
                <div class="skill-list">${gaps.map((skill: any) => skill.name).join(", ")}</div>
            </div>`
                : ""
            }
        </div>
    </div>

    <div class="section">
        <div class="section-title">Professional Experience</div>
        ${user.experience
          .map(
            (job: any) => `
        <div class="entry">
            <div class="entry-header">${job.title}</div>
            <div class="entry-details">${job.company}${job.location ? ` | ${job.location}` : ""} | ${job.startDate} - ${job.endDate}</div>
            <div class="entry-description">
                ${job.achievements.map((achievement: string) => `<div class="achievement">${achievement}</div>`).join("")}
            </div>
        </div>`,
          )
          .join("")}
    </div>

    <div class="section">
        <div class="section-title">Education & Certifications</div>
        ${user.education
          .map(
            (edu: any) => `
        <div class="entry">
            <div class="entry-header">${edu.degree}</div>
            <div class="entry-details">${edu.school} | ${edu.year}</div>
        </div>`,
          )
          .join("")}
    </div>

    ${
      jobAnalysis.actionPlan && jobAnalysis.actionPlan.length > 0
        ? `
    <div class="section">
        <div class="section-title">Professional Development Strategy</div>
        <div class="entry-description">
            <strong>Target Timeline:</strong> ${jobAnalysis.timeline}<br><br>
            ${jobAnalysis.actionPlan
              .slice(0, 4)
              .map(
                (action: any) => `
            <div class="achievement">
                <strong>${action.priority?.toUpperCase() || "PRIORITY"}:</strong> ${action.action}
                ${action.timeline ? ` <em>(${action.timeline})</em>` : ""}
            </div>`,
              )
              .join("")}
        </div>
    </div>`
        : ""
    }

    <div style="margin-top: 35px; text-align: center; font-size: 0.8em; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 15px;">
        <p>Generated by AI Resume Builder - LaunchpadPoint.com</p>
        <p>Laboratory resume optimized for ${user.targetRole} positions in analytical sciences</p>
    </div>
</body>
</html>`
}

// Business Resume Template (for non-specialized roles)
const generateBusinessResumeHTML = (transformedData: any, resumeType: string) => {
  const { user, jobAnalysis, categorizedSkills } = transformedData
  const { strengths, developing, gaps } = categorizedSkills

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${user.name} - Professional Resume</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Arial', sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 30px 20px; 
            background: #fff;
        }
        .header { 
            text-align: center; 
            margin-bottom: 20px; 
        }
        .name { 
            font-size: 2.2em; 
            font-weight: bold; 
            color: #1f2937; 
            margin-bottom: 10px; 
        }
        .title { 
            font-size: 1.1em; 
            color: #4b5563; 
            margin-bottom: 15px; 
        }
        .contact { 
            font-size: 0.9em; 
            color: #6b7280; 
            margin-bottom: 5px; 
        }
        .section { 
            margin-bottom: 25px; 
        }
        .section-title { 
            font-size: 1.1em; 
            font-weight: bold; 
            color: #1f2937; 
            text-transform: uppercase; 
            border-bottom: 1px solid #d1d5db; 
            padding-bottom: 3px; 
            margin-bottom: 12px; 
            letter-spacing: 0.3px; 
        }
        .entry { 
            margin-bottom: 15px; 
        }
        .entry-header { 
            font-weight: bold; 
            color: #1f2937; 
        }
        .entry-details { 
            color: #4b5563; 
            font-style: italic; 
            font-size: 0.9em; 
        }
        .entry-description { 
            margin-top: 5px; 
            color: #374151; 
        }
        .skill-category { 
            margin-bottom: 12px; 
        }
        .skill-category-title { 
            font-weight: bold; 
            color: #1f2937; 
            margin-bottom: 5px; 
        }
        .skills-list { 
            color: #4b5563; 
        }
        .assessment-box { 
            background: #f9fafb; 
            border: 1px solid #d1d5db; 
            padding: 15px; 
            margin-bottom: 25px; 
            text-align: center; 
        }
        .assessment-title { 
            font-weight: bold; 
            color: #1e40af; 
            margin-bottom: 10px; 
        }
        .assessment-grid { 
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 15px; 
        }
        .assessment-item { 
            text-align: center; 
        }
        .assessment-value { 
            font-size: 1.3em; 
            font-weight: bold; 
            color: #2563eb; 
        }
        .assessment-label { 
            font-size: 0.8em; 
            color: #6b7280; 
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${user.name}</div>
        <div class="title">${user.targetRole}</div>
        <div class="contact">${user.email}${user.phone ? ` | ${user.phone}` : ""}</div>
        ${user.location ? `<div class="contact">${user.location}</div>` : ""}
        ${user.linkedin ? `<div class="contact">${user.linkedin}</div>` : ""}
    </div>

    <div class="assessment-box">
        <div class="assessment-title">AI-Generated Assessment Results</div>
        <div class="assessment-grid">
            <div class="assessment-item">
                <div class="assessment-value">${jobAnalysis.overallMatch}</div>
                <div class="assessment-label">Qualification Match</div>
            </div>
            <div class="assessment-item">
                <div class="assessment-value">${jobAnalysis.qualificationLevel}</div>
                <div class="assessment-label">Current Level</div>
            </div>
            <div class="assessment-item">
                <div class="assessment-value">${jobAnalysis.timeline}</div>
                <div class="assessment-label">Development Timeline</div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Professional Summary</div>
        <div class="entry-description">
            ${user.targetRole} with a strong background in professional skills and experience. 
            Currently ${jobAnalysis.qualificationLevel.toLowerCase()} for target position with ${jobAnalysis.timeline} development timeline. 
            ${
              strengths.length > 0
                ? `Demonstrated proficiency in ${strengths
                    .slice(0, 3)
                    .map((s: any) => s.name)
                    .join(", ")}.`
                : ""
            } 
            ${
              developing.length > 0
                ? ` Currently developing expertise in ${developing
                    .slice(0, 2)
                    .map((s: any) => s.name)
                    .join(" and ")}.`
                : ""
            }
        </div>
    </div>

    <div class="section">
        <div class="section-title">Skills</div>
        <div class="skill-category">
            <div class="skill-category-title">Core Competencies:</div>
            <div class="skills-list">${strengths.map((skill: any) => skill.name).join(", ")}</div>
        </div>
        <div class="skill-category">
            <div class="skill-category-title">Developing Skills:</div>
            <div class="skills-list">${developing.map((skill: any) => skill.name).join(", ")}</div>
        </div>
        ${
          resumeType === "complete" && gaps.length > 0
            ? `
        <div class="skill-category">
            <div class="skill-category-title">Areas for Development:</div>
            <div class="skills-list">${gaps.map((skill: any) => skill.name).join(", ")}</div>
        </div>`
            : ""
        }
    </div>

    <div class="section">
        <div class="section-title">Professional Experience</div>
        ${user.experience
          .map(
            (job: any) => `
        <div class="entry">
            <div class="entry-header">${job.title}</div>
            <div class="entry-details">${job.company}${job.location ? ` | ${job.location}` : ""} | ${job.startDate} - ${job.endDate}</div>
            <div class="entry-description">
                ${job.achievements.map((achievement: string) => `<div>• ${achievement}</div>`).join("")}
            </div>
        </div>`,
          )
          .join("")}
    </div>

    <div class="section">
        <div class="section-title">Education</div>
        ${user.education
          .map(
            (edu: any) => `
        <div class="entry">
            <div class="entry-header">${edu.degree} - ${edu.school}</div>
            <div class="entry-details">${edu.year}${edu.field ? ` | ${edu.field}` : ""}</div>
        </div>`,
          )
          .join("")}
    </div>

    ${
      jobAnalysis.actionPlan && jobAnalysis.actionPlan.length > 0
        ? `
    <div class="section">
        <div class="section-title">Professional Development Plan</div>
        <div class="entry-description">
            <strong>Target Timeline:</strong> ${jobAnalysis.timeline}<br><br>
            ${jobAnalysis.actionPlan
              .slice(0, 3)
              .map(
                (action: any, index: number) => `
            <strong>${action.priority?.toUpperCase() || "PRIORITY"}:</strong> ${action.action}
            ${action.timeline ? ` <em>(${action.timeline})</em>` : ""}<br>`,
              )
              .join("")}
        </div>
    </div>`
        : ""
    }

    <div style="margin-top: 40px; text-align: center; font-size: 0.8em; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 15px;">
        <p>Generated by AI Resume Builder - LaunchpadPoint.com</p>
        <p>Professional CV optimized for ${user.targetRole} positions</p>
    </div>
</body>
</html>`
}

// Update the main resume generation function
export const generateResumeHTML = (transformedData: any, resumeType = "complete", industry?: string) => {
  return generateIndustrySpecificHTML(transformedData, resumeType, industry || "general")
}
