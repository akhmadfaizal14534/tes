import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

interface Props {
  svgContent: string;
  zoom: number;
  editMode: boolean;
  onCodeChange: (code: string) => void;
  originalCode: string;
}

const InteractiveDiagram: React.FC<Props> = ({ 
  svgContent, 
  zoom, 
  editMode, 
  onCodeChange, 
  originalCode 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.innerHTML = svgContent;
      
      // Make SVG elements interactive if in edit mode
      if (editMode) {
        const svg = svgRef.current.querySelector('svg');
        if (svg) {
          svg.style.cursor = 'grab';
          
          // Add click handlers to SVG elements for basic interaction
          const nodes = svg.querySelectorAll('rect, circle, ellipse, polygon');
          nodes.forEach(node => {
            node.setAttribute('style', node.getAttribute('style') + '; cursor: pointer; transition: opacity 0.2s;');
            
            node.addEventListener('mouseenter', () => {
              node.setAttribute('style', node.getAttribute('style') + '; opacity: 0.8;');
            });
            
            node.addEventListener('mouseleave', () => {
              node.setAttribute('style', node.getAttribute('style')?.replace('; opacity: 0.8;', '') || '');
            });
            
            node.addEventListener('click', (e) => {
              e.stopPropagation();
              // Here you could add more complex editing logic
              console.log('Node clicked:', node);
            });
          });
        }
      }
    }
  }, [svgContent, editMode]);

  const handleDrag = (e: any, data: any) => {
    setDragPosition({ x: data.x, y: data.y });
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-auto bg-gray-900"
      style={{ 
        backgroundImage: `radial-gradient(circle, #374151 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }}
    >
      <div className="min-w-full min-h-full flex items-center justify-center p-8">
        {editMode ? (
          <Draggable
            position={dragPosition}
            onDrag={handleDrag}
            handle=".drag-handle"
          >
            <div className="relative">
              <div 
                className="drag-handle absolute -top-6 -left-6 w-6 h-6 bg-blue-500 rounded cursor-move flex items-center justify-center opacity-75 hover:opacity-100"
                title="Drag to move"
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div
                ref={svgRef}
                style={{ 
                  transform: `scale(${zoom})`,
                  transformOrigin: 'center center',
                }}
                className="transition-transform duration-200"
              />
            </div>
          </Draggable>
        ) : (
          <div
            ref={svgRef}
            style={{ 
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
            }}
            className="transition-transform duration-200"
          />
        )}
      </div>
    </div>
  );
};

export default InteractiveDiagram;