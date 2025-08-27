import React from 'react';
import { GitBranch, Users, Database, Calendar, Brain, FileText } from 'lucide-react';
import { DiagramType } from '../types/diagram';

interface Props {
  selectedType: DiagramType;
  onTypeChange: (type: DiagramType) => void;
}

const diagramTypes = [
  { 
    id: 'flowchart' as DiagramType, 
    name: 'Flowchart', 
    icon: GitBranch, 
    description: 'Process flows and decision trees',
    color: 'bg-blue-500'
  },
  { 
    id: 'sequence' as DiagramType, 
    name: 'Sequence', 
    icon: Users, 
    description: 'System interactions over time',
    color: 'bg-green-500'
  },
  { 
    id: 'class' as DiagramType, 
    name: 'Class', 
    icon: Database, 
    description: 'Object-oriented relationships',
    color: 'bg-purple-500'
  },
  { 
    id: 'gantt' as DiagramType, 
    name: 'Gantt', 
    icon: Calendar, 
    description: 'Project timelines and schedules',
    color: 'bg-orange-500'
  },
  { 
    id: 'er' as DiagramType, 
    name: 'ER Diagram', 
    icon: Database, 
    description: 'Entity relationships',
    color: 'bg-teal-500'
  },
  { 
    id: 'mindmap' as DiagramType, 
    name: 'Mind Map', 
    icon: Brain, 
    description: 'Hierarchical information',
    color: 'bg-pink-500'
  }
];

const DiagramTypeSelector: React.FC<Props> = ({ selectedType, onTypeChange }) => {
  return (
    <div className="flex space-x-2">
      {diagramTypes.map((type) => {
        const Icon = type.icon;
        return (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${selectedType === type.id 
                ? `${type.color} text-white shadow-lg` 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span>{type.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default DiagramTypeSelector;