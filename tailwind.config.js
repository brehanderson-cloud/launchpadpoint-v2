// ===== TERMINAL COMMANDS (Run these first) =====
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

// ===== tailwind.config.js =====
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// ===== postcss.config.js (automatically created) =====
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

// ===== src/App.css =====
@tailwind base;
@tailwind components;
@tailwind utilities;

// ===== src/App.js =====
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 flex items-center justify-center p-4">
      <div className={`max-w-md w-full transform transition-all duration-1000 ${
        mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-3xl">🚀</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              React + Tailwind
            </h1>
            <p className="text-white/80 text-lg">
              Beautiful styling now enabled!
            </p>
          </div>

          {/* Counter Section */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">
              Interactive Counter
            </h2>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-4 font-mono">
                {count}
              </div>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => setCount(count - 1)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  -
                </button>
                <button 
                  onClick={() => setCount(0)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  Reset
                </button>
                <button 
                  onClick={() => setCount(count + 1)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              ✨ Tailwind Features
            </h3>
            <ul className="space-y-2 text-white/90 text-sm">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mr-3"></span>
                Gradient backgrounds
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-3"></span>
                Glassmorphism effects
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mr-3"></span>
                Smooth animations
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full mr-3"></span>
                Responsive design
              </li>
            </ul>
          </div>

          {/* Call to Action */}
          <button className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-semibold py-4 px-6 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg mb-4">
            Start Building Amazing Apps
          </button>

          {/* Footer */}
          <div className="text-center">
            <p className="text-white/60 text-sm">
              Edit <code className="bg-white/10 px-2 py-1 rounded text-white/80 font-mono">src/App.js</code> to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// ===== src/index.js =====
import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ===== src/index.css (optional - can delete this file) =====
/* You can delete this file since we're using App.css with Tailwind */

// ===== package.json (your dependencies section should include) =====
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.3.0"
  }
}
