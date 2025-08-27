import React, { useEffect, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { Copy, Play, RotateCcw } from 'lucide-react';

interface Props {
  code: string;
  onChange: (code: string) => void;
  language: string;
}

const CodeEditor: React.FC<Props> = ({ code, onChange, language }) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.trigger('keyboard', 'editor.action.formatDocument', {});
    }
  };

  return (
    <div className="w-1/2 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-750 border-b border-gray-700">
        <h3 className="text-sm font-medium text-gray-300">Code Editor</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={copyToClipboard}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors"
            title="Copy code"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={formatCode}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors"
            title="Format code"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1">
        <Editor
          height="100%"
          language="text"
          value={code}
          onChange={(value) => onChange(value || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            folding: true,
            lineNumbersMinChars: 3,
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      <div className="px-4 py-2 bg-gray-750 border-t border-gray-700">
        <p className="text-xs text-gray-400">
          Type your {language} diagram code above. Changes will be reflected in real-time.
        </p>
      </div>
    </div>
  );
};

export default CodeEditor;