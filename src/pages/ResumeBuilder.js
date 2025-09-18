// import { analyzeResumeWithAI } from "../utils/resumeAnalyzer"; // Uncomment if you have this AI function
import React, { useState, useRef } from "react";
import AIChatSidebar from "../components/AIChatSidebar";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
import mammoth from "mammoth";
import logo from "../logo.png";
// import { analyzeResumeWithAI } from "../utils/resumeAnalyzer"; // Uncomment if you have this AI function

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const TABS = [
  { key: "personal", icon: "fa-user", label: "Personal" },
  { key: "experience", icon: "fa-briefcase", label: "Experience" },
  { key: "education", icon: "fa-graduation-cap", label: "Education" },
  { key: "skills", icon: "fa-tools", label: "Skills" },
  { key: "job", icon: "fa-search", label: "Job Match" },
  { key: "import", icon: "fa-upload", label: "Import" }
];

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

const requiredFields = [
  "fullName", "jobTitle", "email", "phone", "location", "summary",
  "company", "position", "startDate", "endDate", "description",
  "institution", "degree", "graduationDate", "skills"
];

// Updated color palette to match screenshot (blue/purple gradient, modern buttons)
const brandColors = {
  primary: '#4f46e5', // deep blue
  secondary: '#667eea', // lighter blue
  accent: '#764ba2', // purple
  gradient: 'linear-gradient(90deg, #4f46e5 0%, #667eea 50%, #764ba2 100%)',
  tabActive: '#4f46e5',
  tabInactive: '#e0e7ff',
  tabText: '#222',
  tabTextActive: '#fff',
  btnPrimary: 'linear-gradient(90deg, #4f46e5 0%, #667eea 100%)',
  btnOutline: '#e0e7ff',
  btnText: '#fff',
};

function formatMonth(val) {
  if (!val) return "";
  const [y, m] = val.split("-");
  if (!y || !m) return "";
  const date = new Date(y, m - 1, 1);
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}


export default function ResumeBuilder() {
  const [tab, setTab] = useState(TABS[0].key);
  const [form, setForm] = useState(initialForm);
  const [darkMode, setDarkMode] = useState(false);
  const [dyslexia, setDyslexia] = useState(false);
  // AI Sidebar state
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [selectedAI, setSelectedAI] = useState("resume");

  // Import and parsing state
  const [importMode, setImportMode] = useState("paste");
  const [resumePaste, setResumePaste] = useState("");
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);

  // Analytics & suggestions (placeholder)
  const [copied, setCopied] = useState(false);

  // Chat state for ask box at bottom
  const [chatHistory, setChatHistory] = useState([]); // [{question, answer}]
  const [askInput, setAskInput] = useState("");
  const [isAsking, setIsAsking] = useState(false);

  // Progress
  const filledFields = Object.values(form).filter((v) => v && String(v).trim().length > 0).length;
  const progress = Math.round((filledFields / Object.keys(form).length) * 100);
  const allRequiredFilled = requiredFields.every(f => form[f] && form[f].trim() !== "");

  // ---- Import Handlers ----
  function prefillFormFromText(text) {
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
    let f = {...form};
    if (lines.length > 0) f.fullName = lines[0];
    if (lines.length > 1) f.jobTitle = lines[1];
    const contact = lines.find(l => l.includes("@") && l.includes("|"));
    if (contact) {
      const parts = contact.split("|").map(x => x.trim());
      f.email = parts.find(x => x.includes("@")) || "";
      f.phone = parts.find(x => x.match(/\d{3}[\s-]?\d{3}/)) || "";
      f.location = parts.find(x => x.match(/[A-Za-z]+,?\s*[A-Z]{2}/)) || "";
    }
    f.summary = lines.join("\n");
    setForm(f);
  }

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
      prefillFormFromText(text);
      alert("PDF uploaded and prefilled!");
    } catch (e) {
      setUploadError("PDF parsing failed.");
    }
  }

  async function handleDOCX(file) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const { value } = await mammoth.extractRawText({ arrayBuffer });
      setResumePaste(value);
      prefillFormFromText(value);
      alert("DOCX uploaded and prefilled!");
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
      prefillFormFromText(text);
      alert("Text resume uploaded and prefilled!");
    } else if (
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
    ) {
      await handlePDF(file);
    } else if (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.toLowerCase().endsWith(".docx")
    ) {
      await handleDOCX(file);
    } else {
      setUploadError("Only .txt, .pdf, or .docx files are supported.");
    }
  };

  function parseResumeText() {
    prefillFormFromText(resumePaste);
    alert("Resume pasted and prefilled!");
  }

  // ---- Form Handlers ----
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

  // ---- Copy Resume ----
  function handleCopy() {
    const text =
      `${form.fullName}\n${form.jobTitle}\n${form.email} • ${form.phone} • ${form.location}\n\n` +
      `SUMMARY\n${form.summary}\n\n` +
      `EXPERIENCE\n${form.position} at ${form.company}\n${formatMonth(form.startDate)} - ${formatMonth(form.endDate)}\n${form.description}\n\n` +
      `EDUCATION\n${form.degree}\n${form.institution}\nGraduated: ${formatMonth(form.graduationDate)}\nGPA: ${form.gpa}\n${form.achievements}\n\n` +
      `SKILLS\n${form.skills}\n\n` +
      `JOB MATCH\n${form.jobDescription}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ---- Preview Items ----
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

  // ---- Theming ----
  const mainClass = (darkMode ? "dark-mode " : "") + (dyslexia ? "dyslexia-mode " : "");

  // ---- Render ----
  return (
    <div className={`App ${mainClass}`} style={{ minHeight: '100vh', background: brandColors.gradient }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: '2em 0' }}>
        {/* Header */}
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: 'rgba(255,255,255,0.08)', borderRadius: 20, padding: '1.2em 2em', marginBottom: 24, boxShadow: '0 2px 12px rgba(76, 81, 255, 0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div className="logo" style={{ display: "flex", alignItems: "center" }}>
              <img src={logo} alt="LaunchpadPoint Logo" className="logo-img" style={{ width: 40, marginRight: 10, borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }} />
              <span style={{ fontWeight: 700, fontSize: "1.3em", color: '#fff', letterSpacing: 1 }}>LaunchpadPoint</span>
            </div>
          </div>
          <div className="header-controls" style={{ display: 'flex', gap: 16 }}>
            <button className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid #fff', borderRadius: 10, fontWeight: 600 }} onClick={() => setDyslexia(v => !v)}>
              <i className="fas fa-font"></i> Dyslexia Font
            </button>
            <button className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid #fff', borderRadius: 10, fontWeight: 600 }} onClick={() => setDarkMode(v => !v)}>
              <i className={`fas fa-${darkMode ? "sun" : "moon"}`}></i>{" "}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="progress-container" style={{ marginTop: "1rem", marginBottom: "1rem", background: '#e0e7ff', borderRadius: 8, height: 10, position: 'relative' }}>
          <div className="progress-bar" style={{ width: `${progress}%`, background: brandColors.primary, height: 10, borderRadius: 8, transition: 'width 0.3s' }} />
          <span className="progress-label" style={{ position: 'absolute', right: 12, top: -28, color: '#fff', fontWeight: 600, fontSize: 15 }}>{progress}% Complete</span>
        </div>

        {/* Tabs */}
        <div className="tabs" style={{ display: "flex", gap: 18, marginBottom: 30, justifyContent: 'center' }}>
          {TABS.map((t) => (
            <div
              className={`tab${tab === t.key ? " active" : ""}`}
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                cursor: "pointer",
                fontWeight: tab === t.key ? 700 : 500,
                background: tab === t.key ? brandColors.tabActive : brandColors.tabInactive,
                color: tab === t.key ? brandColors.tabTextActive : brandColors.tabText,
                borderRadius: 14,
                padding: "0.7em 1.5em",
                boxShadow: tab === t.key ? '0 2px 8px rgba(79,70,229,0.10)' : 'none',
                border: 'none',
                transition: 'background 0.2s, color 0.2s',
                display: 'flex', alignItems: 'center', fontSize: 17
              }}
            >
              <i className={`fas ${t.icon}`} style={{ marginRight: 8 }}></i> {t.label}
            </div>
          ))}
        </div>

  {/* Main Content */}
  <div className="main-content" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2em" }}>
    {/* Left Side: Form Sections */}
    <div style={{ width: "100%", minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* ...existing code... */}
      {/* Form Sections */}
      {tab === "personal" && (
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="fullName"><i className="fas fa-signature"></i> Full Name</label>
            <input type="text" id="fullName" value={form.fullName} onChange={handleInput} style={{ width: "100%" }} />
          </div>
          <div className="form-group">
            <label htmlFor="jobTitle"><i className="fas fa-briefcase"></i> Professional Title</label>
            <input type="text" id="jobTitle" value={form.jobTitle} onChange={handleInput} style={{ width: "100%" }} />
          </div>
          <div className="form-group">
            <label htmlFor="email"><i className="fas fa-envelope"></i> Email</label>
            <input type="email" id="email" value={form.email} onChange={handleInput} style={{ width: "100%" }} />
          </div>
          <div className="form-group">
            <label htmlFor="phone"><i className="fas fa-phone"></i> Phone</label>
            <input type="tel" id="phone" value={form.phone} onChange={handleInput} style={{ width: "100%" }} />
          </div>
          <div className="form-group">
            <label htmlFor="location"><i className="fas fa-map-marker-alt"></i> Location</label>
            <input type="text" id="location" value={form.location} onChange={handleInput} style={{ width: "100%" }} />
          </div>
          <div className="form-group">
            <label htmlFor="summary"><i className="fas fa-file-alt"></i> Professional Summary</label>
            <textarea id="summary" value={form.summary} onChange={handleInput} style={{ width: "100%" }} />
          </div>
        </div>
      )}
      {tab === "experience" && (
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="company"><i className="fas fa-building"></i> Company</label>
            <input type="text" id="company" value={form.company} onChange={handleInput} style={{ width: "100%" }} />
          </div>
          <div className="form-group">
            <label htmlFor="position"><i className="fas fa-user-tie"></i> Position</label>
            <input type="text" id="position" value={form.position} onChange={handleInput} style={{ width: "100%" }} />
          </div>
          <div className="form-group">
            <label htmlFor="startDate"><i className="fas fa-calendar-alt"></i> Start Date</label>
            <input type="month" id="startDate" value={form.startDate} onChange={handleInput} style={{ width: "100%" }} />
          </div>
          <div className="form-group">
            <label htmlFor="endDate"><i className="fas fa-calendar-alt"></i> End Date</label>
            <input type="month" id="endDate" value={form.endDate} onChange={handleInput} style={{ width: "100%" }} />
          </div>
          <div className="form-group">
            <label htmlFor="description"><i className="fas fa-tasks"></i> Description & Achievements</label>
            <textarea id="description" value={form.description} onChange={handleInput} style={{ width: "100%" }} />
          </div>
        </div>
      )}
      {tab === "education" && (
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="institution"><i className="fas fa-university"></i> Institution</label>
            <input type="text" id="institution" value={form.institution} onChange={handleInput} style={{ width: "100%" }} />
          </div>
          <div className="form-group">
            <label htmlFor="degree"><i className="fas fa-graduation-cap"></i> Degree</label>
            <input type="text" id="degree" value={form.degree} onChange={handleInput} style={{ width: "100%" }} />
          </div>
          <div className="form-group">
            <label htmlFor="graduationDate"><i className="fas fa-calendar-check"></i> Graduation Date</label>
            <input type="month" id="graduationDate" value={form.graduationDate} onChange={handleInput} style={{ width: "100%" }} />
          </div>
          <div className="form-group">
            <label htmlFor="gpa"><i className="fas fa-chart-line"></i> GPA (Optional)</label>
            <input type="text" id="gpa" value={form.gpa} onChange={handleInput} style={{ width: "100%" }} />
          </div>
          <div className="form-group">
            <label htmlFor="achievements"><i className="fas fa-trophy"></i> Academic Achievements</label>
            <textarea id="achievements" value={form.achievements} onChange={handleInput} style={{ width: "100%" }} />
          </div>
        </div>
      )}
      {tab === "skills" && (
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="skills"><i className="fas fa-tools"></i> Skills (comma separated)</label>
            <textarea id="skills" value={form.skills} onChange={handleSkillInput} style={{ width: "100%" }} />
          </div>
          <div className="form-group">
            <label htmlFor="proficiency"><i className="fas fa-signal"></i> Proficiency Level</label>
            <select id="proficiency" value={form.proficiency} onChange={handleProficiency} style={{ width: "100%" }}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>
      )}
      {tab === "job" && (
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="jobDescription"><i className="fas fa-file-alt"></i> Paste Job Description</label>
            <textarea id="jobDescription" value={form.jobDescription} onChange={handleInput} style={{ width: "100%" }} />
          </div>
        </div>
      )}
      {tab === "import" && (
        <div className="form-section" style={{ width: "100%", minWidth: 0 }}>
          <h2>Import Your Resume</h2>
          <div style={{display: "flex", gap: "1em", marginBottom: "1em"}}>
            <button className={`btn ${importMode === "paste" ? "btn-primary" : "btn-outline"}`} onClick={() => setImportMode("paste")}>\
              <i className="fas fa-paste"></i> Paste Resume
            </button>
            <button className={`btn ${importMode === "upload" ? "btn-primary" : "btn-outline"}`} onClick={() => setImportMode("upload")}>\
              <i className="fas fa-upload"></i> Upload Resume
            </button>
          </div>
          {importMode === "paste" ? (
            <>
              <div className="form-group">
                <label htmlFor="pasteResume"><i className="fas fa-paste"></i> Paste Your Resume Text</label>
                <textarea
                  id="pasteResume"
                  value={resumePaste}
                  onChange={e => setResumePaste(e.target.value)}
                  placeholder="Paste your resume text here..."
                  rows={10}
                  style={{ width: "100%" }}
                />
              </div>
              <button className="btn btn-primary" onClick={parseResumeText}><i className="fas fa-magic"></i> Parse Resume</button>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="uploadResume"><i className="fas fa-upload"></i> Upload Resume (.txt, .pdf, .docx)</label>
                <input
                  type="file"
                  id="uploadResume"
                  accept=".txt,.pdf,.docx"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  style={{ width: "100%" }}
                />
                {uploadError && <div style={{ color: "#f72585" }}>{uploadError}</div>}
              </div>
            </>
          )}
        </div>
      )}
      {allRequiredFilled && (
        <div style={{marginTop: 30, display: "flex", gap: 20}}>
          <button className="btn btn-primary" style={{ background: brandColors.btnPrimary, color: brandColors.btnText, border: 'none', borderRadius: 12, fontWeight: 700, fontSize: 17, padding: '0.7em 2em', boxShadow: '0 1px 4px rgba(79,70,229,0.10)' }} onClick={handleCopy}>
            <i className="fas fa-copy"></i> {copied ? "Copied!" : "Copy All"}
          </button>
        </div>
      )}

      {/* Spacer to push ask box to bottom */}
      <div style={{ flex: 1 }} />

      {/* Ask ResumeAI Box at Bottom */}
      <div style={{
        background: brandColors.gradient,
        borderRadius: 16,
        boxShadow: '0 2px 12px rgba(79,70,229,0.08)',
        padding: '1.2em 1.5em',
        marginTop: 24,
        marginBottom: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }}>
        <form
          onSubmit={async e => {
            e.preventDefault();
            const question = askInput.trim();
            if (!question) return;
            setIsAsking(true);
            // Simulate AI answer (replace with real AI call if available)
            let answer = "";
            if (question.toLowerCase().includes("improve my resume")) {
              answer = "Your resume shows strong technical skills. I recommend adding specific metrics to quantify your impact - like 'reduced load times by 40%' instead of just 'optimized performance'.";
            } else if (question.toLowerCase().includes("market value")) {
              answer = "Based on your experience and skills, your current market value is likely above industry average. Consider researching salary benchmarks for your role and location.";
            } else {
              answer = "Thank you for your question! This feature is coming soon.";
            }
            setChatHistory(h => [...h, { question, answer }]);
            setAskInput("");
            setIsAsking(false);
          }}
          style={{ width: '100%', display: 'flex', gap: 8 }}
        >
          <input
            name="askResumeAI"
            type="text"
            placeholder="Ask ResumeAI anything..."
            value={askInput}
            onChange={e => setAskInput(e.target.value)}
            style={{
              flex: 1,
              border: '1.5px solid #e0e7ff',
              borderRadius: 8,
              padding: '0.7em 1em',
              fontSize: 16,
              marginTop: 2
            }}
            disabled={isAsking}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ minWidth: 44, fontSize: 20, borderRadius: 8, background: brandColors.btnPrimary, color: brandColors.btnText, border: 'none' }}
            disabled={isAsking}
            aria-label="Send"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
        {/* Chat History */}
        <div style={{
          maxHeight: 180,
          overflowY: 'auto',
          marginTop: 8,
          background: 'rgba(255,255,255,0.10)',
          borderRadius: 10,
          padding: '0.7em 1em',
          fontSize: 15,
          color: '#fff',
          minHeight: 40
        }}>
          {chatHistory.length === 0 && (
            <div style={{ color: '#888' }}>No questions yet. Try asking ResumeAI something!</div>
          )}
          {chatHistory.map((item, idx) => (
            <div key={idx} style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 600, color: brandColors.primary }}><i className="fas fa-user-circle"></i> {item.question}</div>
              <div style={{ marginLeft: 18, marginTop: 2 }}><i className="fas fa-robot" style={{ color: brandColors.accent, marginRight: 4 }}></i> {item.answer}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AIChatSidebar overlay */}
      <AIChatSidebar aiChatOpen={aiChatOpen} setAiChatOpen={setAiChatOpen} selectedAIOverride={selectedAI} setSelectedAIOverride={setSelectedAI} />
  </div>
          {/* Live Preview */}
          <div
            className="preview-section"
            style={{
              background: "#fff",
              borderRadius: 20,
              boxShadow: "0 4px 24px rgba(79,70,229,0.10)",
              padding: "2em 2.5em",
              width: "100%",
              minWidth: 0,
              minHeight: 600
            }}
          >
            <h2 className="section-title" style={{ color: brandColors.primary, fontWeight: 800, fontSize: 26, marginBottom: 18 }}><i className="fas fa-eye"></i> Live Preview</h2>
            <div className="resume-template" id="resume-preview">
              <div className="resume-header" style={{ borderBottom: '2px solid #e0e7ff', marginBottom: 18, paddingBottom: 10 }}>
                <h2 id="preview-name" style={{ color: brandColors.primary, fontWeight: 700, fontSize: 28 }}>{form.fullName}</h2>
                <p id="preview-title" style={{ color: brandColors.accent, fontWeight: 600, fontSize: 18 }}>{form.jobTitle}</p>
                <p id="preview-contact" style={{ color: '#555', fontWeight: 500 }}>{form.email} • {form.phone} • {form.location}</p>
              </div>
              <div className="resume-section">
                <h3 style={{ color: brandColors.accent, fontWeight: 700 }}>Summary</h3>
                <p id="preview-summary">{form.summary}</p>
              </div>
              <div className="resume-section">
                <h3 style={{ color: brandColors.accent, fontWeight: 700 }}>Experience</h3>
                <div className="experience-item">
                  <h4 style={{ fontWeight: 600 }}>{form.position} <span className="company" style={{ color: brandColors.primary }}>at {form.company}</span></h4>
                  <p className="date" style={{ color: '#888', fontSize: 15 }}>{formatMonth(form.startDate)} - {formatMonth(form.endDate)}</p>
                  <ul id="preview-experience">{experienceItems}</ul>
                </div>
              </div>
              <div className="resume-section">
                <h3 style={{ color: brandColors.accent, fontWeight: 700 }}>Education</h3>
                <div className="education-item">
                  <h4 style={{ fontWeight: 600 }}>{form.degree}</h4>
                  <p className="institution" style={{ color: brandColors.primary }}>{form.institution}</p>
                  <p className="date" style={{ color: '#888', fontSize: 15 }}>Graduated: {formatMonth(form.graduationDate)}</p>
                  <p style={{ color: '#555' }}>GPA: {form.gpa}</p>
                  <ul id="preview-education">{achievementItems}</ul>
                </div>
              </div>
              <div className="resume-section">
                <h3 style={{ color: brandColors.accent, fontWeight: 700 }}>Skills</h3>
                <div id="preview-skills" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{skillItems}</div>
              </div>
            </div>
          </div>
        </div>
        <footer style={{ textAlign: "center", marginTop: "2em", color: "#fff", fontWeight: 500, letterSpacing: 0.2 }}>
          <p>© 2025 LaunchpadPoint. Empowering careers through intelligent, accessible technology.</p>
        </footer>
      </div>
    </div>
  );
}