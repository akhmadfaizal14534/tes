import { useState, useCallback } from 'react';
import mermaid from 'mermaid';
import { DiagramType } from '../types/diagram';

export const useDiagramEngine = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const renderMermaid = useCallback(async (code: string): Promise<string> => {
    try {
      const { svg } = await mermaid.render(`diagram-${Date.now()}`, code);
      return svg;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Mermaid rendering failed');
    }
  }, []);

  const renderPlantUML = useCallback(async (code: string): Promise<string> => {
    // Using Kroki service for PlantUML rendering
    const encoded = btoa(unescape(encodeURIComponent(code)));
    const url = `https://kroki.io/plantuml/svg/${encoded}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('PlantUML rendering failed');
      return await response.text();
    } catch (err) {
      throw new Error('Failed to connect to PlantUML service');
    }
  }, []);

  const renderDiagram = useCallback(async (code: string, type: DiagramType): Promise<string> => {
    setIsLoading(true);
    setError('');

    try {
      let svg = '';
      
      switch (type) {
        case 'flowchart':
        case 'sequence':
        case 'class':
        case 'gantt':
        case 'er':
        case 'mindmap':
          svg = await renderMermaid(code);
          break;
        default:
          svg = await renderMermaid(code);
      }

      return svg;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [renderMermaid, renderPlantUML]);

  return {
    renderDiagram,
    isLoading,
    error,
    clearError: () => setError('')
  };
};