import React from 'react';

const Loading = ({ message = "Loading LaunchpadPoint..." }) => {
  return (
    <div className="glass-card responsive-container">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
        <h3 className="text-xl font-semibold text-white mb-2">🚀 {message}</h3>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
