import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Download, ZoomIn, ZoomOut, Move, Square } from 'lucide-react';
import { DiagramType } from '../types/diagram';
import InteractiveDiagram from './InteractiveDiagram';

interface Props {
  code: string;
  type: DiagramType;
  onCodeChange?: (code: string) => void;
}

const DiagramPreview: React.FC<Props> = ({ code, type, onCodeChange }) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [zoom, setZoom] = useState(1);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'Inter, system-ui, sans-serif',
    });
  }, []);

  useEffect(() => {
    renderDiagram();
  }, [code, type]);

  const renderDiagram = async () => {
    if (!code.trim()) {
      setSvgContent('');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { svg } = await mermaid.render(`diagram-${Date.now()}`, code);
      setSvgContent(svg);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to render diagram');
      setSvgContent('');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadSVG = () => {
    if (svgContent) {
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `diagram-${type}-${Date.now()}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const zoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.2));

  return (
    <div className="w-1/2 bg-gray-900 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <h3 className="text-sm font-medium text-gray-300">Preview</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setEditMode(!editMode)}
            className={`p-1.5 rounded transition-colors ${
              editMode ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-600'
            }`}
            title="Toggle edit mode"
          >
            <Move className="w-4 h-4" />
          </button>
          <button
            onClick={zoomOut}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs text-gray-400 min-w-[3rem] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={downloadSVG}
            disabled={!svgContent}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download SVG"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden bg-gray-900">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 max-w-md">
              <h4 className="text-red-400 font-medium mb-2">Diagram Error</h4>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        )}

        {!isLoading && !error && svgContent && (
          <InteractiveDiagram
            svgContent={svgContent}
            zoom={zoom}
            editMode={editMode}
            onCodeChange={onCodeChange || (() => {})}
            originalCode={code}
          />
        )}

        {!isLoading && !error && !svgContent && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Square className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Start typing to see your diagram</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagramPreview;