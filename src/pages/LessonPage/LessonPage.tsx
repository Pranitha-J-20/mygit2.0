import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiSave } from 'react-icons/fi';
import CodeEditor from '../../components/Editor/Editor';
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
const workingDir = '/my-project';
const LessonPage: React.FC<LessonPageProps> = ({
     lesson,
  currentStep,
  onCompleteStep,
  onNextStep
}) => {
  const [currentBranch, setCurrentBranch] = useState('main');
  const [branches, setBranches] = useState(['main', 'develop']);
 const [files, setFiles] = useState<Record<string, string>>({
  'index.html': '<!DOCTYPE html>\n<html>\n...',
  'app.js': 'console.log("Hello");'
});

const [staged, setStaged] = useState<string[]>([]);
const [changed, setChanged] = useState<string[]>([]);
const [commits, setCommits] = useState<{ hash: string; message: string; branch?: string }[]>([]);
const [unsaved, setUnsaved] = useState<string[]>([]);

const handleDeleteFile = (fileName: string) => {
  setFiles(prev => {
    const newFiles = { ...prev };
    delete newFiles[fileName];
    return newFiles;
  });
};
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
    setUnsaved(prev => prev.includes(currentFile) ? prev : [...prev, currentFile]);
  };

  const handleStageFile = (fileName: string) => {
    setStaged(prev => [...prev, fileName]);
    setChanged(prev => prev.filter(file => file !== fileName));
  };

  const handleCommit = (message: string) => {
    const newCommit = { hash: Date.now().toString(), message, branch: currentBranch };
    setCommits(prev => [...prev, newCommit]);
    setStaged([]);
  };

  const handleExecute = async (command: string): Promise<{ output: string; newBranch?: string }> => {
    try {
      if (command === 'git add .') {
        // Stage all changed files
        setStaged(prev => [...prev, ...changed.filter(f => !prev.includes(f))]);
        setChanged([]);
        return { output: 'Files staged successfully' };
      }
      if (command.startsWith('git add ')) {
        const fileToStage = command.split(' ')[2];
        if (changed.includes(fileToStage)) {
          setStaged(prev => [...prev, fileToStage]);
          setChanged(prev => prev.filter(f => f !== fileToStage));
          return { output: `Staged ${fileToStage}` };
        }
      }
      if (command.startsWith('git commit -m')) {
        const message = command.match(/-m "([^"]*)"/)?.[1] || 'No message';
        await git.commit(message);
        handleCommit(message); // <-- Add this to update your commits state
        setStaged([]);         // <-- Clear staged files
        return { output: `Committed with message: "${message}"` };
      }
      if (command === 'git status') {
        const status = await git.status();
        return { output: JSON.stringify(status, null, 2) };
      }

      if (command === 'git branch') {
        return { output: branches.join('\n') };
      }
      if (command.startsWith('git checkout')) {
        const branchName = command.split(' ')[2];
        if (branches.includes(branchName)) {
          setCurrentBranch(branchName);
          return { output: `Switched to branch '${branchName}'`, newBranch: branchName };
        } else {
          throw new Error(`Branch '${branchName}' not found`);
        }
      }
      if (command.startsWith('git branch')) {
        const newBranch = command.split(' ')[2];
        if (!branches.includes(newBranch)) {
          setBranches(prev => [...prev, newBranch]);
          setCurrentBranch(newBranch); // Automatically switch to the new branch
          return { output: `Created and switched to branch ${newBranch}`, newBranch };
        }
      }
      return { output: `Command executed: ${command}` };
    } catch (error) {
      return { output: String(error) };
    }
  };

  const [status, setStatus] = useState<any>(null);

  async function refreshGitState(): Promise<void> {
    try {
      const gitStatus = await git.status();
      setStatus(gitStatus);
    } catch (error) {
      setStatus({ error: String(error) });
    }
  }

  function handleAddFile(fileName: string): void {
    if (!fileName || files[fileName]) return;
    setFiles(prev => ({
      ...prev,
      [fileName]: ''
    }));
    setChanged(prev => [...prev, fileName]); // <-- Add this line
  }

  function handleSaveFile(fileName: string) {
    setUnsaved(prev => prev.filter(f => f !== fileName));
    setChanged(prev => (
      staged.includes(fileName) || prev.includes(fileName)
        ? prev
        : [...prev, fileName]
    ));
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (unsaved.includes(currentFile)) handleSaveFile(currentFile);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentFile, unsaved]); // <-- Make sure these are in the dependency array

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
  files={Object.keys(files).map(name => ({
    id: name,
    name,
    type: 'file',
    language: name.split('.').pop()
  }))}
  gitStatus={{
    current: currentBranch,
    staged,
    changed,
    commits,
  }}
  onSelectFile={setCurrentFile}
  onAddFile={handleAddFile}
  onDeleteFile={handleDeleteFile}
  onRefresh={() => refreshGitState()}
/>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
          <span style={{ fontWeight: 600 }}>{currentFile}</span>
          {unsaved.includes(currentFile) && (
            <span style={{ color: '#f1fa8c', marginLeft: 8, fontSize: 12 }}>(unsaved changes)</span>
          )}
          <button
            style={{
              marginLeft: 'auto',
              background: '#282c34',
              color: '#50fa7b',
              border: 'none',
              borderRadius: 4,
              padding: '4px 12px',
              cursor: unsaved.includes(currentFile) ? 'pointer' : 'not-allowed',
              opacity: unsaved.includes(currentFile) ? 1 : 0.5
            }}
            onClick={() => handleSaveFile(currentFile)}
            disabled={!unsaved.includes(currentFile)}
            title="Save (Ctrl+S)"
          >
            <FiSave style={{ marginRight: 4 }} />
            Save
          </button>
        </div>
        <div style={{ flex: 1 }}>
          <CodeEditor 
            content={files[currentFile] || ''}
            language={fileList.find(f => f.name === currentFile)?.language || 'text'}
            onChange={handleFileChange}
            fileName={currentFile}
          />
        </div>
        
<GitTerminal
  currentBranch={currentBranch}
  branches={branches}
  workingDir={workingDir}
  onExecute={handleExecute}
  onChangeBranch={setCurrentBranch}
/>      </div>
    </div>
  );
};

export default LessonPage;