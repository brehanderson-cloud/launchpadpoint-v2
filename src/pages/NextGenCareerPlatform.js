import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, Brain, Target, TrendingUp, Users, Zap, Star, ChevronRight, Play, Mic, MicOff, Video, CheckCircle, Clock } from 'lucide-react';

const NextGenCareerPlatform = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [userProfile] = useState({
    name: 'Alex Johnson',
    currentRole: 'Senior Software Engineer',
    experience: '5 years',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Leadership'],
    careerScore: 87,
    marketValue: 118000
  });

  // LaunchpadPoint Logo
  const LaunchpadLogo = ({ size = 32 }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
      <span style={{
        fontWeight: 'bold',
        fontSize: '1.1rem',
        background: 'linear-gradient(135deg, #1E90FF, #8A2BE2)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent'
      }}>
        LaunchpadPoint
      </span>
    </div>
  );

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: Brain, color: '#667eea' },
    { id: 'interview', name: 'Interview', icon: Video, color: '#f093fb' },
    { id: 'market', name: 'Market', icon: TrendingUp, color: '#4facfe' },
    { id: 'network', name: 'Network', icon: Users, color: '#43e97b' },
    { id: 'skills', name: 'Skills', icon: Zap, color: '#fa709a' },
    { id: 'copilot', name: 'Copilot', icon: Target, color: '#ffecd2' }
  ];

  const navigateBack = () => {
    window.location.href = '/dashboard';
  };

  const CareerDashboard = () => {
    const [insights, setInsights] = useState([]);
    
    useEffect(() => {
      const mockInsights = [
        {
          type: 'opportunity',
          title: 'High-Match Job Alert',
          content: 'Senior React Developer at TechCorp matches 94% of your profile',
          urgency: 'high',
          action: 'View Details',
          time: '2 hours ago'
        },
        {
          type: 'market',
          title: 'Salary Increase Detected', 
          content: 'React developers saw 15% salary increase this month',
          urgency: 'medium',
          action: 'Update Rate',
          time: '4 hours ago'
        },
        {
          type: 'skill',
          title: 'Trending Skill Alert',
          content: 'TypeScript demand up 40% - Add to your profile?',
          urgency: 'low', 
          action: 'Learn More',
          time: '1 day ago'
        }
      ];
      setInsights(mockInsights);
    }, []);

    return (
      <div style={{ padding: '1rem' }}>
        {/* Career Score Hero */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '1rem',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
            Career Intelligence Score
          </h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
            {userProfile.careerScore}
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>+5 this week</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem', fontSize: '0.85rem' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>Skills</div>
              <div style={{ fontSize: '1.1rem' }}>92%</div>
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>Market</div>
              <div style={{ fontSize: '1.1rem' }}>89%</div>
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>Complete</div>
              <div style={{ fontSize: '1.1rem' }}>78%</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ 
            background: 'white', 
            padding: '1rem', 
            borderRadius: '0.75rem', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.25rem' }}>
              ${Math.round(userProfile.marketValue/1000)}K
            </div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Market Value</div>
            <div style={{ fontSize: '0.7rem', color: '#10b981' }}>↗️ +$3K this month</div>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '1rem', 
            borderRadius: '0.75rem', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.25rem' }}>
              156
            </div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Opportunities</div>
            <div style={{ fontSize: '0.7rem', color: '#3b82f6' }}>12 new today</div>
          </div>
        </div>

        {/* Live Insights */}
        <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Brain style={{ color: '#8b5cf6' }} size={20} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>Live Career Insights</h3>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.7rem', color: '#6b7280' }}>Live</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {insights.map((insight, index) => (
              <div key={index} style={{
                padding: '0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                background: insight.urgency === 'high' ? '#fef2f2' : '#f9fafb'
              }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem', margin: '0 0 0.25rem 0' }}>
                  {insight.title}
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: '1.4', margin: '0 0 0.5rem 0' }}>
                  {insight.content}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{insight.time}</span>
                  <button style={{
                    fontSize: '0.75rem',
                    color: '#3b82f6',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}>
                    {insight.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Path */}
        <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', margin: '0 0 1rem 0' }}>
            Predicted Career Path
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: '#dcfce7', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <CheckCircle style={{ color: '#16a34a' }} size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', margin: '0 0 0.25rem 0' }}>
                  Current: {userProfile.currentRole}
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                  ${Math.round(userProfile.marketValue/1000)}K • 87% market fit
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.8 }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: '#dbeafe', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <Clock style={{ color: '#2563eb' }} size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', margin: '0 0 0.25rem 0' }}>
                  Next: Tech Lead (12-18 months)
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>
                  $135K-$155K • 92% probability
                </p>
                <p style={{ fontSize: '0.7rem', color: '#2563eb', margin: 0 }}>
                  Required: Leadership certification
                </p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.6 }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: '#f3e8ff', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <Star style={{ color: '#9333ea' }} size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', margin: '0 0 0.25rem 0' }}>
                  Future: Engineering Manager (3-5 years)
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 0.25rem 0' }}>
                  $160K-$200K • 78% probability
                </p>
                <p style={{ fontSize: '0.7rem', color: '#9333ea', margin: 0 }}>
                  Required: Team management experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ComingSoon = ({ title }) => (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>
        {title}
      </h3>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
        Coming soon with advanced AI features
      </p>
      <div style={{
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        display: 'inline-block',
        fontSize: '0.9rem'
      }}>
        Notify Me When Ready
      </div>
    </div>
  );

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard': return <CareerDashboard />;
      case 'interview': return <ComingSoon title="AI Interview Simulator" />;
      case 'market': return <ComingSoon title="Market Intelligence Hub" />;
      case 'network': return <ComingSoon title="Smart Networking Hub" />;
      case 'skills': return <ComingSoon title="Future Skills Predictor" />;
      case 'copilot': return <ComingSoon title="Career Copilot AI" />;
      default: return <CareerDashboard />;
    }
  };

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
            fontWeight: 'bold' 
          }}>
            {userProfile.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </div>

      {/* Module Navigation */}
      <div style={{ padding: '1rem', background: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', overflowX: 'auto', gap: '0.5rem', paddingBottom: '0.5rem' }}>
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.75rem',
                  borderRadius: '0.75rem',
                  border: 'none',
                  background: activeModule === module.id ? `${module.color}15` : '#f9fafb',
                  color: activeModule === module.id ? module.color : '#6b7280',
                  cursor: 'pointer',
                  minWidth: '70px',
                  fontSize: '0.75rem',
                  fontWeight: activeModule === module.id ? '600' : '400'
                }}
              >
                <Icon size={18} />
                <span>{module.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      {renderModule()}
    </div>
  );
};

export default NextGenCareerPlatform;
