import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, Brain, Target, TrendingUp, Users, Zap, Star, ChevronRight, Play, Mic, MicOff, Camera, Upload, Download, Share2, BarChart3, Globe, Award, Lightbulb, MessageSquare, Video, Calendar, FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const NextGenCareerPlatform = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isRecording, setIsRecording] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Johnson',
    currentRole: 'Senior Software Engineer',
    experience: '5 years',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Leadership'],
    goals: ['Senior Engineering Manager', 'Tech Lead', 'Startup CTO']
  });

  // Accurate LaunchpadPoint logo from your screenshot
  const LaunchpadLogo = ({ size = 32, className = "" }) => (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div 
        style={{ 
          width: size, 
          height: size,
          background: 'linear-gradient(135deg, #1E90FF 0%, #4169E1 50%, #8A2BE2 100%)',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          borderRadius: '6px 6px 50% 50%',
          position: 'relative',
          transform: 'rotate(-45deg)'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '35%',
          left: '35%',
          width: '30%',
          height: '30%',
          background: '#00BFFF',
          borderRadius: '50%',
          transform: 'rotate(45deg)'
        }}></div>
      </div>
    </div>
  );

  const modules = [
    {
      id: 'dashboard',
      name: 'AI Career Dashboard',
      icon: Brain,
      description: 'Intelligent career insights powered by real-time market data',
      color: '#667eea'
    },
    {
      id: 'interview-sim',
      name: 'Live Interview Simulator',
      icon: Video,
      description: 'AI-powered mock interviews with real-time feedback',
      color: '#f093fb'
    },
    {
      id: 'market-intel',
      name: 'Market Intelligence',
      icon: TrendingUp,
      description: 'Real-time salary data, hiring trends, and opportunity mapping',
      color: '#4facfe'
    },
    {
      id: 'smart-networking',
      name: 'Smart Networking Hub',
      icon: Users,
      description: 'AI-matched connections and relationship intelligence',
      color: '#43e97b'
    },
    {
      id: 'skills-predictor',
      name: 'Future Skills Predictor',
      icon: Zap,
      description: 'Predict and prepare for tomorrow\'s in-demand skills',
      color: '#fa709a'
    },
    {
      id: 'career-copilot',
      name: 'Career Copilot',
      icon: Target,
      description: 'Personalized career strategy with predictive analytics',
      color: '#ffecd2'
    }
  ];

  const CareerDashboard = () => {
    const [insights, setInsights] = useState([]);
    
    useEffect(() => {
      // Simulate real-time insights
      const mockInsights = [
        {
          type: 'opportunity',
          title: 'High-Match Job Alert',
          content: 'Senior React Developer at TechCorp matches 94% of your profile',
          urgency: 'high',
          action: 'View Details'
        },
        {
          type: 'market',
          title: 'Salary Increase Detected',
          content: 'React developers in your area saw 15% salary increase this month',
          urgency: 'medium',
          action: 'Update Rate'
        },
        {
          type: 'skill',
          title: 'Trending Skill Alert',
          content: 'TypeScript demand up 40% - Add to your profile?',
          urgency: 'low',
          action: 'Learn More'
        }
      ];
      setInsights(mockInsights);
    }, []);

    return (
      <div className="space-y-6">
        {/* Real-time Career Score */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold">Career Intelligence Score</h3>
              <p className="text-blue-100">Real-time marketability analysis</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">87</div>
              <div className="text-sm text-blue-100">+5 this week</div>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Skills Relevance</span>
              <span>92%</span>
            </div>
            <div className="w-full bg-blue-400 bg-opacity-30 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{width: '92%'}}></div>
            </div>
            
            <div className="flex justify-between">
              <span>Market Demand</span>
              <span>89%</span>
            </div>
            <div className="w-full bg-blue-400 bg-opacity-30 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{width: '89%'}}></div>
            </div>
            
            <div className="flex justify-between">
              <span>Profile Completeness</span>
              <span>78%</span>
            </div>
            <div className="w-full bg-blue-400 bg-opacity-30 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{width: '78%'}}></div>
            </div>
          </div>
        </div>

        {/* Live Insights Feed */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="text-purple-500" size={24} />
            <h3 className="text-xl font-bold">Live Career Insights</h3>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">Real-time</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    insight.urgency === 'high' ? 'bg-red-100 text-red-600' :
                    insight.urgency === 'medium' ? 'bg-orange-100 text-orange-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {insight.type === 'opportunity' ? <Target size={16} /> :
                     insight.type === 'market' ? <TrendingUp size={16} /> :
                     <Zap size={16} />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{insight.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{insight.content}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    {insight.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Predictive Career Path */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Predicted Career Trajectory</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div>
                <h4 className="font-semibold">Current: Senior Software Engineer</h4>
                <p className="text-gray-600 text-sm">$95K-$120K • 87% market fit</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 opacity-75">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="text-blue-600" size={20} />
              </div>
              <div>
                <h4 className="font-semibold">Next 12-18 months: Tech Lead</h4>
                <p className="text-gray-600 text-sm">$125K-$155K • 92% probability</p>
                <p className="text-blue-600 text-xs">Required: Leadership certification</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 opacity-50">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Star className="text-purple-600" size={20} />
              </div>
              <div>
                <h4 className="font-semibold">3-5 years: Engineering Manager</h4>
                <p className="text-gray-600 text-sm">$150K-$200K • 78% probability</p>
                <p className="text-purple-600 text-xs">Required: MBA or equivalent experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const InterviewSimulator = () => {
    const [isInterviewActive, setIsInterviewActive] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [interviewMode, setInterviewMode] = useState('behavioral');

    const questions = {
      behavioral: [
        "Tell me about a time you had to work with a difficult team member.",
        "Describe a situation where you had to learn a new technology quickly.",
        "Give me an example of when you had to make a decision with incomplete information."
      ],
      technical: [
        "Explain the difference between REST and GraphQL APIs.",
        "How would you optimize a React application's performance?",
        "Design a system to handle 1 million concurrent users."
      ]
    };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl">
          <h3 className="text-2xl font-bold mb-2">AI Interview Simulator</h3>
          <p className="text-purple-100">Practice with AI that learns from real interview patterns</p>
        </div>

        {!isInterviewActive ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h4 className="text-xl font-bold mb-4">Interview Types</h4>
              <div className="space-y-3">
                {['Behavioral', 'Technical', 'System Design', 'Leadership', 'Case Study'].map((type, index) => (
                  <button
                    key={index}
                    onClick={() => setInterviewMode(type.toLowerCase())}
                    className={`w-full p-3 text-left rounded-xl border-2 transition-all ${
                      interviewMode === type.toLowerCase() 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-semibold">{type} Interview</div>
                    <div className="text-sm text-gray-600">
                      {type === 'Behavioral' ? 'STAR method practice' :
                       type === 'Technical' ? 'Coding & architecture' :
                       type === 'System Design' ? 'Scalability & design' :
                       type === 'Leadership' ? 'Team management scenarios' :
                       'Business problem solving'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h4 className="text-xl font-bold mb-4">AI Features</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Video className="text-blue-500 mt-1" size={20} />
                  <div>
                    <h5 className="font-semibold">Real-time Video Analysis</h5>
                    <p className="text-sm text-gray-600">Body language, eye contact, speaking pace</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mic className="text-green-500 mt-1" size={20} />
                  <div>
                    <h5 className="font-semibold">Speech Pattern Analysis</h5>
                    <p className="text-sm text-gray-600">Filler words, confidence level, clarity</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Brain className="text-purple-500 mt-1" size={20} />
                  <div>
                    <h5 className="font-semibold">Content Quality Scoring</h5>
                    <p className="text-sm text-gray-600">Answer structure, relevance, completeness</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsInterviewActive(true)}
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center gap-2">
                  <Play size={20} />
                  Start AI Interview
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Interview Interface */}
            <div className="bg-gray-900 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Live Interview - Question {currentQuestion + 1}/3</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`p-2 rounded-lg ${isRecording ? 'bg-red-600' : 'bg-gray-600'}`}
                  >
                    {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                  </button>
                  <button
                    onClick={() => setIsInterviewActive(false)}
                    className="px-4 py-2 bg-gray-600 rounded-lg text-sm"
                  >
                    End Interview
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Brain className="text-white" size={32} />
                </div>
                <h4 className="text-xl font-bold text-gray-800">AI Interviewer</h4>
                <p className="text-gray-600">Senior Engineering Manager at TechCorp</p>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl mb-6">
                <h5 className="font-semibold mb-3">Interview Question:</h5>
                <p className="text-lg leading-relaxed">
                  {questions[interviewMode] ? questions[interviewMode][currentQuestion] : 
                   "Tell me about a challenging project you've worked on recently."}
                </p>
              </div>

              {/* Real-time feedback */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-green-600">Good</div>
                  <div className="text-sm text-gray-600">Eye Contact</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-orange-600">Moderate</div>
                  <div className="text-sm text-gray-600">Speaking Pace</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-blue-600">Strong</div>
                  <div className="text-sm text-gray-600">Confidence</div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentQuestion(Math.min(currentQuestion + 1, 2))}
                  className="flex-1 bg-blue-600 text-white p-3 rounded-xl font-semibold"
                  disabled={currentQuestion >= 2}
                >
                  Next Question
                </button>
                <button className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:border-gray-400">
                  Get Hint
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const MarketIntelligence = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-2xl">
          <h3 className="text-2xl font-bold mb-2">Market Intelligence Hub</h3>
          <p className="text-green-100">Real-time career market analysis and predictions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Salary Trends */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h4 className="text-xl font-bold mb-4">Salary Intelligence</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                <div>
                  <h5 className="font-semibold">Your Current Market Value</h5>
                  <p className="text-2xl font-bold text-green-600">$115,000</p>
                  <p className="text-sm text-gray-600">+$8K from last quarter</p>
                </div>
                <TrendingUp className="text-green-600" size={32} />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">25th Percentile</span>
                  <span className="font-semibold">$95K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">50th Percentile</span>
                  <span className="font-semibold">$115K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">75th Percentile</span>
                  <span className="font-semibold">$135K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">90th Percentile</span>
                  <span className="font-semibold">$155K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hot Skills */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h4 className="text-xl font-bold mb-4">Trending Skills</h4>
            <div className="space-y-3">
              {[
                { skill: 'TypeScript', demand: '+45%', salary: '+$12K' },
                { skill: 'Kubernetes', demand: '+38%', salary: '+$15K' },
                { skill: 'GraphQL', demand: '+32%', salary: '+$8K' },
                { skill: 'Next.js', demand: '+28%', salary: '+$6K' },
                { skill: 'Terraform', demand: '+25%', salary: '+$10K' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                  <div>
                    <h5 className="font-semibold">{item.skill}</h5>
                    <p className="text-sm text-gray-600">Demand {item.demand}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-semibold">{item.salary}</div>
                    <div className="text-xs text-gray-500">avg. increase</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Intelligence */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h4 className="text-xl font-bold mb-4">Company Intelligence</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { company: 'TechCorp', score: 94, hiring: 'Actively Hiring', culture: 4.8 },
              { company: 'DataFlow Inc', score: 89, hiring: '12 Open Roles', culture: 4.6 },
              { company: 'CloudNative', score: 86, hiring: 'Limited Openings', culture: 4.4 }
            ].map((company, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-semibold">{company.company}</h5>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{company.score}</div>
                    <div className="text-xs text-gray-500">Match Score</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={company.hiring === 'Actively Hiring' ? 'text-green-600' : 'text-orange-600'}>
                      {company.hiring}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Culture:</span>
                    <span className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-current" size={12} />
                      {company.culture}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const SmartNetworking = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-6 rounded-2xl">
          <h3 className="text-2xl font-bold mb-2">Smart Networking Hub</h3>
          <p className="text-blue-100">AI-powered relationship intelligence and networking strategies</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Connection Recommendations */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h4 className="text-xl font-bold mb-4">Recommended Connections</h4>
            <div className="space-y-4">
              {[
                { 
                  name: 'Sarah Chen', 
                  role: 'Senior Engineering Manager at Google', 
                  mutual: 3, 
                  reason: 'Similar career path',
                  score: 95 
                },
                { 
                  name: 'Marcus Rodriguez', 
                  role: 'Tech Lead at Microsoft', 
                  mutual: 7, 
                  reason: 'Shared interests in React',
                  score: 89 
                },
                { 
                  name: 'Emily Watson', 
                  role: 'VP Engineering at Stripe', 
                  mutual: 2, 
                  reason: 'Next career level',
                  score: 87 
                }
              ].map((person, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h5 className="font-semibold">{person.name}</h5>
                        <p className="text-sm text-gray-600">{person.role}</p>
                        <p className="text-xs text-blue-600">{person.mutual} mutual connections</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{person.score}%</div>
                      <div className="text-xs text-gray-500">Match</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {person.reason}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Networking Insights */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h4 className="text-xl font-bold mb-4">Network Analytics</h4>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold">Network Strength</h5>
                  <div className="text-2xl font-bold text-blue-600">7.8</div>
                </div>
                <p className="text-sm text-gray-600">Above average network diversity and engagement</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <div className="text-xl font-bold text-green-600">124</div>
                  <div className="text-sm text-gray-600">Industry Connections</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-xl">
                  <div className="text-xl font-bold text-purple-600">18</div>
                  <div className="text-sm text-gray-600">Hiring Managers</div>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-semibold">Engagement Opportunities</h5>
                {[
                  { action: 'React Conference 2024', type: 'Event', date: 'Next Week' },
                  { action: 'Sarah Chen posted about React', type: 'Post', date: '2 hours ago' },
                  { action: 'Tech Leadership Meetup', type: 'Meetup', date: 'This Friday' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <h6 className="font-medium text-sm">{item.action}</h6>
                      <p className="text-xs text-gray-500">{item.type} • {item.date}</p>
                    </div>
                    <ChevronRight className="text-gray-400" size={16} />
                  </div>
