import React, { useState } from 'react';
import { Sparkles, Wand2, ArrowRight } from 'lucide-react';
import { DiagramType } from '../types/diagram';
import { generateDiagramCode } from '../utils/diagramGenerator';

interface Props {
  onGenerateCode: (code: string, type: DiagramType) => void;
}

const AIPromptInterface: React.FC<Props> = ({ onGenerateCode }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Determine best diagram type based on prompt
      const suggestedType = suggestDiagramType(prompt);
      const generatedCode = generateDiagramCode(prompt, suggestedType);
      
      onGenerateCode(generatedCode, suggestedType);
      setIsGenerating(false);
    }, 1500);
  };

  const suggestDiagramType = (text: string): DiagramType => {
    const lower = text.toLowerCase();
    
    if (lower.includes('sequence') || lower.includes('interaction') || lower.includes('communication') || lower.includes('api')) {
      return 'sequence';
    } else if (lower.includes('class') || lower.includes('object') || lower.includes('inheritance') || lower.includes('oop')) {
      return 'class';
    } else if (lower.includes('timeline') || lower.includes('schedule') || lower.includes('gantt') || lower.includes('project plan')) {
      return 'gantt';
    } else if (lower.includes('database') || lower.includes('entity') || lower.includes('relationship') || lower.includes('table')) {
      return 'er';
    } else if (lower.includes('mind') || lower.includes('concept') || lower.includes('hierarchy') || lower.includes('brainstorm')) {
      return 'mindmap';
    }
    
    return 'flowchart';
  };

  return (
    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/20">
      <div className="flex items-center space-x-2 mb-4">
        <Wand2 className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">AI Diagram Generator</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Describe what you want to diagram:
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: 'Create a flowchart showing the user authentication process with email verification and password reset functionality'"
            className="w-full h-24 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
            disabled={isGenerating}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Generating diagram...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Diagram</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <div className="mt-4 p-3 bg-gray-700/50 rounded border border-gray-600">
        <p className="text-xs text-gray-400 mb-2">
          <strong>Pro Tips:</strong>
        </p>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• Use words like "sequence", "flow", "timeline" to hint diagram type</li>
          <li>• Mention specific entities, actors, or components</li>
          <li>• Describe relationships and interactions</li>
        </ul>
      </div>
    </div>
  );
};

export default AIPromptInterface;