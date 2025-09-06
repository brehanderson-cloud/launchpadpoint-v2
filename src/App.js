import React, { useState, useEffect } from 'react';
import { Users, Brain, FileText, Briefcase, Download, Moon, Sun, Type, Sparkles, MessageSquare, BarChart3, Zap, Target, TrendingUp, CheckCircle, AlertCircle, Lightbulb, Rocket, Star, Eye, Edit3, RefreshCw, DollarSign, Calendar, Clock, Bell, Award, Shield, Settings, User, Home, Search, Plus, ArrowUp, ArrowRight, Activity, Globe, MapPin, Phone, Mail, Building, Bookmark, Filter, SortAsc } from 'lucide-react';

const LaunchpadPoint = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [dyslexiaMode, setDyslexiaMode] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [selectedAI, setSelectedAI] = useState('resume');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [careerScore, setCareerScore] = useState(87);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [notifications, setNotifications] = useState(3);

  // Enhanced user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    title: 'Senior Software Engineer',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    avatar: 'JD',
    careerIntelligence: {
      overall: 87,
      skills: 92,
      market: 89,
      complete: 78,
      weeklyChange: 5
    },
    marketValue: 118000,
    monthlyIncrease: 3000,
    opportunities: 156,
    newToday: 12,
    experience: 6,
    applications: 8,
    interviews: 3,
    offers: 1
  });

  // Resume data state
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: 'John Doe',
      jobTitle: 'Senior Software Engineer',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      location: 'San Francisco, CA',
      summary: 'Experienced software engineer with 5+ years of expertise in developing scalable web applications and leading development teams. Strong problem-solving skills and passion for clean code architecture.'
    },
    experience: [{
      company: 'Tech Innovations Inc.',
      position: 'Senior Software Engineer',
      startDate: '2020-01',
      endDate: '2023-08',
      description: '• Led a team of 5 developers in creating a new SaaS product\n• Improved system performance by 40% through optimization\n• Implemented CI/CD pipeline reducing deployment time by 60%'
    }],
    education: [{
      institution: 'Stanford University',
      degree: 'Master of Science in Computer Science',
      graduationDate: '2018-05',
      gpa: '3.9/4.0',
      achievements: '• Graduated with honors\n• Published research on machine learning algorithms\n• President of Computer Science Club'
    }],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS', 'Docker', 'Kubernetes', 'Team Leadership', 'Agile Methodologies'],
    jobDescription: 'We are looking for a Senior Software Engineer with 5+ years of experience in JavaScript, React, and Node.js. The ideal candidate will have experience leading teams and working with cloud technologies like AWS. Experience with DevOps practices and CI/CD pipelines is a plus.'
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [jobAlerts, setJobAlerts] = useState([
    {
      id: 1,
      title: 'Senior React Developer at TechCorp',
      match: 94,
      salary: '$145k-165k',
      location: 'San Francisco, CA',
      posted: '2 hours ago',
      urgent: true
    },
    {
      id: 2,
      title: 'Full Stack Engineer at StartupX',
      match: 89,
      salary: '$130k-150k',
      location: 'Remote',
      posted: '4 hours ago',
      urgent: false
    },
    {
      id: 3,
      title: 'Technical Lead at BigTech',
      match: 91,
      salary: '$160k-180k',
      location: 'Seattle, WA',
      posted: '1 day ago',
      urgent: false
    }
  ]);

  const [marketInsights, setMarketInsights] = useState([
    {
      type: 'salary',
      title: 'Salary Increase Detected',
      description: 'React developers saw 15% salary increase this month',
      time: '4 hours ago',
      trend: 'up',
      action: 'Update Rate'
    },
    {
      type: 'skill',
      title: 'Trending Skill Alert',
      description: 'Next.js demand increased 40% in your area',
      time: '6 hours ago',
      trend: 'hot',
      action: 'Learn More'
    },
    {
      type: 'opportunity',
      title: 'New Company Hiring',
      description: 'Microsoft opened 12 new positions matching your profile',
      time: '1 day ago',
      trend: 'new',
      action: 'View Jobs'
    }
  ]);

  // AI Specialists with enhanced capabilities
  const aiSpecialists = {
    resume: {
      name: 'ResumeAI',
      icon: FileText,
      description: 'Resume optimization and ATS scoring',
      color: 'from-blue-500 to-cyan-500',
      specialty: 'Resume & Cover Letters'
    },
    career: {
      name: 'CareerAI',
      icon: TrendingUp,
      description: 'Career progression and strategy',
      color: 'from-purple-500 to-pink-500',
      specialty: 'Career Development'
    },
    skills: {
      name: 'SkillsAI',
      icon: Brain,
      description: 'Skills gap analysis and learning paths',
      color: 'from-green-500 to-emerald-500',
      specialty: 'Skill Development'
    },
    interview: {
      name: 'InterviewAI',
      icon: MessageSquare,
      description: 'Interview preparation and practice',
      color: 'from-orange-500 to-red-500',
      specialty: 'Interview Coaching'
    },
    salary: {
      name: 'SalaryAI',
      icon: DollarSign,
      description: 'Salary negotiation and market rates',
      color: 'from-yellow-500 to-orange-500',
      specialty: 'Compensation Analysis'
    },
    network: {
      name: 'NetworkAI',
      icon: Users,
      description: 'Professional networking and connections',
      color: 'from-indigo-500 to-purple-500',
      specialty: 'Professional Networking'
    }
  };

  // Enhanced AI responses
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

  const exportResume = () => {
    const resumeContent = `
${resumeData.personal.fullName}
${resumeData.personal.jobTitle}
${resumeData.personal.email} | ${resumeData.personal.phone} | ${resumeData.personal.location}

SUMMARY
${resumeData.personal.summary}

SKILLS
${resumeData.skills.join(', ')}

EXPERIENCE
${resumeData.experience.map(exp => `
${exp.position} at ${exp.company}
${exp.startDate} - ${exp.endDate}
${exp.description}
`).join('\n')}

EDUCATION
${resumeData.education.map(edu => `
${edu.degree}
${edu.institution} - ${edu.graduationDate}
GPA: ${edu.gpa}
${edu.achievements}
`).join('\n')}
    `;

    const element = document.createElement('a');
    const file = new Blob([resumeContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${resumeData.personal.fullName.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Navigation Component
  const Navigation = () => (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LaunchpadPoint
                </span>
                <div className="text-xs text-gray-500">Career Intelligence Platform</div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {[
              { key: 'dashboard', label: 'Dashboard', icon: Home },
              { key: 'builder', label: 'Resume', icon: FileText },
              { key: 'jobs', label: 'Jobs', icon: Briefcase },
              { key: 'analytics', label: 'Analytics', icon: BarChart3 },
              { key: 'network', label: 'Network', icon: Users }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setCurrentPage(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                  currentPage === key
                    ? 'bg-blue-500 text-white shadow-lg'
                    : darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setNotifications(0)}
              className={`relative p-2 rounded-lg transition-all ${
                darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-all ${
                darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="flex items-center space-x-3 pl-3 border-l border-gray-300 dark:border-gray-600">
              <div className="text-right">
                <div className="text-sm font-medium">{userData.name}</div>
                <div className="text-xs text-gray-500">{userData.title}</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                {userData.avatar}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  // Enhanced AI Chat Sidebar
  const AIChatSidebar = () => (
    <div className={`fixed right-0 top-16 bottom-0 w-96 ${darkMode ? 'bg-gray-900' : 'bg-white'} border-l ${darkMode ? 'border-gray-700' : 'border-gray-200'} transform transition-transform z-40 ${
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
                onClick={() => setSelectedAI(key)}
                className={`p-4 rounded-xl text-left transition-all ${
                  selectedAI === key
                    ? `bg-gradient-to-r ${ai.color} text-white shadow-lg transform scale-105`
                    : darkMode
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-gray-50 hover:bg-gray-100'
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
                  : darkMode
                  ? 'bg-gray-800 text-gray-200'
                  : 'bg-gray-100 text-gray-800'
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
            className={`flex-1 px-4 py-3 rounded-xl border ${
              darkMode
                ? 'bg-gray-800 border-gray-600 text-white'
                : 'bg-white border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
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

  // Dashboard Page
  const DashboardPage = () => (
    <div className="space-y-8">
      {/* Career Intelligence Score - Main Hero */}
      <div className={`${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-500 to-purple-600'} rounded-2xl p-8 text-white shadow-2xl`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Career Intelligence Score</h2>
            <p className="text-blue-100">Your comprehensive career performance metric</p>
          </div>
          <div className="text-right">
            <div className="text-6xl font-bold">{userData.careerIntelligence.overall}</div>
            <div className="text-lg text-green-300 flex items-center justify-end">
              <ArrowUp className="w-5 h-5 mr-1" />
              +{userData.careerIntelligence.weeklyChange} this week
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{userData.careerIntelligence.skills}%</div>
            <div className="text-blue-200">Skills</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{userData.careerIntelligence.market}%</div>
            <div className="text-blue-200">Market</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{userData.careerIntelligence.complete}%</div>
            <div className="text-blue-200">Complete</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Market Value & Opportunities */}
        <div className="grid grid-cols-2 gap-6">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-500" />
              <span className="text-sm text-green-600 font-medium">+${userData.monthlyIncrease.toLocaleString()} this month</span>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">
              ${userData.marketValue.toLocaleString()}K
            </div>
            <div className="text-gray-500">Market Value</div>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <Briefcase className="w-8 h-8 text-blue-500" />
              <span className="text-sm text-blue-600 font-medium">{userData.newToday} new today</span>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {userData.opportunities}
            </div>
            <div className="text-gray-500">Opportunities</div>
          </div>
        </div>

        {/* Live Career Insights */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Activity className="w-6 h-6 text-purple-500" />
              <h3 className="text-lg font-semibold">Live Career Insights</h3>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600">Live</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {marketInsights.slice(0, 3).map((insight, index) => (
              <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} hover:shadow-md transition-all cursor-pointer`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{insight.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{insight.description}</p>
                    <span className="text-xs text-gray-500">{insight.time}</span>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                    {insight.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High-Priority Job Alerts */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold flex items-center space-x-3">
            <Bell className="w-6 h-6 text-orange-500" />
            <span>High-Match Job Alerts</span>
          </h3>
          <button className="text-blue-500 hover:text-blue-600 font-medium">View All</button>
        </div>
        
        <div className="space-y-4">
          {jobAlerts.map(alert => (
            <div key={alert.id} className={`p-5 rounded-xl border-l-4 ${
              alert.urgent ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            } hover:shadow-md transition-all`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-lg">{alert.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      alert.match >= 90 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {alert.match}% match
                    </span>
                    {alert.urgent && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                        URGENT
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{alert.salary}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{alert.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{alert.posted}</span>
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                    Apply Now
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => setCurrentPage('builder')}
          className={`${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
        >
          <FileText className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Create Resume</h3>
          <p className="text-sm opacity-90">Build your professional resume with AI guidance</p>
        </button>

        <button 
          onClick={() => setAiChatOpen(true)}
          className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
        >
          <MessageSquare className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Ask AI Assistant</h3>
          <p className="text-sm opacity-90">Get personalized career advice from experts</p>
        </button>

        <button 
          onClick={() => setCurrentPage('jobs')}
          className={`${darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
        >
          <Search className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Search Jobs</h3>
          <p className="text-sm opacity-90">Find opportunities that match your profile</p>
        </button>
      </div>
    </div>
  );

  // Jobs Page
  const JobsPage = () => (
    <div className="space-y-8">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Job Opportunities</h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <SortAsc className="w-4 h-4" />
              <span>Sort</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {[
              { company: 'Google', role: 'Senior Software Engineer', match: 95, salary: '$180k-220k', location: 'Mountain View, CA', posted: '2 hours ago', remote: false },
              { company: 'Meta', role: 'Full Stack Engineer', match: 92, salary: '$170k-210k', location: 'Menlo Park, CA', posted: '4 hours ago', remote: true },
              { company: 'Netflix', role: 'Platform Engineer', match: 88, salary: '$190k-240k', location: 'Los Gatos, CA', posted: '1 day ago', remote: false },
              { company: 'Airbnb', role: 'Technical Lead', match: 85, salary: '$175k-225k', location: 'San Francisco, CA', posted: '2 days ago', remote: true },
              { company: 'Stripe', role: 'Senior Engineer', match: 82, salary: '$165k-200k', location: 'San Francisco, CA', posted: '3 days ago', remote: false }
            ].map((job, index) => (
              <div key={index} className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6 hover:shadow-lg transition-all`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold">{job.role}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        job.match >= 90 ? 'bg-green-100 text-green-800' :
                        job.match >= 80 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {job.match}% match
                      </span>
                      {job.remote && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          Remote
                        </span>
                      )}
                    </div>
                    <p className="text-lg font-medium text-blue-600 mb-3">{job.company}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.posted}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Looking for an experienced software engineer to join our growing team. You'll work on scalable systems serving millions of users...
                </p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'AWS', 'Docker', 'GraphQL'].map(skill => (
                    <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="font-semibold mb-4">Job Search Tips</h3>
              <ul className="text-sm space-y-2">
                <li>• Customize your resume for each application</li>
                <li>• Research company culture and values</li>
                <li>• Practice common interview questions</li>
                <li>• Network with current employees</li>
              </ul>
            </div>

            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className="font-semibold mb-4">Application Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Applied:</span>
                  <span className="font-medium">{userData.applications}</span>
                </div>
                <div className="flex justify-between">
                  <span>Interviews:</span>
                  <span className="font-medium">{userData.interviews}</span>
                </div>
                <div className="flex justify-between">
                  <span>Offers:</span>
                  <span className="font-medium text-green-600">{userData.offers}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Resume Builder
  const BuilderPage = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center space-x-3">
            <Edit3 className="w-6 h-6" />
            <span>Build Your Resume</span>
          </h2>
          <button
            onClick={() => setAiChatOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Help</span>
          </button>
        </div>

        <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {['personal', 'experience', 'education', 'skills'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md transition-all capitalize ${
                activeTab === tab
                  ? 'bg-white dark:bg-gray-600 shadow-sm'
                  : 'hover:bg-white/50 dark:hover:bg-gray-600/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={resumeData.personal.fullName}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  personal: { ...prev.personal, fullName: e.target.value }
                }))}
                className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Professional Title</label>
              <input
                type="text"
                value={resumeData.personal.jobTitle}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  personal: { ...prev.personal, jobTitle: e.target.value }
                }))}
                className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={resumeData.personal.email}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personal: { ...prev.personal, email: e.target.value }
                  }))}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={resumeData.personal.phone}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personal: { ...prev.personal, phone: e.target.value }
                  }))}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Professional Summary</label>
              <textarea
                rows={4}
                value={resumeData.personal.summary}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  personal: { ...prev.personal, summary: e.target.value }
                }))}
                className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Skills (comma separated)</label>
              <textarea
                rows={4}
                value={resumeData.skills.join(', ')}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                }))}
                className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <button
              onClick={() => {
                setIsAnalyzing(true);
                setTimeout(() => {
                  setCareerScore(Math.min(95, careerScore + Math.floor(Math.random() * 5)));
                  setIsAnalyzing(false);
                }, 2000);
              }}
              disabled={isAnalyzing}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Analyze with AI</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 sticky top-24 max-h-screen overflow-y-auto`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center space-x-3">
            <Eye className="w-6 h-6" />
            <span>Live Preview</span>
          </h2>
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              careerScore >= 90 ? 'bg-green-100 text-green-800' :
              careerScore >= 80 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {careerScore}% ATS Score
            </div>
            <button 
              onClick={exportResume}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-6 rounded-lg`}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">{resumeData.personal.fullName}</h2>
            <p className="text-lg text-blue-600 mb-2">{resumeData.personal.jobTitle}</p>
            <p className="text-sm text-gray-600">
              {resumeData.personal.email} • {resumeData.personal.phone} • {resumeData.personal.location}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-300">Summary</h3>
              <p className="text-sm leading-relaxed">{resumeData.personal.summary}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-300">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    } ${dyslexiaMode ? 'font-mono' : 'font-sans'}`}>
      <Navigation />
      
      <main className={`pt-20 pb-8 px-4 max-w-7xl mx-auto transition-all ${aiChatOpen ? 'mr-96' : ''}`}>
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'builder' && <BuilderPage />}
        {currentPage === 'jobs' && <JobsPage />}
        {currentPage === 'analytics' && <div className="text-center py-20"><h2 className="text-2xl font-bold">Analytics Dashboard Coming Soon</h2></div>}
        {currentPage === 'network' && <div className="text-center py-20"><h2 className="text-2xl font-bold">Professional Network Coming Soon</h2></div>}
      </main>

      <AIChatSidebar />

      {!aiChatOpen && (
        <button
          onClick={() => setAiChatOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50 hover:scale-110"
        >
          <Sparkles className="w-7 h-7" />
        </button>
      )}
    </div>
  );
};

export default LaunchpadPoint;
