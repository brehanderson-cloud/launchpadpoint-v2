import React, { useState } from 'react';
import { 
  FileText, TrendingUp, Brain, MessageSquare, DollarSign, Users
} from 'lucide-react';

const AIChatSidebar = ({ aiChatOpen, setAiChatOpen, selectedAIOverride, setSelectedAIOverride }) => {
  const [selectedAI, setSelectedAI] = useState(selectedAIOverride || 'resume');
  // Keep selectedAI in sync with override from parent
  React.useEffect(() => {
    if (selectedAIOverride && selectedAIOverride !== selectedAI) {
      setSelectedAI(selectedAIOverride);
    }
  }, [selectedAIOverride, selectedAI]);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  // const { resumeData } = useResume();

  const aiSpecialists = {
    resume: {
      name: 'ResumeAI',
      icon: FileText,
      description: 'Resume optimization and ATS scoring',
      color: 'from-blue-400 via-blue-500 to-indigo-600',
      specialty: 'Resume & Cover Letters'
    },
    career: {
      name: 'CareerAI',
      icon: TrendingUp,
      description: 'Career progression and strategy',
      color: 'from-purple-400 via-purple-500 to-indigo-600',
      specialty: 'Career Development'
    },
    skills: {
      name: 'SkillsAI',
      icon: Brain,
      description: 'Skills gap analysis and learning paths',
      color: 'from-cyan-400 via-blue-500 to-purple-600',
      specialty: 'Skill Development'
    },
    interview: {
      name: 'InterviewAI',
      icon: MessageSquare,
      description: 'Interview preparation and practice',
      color: 'from-indigo-400 via-purple-500 to-pink-500',
      specialty: 'Interview Coaching'
    },
    salary: {
      name: 'SalaryAI',
      icon: DollarSign,
      description: 'Salary negotiation and market rates',
      color: 'from-blue-500 via-indigo-500 to-purple-600',
      specialty: 'Compensation Analysis'
    },
    network: {
      name: 'NetworkAI',
      icon: Users,
      description: 'Professional networking and connections',
      color: 'from-purple-500 via-indigo-500 to-blue-600',
      specialty: 'Professional Networking'
    }
  };

  const getAIResponse = (specialist, message) => {
    const responses = {
      resume: [
        "Your resume shows strong technical skills. I recommend adding specific metrics to quantify your impact - like 'reduced load times by 40%' instead of just 'optimized performance'.",
        "I notice you're missing some trending keywords. Adding 'microservices', 'containerization', and 'cloud architecture' could boost your ATS score by 15%.",
        "Your experience section is solid, but consider reordering to lead with your most impressive achievements. Put the CI/CD pipeline success first."
      ],
      career: [
        "Based on market trends, Senior Engineers with your background are transitioning to Technical Lead roles with 25-35% salary increases. Should we explore that path?",
        "I see 3 high-growth companies in your area actively hiring. Netflix, Stripe, and Airbnb all match your profile 90%+. Want me to analyze their requirements?",
        "Your career trajectory suggests you're ready for Staff Engineer level. The average timeline is 6-8 years, and you're at 6 years. Let's discuss positioning strategies."
      ],
      skills: [
        "Your skill portfolio is 92% aligned with market demands. The gaps I see are: GraphQL (high demand), TypeScript (growing 40% YoY), and System Design (critical for senior roles).",
        "Based on job postings analysis, adding React Native could open 40% more opportunities in your salary range. It typically takes 2-3 months to become proficient.",
        "I recommend focusing on cloud architecture next. AWS Solutions Architect certification shows 30% higher salary potential for your role level."
      ],
      interview: [
        "Let's practice system design questions. Start with this: 'Design a URL shortener like bit.ly that handles 100M requests per day.' Walk me through your approach.",
        "For behavioral questions, prepare STAR examples for: leadership under pressure, technical disagreements, and project failures. These come up in 90% of senior engineer interviews.",
        "Technical deep-dives often focus on your CI/CD experience. Be ready to explain architecture decisions, scaling challenges, and how you measured success."
      ],
      salary: [
        "Your current market value is $118K, but based on skills and experience, you could command $140-160K. The gap is mainly in negotiation positioning and company targeting.",
        "I see you're underpaid by 15-20% compared to market rates. Companies like Stripe, Airbnb, and Netflix pay 20-40% above market for your skill level.",
        "Salary negotiation tip: Lead with value, not need. Prepare 3 specific examples of how you've saved/made money for previous employers. Quantify the impact."
      ],
      network: [
        "I found 12 second-degree connections at your target companies. Sarah Chen (Google), Mike Rodriguez (Netflix), and David Kim (Stripe) all work in engineering leadership.",
        "Your LinkedIn presence could be stronger. Adding technical articles and engaging with industry content typically increases recruiter outreach by 3x.",
        "Consider attending React Conf 2024 and AWS re:Invent. 70% of senior engineers find opportunities through conference networking rather than cold applications."
      ]
    };
    
    return responses[specialist][Math.floor(Math.random() * responses[specialist].length)];
  };

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessage = {
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    const aiResponse = {
      type: 'ai',
      specialist: selectedAI,
      content: getAIResponse(selectedAI, currentMessage),
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newMessage, aiResponse]);
    setCurrentMessage('');
  };

  return (
    <div className={`fixed right-0 top-16 bottom-0 w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 transform transition-transform z-40 chat-slide ${
      aiChatOpen ? 'translate-x-0' : 'translate-x-full'
    } shadow-2xl`}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">AI Career Specialists</h3>
            <p className="text-sm text-gray-500">Get personalized career guidance</p>
          </div>
          <button
            onClick={() => setAiChatOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(aiSpecialists).map(([key, ai]) => {
            const IconComponent = ai.icon;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedAI(key);
                  if (setSelectedAIOverride) setSelectedAIOverride(key);
                }}
                className={`p-4 rounded-xl text-left transition-all ${
                  selectedAI === key
                    ? `bg-gradient-to-r ${ai.color} text-white shadow-lg transform scale-105`
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <IconComponent className="w-6 h-6 mb-2" />
                <div className="text-sm font-medium">{ai.name}</div>
                <div className="text-xs opacity-75 mt-1">{ai.specialty}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
        {chatMessages.length === 0 && (
          <div className="text-center py-8">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${aiSpecialists[selectedAI].color} flex items-center justify-center`}>
              {React.createElement(aiSpecialists[selectedAI].icon, { className: "w-8 h-8 text-white" })}
            </div>
            <h4 className="font-medium mb-2">Hi! I'm {aiSpecialists[selectedAI].name}</h4>
            <p className="text-sm text-gray-500">{aiSpecialists[selectedAI].description}</p>
            <div className="mt-4 space-y-2">
              <button 
                onClick={() => setCurrentMessage("How can I improve my resume?")}
                className="w-full text-left p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                💡 How can I improve my resume?
              </button>
              <button 
                onClick={() => setCurrentMessage("What's my market value?")}
                className="w-full text-left p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                💰 What's my current market value?
              </button>
            </div>
          </div>
        )}
        
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-sm p-4 rounded-xl ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
              }`}
            >
              {message.type === 'ai' && (
                <div className="text-xs opacity-70 mb-2 flex items-center space-x-2">
                  <span>{aiSpecialists[message.specialist].name}</span>
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                </div>
              )}
              <div className="text-sm leading-relaxed">{message.content}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-3">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={`Ask ${aiSpecialists[selectedAI].name} anything...`}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatSidebar;
