import React, { useState, useEffect } from 'react';
import DiagramTypeSelector from './DiagramTypeSelector';
import CodeEditor from './CodeEditor';
import DiagramPreview from './DiagramPreview';
import TemplateGallery from './TemplateGallery';
import { DiagramType, DiagramTemplate } from '../types/diagram';

const DiagramGenerator: React.FC = () => {
  const [selectedType, setSelectedType] = useState<DiagramType>('flowchart');
  const [code, setCode] = useState<string>('');
  const [showTemplates, setShowTemplates] = useState(false);

  useEffect(() => {
    // Set default code based on selected type
    const defaultCodes = {
      flowchart: `flowchart TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E`,
      sequence: `sequenceDiagram
    participant User
    participant App
    participant API
    participant DB
    
    User->>App: Request data
    App->>API: Call endpoint
    API->>DB: Query database
    DB-->>API: Return results
    API-->>App: Send response
    App-->>User: Display data`,
      class: `classDiagram
    class User {
        +String name
        +String email
        +login()
        +logout()
    }
    
    class Order {
        +String id
        +Date createdAt
        +calculateTotal()
    }
    
    User ||--o{ Order : places`,
      gantt: `gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Requirements    :done,    req, 2024-01-01,2024-01-07
    Design         :done,    des, 2024-01-08,2024-01-14
    section Development
    Frontend       :active,  dev1, 2024-01-15,2024-02-15
    Backend        :         dev2, 2024-01-20,2024-02-20
    Testing        :         test, 2024-02-21,2024-03-07`,
      er: `erDiagram
    USER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    PRODUCT ||--o{ LINE-ITEM : "ordered in"
    
    USER {
        string name
        string email
        string id PK
    }
    
    ORDER {
        string id PK
        date created_at
        string user_id FK
    }`,
      mindmap: `mindmap
  root((AI Diagram App))
    Editor
      Code Input
      Syntax Highlighting
      Auto-completion
    Engines
      Mermaid
      PlantUML
      Graphviz
    Features
      Live Preview
      Export Options
      Templates`
    };

    setCode(defaultCodes[selectedType] || '');
  }, [selectedType]);

  const handleTemplateSelect = (template: DiagramTemplate) => {
    setSelectedType(template.type);
    setCode(template.code);
    setShowTemplates(false);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-80px)]">
      <div className="border-b border-gray-700 bg-gray-800 px-6 py-3">
        <div className="flex items-center justify-between">
          <DiagramTypeSelector 
            selectedType={selectedType} 
            onTypeChange={setSelectedType} 
          />
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium transition-colors"
          >
            Templates
          </button>
        </div>
      </div>

      {showTemplates && (
        <TemplateGallery 
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplates(false)}
        />
      )}

      <div className="flex-1 flex">
        <CodeEditor
          code={code}
          onChange={setCode}
          language={selectedType}
        />
        <DiagramPreview
          code={code}
          type={selectedType}
        />
      </div>
    </div>
  );
};

export default DiagramGenerator;