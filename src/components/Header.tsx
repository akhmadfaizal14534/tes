import React from 'react';
import { Zap, Github } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">AI Diagram Generator</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <Github className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;