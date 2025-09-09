import React, { useState } from "react";
import logo from "./logo.png";
import "./App.css";

// PDF & DOCX parsing
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
import mammoth from "mammoth";

// Set the workerSrc property for pdfjs v4+
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// Tab configuration
const TABS = [
  { key: "personal", icon: "fa-user", label: "Personal" },
  { key: "experience", icon: "fa-briefcase", label: "Experience" },
  { key: "education", icon: "fa-graduation-cap", label: "Education" },
  { key: "skills", icon: "fa-tools", label: "Skills" },
  { key: "job", icon: "fa-search", label: "Job Match" },
  { key: "import", icon: "fa-upload", label: "Import" }
];

// Initial form state
const initialForm = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  description: "",
  institution: "",
  degree: "",
  graduationDate: "",
  gpa: "",
  achievements: "",
  skills: "",
  proficiency: "beginner",
  jobDescription: "",
};

export default function App() {
  const [tab, setTab] = useState(TABS[0].key);
  const [form, setForm] = useState(initialForm);
  const [darkMode, setDarkMode] = useState(false);
  const [dyslexia, setDyslexia] = useState(false);

  // Import state
  const [importMode, setImportMode] = useState("paste");
  const [resumePaste, setResumePaste] = useState("");
  const [uploadError, setUploadError] = useState("");

  // Progress
  const filledFields = Object.values(form).filter((v) => v && String(v).trim().length > 0).length;
  const progress = Math.round((filledFields / Object.keys(form).length) * 100);

  // Export resume as text
  const handleExport = () => {
    const text =
      `${form.fullName}\n` +
      `${form.jobTitle}\n` +
      `${form.email} • ${form.phone} • ${form.location}\n\n` +
      `SUMMARY\n${form.summary}\n\n` +
      `EXPERIENCE\n${form.position} at ${form.company}\n${formatMonth(form.startDate)} - ${formatMonth(form.endDate)}\n${form.description}\n\n` +
      `EDUCATION\n${form.degree}\n${form.institution}\nGraduated: ${formatMonth(form.graduationDate)}\nGPA: ${form.gpa}\n${form.achievements}\n\n` +
      `SKILLS\n${form.skills}\n\n` +
      `JOB MATCH (Paste job description)\n${form.jobDescription}`;
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "resume.txt";
    a.click();
  };

  function formatMonth(val) {
    if (!val) return "";
    const [y, m] = val.split("-");
    const date = new Date(y, m - 1, 1);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  }

  // Handlers
  const handleInput = (e) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  };
  const handleSkillInput = (e) => {
    setForm((f) => ({ ...f, skills: e.target.value }));
  };
  const handleProficiency = (e) => {
    setForm((f) => ({ ...f, proficiency: e.target.value }));
  };

  // --- File parsing helpers ---
  async function handlePDF(file) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let text = "";
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(" ") + "\n";
      }
      setResumePaste(text);
      setForm(f => ({ ...f, summary: text }));
      alert("PDF uploaded! (Extend parsing as needed)");
    } catch (e) {
      setUploadError("PDF parsing failed.");
    }
  }

  async function handleDOCX(file) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const { value } = await mammoth.extractRawText({ arrayBuffer });
      setResumePaste(value);
      setForm(f => ({ ...f, summary: value }));
      alert("DOCX uploaded! (Extend parsing as needed)");
    } catch (e) {
      setUploadError("DOCX parsing failed.");
    }
  }

  const handleFileUpload = async (e) => {
    setUploadError("");
    const file = e.target.files[0];
    if (!file) return;
    if (file.type === "text/plain") {
      const text = await file.text();
      setResumePaste(text);
      setForm(f => ({ ...f, summary: text }));
      alert("Text resume uploaded!");
    } else if (
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
    ) {
      await handlePDF(file);
    } else if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.toLowerCase().endsWith(".docx")
    ) {
      await handleDOCX(file);
    } else {
      setUploadError("Only .txt, .pdf, or .docx files are supported.");
    }
  };

  function parseResumeText() {
    setForm((f) => ({
      ...f,
      summary: resumePaste,
    }));
    alert("Resume pasted! (Replace with actual parsing logic for all fields)");
  }

  const experienceItems = form.description
    .split("\n")
    .filter((x) => x.trim())
    .map((line, i) => <li key={i}>{line.replace(/^•\s?/, "")}</li>);

  const achievementItems = form.achievements
    .split("\n")
    .filter((x) => x.trim())
    .map((line, i) => <li key={i}>{line.replace(/^•\s?/, "")}</li>);

  const skillItems = form.skills.split(",").map((x, i) => (
    <div className="skill-item" key={i}>
      {x.trim()}
    </div>
  ));

  const mainClass =
    (darkMode ? "dark-mode " : "") + (dyslexia ? "dyslexia-mode " : "");

  return (
    <div className={`App ${mainClass}`}>
      <div className="container">
        {/* Header */}
        <header>
          <div className="logo">
            <img src={logo} alt="LaunchpadPoint Logo" className="logo-img" />
            <span>LaunchpadPoint</span>
          </div>
          <div className="header-controls">
            <button
              className="btn btn-outline"
              onClick={() => setDyslexia((v) => !v)}
              aria-pressed={dyslexia}
            >
              <i className="fas fa-font"></i> Dyslexia Font
            </button>
            <button
              className="btn btn-outline"
              onClick={() => setDarkMode((v) => !v)}
              aria-pressed={darkMode}
            >
              <i className={`fas fa-${darkMode ? "sun" : "moon"}`}></i>{" "}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button className="btn btn-primary" onClick={handleExport}>
              <i className="fas fa-download"></i> Export Resume
            </button>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
          <span className="progress-label">{progress}% Complete</span>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {TABS.map((t) => (
            <div
              className={`tab${tab === t.key ? " active" : ""}`}
              key={t.key}
              onClick={() => setTab(t.key)}
            >
              <i className={`fas ${t.icon}`}></i> {t.label}
            </div>
          ))}
        </div>

        {/* Tab Content */}
        <div className="main-content">
          {/* Personal Tab */}
          {tab === "personal" && (
            <div className="tab-content active">
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="fullName">
                    <i className="fas fa-signature"></i> Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={form.fullName}
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="jobTitle">
                    <i className="fas fa-briefcase"></i> Professional Title
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    value={form.jobTitle}
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope"></i> Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="fas fa-phone"></i> Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={form.phone}
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location">
                    <i className="fas fa-map-marker-alt"></i> Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={form.location}
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="summary">
                    <i className="fas fa-file-alt"></i> Professional Summary
                  </label>
                  <textarea
                    id="summary"
                    value={form.summary}
                    onChange={handleInput}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {tab === "experience" && (
            <div className="tab-content active">
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="company">
                    <i className="fas fa-building"></i> Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={form.company}
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="position">
                    <i className="fas fa-user-tie"></i> Position
                  </label>
                  <input
                    type="text"
                    id="position"
                    value={form.position}
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="startDate">
                    <i className="fas fa-calendar-alt"></i> Start Date
                  </label>
                  <input
                    type="month"
                    id="startDate"
                    value={form.startDate}
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">
                    <i className="fas fa-calendar-alt"></i> End Date
                  </label>
                  <input
                    type="month"
                    id="endDate"
                    value={form.endDate}
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">
                    <i className="fas fa-tasks"></i> Description & Achievements
                  </label>
                  <textarea
                    id="description"
                    value={form.description}
                    onChange={handleInput}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Education Tab */}
          {tab === "education" && (
            <div className="tab-content active">
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="institution">
                    <i className="fas fa-university"></i> Institution
                  </label>
                  <input
                    type="text"
                    id="institution"
                    value={form.institution}
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="degree">
                    <i className="fas fa-graduation-cap"></i> Degree
                  </label>
                  <input
                    type="text"
                    id="degree"
                    value={form.degree}
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="graduationDate">
                    <i className="fas fa-calendar-check"></i> Graduation Date
                  </label>
                  <input
                    type="month"
                    id="graduationDate"
                    value={form.graduationDate}
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gpa">
                    <i className="fas fa-chart-line"></i> GPA (Optional)
                  </label>
                  <input
                    type="text"
                    id="gpa"
                    value={form.gpa}
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="achievements">
                    <i className="fas fa-trophy"></i> Academic Achievements
                  </label>
                  <textarea
                    id="achievements"
                    value={form.achievements}
                    onChange={handleInput}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {tab === "skills" && (
            <div className="tab-content active">
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="skills">
                    <i className="fas fa-tools"></i> Skills (comma separated)
                  </label>
                  <textarea
                    id="skills"
                    value={form.skills}
                    onChange={handleSkillInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="proficiency">
                    <i className="fas fa-signal"></i> Proficiency Level
                  </label>
                  <select
                    id="proficiency"
                    value={form.proficiency}
                    onChange={handleProficiency}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Job Tab */}
          {tab === "job" && (
            <div className="tab-content active">
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="jobDescription">
                    <i className="fas fa-file-alt"></i> Paste Job Description
                  </label>
                  <textarea
                    id="jobDescription"
                    value={form.jobDescription}
                    onChange={handleInput}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Import Tab */}
          {tab === "import" && (
            <div className="tab-content active">
              <h2>Import Your Resume</h2>
              <div style={{ display: "flex", gap: "1em", marginBottom: "1em" }}>
                <button
                  className={`btn ${importMode === "paste" ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setImportMode("paste")}
                >
                  <i className="fas fa-paste"></i> Paste Resume
                </button>
                <button
                  className={`btn ${importMode === "upload" ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setImportMode("upload")}
                >
                  <i className="fas fa-upload"></i> Upload Resume
                </button>
              </div>
              {importMode === "paste" ? (
                <>
                  <div className="form-group">
                    <label htmlFor="pasteResume">
                      <i className="fas fa-paste"></i> Paste Your Resume Text
                    </label>
                    <textarea
                      id="pasteResume"
                      value={resumePaste}
                      onChange={e => setResumePaste(e.target.value)}
                      placeholder="Paste your resume text here..."
                      rows={10}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={parseResumeText}>
                    <i className="fas fa-magic"></i> Parse Resume
                  </button>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="uploadResume">
                      <i className="fas fa-upload"></i> Upload Resume (.txt, .pdf, .docx)
                    </label>
                    <input
                      type="file"
                      id="uploadResume"
                      accept=".txt,.pdf,.docx"
                      onChange={handleFileUpload}
                    />
                    {uploadError && <div style={{ color: "#f72585" }}>{uploadError}</div>}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Live Preview */}
          <div className="preview-section">
            <h2 className="section-title">
              <i className="fas fa-eye"></i> Live Preview
            </h2>
            <div className="resume-template" id="resume-preview">
              <div className="resume-header">
                <h2 id="preview-name">{form.fullName}</h2>
                <p id="preview-title">{form.jobTitle}</p>
                <p id="preview-contact">
                  {form.email} • {form.phone} • {form.location}
                </p>
              </div>
              <div className="resume-section">
                <h3>Summary</h3>
                <p id="preview-summary">{form.summary}</p>
              </div>
              <div className="resume-section">
                <h3>Experience</h3>
                <div className="experience-item">
                  <h4>
                    {form.position} <span className="company">at {form.company}</span>
                  </h4>
                  <p className="date">
                    {formatMonth(form.startDate)} - {formatMonth(form.endDate)}
                  </p>
                  <ul id="preview-experience">{experienceItems}</ul>
                </div>
              </div>
              <div className="resume-section">
                <h3>Education</h3>
                <div className="education-item">
                  <h4>{form.degree}</h4>
                  <p className="institution">{form.institution}</p>
                  <p className="date">
                    Graduated: {formatMonth(form.graduationDate)}
                  </p>
                  <p>GPA: {form.gpa}</p>
                  <ul id="preview-education">{achievementItems}</ul>
                </div>
              </div>
              <div className="resume-section">
                <h3>Skills</h3>
                <div id="preview-skills">{skillItems}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer>
          <p>© 2025 LaunchpadPoint. Empowering careers through intelligent, accessible technology.</p>
        </footer>
      </div>
    </div>
  );
}