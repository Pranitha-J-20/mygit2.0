import React from 'react';
import Editor from '@monaco-editor/react';
import * as S from './Editor.styles';

interface EditorProps {
  content: string;
  language?: string;
  onChange: (value: string) => void;
  fileName?: string;
}

const CodeEditor: React.FC<EditorProps> = ({ content, language = 'javascript', onChange, fileName }) => {
  const handleChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  return (
    <S.EditorContainer>
      <Editor
        height="100%"
        language={language}
        value={content}
        theme="vs-dark"
        onChange={handleChange}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
        }}
      />
    </S.EditorContainer>
  );
};

export default CodeEditor;