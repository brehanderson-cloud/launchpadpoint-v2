import React, { useState } from 'react';
import { 
  DollarSign, Briefcase, Activity, Bell, ArrowUp, 
  MapPin, Clock, FileText, MessageSquare, Search,
  Users, Brain, Zap, TrendingUp, Sparkles
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const DashboardPage = () => {
  const { userData } = useUser();
  const [marketInsights] = useState([
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

  const [jobAlerts] = useState([
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

  return (
    <div className="space-y-8">
      {/* Career Intelligence Score - Main Hero */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 dark:from-slate-800 dark:via-indigo-900 dark:to-purple-900 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-transparent rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400 to-transparent rounded-full opacity-30 animate-pulse delay-1000"></div>
        
        <div className="relative z-10">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Market Value & Opportunities */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-slate-700 dark:to-indigo-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Market Value</p>
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                  ${userData.marketValue.toLocaleString()}K
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-emerald-500" />
            </div>
            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">+${userData.monthlyIncrease.toLocaleString()} this month</span>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-indigo-700 dark:to-purple-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Opportunities</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {userData.opportunities}
                </p>
              </div>
              <Briefcase className="w-8 h-8 text-blue-500" />
            </div>
            <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{userData.newToday} new today</span>
          </div>
        </div>

        {/* Live Career Insights */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
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
              <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:shadow-md transition-all cursor-pointer">
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
                <div className={`mt-2 h-1 bg-gradient-to-r ${
                  insight.trend === 'up' ? 'from-green-400 to-emerald-500' :
                  insight.trend === 'hot' ? 'from-orange-400 to-red-500' :
                  'from-blue-400 to-indigo-500'
                } rounded-full`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High-Priority Job Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
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
        <button className="bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 hover:from-red-400 hover:via-pink-400 hover:to-purple-500 dark:from-red-600 dark:via-pink-600 dark:to-purple-700 dark:hover:from-red-500 dark:hover:via-pink-500 dark:hover:to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 rounded-full -translate-y-8 translate-x-8"></div>
          <FileText className="w-8 h-8 mb-3 relative z-10" />
          <h3 className="text-lg font-semibold mb-2 relative z-10">Create Resume</h3>
          <p className="text-sm opacity-90 relative z-10">Build your professional resume with AI guidance</p>
        </button>

        <button className="bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-600 hover:from-indigo-400 hover:via-blue-400 hover:to-purple-500 dark:from-indigo-600 dark:via-blue-600 dark:to-purple-700 dark:hover:from-indigo-500 dark:hover:via-blue-500 dark:hover:to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white opacity-10 rounded-full translate-y-10 -translate-x-10"></div>
          <MessageSquare className="w-8 h-8 mb-3 relative z-10" />
          <h3 className="text-lg font-semibold mb-2 relative z-10">Ask AI Assistant</h3>
          <p className="text-sm opacity-90 relative z-10">Get personalized career advice from experts</p>
        </button>

        <button className="bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-600 hover:from-emerald-400 hover:via-teal-400 hover:to-blue-500 dark:from-emerald-600 dark:via-teal-600 dark:to-blue-700 dark:hover:from-emerald-500 dark:hover:via-teal-500 dark:hover:to-blue-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 relative overflow-hidden">
          <div className="absolute top-1/2 right-0 w-12 h-12 bg-white opacity-10 rounded-full translate-x-6"></div>
          <Search className="w-8 h-8 mb-3 relative z-10" />
          <h3 className="text-lg font-semibold mb-2 relative z-10">Search Jobs</h3>
          <p className="text-sm opacity-90 relative z-10">Find opportunities that match your profile</p>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <Briefcase className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{userData.experience}+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{userData.applications}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Applications</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{userData.interviews}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Interviews</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <Zap className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{userData.offers}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Offers</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
