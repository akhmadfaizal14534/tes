export type DiagramType = 'flowchart' | 'sequence' | 'class' | 'gantt' | 'er' | 'mindmap';

export interface DiagramTemplate {
  id: string;
  name: string;
  type: DiagramType;
  description: string;
  code: string;
}

export interface DiagramNode {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DiagramEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}