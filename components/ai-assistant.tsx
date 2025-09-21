// components/AIAssistant.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, Send, Minimize2 } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface AIAssistantProps {
  analysisData: any
}

export default function AIAssistant({ analysisData }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I can help explain any part of your analysis or suggest improvements. What would you like to know?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: input,
          analysisContext: analysisData,
          chatHistory: messages,
        }),
      })

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ])
    }

    setLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close AI Assistant chat" : "Open AI Assistant chat"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col"
          role="dialog"
          aria-label="AI Assistant Chat"
          aria-modal="false"
        >
          <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
            <h3 className="font-semibold">AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
              aria-label="Close AI Assistant"
            >
              <Minimize2 size={20} />
            </button>
          </div>

          <div
            ref={messagesRef}
            className="flex-1 overflow-y-auto p-4 space-y-3"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                  }`}
                  role={msg.role === "user" ? "text" : "status"}
                  aria-label={`${msg.role === "user" ? "Your message" : "AI response"}`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-600" aria-live="polite" role="status">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your analysis..."
                className="flex-1 p-2 border rounded text-sm"
                disabled={loading}
                aria-label="Type your question about the resume analysis"
                aria-describedby="send-button-description"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
                aria-label="Send message"
                id="send-button-description"
                aria-describedby="send-button-help"
              >
                <Send size={16} />
              </button>
              <span id="send-button-help" className="sr-only">
                Press Enter or click to send your message to the AI assistant
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
