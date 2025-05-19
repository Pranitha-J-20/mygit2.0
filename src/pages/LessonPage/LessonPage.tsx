import React, { useState } from 'react';
import styled from 'styled-components';
import Editor from '../../components/Editor/Editor';
import Sidebar from '../../components/Sidebar/Sidebar';
import GitTerminal from '../../components/GitTerminal/GitTerminal';
import { MockGit } from '../../utils/gitUtils';
import { File } from '../../types/filetypes';
import { Lesson, LessonStep } from '../../types/lessonTypes';

interface LessonPageProps {
  lesson: Lesson;
  currentStep: LessonStep;
  onCompleteStep: () => void;
  onNextStep: () => void;
}
const LessonPage: React.FC<LessonPageProps> = ({
     lesson,
  currentStep,
  onCompleteStep,
  onNextStep
}) => {
  const [files, setFiles] = useState<Record<string, string>>({
    'index.html': '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Project</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>',
    'app.js': 'console.log("Hello from JavaScript");'
  });

  const [fileList] = useState<File[]>([
    { id: '1', name: 'index.html', type: 'file', language: 'html' },
    { id: '2', name: 'app.js', type: 'file', language: 'javascript' }
  ]);

  const [currentFile, setCurrentFile] = useState('index.html');
  const [git] = useState(new MockGit());

  const handleFileChange = (content: string) => {
    setFiles(prev => ({
      ...prev,
      [currentFile]: content
    }));
  };

  const handleExecute = async (command: string): Promise<string> => {
    try {
      if (command === 'git add .') {
        await git.add([]);
        return 'Files staged successfully';
      }
      if (command.startsWith('git commit')) {
        const message = command.match(/-m "([^"]*)"/)?.[1] || 'No message';
        await git.commit(message);
        return `Committed with message: "${message}"`;
      }
      if (command === 'git status') {
        const status = await git.status();
        return JSON.stringify(status, null, 2);
      }
      return `Command executed: ${command}`;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar 
        files={fileList} 
        onSelectFile={(fileName) => setCurrentFile(fileName)}
      />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <Editor 
            content={files[currentFile] || ''}
            language={fileList.find(f => f.name === currentFile)?.language || 'text'}
            onChange={handleFileChange}
          />
        </div>
        
        <GitTerminal onExecute={handleExecute} />
      </div>
    </div>
  );
};

export default LessonPage;