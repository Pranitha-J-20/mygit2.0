import React, { useState, useRef, useEffect } from 'react';
import { FiTerminal } from 'react-icons/fi';
import * as S from './GitTerminal.styles';

interface GitTerminalProps {
  onExecute: (command: string) => Promise<string>;
}

const GitTerminal: React.FC<GitTerminalProps> = ({ onExecute }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['MyGit2.0 Terminal - Type "help" for commands']);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setOutput(prev => [...prev, `$ ${input}`]);
    
    try {
      const result = await onExecute(input);
      setOutput(prev => [...prev, result]);
    } catch (error) {
      setOutput(prev => [...prev, `Error: ${error instanceof Error ? error.message : String(error)}`]);
    }

    setInput('');
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
      </S.TerminalHeader>
      <S.TerminalOutput ref={terminalRef}>
        {output.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </S.TerminalOutput>
      <S.TerminalForm onSubmit={handleSubmit}>
        <span>$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter git command..."
          autoFocus
        />
      </S.TerminalForm>
    </S.TerminalContainer>
  );
};

export default GitTerminal;