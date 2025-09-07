import React, { useState } from 'react';

const NextGenCareerPlatform = () => {
  const [activeModule, setActiveModule] = useState('dashboard');

  // Exact LaunchpadPoint Logo matching your reference
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

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: '🧠', color: '#667eea' },
    { id: 'interview', name: 'Interview', icon: '🎥', color: '#f093fb' },
    { id: 'market', name: 'Market', icon: '📈', color: '#4facfe' },
    { id: 'network', name: 'Network', icon: '👥', color: '#43e97b' },
    { id: 'skills', name: 'Skills', icon: '⚡', color: '#fa709a' },
    { id: 'copilot', name: 'Copilot', icon: '🎯', color: '#ffecd2' }
  ];

  const navigateBack = () => {
    window.location.href = '/dashboard';
  };

  const CareerDashboard = () => {
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
            87
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
              $118K
            </div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Market Value</div>
            <div style={{ fontSize: '0.7rem', color: '#10b981' }}>↗ +$3K this month</div>
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
            <div style={{
              padding: '0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              background: '#fef2f2'
            }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem', margin: '0 0 0.25rem 0' }}>
                High-Match Job Alert
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: '1.4', margin: '0 0 0.5rem 0' }}>
                Senior React Developer at TechCorp matches 94% of your profile
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>2 hours ago</span>
                <button style={{
                  fontSize: '0.75rem',
                  color: '#3b82f6',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}>
                  View Details
                </button>
              </div>
            </div>

            <div style={{
              padding: '0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              background: '#f9fafb'
            }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem', margin: '0 0 0.25rem 0' }}>
                Salary Increase Detected
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: '1.4', margin: '0 0 0.5rem 0' }}>
                React developers saw 15% salary increase this month
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>4 hours ago</span>
                <button style={{
                  fontSize: '0.75rem',
                  color: '#3b82f6',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}>
                  Update Rate
                </button>
              </div>
            </div>

            <div style={{
              padding: '0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              background: '#f0f9ff'
            }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem', margin: '0 0 0.25rem 0' }}>
                Trending Skill Alert
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: '1.4', margin: '0 0 0.5rem 0' }}>
                TypeScript demand up 40% - Add to your profile?
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>1 day ago</span>
                <button style={{
                  fontSize: '0.75rem',
                  color: '#3b82f6',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}>
                  Learn More
                </button>
              </div>
            </div>
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
                <span style={{ color: '#16a34a', fontSize: '20px' }}>✅</span>
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', margin: '0 0 0.25rem 0' }}>
                  Current: Senior Software Engineer
                </h4>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
                  $118K • 87% market fit
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
                <span style={{ color: '#2563eb', fontSize: '20px' }}>🕐</span>
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
                <span style={{ color: '#9333ea', fontSize: '20px' }}>⭐</span>
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
            <span style={{ fontSize: '20px' }}>←</span>
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
            AJ
          </div>
        </div>
      </div>

      {/* Module Navigation */}
      <div style={{ padding: '1rem', background: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', overflowX: 'auto', gap: '0.5rem', paddingBottom: '0.5rem' }}>
          {modules.map((module) => {
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
                <span style={{ fontSize: '18px' }}>{module.icon}</span>
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
