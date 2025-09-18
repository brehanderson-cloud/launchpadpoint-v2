import React, { useState } from "react";
import AIChatSidebar from "./AIChatSidebar";

const aiButtons = [
  { key: "resume", icon: "fa-file-alt", label: "Resume AI" },
  { key: "career", icon: "fa-chart-line", label: "Career AI" },
  { key: "skills", icon: "fa-brain", label: "Skills AI" },
  { key: "interview", icon: "fa-comments", label: "InterviewAI" },
  { key: "salary", icon: "fa-dollar-sign", label: "SalaryAI" },
  { key: "network", icon: "fa-users", label: "NetworkAI" },
];

export default function AIFixedBar() {
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [selectedAI, setSelectedAI] = useState("resume");
  const [quickInput, setQuickInput] = useState("");
  // For demo: open sidebar and prefill message
  const handleQuickAsk = (e) => {
    e.preventDefault();
    if (quickInput.trim()) {
      setAiChatOpen(true);
      setTimeout(() => {
        const input = document.querySelector('.ai-chat-sidebar input[type="text"]');
        if (input) {
          input.value = quickInput;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }, 100);
      setQuickInput("");
    }
  };
  return (
    <>
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 56,
          zIndex: 50,
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 -2px 16px rgba(79,70,229,0.10)",
          display: "flex",
          justifyContent: "center",
          gap: 24,
          padding: "0.7em 0.5em",
        }}
      >
        {aiButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => {
              setSelectedAI(btn.key);
              setAiChatOpen(true);
            }}
            style={{
              background: "linear-gradient(90deg, #4f46e5 0%, #667eea 100%)",
              color: "white",
              fontWeight: 700,
              fontSize: 16,
              border: "none",
              borderRadius: 10,
              padding: "0.7em 1.2em",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(79,70,229,0.10)",
              minWidth: 90,
            }}
          >
            <i className={`fas ${btn.icon}`} style={{ fontSize: 22, marginBottom: 2 }}></i>
            <span style={{ fontSize: 13 }}>{btn.label}</span>
          </button>
        ))}
      </div>
      {/* Input box at the very bottom */}
      <form
        onSubmit={handleQuickAsk}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 51,
          background: "#fff",
          boxShadow: "0 -2px 16px rgba(79,70,229,0.10)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.5em 1em",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <input
          type="text"
          value={quickInput}
          onChange={e => setQuickInput(e.target.value)}
          placeholder={`Ask ${aiButtons.find(b => b.key === selectedAI)?.label || 'AI'} anything...`}
          style={{
            width: 340,
            maxWidth: '90vw',
            border: '1.5px solid #e0e7ff',
            borderRadius: 8,
            padding: '0.7em 1em',
            fontSize: 16,
            marginRight: 10,
          }}
        />
        <button
          type="submit"
          style={{
            background: 'linear-gradient(90deg, #4f46e5 0%, #667eea 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 16,
            border: 'none',
            borderRadius: 8,
            padding: '0.7em 1.5em',
            cursor: 'pointer',
          }}
        >Ask</button>
      </form>
      <AIChatSidebar
        aiChatOpen={aiChatOpen}
        setAiChatOpen={setAiChatOpen}
        selectedAIOverride={selectedAI}
        setSelectedAIOverride={setSelectedAI}
      />
    </>
  );
}
