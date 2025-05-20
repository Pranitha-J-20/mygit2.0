import React, { useState, useRef, useEffect } from 'react';
import { FiTerminal, FiGitBranch, FiChevronDown } from 'react-icons/fi';
import * as S from './GitTerminal.styles';

interface GitTerminalProps {
  currentBranch: string;
  branches: string[];
  workingDir: string;
  onExecute: (command: string) => Promise<{ output: string; newBranch?: string }>;
  onChangeBranch: (branch: string) => void;
}

const GitTerminal: React.FC<GitTerminalProps> = ({
  currentBranch,
  branches,
  workingDir,
  onExecute,
  onChangeBranch,
}) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([
    `MyGit2.0 Terminal - Type "help" for commands`,
    `On branch ${currentBranch}`,
    `Working directory: ${workingDir}`
  ]);
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const commandLine = `$ ${input}`;
    setOutput(prev => [...prev, commandLine]);
    
    try {
      const { output: result, newBranch } = await onExecute(input);
      setOutput(prev => [...prev, result]);
      
      if (newBranch) {
        setOutput(prev => [...prev, `Switched to branch '${newBranch}'`]);
      }
    } catch (error) {
      setOutput(prev => [...prev, `Error: ${error instanceof Error ? error.message : String(error)}`]);
    }

    setInput('');
  };

  const handleBranchSelect = (branch: string) => {
    onChangeBranch(branch);
    setShowBranchDropdown(false);
    setOutput(prev => [...prev, `Switched to branch '${branch}'`]);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <S.TerminalContainer>
      <S.TerminalHeader>
        <FiTerminal />
        <span>Terminal</span>
        <S.BranchSelector>
          <S.CurrentBranch onClick={() => setShowBranchDropdown(!showBranchDropdown)}>
            <FiGitBranch />
            <span>{currentBranch}</span>
            <FiChevronDown />
          </S.CurrentBranch>
          {showBranchDropdown && (
            <S.BranchDropdown>
              {branches.map(branch => (
                <S.BranchItem 
                  key={branch}
                  active={branch === currentBranch}
                  onClick={() => handleBranchSelect(branch)}
                >
                  {branch}
                </S.BranchItem>
              ))}
            </S.BranchDropdown>
          )}
        </S.BranchSelector>
      </S.TerminalHeader>
      <S.TerminalOutput ref={terminalRef}>
        {output.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </S.TerminalOutput>
      <S.TerminalForm onSubmit={handleSubmit}>
        <S.Prompt>
          <span>{workingDir}</span>
          <span style={{ color: '#50fa7b' }}>({currentBranch})</span>
          <span>$</span>
        </S.Prompt>
        <S.TerminalInput
          className="terminal-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter git command..."
          autoFocus
          autoComplete="off"

        />
      </S.TerminalForm>
    </S.TerminalContainer>
  );
};

export default GitTerminal;