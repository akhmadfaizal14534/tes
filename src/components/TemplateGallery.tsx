import React from 'react';
import { X } from 'lucide-react';
import { DiagramTemplate } from '../types/diagram';

interface Props {
  onSelect: (template: DiagramTemplate) => void;
  onClose: () => void;
}

const templates: DiagramTemplate[] = [
  {
    id: 'simple-flowchart',
    name: 'Simple Process Flow',
    type: 'flowchart',
    description: 'Basic process with decision points',
    code: `flowchart TD
    A[Start] --> B{Decision?}
    B -->|Yes| C[Process A]
    B -->|No| D[Process B]
    C --> E[End]
    D --> E`
  },
  {
    id: 'user-auth',
    name: 'User Authentication',
    type: 'sequence',
    description: 'Login flow sequence',
    code: `sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as Auth Service
    participant D as Database
    
    U->>F: Enter credentials
    F->>A: Login request
    A->>D: Verify user
    D-->>A: User data
    A-->>F: JWT token
    F-->>U: Login success`
  },
  {
    id: 'project-timeline',
    name: 'Project Timeline',
    type: 'gantt',
    description: 'Software development phases',
    code: `gantt
    title Software Development Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Requirements    :done, req, 2024-01-01, 2024-01-14
    Architecture    :done, arch, 2024-01-15, 2024-01-21
    section Development
    Frontend        :active, fe, 2024-01-22, 2024-03-15
    Backend         :active, be, 2024-02-01, 2024-03-30
    section Testing
    Unit Tests      :test1, 2024-03-16, 2024-03-30
    Integration     :test2, 2024-03-31, 2024-04-14`
  },
  {
    id: 'data-model',
    name: 'E-commerce Data Model',
    type: 'er',
    description: 'Basic e-commerce entities',
    code: `erDiagram
    USER ||--o{ ORDER : places
    ORDER ||--|{ ORDER-ITEM : contains
    PRODUCT ||--o{ ORDER-ITEM : "appears in"
    CATEGORY ||--o{ PRODUCT : contains
    
    USER {
        string id PK
        string email UK
        string name
        datetime created_at
    }
    
    PRODUCT {
        string id PK
        string name
        decimal price
        string category_id FK
    }`
  },
  {
    id: 'system-architecture',
    name: 'System Architecture',
    type: 'flowchart',
    description: 'Web application architecture',
    code: `flowchart TB
    subgraph Client["Client Layer"]
        A[React App]
        B[Mobile App]
    end
    
    subgraph API["API Layer"]
        C[REST API]
        D[GraphQL]
    end
    
    subgraph Services["Service Layer"]
        E[Auth Service]
        F[Business Logic]
        G[File Storage]
    end
    
    subgraph Data["Data Layer"]
        H[(Database)]
        I[(Cache)]
    end
    
    A --> C
    B --> D
    C --> E
    C --> F
    D --> F
    F --> H
    E --> H
    F --> I
    G --> H`
  },
  {
    id: 'class-design',
    name: 'Class Design',
    type: 'class',
    description: 'Object-oriented design',
    code: `classDiagram
    class User {
        +String id
        +String name
        +String email
        +Date createdAt
        +login()
        +logout()
        +updateProfile()
    }
    
    class Order {
        +String id
        +Date orderDate
        +OrderStatus status
        +calculateTotal()
        +addItem()
        +removeItem()
    }
    
    class Product {
        +String id
        +String name
        +Decimal price
        +String description
        +updatePrice()
    }
    
    User ||--o{ Order : places
    Order }|--|| Product : contains`
  }
];

const TemplateGallery: React.FC<Props> = ({ onSelect, onClose }) => {
  return (
    <div className="bg-gray-800 border-b border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Diagram Templates</h3>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelect(template)}
            className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 cursor-pointer transition-colors border border-gray-600 hover:border-gray-500"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-white text-sm">{template.name}</h4>
              <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                {template.type}
              </span>
            </div>
            <p className="text-gray-400 text-xs">{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;