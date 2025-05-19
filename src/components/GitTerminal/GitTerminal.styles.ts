import styled from 'styled-components';

export const TerminalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: #fff;
  font-family: 'Courier New', monospace;
  height: 250px;
  display: flex;
  flex-direction: column;
`;

export const TerminalHeader = styled.div`
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
`;

export const TerminalOutput = styled.div`
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  white-space: pre-wrap;
  line-height: 1.5;
  font-size: 14px;
`;

export const TerminalForm = styled.form`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.1);
  gap: 8px;

  input {
    flex: 1;
    background: transparent;
    border: none;
    color: #fff;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    outline: none;
  }
`;