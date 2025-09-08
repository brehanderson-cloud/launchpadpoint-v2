import React, { useState, useEffect } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentStep, setCurrentStep] = useState('email');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [answers, setAnswers] = useState({
    moment: '',
    approach: '',
    uniqueness: ''
  });
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [selectedTier, setSelectedTier] = useState('basic');
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Stripe Configuration
  const STRIPE_PUBLISHABLE_KEY = 'pk_test_51Rv0gGJ5ERkOYcRilISpOnKSyFIJXqcyhSteERevdP7boZmxkG09y5dV0ZgfqfbMdjnQ4WuHZ2puV6m4AQd9ze5Z00XXsKW1lZ';
  const PRICE_IDS = {
    basic: 'price_1RzQ1wJ5ERkOYcRimAym5yrb',
    best: 'price_1RzQ2YJ5ERkOYcRiYs0G8RDs',
    immaculate: 'price_1RzQ35J5ERkOYcRiNysMIv4x'
  };

  // Load Stripe
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Load saved data from localStorage
  useEffect(() => {
    const savedAnswers = localStorage.getItem('launchpadAnswers');
    const savedUsers = localStorage.getItem('launchpadUsers');
    const savedTransactions = localStorage.getItem('launchpadTransactions');
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('launchpadAnswers', JSON.stringify(answers));
    localStorage.setItem('launchpadUsers', JSON.stringify(users));
    localStorage.setItem('launchpadTransactions', JSON.stringify(transactions));
  }, [answers, users, transactions]);

  const questions = [
    {
      id: 'moment',
      text: "Think of a moment when someone genuinely thanked you or told you that you made a difference in their life or work. What happened?",
      placeholder: "Take your time... describe that moment when you felt truly valued..."
    },
    {
      id: 'approach',
      text: "What do you think it was about your approach that made such an impact?",
      placeholder: "What was special about how you handled that situation?"
    },
    {
      id: 'uniqueness',
      text: "Why do you believe you were able to help in a way that others might not have been able to?",
      placeholder: "What unique qualities or perspective did you bring?"
    }
  ];

  const tiers = {
    basic: { name: 'Basic', price: 19, color: '#059669' },
    best: { name: 'Best', price: 39, color: '#2563eb' },
    immaculate: { name: 'Immaculate', price: 49, color: '#7c3aed' }
  };

  // AI Resume Generation Functions
  const detectIndustry = (answers) => {
    const combinedText = Object.values(answers).join(' ').toLowerCase();
    if (combinedText.includes('patient') || combinedText.includes('medical') || combinedText.includes('healthcare') || combinedText.includes('clinical')) {
      return 'healthcare';
    } else if (combinedText.includes('recruit') || combinedText.includes('hiring') || combinedText.includes('candidate') || combinedText.includes('hr')) {
      return 'recruiting';
    } else if (combinedText.includes('aviation') || combinedText.includes('airport') || combinedText.includes('aircraft') || combinedText.includes('flight')) {
      return 'aviation';
    } else if (combinedText.includes('teach') || combinedText.includes('student') || combinedText.includes('education') || combinedText.includes('classroom')) {
      return 'education';
    } else if (combinedText.includes('sales') || combinedText.includes('customer') || combinedText.includes('client') || combinedText.includes('revenue')) {
      return 'sales';
    } else if (combinedText.includes('software') || combinedText.includes('code') || combinedText.includes('developer') || combinedText.includes('technical')) {
      return 'technology';
    }
    return 'general';
  };

  const generateProfessionalSummary = (answers, industry, tier) => {
    const { moment, approach, uniqueness } = answers;
    const industryKeywords = {
      healthcare: 'patient care excellence, clinical outcomes, healthcare delivery',
      recruiting: 'talent acquisition, candidate experience, organizational growth',
      aviation: 'operational safety, regulatory compliance, industry standards',
      education: 'student success, learning outcomes, educational excellence',
      sales: 'revenue generation, client relationships, market expansion',
      technology: 'innovative solutions, technical excellence, user experience',
      general: 'operational excellence, stakeholder satisfaction, process improvement'
    };
    const keywords = industryKeywords[industry] || industryKeywords.general;
    if (tier === 'basic' || tier === 'preview') {
      return `Professional with demonstrated ability to deliver meaningful results. Known for ${approach && approach.length > 10 ? approach.toLowerCase() : 'strong problem-solving skills'} and commitment to ${keywords.split(',')[0]}.`;
    } else if (tier === 'best') {
      return `Results-driven professional with proven track record of making significant impact through ${approach && approach.length > 10 ? approach.toLowerCase() : 'innovative approaches'}. Recognized for ability to ${moment && moment.length > 20 ? 'deliver exceptional outcomes that exceed expectations' : 'create positive change in challenging environments'}. Specializes in ${keywords} with focus on ${uniqueness && uniqueness.length > 10 ? uniqueness.toLowerCase() : 'collaborative problem-solving and continuous improvement'}.`;
    } else {
      return `Highly accomplished professional with extensive experience driving ${keywords}. Distinguished by ${uniqueness && uniqueness.length > 15 ? uniqueness.toLowerCase() : 'unique perspective and innovative problem-solving approach'}. Proven ability to ${moment && moment.length > 25 ? 'consistently deliver transformative results that create lasting positive impact' : 'exceed performance expectations while building strong stakeholder relationships'}.`;
    }
  };

  const generateFullResume = (tier) => {
    const industry = detectIndustry(answers);
    const summary = generateProfessionalSummary(answers, industry, tier);
    const name = userEmail ? userEmail.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Your Name";
    const contact = `${name} | ${userEmail || 'your.email@example.com'} | (555) 123-4567`;

    if (tier === 'basic' || tier === 'preview') {
      return `${name}
${contact}

PROFESSIONAL SUMMARY
${summary}

CORE SKILLS
• Problem Solving & Analysis
• Team Collaboration  
• Communication Excellence
• Attention to Detail
• Process Improvement

EXPERIENCE
Recent Position | Company Name
• Successfully contributed to team objectives and organizational goals
• Recognized for professional excellence and positive impact
• Applied unique skills to support project success

EDUCATION
[Your Degree] | [University Name]
[Graduation Year]`;
    } else if (tier === 'best') {
      return `${name}
${contact}

PROFESSIONAL SUMMARY
${summary}

CORE COMPETENCIES
• Strategic Problem Solving  • Team Leadership  • Process Optimization
• Communication Excellence  • Data Analysis  • Project Management

PROFESSIONAL EXPERIENCE
Recent Position | Company Name | [Start Date] - Present
• Successfully delivered exceptional results through innovative problem-solving
• Gained recognition for outstanding contribution to organizational success
• Leveraged distinctive skills to optimize operations and support development
• Maintained focus on continuous improvement and professional relationships

Previous Position | Previous Company | [Start Date] - [End Date]
• [Additional experience details would be added based on your background]

EDUCATION & CERTIFICATIONS
[Your Degree] | [University Name] | [Graduation Year]
• [Relevant coursework, honors, or achievements]`;
    } else {
      return `${name}
${contact}
LinkedIn: [Your LinkedIn Profile] | Portfolio: [Your Website]

PROFESSIONAL SUMMARY
${summary}

CORE COMPETENCIES
Technical Excellence        Process Optimization        Strategic Leadership
Problem Solving            Team Collaboration          Innovation Management

PROFESSIONAL EXPERIENCE
Senior Position | Company Name | [Start Date] - Present
• Spearheaded initiatives resulting in measurable improvements through strategic leadership
• Earned widespread recognition for transformative contributions exceeding performance targets
• Applied unique expertise to drive strategic initiatives and develop organizational capabilities

Previous Position | Previous Company | [Start Date] - [End Date]
• Consistently achieved performance targets while maintaining focus on professional development
• Collaborated with leadership to implement best practices and drive sustainable improvements

KEY PROJECTS & ACHIEVEMENTS
• Led cross-functional initiative resulting in 25% efficiency improvement
• Developed innovative solution that enhanced stakeholder satisfaction by 40%
• Mentored team of 8 professionals, achieving 95% retention rate

EDUCATION & CERTIFICATIONS
[Your Degree] | [University Name] | [Graduation Year]
• [Relevant coursework, magna cum laude, etc.]`;
    }
  };

  const handleEmailSubmit = () => {
    if (userEmail && userEmail.includes('@')) {
      const newUser = {
        email: userEmail,
        timestamp: new Date().toISOString(),
        industry: 'unknown',
        completed: false,
        tier: selectedTier
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentStep('questions');
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentStep('preview');
      setUsers(prev => prev.map(user =>
        user.email === userEmail
          ? { ...user, completed: true, industry: detectIndustry(answers) }
          : user
      ));
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleStripePayment = async (tierKey) => {
    if (!window.Stripe) {
      alert('Stripe is loading, please try again in a moment');
      return;
    }
    setIsProcessingPayment(true);
    try {
      const stripe = window.Stripe(STRIPE_PUBLISHABLE_KEY);
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: PRICE_IDS[tierKey],
          customerEmail: userEmail,
          successUrl: window.location.origin + '/success',
          cancelUrl: window.location.origin + '/cancel'
        })
      });
      if (!response.ok) {
        // Fallback to direct Stripe checkout for demo
        const { error } = await stripe.redirectToCheckout({
          lineItems: [{
            price: PRICE_IDS[tierKey],
            quantity: 1,
          }],
          mode: 'subscription',
          successUrl: window.location.origin + '/success',
          cancelUrl: window.location.origin + '/cancel',
          customerEmail: userEmail,
        });
        if (error) {
          console.error('Stripe error:', error);
          alert('Payment failed: ' + error.message);
        }
        return;
      }
      const session = await response.json();
      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id
      });
      if (error) {
        alert('Payment failed: ' + error.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      // Record transaction locally for demo purposes
      const transaction = {
        id: `txn_${Date.now()}`,
        email: userEmail,
        tier: tierKey,
        amount: tiers[tierKey].price,
        status: 'completed',
        timestamp: new Date().toISOString(),
        industry: detectIndustry(answers)
      };
      setTransactions(prev => [...prev, transaction]);
      alert(`Demo payment successful! $${tiers[tierKey].price} for ${tiers[tierKey].name} tier. In production, this would charge a real credit card and download the resume.`);
      setShowModal(false);
      resetForm();
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const resetForm = () => {
    setCurrentStep('email');
    setCurrentQuestion(0);
    setUserEmail('');
    setAnswers({ moment: '', approach: '', uniqueness: '' });
  };

  const startWithTier = (tier) => {
    setSelectedTier(tier);
    setShowModal(true);
    setCurrentStep('email');
  };

  // Admin Dashboard Data
  const totalRevenue = transactions.reduce((sum, txn) => sum + txn.amount, 0);
  const completionRate = users.length > 0 ? (users.filter(u => u.completed).length / users.length * 100).toFixed(1) : 0;

  return (
    <div
      style={{
        fontFamily: dyslexiaFont ? 'OpenDyslexic3, Arial, sans-serif' : 'Arial, sans-serif',
        background: '#f6f8fb',
        minHeight: '100vh',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <div style={{
        background: 'linear-gradient(90deg,#059669 0%,#2563eb 100%)',
        borderRadius: '0 0 32px 32px',
        padding: '32px 10px 24px 10px',
        boxShadow: '0 8px 32px rgba(37,99,235,0.09)',
        textAlign: 'center'
      }}>
        <span style={{ fontSize: '2.6rem', display: 'block', marginBottom: '0.2em' }}>🚀</span>
        <span style={{ fontWeight: 'bold', fontSize: '2.2rem', color: '#fff', letterSpacing: '2px', textShadow: '0 2px 8px #2563eb88' }}>LaunchpadPoint</span>
        <div style={{ color: '#e5e7eb', fontSize: '1.18rem', marginTop: '8px', fontStyle: 'italic' }}>Career Intelligence Platform</div>
      </div>

      {/* Tiers (use buttons for each, styled) */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'center',
        margin: '36px 0 16px 0'
      }}>
        {Object.entries(tiers).map(([tierKey, tier]) => (
          <button
            key={tierKey}
            onClick={() => startWithTier(tierKey)}
            style={{
              background: tierKey === 'best'
                ? 'linear-gradient(90deg,#2563eb,#059669)'
                : tier.color,
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '14px',
              padding: '1rem 2.2rem',
              fontSize: '1.14rem',
              boxShadow: tierKey === 'best'
                ? '0 6px 20px #2563eb44'
                : '0 2px 6px #05966933',
              cursor: 'pointer',
              outline: tierKey === selectedTier ? '3px solid #7c3aed' : 'none',
              transition: 'all 0.18s cubic-bezier(.4,2,.6,1)'
            }}
          >
            {tier.name} <span style={{fontWeight:"normal",fontSize:"0.92rem"}}>${tier.price}/mo</span>
            {tierKey === 'best' && (
              <span style={{
                display:'inline-block', marginLeft:'10px', fontSize:'0.8em',
                background:'#fff2', color:'#fff', borderRadius:'10px', padding:'2px 12px'
              }}>Popular</span>
            )}
          </button>
        ))}
      </div>

      {/* DyslexiaFont toggle */}
      <div style={{textAlign:"center",margin:"16px 0 24px 0"}}>
        <label style={{fontSize:"1.05rem",color:"#2563eb",fontWeight:"bold"}}>
          <input
            type="checkbox"
            checked={dyslexiaFont}
            onChange={(e) => setDyslexiaFont(e.target.checked)}
            style={{marginRight:"8px",transform:"scale(1.2)"}}
          />
          Dyslexia-Friendly Font
        </label>
      </div>

      {/* CTA */}
      <div style={{textAlign:"center",marginBottom:"36px"}}>
        <button
          onClick={() => startWithTier('best')}
          style={{
            background:'linear-gradient(90deg,#2563eb,#059669 70%)',
            color:'#fff',fontWeight:'bold',border:'none',borderRadius:'12px',
            fontSize:'1.2rem',padding:'1.1rem 2.8rem',boxShadow:'0 8px 32px #2563eb44',cursor:'pointer'
          }}
        >
          Build My Resume Now
        </button>
      </div>

      {/* Modal for resume flow */}
      {showModal && (
        <div style={{
          position: 'fixed', top:0, left:0, right:0, bottom:0,
          background:'rgba(0,0,0,0.6)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center'
        }}>
          <div style={{
            background:'#fff',borderRadius:'20px',padding:'2.4rem 2rem',maxWidth:'480px',width:'100%',boxShadow:'0 8px 40px #0002',position:'relative'
          }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position:'absolute',top:'16px',right:'16px',background:'#eee',border:'none',borderRadius:'50%',width:'34px',height:'34px',fontSize:'1.4rem',cursor:'pointer'
              }}
            >×</button>

            {/* Email step */}
            {currentStep === 'email' && (
              <>
                <h2 style={{fontSize:'1.3rem',color:'#2563eb'}}>Enter your email to begin</h2>
                <input
                  type="email"
                  value={userEmail}
                  onChange={e => setUserEmail(e.target.value)}
                  placeholder="you@email.com"
                  style={{
                    width:'100%',padding:'0.9rem',fontSize:'1.07rem',border:'2px solid #2563eb33',
                    borderRadius:'8px',margin:'18px 0'
                  }}
                />
                <button
                  onClick={handleEmailSubmit}
                  disabled={!userEmail.includes('@')}
                  style={{
                    width:'100%',padding:'1rem',background: userEmail.includes('@') ? '#2563eb' : '#eee',
                    color: userEmail.includes('@') ? '#fff' : '#2563eb55',fontWeight:'bold',border:'none',borderRadius:'8px',fontSize:'1.09rem',cursor: userEmail.includes('@') ? 'pointer':'not-allowed'
                  }}
                >
                  Continue
                </button>
              </>
            )}

            {/* Q&A step */}
            {currentStep === 'questions' && (
              <>
                <div style={{marginBottom:'10px',color:'#059669',fontWeight:'bold'}}>Question {currentQuestion+1} of {questions.length}</div>
                <h3 style={{fontSize:'1.12rem',marginBottom:'1.2em'}}>{questions[currentQuestion].text}</h3>
                <textarea
                  value={answers[questions[currentQuestion].id]}
                  onChange={e => handleAnswerChange(questions[currentQuestion].id, e.target.value)}
                  placeholder={questions[currentQuestion].placeholder}
                  style={{
                    width:'100%',minHeight:'90px',padding:'0.8em',fontSize:'1.02rem',
                    border:'2px solid #05966933',borderRadius:'8px',marginBottom:'16px',
                    fontFamily: dyslexiaFont ? 'OpenDyslexic3, Arial, sans-serif' : 'Arial, sans-serif'
                  }}
                />
                <div style={{display:'flex',justifyContent:'space-between',marginTop:'14px'}}>
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    style={{
                      padding:'10px 18px',borderRadius:'8px',border:'none',background:currentQuestion===0?'#eee':'#2563eb',color:currentQuestion===0?'#bbb':'#fff',fontWeight:'bold',fontSize:'1rem',cursor:currentQuestion===0?'not-allowed':'pointer'
                    }}
                  >Previous</button>
                  <button
                    onClick={nextQuestion}
                    disabled={!answers[questions[currentQuestion].id].trim()}
                    style={{
                      padding:'10px 18px',borderRadius:'8px',border:'none',background:answers[questions[currentQuestion].id].trim()?'#059669':'#eee',color:answers[questions[currentQuestion].id].trim()?'#fff':'#bbb',fontWeight:'bold',fontSize:'1rem',cursor:answers[questions[currentQuestion].id].trim()?'pointer':'not-allowed'
                    }}
                  >{currentQuestion===questions.length-1 ? 'Preview Resume' : 'Next'}</button>
                </div>
              </>
            )}

            {/* Preview step */}
            {currentStep === 'preview' && (
              <>
                <h2 style={{fontSize:'1.25rem',color:'#059669',marginBottom:'1em'}}>Preview your AI-Generated Resume</h2>
                <div style={{marginBottom:'18px'}}>
                  <div style={{
                    background:'#f6f8fb',padding:'16px',borderRadius:'10px',fontFamily:'OpenDyslexic3, Arial, sans-serif',
                    fontSize:'0.98rem',lineHeight:'1.7',marginBottom:'10px',whiteSpace:'pre-line',color:'#222'
                  }}>
                    {generateFullResume('preview')}
                  </div>
                  <div style={{
                    background:'#fff',padding:'16px',borderRadius:'10px',fontFamily:'Times, serif',
                    fontSize:'0.95rem',lineHeight:'1.45',whiteSpace:'pre-line'
                  }}>
                    {generateFullResume(selectedTier)}
                  </div>
                </div>
                <div style={{textAlign:'center'}}>
                  {Object.entries(tiers).map(([tierKey, tier]) => (
                    <button
                      key={tierKey}
                      style={{
                        background: tier.color,
                        color:'#fff',
                        border:'none',
                        borderRadius:'10px',
                        padding:'0.8em 1.8em',
                        margin:'0 0.3em',
                        fontWeight:'bold',
                        fontSize:'1.05rem',
                        cursor:'pointer'
                      }}
                      onClick={() => handleStripePayment(tierKey)}
                      disabled={isProcessingPayment}
                    >
                      {isProcessingPayment ? 'Processing...' : `Pay $${tier.price} & Download`}
                    </button>
                  ))}
                  <button
                    onClick={resetForm}
                    style={{
                      marginLeft:'1em',background:'#eee',color:'#059669',fontWeight:'bold',border:'none',borderRadius:'8px',padding:'0.8em 1.6em',fontSize:'1rem',cursor:'pointer'
                    }}
                  >
                    Start Over
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Admin dashboard button */}
      <button
        onClick={() => setShowAdmin(true)}
        style={{
          position:'fixed',bottom:'24px',right:'24px',background:'#2563eb',color:'#fff',border:'none',borderRadius:'50%',width:'48px',height:'48px',fontSize:'1.3rem',fontWeight:'bold',boxShadow:'0 2px 12px #2563eb22',cursor:'pointer',zIndex:1100
        }}
      >📊</button>

      {/* Admin dashboard modal */}
      {showAdmin && (
        <div style={{
          position: 'fixed', top:0, left:0, right:0, bottom:0,background:'rgba(0,0,0,0.7)',zIndex:1200,display:'flex',alignItems:'center',justifyContent:'center'
        }}>
          <div style={{
            background:'#fff',borderRadius:'18px',padding:'2.2rem',width:'95vw',maxWidth:'680px',boxShadow:'0 8px 40px #2563eb44',position:'relative'
          }}>
            <button
              onClick={() => setShowAdmin(false)}
              style={{
                position:'absolute',top:'18px',right:'18px',background:'#eee',border:'none',borderRadius:'50%',width:'34px',height:'34px',fontSize:'1.3rem',cursor:'pointer'
              }}
            >×</button>
            <h2 style={{color:'#2563eb',marginBottom:'24px'}}>Admin Dashboard</h2>
            <div style={{display:'flex',gap:'2em',flexWrap:'wrap',marginBottom:'16px'}}>
              <div style={{flex:'1 1 120px',background:'#f6f8fb',borderRadius:'8px',padding:'1em'}}>
                <div style={{color:'#059669',fontWeight:'bold'}}>Users</div>
                <div style={{fontSize:'2em',fontWeight:'bold'}}>{users.length}</div>
              </div>
              <div style={{flex:'1 1 120px',background:'#f6f8fb',borderRadius:'8px',padding:'1em'}}>
                <div style={{color:'#2563eb',fontWeight:'bold'}}>Completion</div>
                <div style={{fontSize:'2em',fontWeight:'bold'}}>{completionRate}%</div>
              </div>
              <div style={{flex:'1 1 120px',background:'#f6f8fb',borderRadius:'8px',padding:'1em'}}>
                <div style={{color:'#7c3aed',fontWeight:'bold'}}>Revenue</div>
                <div style={{fontSize:'2em',fontWeight:'bold'}}>${totalRevenue}</div>
              </div>
            </div>
            <div style={{marginTop:'1em',fontSize:'1.02em'}}>
              <div style={{marginBottom:'8px',fontWeight:'bold'}}>Recent Users:</div>
              {(users.slice(-5).reverse()).map((u,i) => (
                <div key={i} style={{padding:'4px 0',borderBottom:'1px solid #eee',fontSize:'0.95em'}}>
                  {u.email} • {u.industry} • {u.completed ? '✅' : '❌'}
                </div>
              ))}
              {users.length === 0 && <div style={{color:'#bbb'}}>No users yet</div>}
            </div>
          </div>
        </div>
      )}

      {/* Load DyslexiaFont via CDN */}
      <link
        href="https://cdn.jsdelivr.net/gh/antijingoist/open-dyslexic/web/OpenDyslexic3-Regular.css"
        rel="stylesheet"
        type="text/css"
      />
    </div>
  );
}

export default App;
