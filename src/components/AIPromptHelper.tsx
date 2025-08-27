import React, { useState } from 'react';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { DiagramType } from '../types/diagram';

interface Props {
  onGeneratePrompt: (prompt: string, type: DiagramType) => void;
}

const prompts = [
  {
    category: 'Business Process',
    suggestions: [
      { text: 'User registration and onboarding flow', type: 'flowchart' as DiagramType },
      { text: 'E-commerce order processing', type: 'sequence' as DiagramType },
      { text: 'Customer support ticket lifecycle', type: 'flowchart' as DiagramType },
    ]
  },
  {
    category: 'Software Architecture',
    suggestions: [
      { text: 'Microservices communication', type: 'sequence' as DiagramType },
      { text: 'Database relationships for blog system', type: 'er' as DiagramType },
      { text: 'Class structure for inventory system', type: 'class' as DiagramType },
    ]
  },
  {
    category: 'Project Management',
    suggestions: [
      { text: 'Software development sprint timeline', type: 'gantt' as DiagramType },
      { text: 'Product feature roadmap', type: 'gantt' as DiagramType },
      { text: 'Project dependencies and milestones', type: 'flowchart' as DiagramType },
    ]
  }
];

const AIPromptHelper: React.FC<Props> = ({ onGeneratePrompt }) => {
  const [customPrompt, setCustomPrompt] = useState('');

  const handleCustomPrompt = () => {
    if (customPrompt.trim()) {
      // Simple AI-like logic to suggest diagram type based on keywords
      const prompt = customPrompt.toLowerCase();
      let suggestedType: DiagramType = 'flowchart';

      if (prompt.includes('sequence') || prompt.includes('interaction') || prompt.includes('communication')) {
        suggestedType = 'sequence';
      } else if (prompt.includes('class') || prompt.includes('object') || prompt.includes('inheritance')) {
        suggestedType = 'class';
      } else if (prompt.includes('timeline') || prompt.includes('schedule') || prompt.includes('gantt')) {
        suggestedType = 'gantt';
      } else if (prompt.includes('database') || prompt.includes('entity') || prompt.includes('relationship')) {
        suggestedType = 'er';
      } else if (prompt.includes('mind') || prompt.includes('hierarchy') || prompt.includes('concept')) {
        suggestedType = 'mindmap';
      }

      onGeneratePrompt(customPrompt, suggestedType);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-semibold text-white">AI Diagram Assistant</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Describe what you want to diagram:
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g., 'User login process with database validation'"
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handleCustomPrompt()}
            />
            <button
              onClick={handleCustomPrompt}
              disabled={!customPrompt.trim()}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">Quick Start Ideas</span>
          </div>
          
          <div className="space-y-3">
            {prompts.map((category) => (
              <div key={category.category}>
                <h4 className="text-xs font-medium text-gray-400 mb-2">{category.category}</h4>
                <div className="grid grid-cols-1 gap-2">
                  {category.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => onGeneratePrompt(suggestion.text, suggestion.type)}
                      className="text-left p-2 bg-gray-700 hover:bg-gray-600 rounded border border-gray-600 hover:border-gray-500 transition-colors text-sm text-gray-300"
                    >
                      <span className="text-blue-400 text-xs">{suggestion.type}</span>
                      <br />
                      {suggestion.text}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPromptHelper;