import React, { useState } from "react";
import logo from "./logo.png";
import "./App.css";

// Add Import tab
const TABS = [
  { key: "personal", icon: "fa-user", label: "Personal" },
  { key: "experience", icon: "fa-briefcase", label: "Experience" },
  { key: "education", icon: "fa-graduation-cap", label: "Education" },
  { key: "skills", icon: "fa-tools", label: "Skills" },
  { key: "job", icon: "fa-search", label: "Job Match" },
  { key: "import", icon: "fa-upload", label: "Import" }
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
  
  // Import state
  const [importMode, setImportMode] = useState("paste"); // "paste" or "upload"
  const [resumePaste, setResumePaste] = useState("");
  const [uploadError, setUploadError] = useState("");

  // AI Analysis
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState("");

  // Export resume as text (your original)
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

  // Import logic
  function parseResumeText() {
    // Demo: set summary, you can parse all fields with AI or logic
    setForm((f) => ({
      ...f,
      summary: resumePaste,
    }));
    alert("Resume pasted! (Replace with actual parsing logic)");
  }
  const handleFileUpload = async (e) => {
    setUploadError("");
    const file = e.target.files[0];
    if (!file) return;
    if (file.type === "text/plain") {
      const text = await file.text();
      setResumePaste(text);
      setForm((f) => ({
        ...f,
        summary: text,
      }));
      alert("Text resume uploaded! (Replace with actual parsing logic)");
    } else {
      setUploadError("Only .txt files are supported in this demo.");
    }
  };

  const filledFields = Object.values(form).filter((v) => v && String(v).trim().length > 0).length;
  const progress = Math.round((filledFields / Object.keys(form).length) * 100);

  // ... your AI analysis and preview logic, unchanged

  return (
    <div className={`App${darkMode ? " dark-mode" : ""}${dyslexia ? " dyslexia-mode" : ""}`}>
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
        {/* Import Tab: Paste or Upload */}
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
                    <i className="fas fa-upload"></i> Upload Resume (.txt)
                  </label>
                  <input
                    type="file"
                    id="uploadResume"
                    accept=".txt"
                    onChange={handleFileUpload}
                  />
                  {uploadError && <div style={{ color: "#f72585" }}>{uploadError}</div>}
                </div>
              </>
            )}
          </div>
        )}
        {/* ...rest of your UI for tabs and preview (unchanged) ... */}
      </div>
    </div>
  );
                              }
