import React, { useState } from "react";
import logo from "./logo.png";
import "./App.css";

const TABS = [
  { key: "personal", icon: "fa-user", label: "Personal" },
  { key: "experience", icon: "fa-briefcase", label: "Experience" },
  { key: "education", icon: "fa-graduation-cap", label: "Education" },
  { key: "skills", icon: "fa-tools", label: "Skills" },
  { key: "job", icon: "fa-search", label: "Job Match" },
];

const initialForm = {
  fullName: "John Doe",
  jobTitle: "Senior Software Engineer",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  location: "San Francisco, CA",
  summary:
    "Experienced software engineer with 5+ years of expertise in developing scalable web applications and leading development teams. Strong problem-solving skills and passion for clean code architecture.",
  company: "Tech Innovations Inc.",
  position: "Senior Software Engineer",
  startDate: "2020-01",
  endDate: "2023-08",
  description: `• Led a team of 5 developers in creating a new SaaS product
• Improved system performance by 40% through optimization
• Implemented CI/CD pipeline reducing deployment time by 60%`,
  institution: "Stanford University",
  degree: "Master of Science in Computer Science",
  graduationDate: "2018-05",
  gpa: "3.9/4.0",
  achievements: `• Graduated with honors
• Published research on machine learning algorithms
• President of Computer Science Club`,
  skills:
    "JavaScript, React, Node.js, Python, SQL, AWS, Docker, Kubernetes, Team Leadership, Agile Methodologies",
  proficiency: "advanced",
  jobDescription: `We are looking for a Senior Software Engineer with 5+ years of experience in JavaScript, React, and Node.js. The ideal candidate will have experience leading teams and working with cloud technologies like AWS. Experience with DevOps practices and CI/CD pipelines is a plus.`,
};

export default function App() {
  const [tab, setTab] = useState(TABS[0].key);
  const [form, setForm] = useState(initialForm);
  const [darkMode, setDarkMode] = useState(false);
  const [dyslexia, setDyslexia] = useState(false);

  // AI Analysis
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState("");

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

  const filledFields = Object.values(form).filter((v) => v && String(v).trim().length > 0).length;
  const progress = Math.round((filledFields / Object.keys(form).length) * 100);

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

  // Real AI Resume Analysis
  async function analyzeResume() {
    setAiLoading(true);
    setAiResult(null);
    setAiError("");
    try {
      const payload = {
        resume: {
          summary: form.summary,
          experience: form.description,
          skills: form.skills,
          education: form.achievements,
        },
        jobDescription: form.jobDescription,
      };
      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setAiResult(data);
    } catch (e) {
      setAiError("AI analysis failed. Please try again.");
    } finally {
      setAiLoading(false);
    }
  }

  const mainClass =
    (darkMode ? "dark-mode " : "") + (dyslexia ? "dyslexia-mode " : "");

  return (
    <div className={`App ${mainClass}`}>
      <div className="container">
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
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="main-content">
          <div className="form-section">
            <h2 className="section-title">
              <i className="fas fa-user-edit"></i> Build Your Resume
            </h2>
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
            {/* Personal Tab */}
            <div className={`tab-content${tab === "personal" ? " active" : ""}`}>
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
            {/* Experience Tab */}
            <div
              className={`tab-content${tab === "experience" ? " active" : ""}`}
            >
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
            {/* Education Tab */}
            <div
              className={`tab-content${tab === "education" ? " active" : ""}`}
            >
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
            {/* Skills Tab */}
            <div className={`tab-content${tab === "skills" ? " active" : ""}`}>
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
            {/* Job Tab */}
            <div className={`tab-content${tab === "job" ? " active" : ""}`}>
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
              {/* AI analysis */}
              <button
                className="btn btn-primary"
                id="analyze-btn"
                style={{ width: "100%", marginBottom: "20px" }}
                onClick={analyzeResume}
                disabled={aiLoading}
              >
                <i className="fas fa-magic"></i>{" "}
                {aiLoading ? "Analyzing..." : "Analyze with AI"}
              </button>
              {aiLoading && (
                <div style={{ color: "#4895ef", marginBottom: "16px" }}>
                  <i className="fas fa-spinner fa-spin"></i> AI is analyzing...
                </div>
              )}
              {aiError && (
                <div style={{ color: "#f72585", marginBottom: "16px" }}>
                  <i className="fas fa-exclamation-triangle"></i> {aiError}
                </div>
              )}
              {aiResult && (
                <div className="ai-analysis">
                  <h3>
                    <i className="fas fa-lightbulb"></i> AI Analysis Results
                  </h3>
                  <div className="ai-score">
                    <div className="score-circle">{aiResult.score}%</div>
                    <div className="score-text">
                      <h4>AI Resume Score</h4>
                      <p>{aiResult.summary}</p>
                    </div>
                  </div>
                  <div id="suggestions-box">
                    {aiResult.suggestions &&
                      aiResult.suggestions.map((s, i) => (
                        <div className="suggestion-item" key={i}>
                          <h4>
                            <i className="fas fa-lightbulb"></i> {s.title}
                          </h4>
                          <p>{s.body}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
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
        <footer>
          <p>
            © 2025 LaunchpadPoint. Empowering careers through intelligent,
            accessible technology.
          </p>
        </footer>
      </div>
    </div>
  );
                    }
