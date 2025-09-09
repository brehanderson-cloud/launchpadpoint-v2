import React, { useState } from 'react';
import { ArrowLeft, Send, Brain, Video, TrendingUp, Target, FileText } from 'lucide-react';

// --- LaunchpadPoint SVG Logo component ---
const LaunchpadLogo = ({ size = 32, showText = true }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block' }}>
      <path
        d="M50 10 C58 10 65 17 65 25 L65 75 C65 80 60 85 55 85 L45 85 C40 85 35 80 35 75 L35 25 C35 17 42 10 50 10 Z"
        fill="url(#mainRocketGradient)"
      />
      <path
        d="M35 25 C35 15 42 5 50 5 C58 5 65 15 65 25 L60 30 L40 30 Z"
        fill="url(#noseGradient)"
      />
      <path d="M30 60 L35 50 L35 80 L30 75 Z" fill="url(#wingGradient)" />
      <path d="M65 50 L70 60 L70 75 L65 80 Z" fill="url(#wingGradient)" />
      <circle cx="50" cy="35" r="7" fill="#00BFFF" opacity="0.9" />
      <circle cx="48" cy="33" r="3" fill="#87CEEB" opacity="0.6" />
      <path
        d="M42 85 L46 95 L50 88 L54 95 L58 85 L54 98 L50 92 L46 98 Z"
        fill="url(#flameGradient)"
      />
      <rect x="40" y="45" width="20" height="2" fill="rgba(255,255,255,0.2)" rx="1" />
      <rect x="40" y="55" width="20" height="2" fill="rgba(255,255,255,0.2)" rx="1" />
      <defs>
        <linearGradient id="mainRocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E90FF" />
          <stop offset="40%" stopColor="#4169E1" />
          <stop offset="100%" stopColor="#0052CC" />
        </linearGradient>
        <linearGradient id="noseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="50%" stopColor="#00BFFF" />
          <stop offset="100%" stopColor="#1E90FF" />
        </linearGradient>
        <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9370DB" />
          <stop offset="50%" stopColor="#8A2BE2" />
          <stop offset="100%" stopColor="#4B0082" />
        </linearGradient>
        <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF6B35" />
          <stop offset="30%" stopColor="#FF8C42" />
          <stop offset="70%" stopColor="#F7931E" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
      </defs>
    </svg>
    {showText && (
      <span style={{
        fontWeight: 'bold',
        fontSize: size > 32 ? '1.2rem' : size > 24 ? '1rem' : '0.9rem',
        background: 'linear-gradient(135deg, #1E90FF, #8A2BE2)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        letterSpacing: '-0.3px'
      }}>
        LaunchpadPoint
      </span>
    )}
  </div>
);

const categories = [
  { id: 'ai-chat', name: 'AI Chat', shortName: 'Chat', icon: Brain, color: '#667eea' },
  { id: 'interview-prep', name: 'Interview', shortName: 'Interview', icon: Video, color: '#f093fb' },
  { id: 'salary-negotiation', name: 'Salary', shortName: 'Salary', icon: TrendingUp, color: '#4facfe' },
  { id: 'email-templates', name: 'Templates', shortName: 'Templates', icon: FileText, color: '#43e97b' },
  { id: 'career-strategy', name: 'Strategy', shortName: 'Strategy', icon: Target, color: '#fa709a' }
];

const quickActions = [
  "What's my market value?",
  "Should I negotiate salary?",
  "How do I get promoted?",
  "What skills should I learn?",
  "Practice interview questions",
  "Write networking email",
  "Create promotion request",
  "Draft thank you note"
];

// --- Real AI API Call ---
async function fetchAIReply(messages) {
  // For production: proxy this call through your own backend to keep your API key secret!
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY || "";
  const url = "https://api.openai.com/v1/chat/completions";
  const systemPrompt = `You are an expert AI career assistant. You help users with all aspects of career advancement: salary negotiation, thank you letters, interview tips, networking, resume and cover letter writing, and job search strategy. Be proactive, specific, and friendly.`;

  const openAiMessages = [
    { role: "system", content: systemPrompt },
    ...messages.map(msg => ({
      role: msg.type === "user" ? "user" : "assistant",
      content: msg.content
    }))
  ];

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: openAiMessages,
      max_tokens: 800,
      temperature: 0.7
    })
  });
  if (!resp.ok) throw new Error("AI API error");
  const data = await resp.json();
  return data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
}

const EnhancedAIAssistant = () => {
  const [activeCategory, setActiveCategory] = useState('ai-chat');
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: "Hello! I'm your AI Career Assistant powered by advanced intelligence and real-time market data. I can provide expert guidance on salary negotiation, career advancement, skill development, interview preparation, and professional communication. What would you like to focus on today?",
      timestamp: new Date().toLocaleTimeString(),
      confidence: 98
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [aiThinking, setAiThinking] = useState(false);
  const [error, setError] = useState('');

  const navigateBack = () => {
    window.location.href = '/';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    setAiThinking(true);
    setError('');
    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    try {
      const aiReply = await fetchAIReply([...messages, userMessage]);
      const assistantMessage = {
        type: 'assistant',
        content: aiReply,
        timestamp: new Date().toLocaleTimeString(),
        confidence: 97
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError("There was a problem contacting the AI API. Please try again later.");
    } finally {
      setAiThinking(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #fce7f3 100%)' }}>
      {/* Header */}
      <div style={{ 
        background: 'white', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            onClick={navigateBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#6b7280',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <LaunchpadLogo size={32} />
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'white', 
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}>
            AJ
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div style={{ padding: '1rem', background: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', overflowX: 'auto', gap: '0.5rem', paddingBottom: '0.5rem' }}>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.75rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  background: activeCategory === category.id ? `${category.color}15` : '#f9fafb',
                  color: activeCategory === category.id ? category.color : '#6b7280',
                  cursor: 'pointer',
                  minWidth: '80px',
                  fontSize: '0.75rem',
                  fontWeight: activeCategory === category.id ? '600' : '400'
                }}
              >
                <Icon size={18} />
                <span style={{ textAlign: 'center', lineHeight: '1.2' }}>{category.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '1rem' }}>
        {/* Career Stats Card */}
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white', 
          padding: '1.5rem', 
          borderRadius: '1rem', 
          marginBottom: '1rem' 
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', margin: '0 0 1rem 0' }}>
            Enhanced AI Career Intelligence
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>87</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Career Score</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$118K</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Market Value</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>74%</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Promotion Ready</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>156</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Opportunities</div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            color: 'white', 
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Brain size={20} />
              <span style={{ fontWeight: '600' }}>Enhanced AI Assistant</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.75rem' }}>Advanced Intelligence</span>
            </div>
          </div>

          {/* Messages */}
          <div style={{ height: '400px', overflowY: 'auto', padding: '1rem' }}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '1rem'
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '0.75rem',
                    borderRadius: '1rem',
                    background: message.type === 'user' 
                      ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                      : '#f3f4f6',
                    color: message.type === 'user' ? 'white' : '#374151'
                  }}
                >
                  <div style={{ whiteSpace: 'pre-line', lineHeight: '1.5', fontSize: '0.9rem' }}>
                    {message.content}
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginTop: '0.5rem', 
                    fontSize: '0.75rem', 
                    opacity: 0.8 
                  }}>
                    <span>{message.timestamp}</span>
                    {message.type === 'assistant' && message.confidence && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Brain size={12} />
                        <span>{message.confidence}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {aiThinking && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ 
                  background: '#f3f4f6', 
                  padding: '0.75rem', 
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <div style={{ width: '6px', height: '6px', background: '#667eea', borderRadius: '50%' }}></div>
                    <div style={{ width: '6px', height: '6px', background: '#764ba2', borderRadius: '50%' }}></div>
                    <div style={{ width: '6px', height: '6px', background: '#667eea', borderRadius: '50%' }}></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Processing with enhanced AI...</span>
                </div>
              </div>
            )}
            {error && (
              <div style={{ color: '#f72585', fontSize: '0.95rem', marginTop: 8 }}>{error}</div>
            )}
          </div>

          {/* Quick Actions */}
          <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(action)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.75rem',
                    background: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  {action}
                </button>
              ))}
            </div>

            {/* Input with Enter Button */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about salary, career moves, skills, interviews..."
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.75rem',
                  fontSize: '0.9rem',
                  background: 'white'
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || aiThinking}
                style={{
                  padding: '0.75rem',
                  background: inputMessage.trim() ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#d1d5db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.75rem',
                  cursor: inputMessage.trim() && !aiThinking ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAIAssistant;
