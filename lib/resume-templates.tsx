export interface ResumeTemplate {
  id: string
  name: string
  description: string
  category: "modern" | "classic" | "creative" | "minimal"
  preview: string
  generateHTML: (data: any) => string
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: "professional-modern",
    name: "Professional Modern",
    description: "Clean, modern design perfect for tech and business roles",
    category: "modern",
    preview: "/templates/professional-modern.png",
    generateHTML: (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.personalInfo.fullName} - Resume</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      max-width: 800px; 
      margin: 0 auto; 
      padding: 40px 20px; 
    }
    .header { 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white; 
      padding: 40px; 
      border-radius: 10px; 
      margin-bottom: 30px; 
      text-align: center;
    }
    .name { font-size: 2.5em; font-weight: 300; margin-bottom: 10px; }
    .contact { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; opacity: 0.9; }
    .section { margin-bottom: 30px; }
    .section-title { 
      font-size: 1.4em; 
      font-weight: 600; 
      color: #667eea; 
      border-bottom: 2px solid #667eea; 
      padding-bottom: 5px; 
      margin-bottom: 20px; 
    }
    .job { 
      margin-bottom: 25px; 
      padding: 20px; 
      background: #f8f9fa; 
      border-radius: 8px; 
      border-left: 4px solid #667eea;
    }
    .job-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
    .job-title { font-weight: 600; font-size: 1.1em; color: #333; }
    .company { color: #667eea; font-weight: 500; }
    .date { color: #666; font-size: 0.9em; background: white; padding: 4px 8px; border-radius: 4px; }
    .responsibilities { margin-top: 10px; }
    .responsibilities li { margin-bottom: 5px; }
    .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; }
    .skill { 
      background: #667eea; 
      color: white; 
      padding: 8px 12px; 
      border-radius: 20px; 
      text-align: center; 
      font-size: 0.9em; 
      font-weight: 500;
    }
    @media print { 
      body { padding: 0; } 
      .header { background: #667eea !important; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${data.personalInfo.fullName}</div>
    <div class="contact">
      ${data.personalInfo.email ? `<span>📧 ${data.personalInfo.email}</span>` : ""}
      ${data.personalInfo.location ? `<span>📍 ${data.personalInfo.location}</span>` : ""}
      ${data.personalInfo.linkedin ? `<span>💼 LinkedIn</span>` : ""}
    </div>
  </div>
  
  ${
    data.personalInfo.summary
      ? `
  <div class="section">
    <div class="section-title">Professional Summary</div>
    <p style="font-size: 1.1em; line-height: 1.7;">${data.personalInfo.summary}</p>
  </div>`
      : ""
  }
  
  ${
    data.experience?.length > 0
      ? `
  <div class="section">
    <div class="section-title">Professional Experience</div>
    ${data.experience
      .map(
        (exp) => `
    <div class="job">
      <div class="job-header">
        <div>
          <div class="job-title">${exp.position}</div>
          <div class="company">${exp.company}</div>
        </div>
        <div class="date">${exp.startDate} - ${exp.current ? "Present" : exp.endDate}</div>
      </div>
      ${
        exp.responsibilities?.length > 0
          ? `
      <ul class="responsibilities">
        ${exp.responsibilities.map((resp) => `<li>${resp}</li>`).join("")}
      </ul>`
          : ""
      }
    </div>`,
      )
      .join("")}
  </div>`
      : ""
  }
  
  ${
    data.skills?.technical?.length > 0 || data.skills?.soft?.length > 0
      ? `
  <div class="section">
    <div class="section-title">Skills & Technologies</div>
    <div class="skills-grid">
      ${[...(data.skills.technical || []), ...(data.skills.soft || [])]
        .map((skill) => `<span class="skill">${skill}</span>`)
        .join("")}
    </div>
  </div>`
      : ""
  }
</body>
</html>`,
  },

  {
    id: "classic-professional",
    name: "Classic Professional",
    description: "Traditional format ideal for corporate and formal industries",
    category: "classic",
    preview: "/templates/classic-professional.png",
    generateHTML: (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.personalInfo.fullName} - Resume</title>
  <style>
    body { 
      font-family: 'Times New Roman', serif; 
      max-width: 800px; 
      margin: 0 auto; 
      padding: 40px; 
      line-height: 1.6; 
      color: #000;
    }
    .header { text-align: center; border-bottom: 3px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
    .name { font-size: 2.2em; font-weight: bold; margin-bottom: 10px; }
    .contact { font-size: 1em; }
    .section-title { 
      font-size: 1.3em; 
      font-weight: bold; 
      text-transform: uppercase; 
      border-bottom: 1px solid #000; 
      margin: 25px 0 15px 0; 
      padding-bottom: 3px;
    }
    .job { margin-bottom: 20px; }
    .job-header { display: flex; justify-content: space-between; margin-bottom: 5px; }
    .job-title { font-weight: bold; }
    .company { font-style: italic; }
    .date { font-weight: bold; }
    .skills { columns: 2; column-gap: 30px; }
    .skill { display: inline-block; margin-right: 15px; margin-bottom: 5px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="name">${data.personalInfo.fullName}</div>
    <div class="contact">
      ${[data.personalInfo.email, data.personalInfo.location].filter(Boolean).join(" • ")}
    </div>
  </div>
  
  ${
    data.personalInfo.summary
      ? `
  <div class="section-title">Professional Summary</div>
  <p>${data.personalInfo.summary}</p>`
      : ""
  }
  
  ${
    data.experience?.length > 0
      ? `
  <div class="section-title">Professional Experience</div>
  ${data.experience
    .map(
      (exp) => `
  <div class="job">
    <div class="job-header">
      <div><span class="job-title">${exp.position}</span> - <span class="company">${exp.company}</span></div>
      <div class="date">${exp.startDate} - ${exp.isCurrentRole ? "Present" : exp.endDate}</div>
    </div>
    ${
      exp.responsibilities?.length > 0
        ? `
    <ul>
      ${exp.responsibilities.map((resp) => `<li>${resp}</li>`).join("")}
    </ul>`
        : ""
    }
  </div>`,
    )
    .join("")}`
      : ""
  }
  
  ${
    data.skills?.technical?.length > 0 || data.skills?.soft?.length > 0
      ? `
  <div class="section-title">Skills</div>
  <div class="skills">
    ${[...(data.skills.technical || []), ...(data.skills.soft || [])]
      .map((skill) => `<span class="skill">${skill}</span>`)
      .join(" • ")}
  </div>`
      : ""
  }
</body>
</html>`,
  },
]

export const getTemplate = (templateId: string): ResumeTemplate | null => {
  return resumeTemplates.find((template) => template.id === templateId) || null
}

export const generateResumeHTML = (data: any, templateId = "professional-modern"): string => {
  const template = getTemplate(templateId)
  return template ? template.generateHTML(data) : resumeTemplates[0].generateHTML(data)
}
