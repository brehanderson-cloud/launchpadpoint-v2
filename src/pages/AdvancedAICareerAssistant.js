import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, Brain, Mic, MicOff, Video, Camera, Upload, Download, Share2, BarChart3, Globe, Award, Lightbulb, MessageSquare, Calendar, FileText, CheckCircle, Copy, Star, TrendingUp, Target, Users, Zap, Play, ChevronRight, Clock, AlertTriangle } from 'lucide-react';

const AdvancedAICareerAssistant = () => {
  const [activeModule, setActiveModule] = useState('ai-chat');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: "Hello! I'm your Advanced AI Career Assistant powered by real-time market intelligence. I can provide live salary data, conduct mock interviews with video analysis, generate personalized email templates, and create strategic career plans. What would you like to accomplish today?",
      timestamp: new Date().toLocaleTimeString(),
      confidence: 98
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [copiedTemplate, setCopiedTemplate] = useState(null);
  const [aiThinking, setAiThinking] = useState(false);
  const [userProfile] = useState({
    name: 'Alex Johnson',
    role: 'Senior Software Engineer',
    experience: 5,
    skills: ['React', 'Node.js', 'Python', 'Leadership'],
    marketValue: 115000,
    careerScore: 87
  });

  // Fixed LaunchpadPoint logo to match your branding
  const LaunchpadLogo = ({ size = 32, className = "" }) => (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div 
        style={{ 
          width: size, 
          height: size,
          background: 'linear-gradient(135deg, #1E90FF 0%, #4169E1 50%, #8A2BE2 100%)',
          borderRadius: '50% 50% 50% 20%',
          position: 'relative',
          transform: 'rotate(-45deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{
          width: '35%',
          height: '35%',
          background: '#00BFFF',
          borderRadius: '50%',
          transform: 'rotate(45deg)'
        }}></div>
      </div>
      {size > 24 && (
        <span style={{
          fontWeight: 'bold',
          fontSize: size > 32 ? '1.2rem' : '1rem',
          background: 'linear-gradient(135deg, #1E90FF, #8A2BE2)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        }}>
          LaunchpadPoint
        </span>
      )}
    </div>
  );

  const modules = [
    {
      id: 'ai-chat',
      name: 'AI Career Advisor',
      icon: Brain,
      description: 'Intelligent career guidance with market data',
      color: '#667eea'
    },
    {
      id: 'interview-sim',
      name: 'Interview Simulator',
      icon: Video,
      description: 'Live mock interviews with AI feedback',
      color: '#f093fb'
    },
    {
      id: 'salary-intel',
      name: 'Salary Intelligence',
      icon: TrendingUp,
      description: 'Real-time compensation analysis',
      color: '#4facfe'
    },
    {
      id: 'smart-templates',
      name: 'Smart Templates',
      icon: FileText,
      description: 'AI-personalized email templates',
      color: '#43e97b'
    },
    {
      id: 'career-strategy',
      name: 'Career Strategy',
      icon: Target,
      description: 'Personalized career roadmaps',
      color: '#fa709a'
    }
  ];

  const navigateBack = () => {
    window.location.href = '/dashboard';
  };

  // Enhanced AI responses with market intelligence
  const getAdvancedAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('salary') || message.includes('compensation')) {
      return {
        content: `Based on real-time market data, here's your compensation intelligence:

**Your Current Position:** Senior Software Engineer
**Current Market Value:** $118,000 (updated 2 hours ago)
**Your Estimated Worth:** $115,000 (+/- $8K)

**Market Analysis:**
• 75th percentile: $135K (+$20K from your current)
• Similar roles increased 12% this quarter
• React + Node.js combo: $8K premium
• Your experience level: High demand (+15% leverage)

**Negotiation Recommendation:**
Target range: $125K-$135K (strong probability of success)

**Best Timing:** Next performance review or when you receive competing offers
**Key Value Props:** 5+ years experience, full-stack expertise, leadership potential`,
        confidence: 94,
        marketData: true
      };
    }
    
    if (message.includes('interview') || message.includes('behavioral')) {
      return {
        content: `I'll help you master interviews with AI-powered practice. Here's your personalized strategy:

**For Behavioral Questions (STAR Method):**
• **Situation:** Set specific context
• **Task:** Your responsibility 
• **Action:** What YOU did specifically
• **Result:** Quantified outcome

**Your Strength Areas (based on profile):**
✅ Technical leadership examples
✅ Problem-solving scenarios
✅ Team collaboration stories

**Practice Recommendations:**
1. Record yourself answering - I can analyze body language
2. Time your responses (60-90 seconds ideal)
3. Practice with our AI interviewer for real-time feedback

**Most Common Questions for Your Level:**
• "Tell me about a challenging technical decision"
• "How do you handle conflicting priorities?"
• "Describe a time you mentored someone"

Would you like to start a mock interview session?`,
        confidence: 96
      };
    }
    
    if (message.includes('career') || message.includes('next step') || message.includes('promotion')) {
      return {
        content: `Based on market intelligence and your profile, here's your strategic career path:

**Current Position Analysis:**
• Role: Senior Software Engineer
• Market Fit: 87% (Excellent)
• Promotion Readiness: 74%

**Recommended Next Steps (12-18 months):**
🎯 **Tech Lead Position**
• Probability: 92%
• Salary Range: $135K-$155K
• Gap Analysis: Leadership certification needed

**Long-term Path (3-5 years):**
🚀 **Engineering Manager**
• Probability: 78%
• Salary Range: $155K-$200K
• Requirements: MBA or equivalent + team management experience

**Action Items This Quarter:**
1. Lead cross-functional project (closes leadership gap)
2. Complete React certification (market premium)
3. Build internal mentorship program (visibility + impact)

**Market Intelligence:**
• Tech leads in your area: +34% demand
• Companies hiring: 156 active positions
• Your skill match rate: 94%

Would you like me to create a detailed 90-day action plan?`,
        confidence: 89
      };
    }
    
    if (message.includes('skill') || message.includes('learn') || message.includes('development')) {
      return {
        content: `Here's your AI-powered skill development strategy based on market predictions:

**High-Impact Skills for You:**
🔥 **TypeScript** (Priority #1)
• Market demand: +45% this year
• Salary impact: +$8K average
• Time to proficiency: 2-3 months
• ROI Score: 95%

⚡ **System Design** (Priority #2)  
• Essential for Tech Lead transition
• Interview requirement: 89% of positions
• Salary impact: +$12K at senior level
• Time investment: 4-6 months

🧠 **AI/ML Fundamentals** (Emerging)
• Future-proofing: Critical
• Market growth: +185% predicted
• Early adopter advantage: High
• Time investment: 6-8 months

**Your Learning Path:**
**Month 1-2:** TypeScript fundamentals
**Month 3-4:** Advanced TypeScript + System Design basics
**Month 5-6:** System Design mastery
**Month 7+:** AI/ML exploration

**Recommended Resources:**
• TypeScript: Frontend Masters course
• System Design: Designing Data-Intensive Applications
• Practice: LeetCode System Design section

**Budget Impact:** Learning these skills = potential $20K+ salary increase within 18 months.`,
        confidence: 92
      };
    }

    if (message.includes('template') || message.includes('email')) {
      return {
        content: `I'll generate personalized email templates based on your profile and current market conditions. Here are the most valuable templates for senior engineers:

**Available Smart Templates:**
📧 **Salary Negotiation Email** - Personalized with your market data
📧 **Interview Thank You** - Customized for tech roles  
📧 **LinkedIn Outreach** - For networking with hiring managers
📧 **Internal Promotion Request** - Based on your readiness score
📧 **Counter-Offer Response** - Strategic positioning

Each template includes:
✅ Your specific experience highlights
✅ Current market data integration  
✅ Industry-appropriate tone
✅ Strategic timing recommendations

Which type of email do you need help with? I'll generate a personalized template with your details and current market intelligence.`,
        confidence: 97
      };
    }

    return {
      content: `I'm your advanced AI career strategist with access to real-time market data, salary intelligence, and career analytics. I can help you with:

🎯 **Strategic Career Planning** - Personalized roadmaps with probability analysis
💰 **Salary Intelligence** - Live market data and negotiation strategies  
🎤 **Interview Mastery** - Mock interviews with AI feedback
📈 **Skill Development** - Future-focused learning paths
📧 **Smart Communication** - Personalized templates and outreach

**Your Quick Stats:**
• Career Score: 87/100 (Strong)
• Market Value: $115K (updated today)
• Promotion Readiness: 74%
• Skill Match: 94%

What specific area would you like to focus on? I'll provide data-driven insights tailored to your profile.`,
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
      const aiResponse = getAdvancedAIResponse(inputMessage);
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

  // Smart Templates with personalization
  const smartTemplates = {
    "Salary Negotiation Email": {
      subject: `Re: Compensation Discussion - ${userProfile.name}`,
      body: `Dear [Hiring Manager's Name],

Thank you for the offer for the Senior Software Engineer position. I'm excited about the opportunity to contribute to [Company Name] and bring my ${userProfile.experience} years of experience in React, Node.js, and technical leadership.

After researching current market rates for senior engineers with my background, I've found that positions with similar requirements range from $125,000 to $140,000. Given my proven track record in:

• Full-stack development with modern frameworks
• Technical mentoring and team leadership  
• Delivering high-impact projects on time

I was hoping we could discuss a starting salary of $130,000, which reflects both my experience and current market conditions.

I'm confident that my technical expertise and leadership potential will deliver strong value to your team. I'm open to discussing the complete compensation package and would welcome the opportunity to find a mutually beneficial arrangement.

Thank you for your consideration. I look forward to your response.

Best regards,
${userProfile.name}`,
      marketInsight: "Based on current market data: $125K-$140K range for your profile"
    },
    
    "Interview Thank You Email": {
      subject: `Thank you for the Senior Software Engineer interview`,
      body: `Dear [Interviewer's Name],

Thank you for taking the time to meet with me today about the Senior Software Engineer position at [Company Name]. I enjoyed our discussion about [specific topic mentioned] and learning more about your team's technical challenges.

Our conversation reinforced my enthusiasm for this role, particularly the opportunity to [mention specific project or responsibility discussed]. Given my experience with React and Node.js, along with my background in technical leadership, I'm confident I can make an immediate impact on your development goals.

I was especially interested in [specific technology/project mentioned] and believe my experience with [relevant skill] would be valuable as you [specific company goal discussed].

Please don't hesitate to reach out if you need any additional information. I look forward to the next steps in the process.

Best regards,
${userProfile.name}`,
      marketInsight: "Personalized with your key technical strengths"
    },
    
    "LinkedIn Networking Message": {
      subject: "Connection request with shared interest in React development",
      body: `Hi [Name],

I came across your profile and was impressed by your work at [Company]. As a Senior Software Engineer with ${userProfile.experience} years of experience, particularly in React and Node.js, I'm always interested in connecting with other technical leaders in our field.

I noticed you're involved in [mention something from their profile]. I've been working on similar challenges, especially around [relevant technical area]. Would love to connect and possibly exchange insights about [specific technical topic or industry trend].

Looking forward to connecting!

Best,
${userProfile.name}`,
      marketInsight: "Optimized for technical professionals and hiring managers"
    }
  };

  const InterviewSimulator = () => {
    const [isActive, setIsActive] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [analysisData, setAnalysisData] = useState({
      eyeContact: 85,
      speechPace: 72,
      confidence: 91,
      bodyLanguage: 78
    });

    const mockQuestions = [
      "Tell me about a challenging technical problem you solved recently.",
      "How do you handle disagreements with team members about technical decisions?", 
      "Describe a time when you had to learn a new technology quickly for a project."
    ];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl">
          <h3 className="text-2xl font-bold mb-2">AI Interview Simulator</h3>
          <p className="text-purple-100">Practice with real-time AI feedback and analysis</p>
        </div>

        {!isActive ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h4 className="text-xl font-bold mb-4">Interview Analytics</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Video className="text-blue-600" size={20} />
                  <div>
                    <h5 className="font-semibold">Video Analysis</h5>
                    <p className="text-sm text-gray-600">Real-time body language and eye contact tracking</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Mic className="text-green-600" size={20} />
                  <div>
                    <h5 className="font-semibold">Speech Analysis</h5>
                    <p className="text-sm text-gray-600">Pace, clarity, and confidence scoring</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Brain className="text-purple-600" size={20} />
                  <div>
                    <h5 className="font-semibold">Content Scoring</h5>
                    <p className="text-sm text-gray-600">Answer structure and relevance analysis</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h4 className="text-xl font-bold mb-4">Interview Types</h4>
              <div className="space-y-3">
                {['Behavioral Questions', 'Technical Deep-Dive', 'System Design', 'Leadership Scenarios'].map((type, index) => (
                  <button
                    key={index}
                    className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-all"
                  >
                    <h5 className="font-semibold">{type}</h5>
                    <p className="text-sm text-gray-600">
                      {type === 'Behavioral Questions' ? 'STAR method practice with real scenarios' :
                       type === 'Technical Deep-Dive' ? 'Code review and architecture discussions' :
                       type === 'System Design' ? 'Scalability and design pattern challenges' :
                       'Management and team leadership scenarios'}
                    </p>
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setIsActive(true)}
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Play size={20} />
                Start AI Interview
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="font-semibold">Live Interview - Question {currentQuestion + 1}/{mockQuestions.length}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-2 rounded-lg ${isRecording ? 'bg-red-600' : 'bg-gray-600'}`}
                >
                  {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
                <button
                  onClick={() => setIsActive(false)}
                  className="px-4 py-2 bg-gray-600 rounded-lg text-sm"
                >
                  End Interview
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Brain className="text-white" size={24} />
                </div>
                <h4 className="text-lg font-bold">AI Interviewer</h4>
                <p className="text-gray-600">Senior Engineering Manager</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl mb-6">
                <h5 className="font-semibold mb-2">Question:</h5>
                <p className="text-lg">{mockQuestions[currentQuestion]}</p>
              </div>

              {/* Real-time analysis */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {Object.entries(analysisData).map(([key, value]) => (
                  <div key={key} className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className={`text-xl font-bold ${
                      value >= 80 ? 'text-green-600' : 
                      value >= 60 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {value}%
                    </div>
                    <div className="text-xs text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentQuestion(Math.min(currentQuestion + 1, mockQuestions.length - 1))}
                  className="flex-1 bg-purple-600 text-white p-3 rounded-xl font-semibold"
                  disabled={currentQuestion >= mockQuestions.length - 1}
                >
                  Next Question
                </button>
                <button className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold">
                  Get AI Feedback
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const SalaryIntelligence = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-2xl">
          <h3 className="text-2xl font-bold mb-2">Live Salary Intelligence</h3>
          <p className="text-green-100">Real-time compensation data and market analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold">Your Market Value</h4>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Live data</span>
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl mb-6">
              <div className="text-3xl font-bold text-green-600 mb-2">$118,000</div>
              <div className="text-sm text-gray-600">Current Market Rate</div>
              <div className="text-xs text-green-600 mt-1">↗️ +$3K from last month</div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">25th Percentile</span>
                <span className="font-semibold">$98K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">50th Percentile (Median)</span>
                <span className="font-semibold">$118K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">75th Percentile</span>
                <span className="font-semibold">$142K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">90th Percentile</span>
                <span className="font-semibold">$165K</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <h5 className="font-semibold text-blue-800 mb-2">Negotiation Insight</h5>
              <p className="text-sm text-blue-700">
                You have strong leverage. Similar profiles increased salary by 12% on average this quarter.
                Target range: $125K-$135K has 89% success probability.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h4 className="text-xl font-bold mb-4">Skill Premiums</h4>
              <div className="space-y-3">
                {[
                  { skill: 'React + TypeScript', premium: '+$8K', demand: 'High' },
                  { skill: 'Node.js + AWS', premium: '+$6K', demand: 'High' },
                  { skill: 'Leadership Experience', premium: '+$12K', demand: 'Critical' },
                  { skill: 'System Design', premium: '+$10K', demand: 'Growing' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <h5 className="font-semibold text-sm">{item.skill}</h5>
                      <p className={`text-xs ${
                        item.demand === 'Critical' ? 'text-red-600' :
                        item.demand === 'High' ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        {item.demand} demand
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">{item.premium}</div>
                      <div className="text-xs text-gray-500">avg. increase</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h4 className="text-xl font-bold mb-4">Market Trends</h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="text-green-600" size={16} />
                    <span className="font-semibold text-green-800">Remote Work Premium</span>
                  </div>
                  <p className="text-sm text-green-700">+$5K average for remote-first positions</p>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="text-blue-600" size={16} />
                    <span className="font-semibold text-blue-800">Startup Equity</span>
                  </div>
                  <p className="text-sm text-blue-700">0.15%-0.5% equity typical for senior engineers</p>
                </div>
                
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="text-purple-600" size={16} />
                    <span className="font-semibold text-purple-800">Signing Bonuses</span>
                  </div>
                  <p className="text-sm text-purple-700">$8K-$15K common for competitive offers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SmartTemplates = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl">
          <h3 className="text-2xl font-bold mb-2">AI-Powered Smart Templates</h3>
          <p className="text-blue-100">Personalized templates with market intelligence</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.entries(smartTemplates).map(([title, template]) => (
            <div key={title} className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-bold">{title}</h4>
                <button
                  onClick={() => {
                    const fullTemplate = `Subject: ${template.subject}\n\n${template.body}`;
                    navigator.clipboard.writeText(fullTemplate);
                    setCopiedTemplate(title);
                    setTimeout(() => setCopiedTemplate(null), 2000);
                  }}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    copiedTemplate === title
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {copiedTemplate === title ? <CheckCircle size={14} /> : <Copy size={14} />}
                  {copiedTemplate === title ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Preview:</div>
                <div className="text-xs text-gray-600 line-clamp-4">
                  <strong>Subject:</strong> {template.subject}
                  <br /><br />
                  {template.body.substring(0, 200)}...
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-xs font-semibold text-blue-800 mb-1">AI Enhancement:</div>
                <div className="text-xs text-blue-700">{template.marketInsight}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CareerStrategy = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-2xl">
          <h3 className="text-2xl font-bold mb-2">AI Career Strategy</h3>
          <p className="text-indigo-100">Data-driven career planning with predictive analytics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h4 className="text-xl font-bold mb-4">Career Progression Model</h4>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-green-600" size={20} />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold">Current: Senior Software Engineer</h5>
                  <p className="text-sm text-gray-600">Market fit: 87% • $115K-$125K range</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target className="text-blue-600" size={20} />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold">Next: Tech Lead (12-18 months)</h5>
                  <p className="text-sm text-gray-600">Probability: 92% • $135K-$155K range</p>
                  <p className="text-xs text-blue-600 mt-1">Gap: Leadership certification needed</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl opacity-75">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="text-purple-600" size={20} />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold">Future: Engineering Manager (3-5 years)</h5>
                  <p className="text-sm text-gray-600">Probability: 78% • $155K-$200K range</p>
                  <p className="text-xs text-purple-600 mt-1">Requirement: Team management experience</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h4 className="text-xl font-bold mb-4">90-Day Action Plan</h4>
              <div className="space-y-3">
                {[
                  { task: 'Complete TypeScript certification', priority: 'High', timeline: '30 days' },
                  { task: 'Lead cross-functional project', priority: 'High', timeline: '60 days' },
                  { task: 'Start mentoring junior developer', priority: 'Medium', timeline: '45 days' },
                  { task: 'Present at tech talk/conference', priority: 'Medium', timeline: '90 days' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h5 className="font-semibold text-sm">{item.task}</h5>
                      <p className="text-xs text-gray-500">{item.timeline}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.priority === 'High' 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {item.priority}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h4 className="text-xl font-bold mb-4">Market Intelligence</h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h5 className="font-semibold text-green-800 text-sm">High Demand Alert</h5>
                  <p className="text-xs text-green-700">Tech Leads: +34% hiring increase this quarter</p>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h5 className="font-semibold text-blue-800 text-sm">Skill Trend</h5>
                  <p className="text-xs text-blue-700">React + Leadership combo: $12K premium</p>
                </div>
                
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <h5 className="font-semibold text-purple-800 text-sm">Company Match</h5>
                  <p className="text-xs text-purple-700">156 companies actively hiring your profile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'ai-chat': return <AIChat />;
      case 'interview-sim': return <InterviewSimulator />;
      case 'salary-intel': return <SalaryIntelligence />;
      case 'smart-templates': return <SmartTemplates />;
      case 'career-strategy': return <CareerStrategy />;
      default: return <AIChat />;
    }
  };

  const AIChat = () => {
    const quickActions = [
      "What's my market value?",
      "Should I negotiate salary?",
      "How do I get promoted?",
      "What skills should I learn?",
      "Practice interview questions",
      "Write networking email"
    ];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl">
          <h3 className="text-2xl font-bold mb-2">AI Career Intelligence</h3>
          <p className="text-blue-100">Advanced career guidance with real-time market data</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Live Metrics Sidebar */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h4 className="text-lg font-bold mb-4">Your Career Dashboard</h4>
            
            <div className="space-y-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">87</div>
                <div className="text-sm text-gray-600">Career Score</div>
                <div className="text-xs text-green-600">+3 this week</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Market Value</span>
                  <span className="font-semibold text-green-600">$118K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Skill Match</span>
                  <span className="font-semibold">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Promotion Ready</span>
                  <span className="font-semibold text-blue-600">74%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Network Score</span>
                  <span className="font-semibold">78%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-green-50 rounded-xl">
              <h5 className="font-semibold text-green-800 text-sm">Today's Insight</h5>
              <p className="text-xs text-green-700 mt-1">
                12 new job opportunities match your profile. Tech Lead positions up 34% this month.
              </p>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain size={24} />
                  <span className="font-semibold">Advanced AI Career Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Live Intelligence Active</span>
                </div>
              </div>
            </div>

            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-lg px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                    <div className="flex items-center justify-between mt-2 text-xs opacity-75">
                      <span>{message.timestamp}</span>
                      {message.type === 'assistant' && message.confidence && (
                        <div className="flex items-center gap-1">
                          <Brain size={12} />
                          <span>{message.confidence}% confidence</span>
                          {message.marketData && (
                            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
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
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-sm text-gray-600">AI analyzing market data...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 mb-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(action)}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-full transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about salary, career moves, skills, interviews, or request templates..."
                    className="w-full p-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                      isRecording ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button 
              onClick={navigateBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Dashboard</span>
            </button>
            
            <div className="flex items-center gap-3">
              <LaunchpadLogo size={40} />
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{userProfile.name}</p>
                <p className="text-xs text-gray-500">{userProfile.role}</p>
                <div className="text-xs text-green-600">Career Score: {userProfile.careerScore}</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Navigation Sidebar */}
          <div className="w-80 bg-white rounded-2xl shadow-lg p-6 h-fit">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">AI Career Intelligence</h2>
              <p className="text-sm text-gray-600">Advanced career guidance with market intelligence</p>
            </div>
            
            <nav className="space-y-2 mb-8">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      activeModule === module.id
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200'
                        : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className={`p-2 rounded-lg ${
                          activeModule === module.id ? 'bg-white shadow-sm' : 'bg-gray-100'
                        }`}
                        style={{ color: module.color }}
                      >
                        <Icon size={20} />
                      </div>
                      <span className={`font-semibold ${
                        activeModule === module.id ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {module.name}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      activeModule === module.id ? 'text-gray-600' : 'text-gray-500'
                    }`}>
                      {module.description}
                    </p>
                  </button>
                );
              })}
            </nav>

            {/* Live Market Stats */}
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <h3 className="font-semibold">Live Market Intel</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Your Market Value</span>
                  <span className="font-bold">${userProfile.marketValue/1000}K</span>
                </div>
                <div className="flex justify-between">
                  <span>Open Opportunities</span>
                  <span className="font-bold">156</span>
                </div>
                <div className="flex justify-between">
                  <span>Salary Growth</span>
                  <span className="font-bold text-green-300">+12%</span>
                </div>
                <div className="flex justify-between">
                  <span>Skill Demand</span>
                  <span className="font-bold">High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {renderModule()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAICareerAssistant;
