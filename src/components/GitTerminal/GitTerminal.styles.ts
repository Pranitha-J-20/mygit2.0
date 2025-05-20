import styled from 'styled-components';



export const TerminalContainer = styled.div`
  background-color: #1e1e1e;
  color: #f8f8f2;
  font-family: 'Courier New', monospace;
  height: 240px;
  display: flex;
  flex-direction: column;
`;

export const TerminalHeader = styled.div`
  padding: 8px 12px;
  background-color: #252526;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
`;

export const TerminalOutput = styled.div`
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  white-space: pre-wrap;
  line-height: 1.5;
  font-size: 14px;
  background-color: #1e1e1e;
`;

export const TerminalForm = styled.form`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #252526;
  gap: 8px;
`;

export const Prompt = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #bd93f9;
  font-weight: bold;
`;

export const BranchSelector = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

export const CurrentBranch = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  font-size: 0.9em;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const BranchDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #252526;
  border: 1px solid #444;
  border-radius: 4px;
  z-index: 100;
  min-width: 150px;
  max-height: 200px;
  overflow-y: auto;
`;

export const BranchItem = styled.div<{ active?: boolean }>`
  padding: 6px 12px;
  background-color: ${({ active }) => active ? '#44475a' : 'transparent'};
  color: ${({ active }) => active ? '#50fa7b' : '#f8f8f2'};

  &:hover {
    background-color: #44475a;
  }
`;

export const TerminalInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: #f8f8f2;
  font-family: 'Fira Mono', 'Consolas', monospace;
  font-size: 1em;
  width: 100%;
  caret-color: #50fa7b; /* Green caret */
  padding: 0;
  margin: 0;
  box-shadow: none;

  &::placeholder {
    color: #44475a;
    opacity: 1;
  }
`;