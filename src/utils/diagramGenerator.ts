import { DiagramType } from '../types/diagram';

export const generateDiagramCode = (prompt: string, type: DiagramType): string => {
  // Simple AI-like logic to generate diagram code based on prompts
  const normalizedPrompt = prompt.toLowerCase();

  switch (type) {
    case 'flowchart':
      return generateFlowchartCode(normalizedPrompt);
    case 'sequence':
      return generateSequenceCode(normalizedPrompt);
    case 'class':
      return generateClassCode(normalizedPrompt);
    case 'gantt':
      return generateGanttCode(normalizedPrompt);
    case 'er':
      return generateERCode(normalizedPrompt);
    case 'mindmap':
      return generateMindmapCode(normalizedPrompt);
    default:
      return generateFlowchartCode(normalizedPrompt);
  }
};

const generateFlowchartCode = (prompt: string): string => {
  if (prompt.includes('login') || prompt.includes('auth')) {
    return `flowchart TD
    A[User Login] --> B{Valid Credentials?}
    B -->|Yes| C[Generate Session]
    B -->|No| D[Show Error]
    C --> E[Redirect to Dashboard]
    D --> A`;
  }

  if (prompt.includes('order') || prompt.includes('purchase')) {
    return `flowchart TD
    A[Add to Cart] --> B{Cart Empty?}
    B -->|No| C[Review Order]
    B -->|Yes| A
    C --> D{Payment Valid?}
    D -->|Yes| E[Process Order]
    D -->|No| F[Payment Error]
    E --> G[Send Confirmation]
    F --> C`;
  }

  return `flowchart TD
    A[Start] --> B[Process Input]
    B --> C{Validation}
    C -->|Valid| D[Execute Action]
    C -->|Invalid| E[Handle Error]
    D --> F[Return Result]
    E --> F`;
};

const generateSequenceCode = (prompt: string): string => {
  if (prompt.includes('login') || prompt.includes('auth')) {
    return `sequenceDiagram
    participant User
    participant Frontend
    participant AuthAPI
    participant Database
    
    User->>Frontend: Enter credentials
    Frontend->>AuthAPI: POST /login
    AuthAPI->>Database: Verify user
    Database-->>AuthAPI: User data
    AuthAPI-->>Frontend: JWT token
    Frontend-->>User: Login success`;
  }

  return `sequenceDiagram
    participant Client
    participant Server
    participant Database
    
    Client->>Server: Request data
    Server->>Database: Query
    Database-->>Server: Results
    Server-->>Client: Response`;
};

const generateClassCode = (prompt: string): string => {
  if (prompt.includes('inventory') || prompt.includes('product')) {
    return `classDiagram
    class Product {
        +String id
        +String name
        +Decimal price
        +Integer stock
        +updateStock()
        +calculateDiscount()
    }
    
    class Category {
        +String id
        +String name
        +String description
        +addProduct()
    }
    
    class Inventory {
        +trackProduct()
        +updateQuantity()
        +checkAvailability()
    }
    
    Category ||--o{ Product
    Inventory ||--|| Product`;
  }

  return `classDiagram
    class BaseEntity {
        +String id
        +Date createdAt
        +Date updatedAt
        +save()
        +delete()
    }
    
    class User {
        +String name
        +String email
        +login()
        +logout()
    }
    
    BaseEntity <|-- User`;
};

const generateGanttCode = (prompt: string): string => {
  return `gantt
    title ${prompt.includes('project') ? 'Project Timeline' : 'Development Schedule'}
    dateFormat  YYYY-MM-DD
    section Planning
    Requirements    :done, req, 2024-01-01,2024-01-14
    Design         :done, des, 2024-01-15,2024-01-28
    section Development
    Backend        :active, dev1, 2024-01-29,2024-03-15
    Frontend       :active, dev2, 2024-02-12,2024-03-30
    section Testing
    Integration    :test, 2024-03-16,2024-04-07
    Deployment     :deploy, 2024-04-08,2024-04-15`;
};

const generateERCode = (prompt: string): string => {
  if (prompt.includes('blog') || prompt.includes('post')) {
    return `erDiagram
    USER ||--o{ POST : writes
    POST ||--o{ COMMENT : has
    USER ||--o{ COMMENT : makes
    CATEGORY ||--o{ POST : contains
    
    USER {
        string id PK
        string username UK
        string email UK
        datetime created_at
    }
    
    POST {
        string id PK
        string title
        text content
        string user_id FK
        string category_id FK
        datetime published_at
    }`;
  }

  return `erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ ORDER-ITEM : contains
    PRODUCT ||--o{ ORDER-ITEM : "appears in"
    
    CUSTOMER {
        string id PK
        string name
        string email UK
    }
    
    ORDER {
        string id PK
        date order_date
        string customer_id FK
    }`;
};

const generateMindmapCode = (prompt: string): string => {
  return `mindmap
  root((${prompt}))
    Planning
      Research
      Requirements
      Design
    Development
      Frontend
      Backend
      Database
    Testing
      Unit Tests
      Integration
      User Testing
    Deployment
      Staging
      Production
      Monitoring`;
};