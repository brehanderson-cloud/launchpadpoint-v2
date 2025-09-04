import React, { useState } from 'react';
import { ArrowLeft, Send, Brain, Mic, MicOff, Video, TrendingUp, Target, FileText, CheckCircle, Copy, Star, Users, Zap, Play, ChevronRight, Clock } from 'lucide-react';

const AIAssistant = () => {
  const [activeCategory, setActiveCategory] = useState('ai-chat');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: "Hello! I'm your AI Career Assistant powered by real-time market intelligence. I can help with interview preparation, salary negotiation strategies, career planning, and professional communication templates. What would you like assistance with today?",
      timestamp: new Date().toLocaleTimeString(),
      confidence: 98
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [copiedTemplate, setCopiedTemplate] = useState(null);
  const [aiThinking, setAiThinking] = useState(false);

  // Exact LaunchpadPoint Logo matching your NextGen platform
  const LaunchpadLogo = ({ size = 32, showText = true }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 100 100"
          style={{ display: 'block' }}
        >
          {/* Main rocket body - elongated and sleek */}
          <path
            d="M50 10 
               C58 10 65 17 65 25
               L65 75
               C65 80 60 85 55 85
               L45 85
               C40 85 35 80 35 75
               L35 25
               C35 17 42 10 50 10 Z"
            fill="url(#mainRocketGradient)"
          />
          
          {/* Rocket nose cone - sharp point */}
          <path
            d="M35 25 
               C35 15 42 5 50 5
               C58 5 65 15 65 25
               L60 30
               L40 30 Z"
            fill="url(#noseGradient)"
          />
          
          {/* Left wing */}
          <path
            d="M30 60
               L35 50
               L35 80
               L30 75 Z"
            fill="url(#wingGradient)"
          />
          
          {/* Right wing */}
          <path
            d="M65 50
               L70 60
               L70 75
               L65 80 Z"
            fill="url(#wingGradient)"
          />
          
          {/* Window */}
          <circle
            cx="50"
            cy="35"
            r="7"
            fill="#00BFFF"
            opacity="0.9"
          />
          
          {/* Window highlight */}
          <circle
            cx="48"
            cy="33"
            r="3"
            fill="#87CEEB"
            opacity="0.6"
          />
          
          {/* Exhaust flame */}
          <path
            d="M42 85
               L46 95
               L50 88
               L54 95
               L58 85
               L54 98
               L50 92
               L46 98 Z"
            fill="url(#flameGradient)"
          />
          
          {/* Body panels */}
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
  };

  const categories = [
    {
      id: 'ai-chat',
      name: 'AI Career Chat',
      shortName: 'Chat',
      icon: Brain,
      description: 'Intelligent career guidance',
      color: '#667eea'
    },
    {
      id: 'interview-prep',
      name: 'Interview Prep',
      shortName: 'Interview', 
      icon: Video,
      description: 'Mock interviews & feedback',
      color: '#f093fb'
    },
    {
      id: 'salary-negotiation',
      name: 'Salary Strategy',
      shortName: 'Salary',
      icon: TrendingUp,
      description: 'Negotiation strategies',
      color: '#4facfe'
    },
    {
      id: 'email-templates',
      name: 'Smart Templates',
      shortName: 'Templates',
      icon: FileText,
      description: 'Professional email templates',
      color: '#43e97b'
    },
    {
      id: 'career-strategy',
      name: 'Career Strategy',
      shortName: 'Strategy',
      icon: Target,
      description: 'Strategic career planning',
      color: '#fa709a'
    }
  ];

  const navigateBack = () => {
    window.location.href = '/dashboard';
  };

  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('salary') || message.includes('negotiate') || message.includes('compensation')) {
      return {
        content: `📊 **Advanced Salary Intelligence**

**Your Current Market Position:**
• Market Value: $118,000 (updated today)
• Industry Range: $105K - $140K
• Your Position: 72nd percentile

**Strategic Negotiation Analysis:**
✅ **Strong Leverage Factors:**
• React + Node.js premium: +$8K
• 5+ years experience: High demand
• Market trend: +15% growth this quarter

🎯 **Recommended Strategy:**
• Target Range: $125K - $135K
• Success Probability: 89%
• Best Timing: Performance review or competing offer
• Key Value Props: Full-stack expertise, leadership potential

**Next Steps:**
1. Document recent achievements
2. Research 3 comparable offers
3. Schedule discussion with manager
4. Prepare value proposition

Would you like me to help you draft a negotiation email?`,
        confidence: 94,
        marketData: true
      };
    }
    
    if (message.includes('interview') || message.includes('practice') || message.includes('behavioral')) {
      return {
        content: `🎤 **AI-Powered Interview Mastery**

**Strategic Interview Preparation:**

📋 **STAR Method Framework:**
• **Situation:** Set specific context (2-3 sentences)
• **Task:** Your responsibility (1-2 sentences)  
• **Action:** What YOU specifically did (3-4 sentences)
• **Result:** Quantified outcome (1-2 sentences)

**Top Questions for Senior Engineers:**
1. "Tell me about a challenging technical decision you made"
2. "How do you handle competing priorities?"
3. "Describe a time you mentored someone"
4. "What's your approach to code reviews?"

**Advanced Preparation:**
✅ Research company tech stack (15 mins)
✅ Prepare 3 STAR stories (30 mins)
✅ Practice with our AI interviewer (20 mins)
✅ Prepare thoughtful questions (10 mins)

**Success Metrics:**
• 60-90 seconds per answer
• Include quantified results
• Show growth mindset
• Demonstrate leadership

Ready to start a mock interview session? I can simulate different interview styles and provide real-time feedback.`,
        confidence: 96
      };
    }
    
    if (message.includes('career') || message.includes('promotion') || message.includes('next step') || message.includes('growth')) {
      return {
        content: `🚀 **Strategic Career Intelligence**

**Current Career Analysis:**
• Position: Senior Software Engineer
• Market Fit: 87% (Excellent)
• Promotion Readiness: 74%
• Skill Relevance: 92%

**Optimal Career Path (Next 18 months):**

🎯 **Primary Target: Tech Lead**
• Success Probability: 92%
• Timeline: 12-18 months
• Salary Range: $135K - $155K
• Key Requirement: Leadership certification

**Strategic Action Plan:**
**Month 1-3:** Complete leadership training
**Month 4-6:** Lead cross-functional project
**Month 7-9:** Mentor 2 junior developers
**Month 10-12:** Present at tech conference

**Long-term Vision (3-5 years):**
⭐ **Engineering Manager Track**
• Success Probability: 78%
• Salary Range: $160K - $200K
• Requirements: Team management experience + MBA

**Market Intelligence:**
📈 Tech Lead demand: +34% this quarter
🏢 156 companies actively hiring your profile
💰 Average promotion salary increase: $22K

**Immediate Actions:**
1. Schedule 1:1 with manager about growth
2. Identify leadership development opportunities
3. Build internal mentorship program
4. Update LinkedIn with leadership projects

Would you like me to create a detailed 90-day action plan?`,
        confidence: 89
      };
    }
    
    if (message.includes('skill') || message.includes('learn') || message.includes('development') || message.includes('training')) {
      return {
        content: `🧠 **Future-Proof Skill Strategy**

**AI-Powered Skill Analysis:**

🔥 **High-Impact Skills (Next 12 months):**

**1. TypeScript** (Priority #1)
• Market Demand: +45% this year
• Salary Impact: +$8K average
• Learning Time: 2-3 months
• ROI Score: 95%

**2. System Design** (Priority #2)
• Critical for Tech Lead transition
• Interview requirement: 89% of senior positions
• Salary Impact: +$12K
• Learning Time: 4-6 months

**3. Kubernetes** (Emerging Priority)
• Market Growth: +38% demand
• Salary Premium: +$10K
• Future-proofing: High
• Learning Time: 3-4 months

📊 **Personalized Learning Roadmap:**
**Weeks 1-8:** TypeScript fundamentals & advanced patterns
**Weeks 9-16:** System Design principles & case studies
**Weeks 17-24:** Kubernetes certification & projects
**Weeks 25-32:** Leadership & communication skills

**Learning Resources:**
• TypeScript: TypeScript Handbook + Frontend Masters
• System Design: "Designing Data-Intensive Applications"
• Kubernetes: Official K8s tutorials + practice labs

**ROI Calculation:**
• Investment: ~200 hours over 8 months
• Expected salary increase: $20K+ within 18 months
• Career advancement: 92% probability of promotion

**Market Predictions (2025-2026):**
🚀 AI/ML: +185% growth (start learning now)
⚡ Edge Computing: +128% growth
🔒 Cybersecurity: +142% growth

Which skill would you like to start with? I can create a detailed learning plan with resources and milestones.`,
        confidence: 92
      };
    }

    if (message.includes('template') || message.includes('email') || message.includes('write')) {
      return {
        content: `📧 **AI-Generated Smart Templates**

**Available Professional Templates:**

✉️ **Salary Negotiation Email**
• Personalized with your $118K market data
• Strategic positioning for $125K-$135K target
• Success rate: 89% based on similar profiles

📝 **Interview Thank You Note**  
• Customized for senior engineering roles
• Highlights React/Node.js expertise
• Follow-up strategy included

🤝 **LinkedIn Networking Message**
• Optimized for hiring managers
• Includes your 5+ years experience
• Response rate: 34% higher than generic

📈 **Internal Promotion Request**
• Based on your 74% readiness score
• Includes market salary benchmarks
• Achievement-focused structure

🎯 **Counter-Offer Response**
• Strategic negotiation positioning
• Relationship preservation focus
• Market intelligence integration

**Template Features:**
✅ Personalized with your background
✅ Current market data integration
✅ Industry best practices
✅ Success probability optimization
✅ Professional tone & structure

**Sample Preview - Salary Negotiation:**
*"Based on my research of current market rates for senior engineers with React/Node.js expertise, similar positions range from $125K-$140K. Given my 5+ years of experience and recent project successes..."*

Which template would you like me to generate? I'll customize it with your specific details and current market intelligence.`,
        confidence: 97
      };
    }

    return {
      content: `🤖 **Advanced AI Career Assistant**

I'm your strategic career advisor with real-time market intelligence. Here's how I can help:

**💰 Salary Intelligence**
• Live market data & negotiation strategies
• Compensation benchmarking & trends
• Success probability calculations

**🎯 Career Strategy**
• Personalized roadmaps with analytics
• Promotion readiness scoring  
• Market opportunity mapping

**🎤 Interview Mastery**
• AI mock interviews with feedback
• Behavioral question coaching
• Industry-specific preparation

**📧 Smart Communication**
• Market-intelligent email templates
• Professional networking guidance
• Strategic positioning advice

**📈 Skill Development**
• Future-focused learning paths
• ROI calculations for each skill
• Market demand predictions

**Your Current Intelligence:**
• Career Score: 87/100 (Strong)
• Market Value: $118K (live data)
• Promotion Readiness: 74%
• Skill Match: 94%

**Recent Market Activity:**
• 156 new opportunities match your profile
• React developer salaries up 15% this month
• Tech lead positions increased 34% this quarter

What specific area would you like to focus on? I provide data-driven insights tailored to your profile and current market conditions.`,
      confidence: 95
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setAiThinking(true);
    
    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setTimeout(() => {
      const aiResponse = getAIResponse(inputMessage);
      const assistantMessage = {
        type: 'assistant',
        content: aiResponse.content,
        timestamp: new Date().toLocaleTimeString(),
        confidence: aiResponse.confidence || 95,
        marketData: aiResponse.marketData || false
      };

      setMessages(prev => [...prev, userMessage, assistantMessage]);
      setAiThinking(false);
    }, 1500);

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
  };

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

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #fce7f3 100%)' }}>
      {/* Mobile Header */}
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
            AI Career Intelligence
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
              <span style={{ fontWeight: '600' }}>AI Career Assistant</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.75rem' }}>Live Intelligence</span>
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
                        {message.marketData && (
                          <span style={{ 
                            marginLeft: '0.5rem', 
                            padding: '0.125rem 0.5rem', 
                            background: 'rgba(16, 185, 129, 0.1)', 
                            color: '#10b981', 
                            borderRadius: '1rem',
                            fontSize: '0.625rem'
                          }}>
                            Live Data
                          </span>
                        )}
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
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>AI analyzing market data...</span>
                </div>
              </div>
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

            {/* Input */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about salary, career moves, skills, interviews..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    paddingRight: '2.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.75rem',
                    fontSize: '0.9rem',
                    background: 'white'
                  }}
                />
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  style={{
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    padding: '0.25rem',
                    background: isRecording ? '#ef4444' : '#f3f4f6',
                    color: isRecording ? 'white' : '#6b7280',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer'
                  }}
                >
                  {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                style={{
                  padding: '0.75rem',
                  background: inputMessage.trim() ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#d1d5db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.75rem',
                  cursor: inputMessage.trim() ? 'pointer' : 'not-allowed'
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

export default AIAssistant;
