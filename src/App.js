import React, { useState } from 'react'; import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; import { motion } from 'framer-motion'; import ResumeBuilder from './pages/ResumeBuilder'; import NextGenCareerPlatform from './pages/NextGenCareerPlatform'; import AdvancedAICareerAssistant from './pages/AdvancedAICareerAssistant';

// 🔹 Rocket Logo Component const RocketLogo = ({ size = 32 }) => ( <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} style={{ width: size, height: size, background: 'linear-gradient(135deg, #00A8FF, #7B68EE)', borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', position: 'relative', display: 'inline-block' }}

> 

<div style={{
  position: 'absolute',
  top: '30%',
  left: '30%',
  width: '40%',
  height: '40%',
  background: '#40E0D0',
  borderRadius: '50%',
  opacity: 0.8
}}></div>
<div style={{
  position: 'absolute',
  bottom: '-10px',
  left: '20%',
  width: '20%',
  height: '30%',
  background: 'linear-gradient(135deg, #7B68EE, #9932CC)',
  borderRadius: '0 0 50% 50%'
}}></div>

</motion.div> );

// 🔹 Reusable Feature Card const FeatureCard = ({ icon, title, description }) => ( <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-center"

> 

<div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 mx-auto mb-4 text-2xl">
  {icon}
</div>
<h3 className="text-xl font-bold mb-2">{title}</h3>
<p className="opacity-90 leading-relaxed">{description}</p>

</motion.div> );

// 🔹 Landing Page const LandingPage = ({ isDarkMode, toggleDarkMode }) => { const [isDyslexiaFont, setIsDyslexiaFont] = useState(false);

const fontFamily = isDyslexiaFont ? 'OpenDyslexic, Arial, sans-serif' : 'Inter, sans-serif';

return ( <div className={min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}} style={{ fontFamily }}> <style> {@import url('https://fonts.googleapis.com/css2?family=OpenDyslexic&display=swap');} </style>

{/* Header */}
  <header className={`flex justify-between items-center px-6 py-4 ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-900'} backdrop-blur-lg`}>
    <div className="flex items-center gap-3 text-2xl font-bold">
      <RocketLogo size={36} /> LaunchpadPoint
    </div>
    <div className="flex gap-3">
      <button
        onClick={() => setIsDyslexiaFont(!isDyslexiaFont)}
        className={`px-4 py-2 rounded-lg border transition ${
          isDyslexiaFont ? 'bg-teal-500/30 border-teal-400' : 'bg-white/20 border-white/30'
        }`}
      >
        {isDyslexiaFont ? '✓ Dyslexia Font' : 'Dyslexia Font'}
      </button>
      <button 
        onClick={toggleDarkMode}
        className="px-4 py-2 rounded-lg bg-yellow-500/40 border border-white/30 hover:bg-yellow-600/50 transition"
      >
        {isDarkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
      </button>
      <button 
        onClick={() => window.location.href = '/dashboard'}
        className="px-4 py-2 rounded-lg bg-blue-500/40 border border-white/30 hover:bg-blue-600/50 transition"
      >
        Get Started
      </button>
    </div>
  </header>

  {/* Hero */}
  <main className="flex-1 flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-indigo-500 to-purple-700">
    <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <RocketLogo size={120} />
    </motion.div>
    <motion.h1 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-5xl font-bold mt-6"
    >
      Transform Your Career with AI
    </motion.h1>
    <p className="mt-4 max-w-2xl opacity-90 text-lg">
      LaunchpadPoint combines AI, deep career analysis, and accessibility-first design to accelerate your professional journey.
    </p>

    {/* CTA Buttons */}
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      <motion.button whileHover={{ scale: 1.05 }} className="px-6 py-3 rounded-lg bg-blue-500 shadow-lg">
        Create Professional Resume
      </motion.button>
      <motion.button whileHover={{ scale: 1.05 }} className="px-6 py-3 rounded-lg border border-white/40">
        Start Free Trial
      </motion.button>
      <motion.button whileHover={{ scale: 1.05 }} className="px-6 py-3 rounded-lg border border-white">
        Try AI Assistant
      </motion.button>
    </div>

    {/* Features */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl w-full">
      <FeatureCard 
        icon={<RocketLogo size={32} />} 
        title="AI Resume Builder" 
        description="Tailored resumes optimized with intelligent analysis."
      />
      <FeatureCard 
        icon="🎯" 
        title="Job Matching" 
        description="Find jobs aligned with your skills and career path."
      />
      <FeatureCard 
        icon="♿" 
        title="Accessibility First" 
        description="15+ accessibility features including dyslexia-friendly fonts."
      />
    </div>
  </main>

  {/* Footer */}
  <footer className={`py-6 ${isDarkMode ? 'bg-black/30 text-white' : 'bg-gray-200 text-gray-900'} text-center`}>
    <div className="flex justify-center items-center gap-2 mb-2">
      <RocketLogo size={24} /> <span className="font-bold">LaunchpadPoint</span>
    </div>
    <p className="opacity-70 text-sm">Empowering careers through intelligent, accessible technology</p>
  </footer>
</div>

); };

// 🔹 Dashboard Page const Dashboard = ({ isDarkMode }) => (

  <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
    <h1 className="text-3xl font-bold mb-4">Dashboard</h1><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-3 gap-4 mb-6">
  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-xl shadow`}>
    <h3 className="text-gray-400">Applications</h3>
    <p className="text-2xl font-bold text-blue-500">0</p>
  </div>
  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-xl shadow`}>
    <h3 className="text-gray-400">Resume Score</h3>
    <p className="text-2xl font-bold text-green-500">-</p>
  </div>
  <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-xl shadow`}>
    <h3 className="text-gray-400">Job Matches</h3>
    <p className="text-2xl font-bold text-purple-500">0</p>
  </div>
</motion.div>

<div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow mb-6`}>
  <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
    <button className="p-4 bg-blue-500 text-white rounded-lg">📄 Build Resume</button>
    <button className="p-4 bg-purple-500 text-white rounded-lg">🤖 AI Assistant</button>
    <button className="p-4 bg-green-500 text-white rounded-lg">🚀 Career Intelligence</button>
    <button disabled className="p-4 bg-gray-200 text-gray-500 rounded-lg">🔍 Find Jobs (Soon)</button>
  </div>
</div>

<div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow`}>
  <h3 className="text-lg font-bold mb-2">Recent Activity</h3>
  <ul className="list-disc pl-6 opacity-80">
    <li>Welcome to LaunchpadPoint V2! Start by building your resume.</li>
  </ul>
</div>

  </div>
);// 🔹 App Router with Theme Toggle function App() { const [isDarkMode, setIsDarkMode] = useState(true);

const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

return ( <Router> <Routes> <Route path="/" element={<LandingPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} /> <Route path="/dashboard" element={<Dashboard isDarkMode={isDarkMode} />} /> <Route path="/resume-builder" element={<ResumeBuilder />} /> <Route path="/ai-assistant" element={<AdvancedAICareerAssistant />} /> <Route path="/career-intelligence" element={<NextGenCareerPlatform />} /> </Routes> </Router> ); }

export default App;

