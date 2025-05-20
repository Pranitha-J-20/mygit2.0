import styled from 'styled-components';

// EditorContainer should have a fixed height or its parent should
export const EditorContainer = styled.div`
  width: 100%;
  height: 49vh; // Fills the entire viewport height
  background: #23272e;
  border: 1px solid #44475a;
  padding: 5px;
`;

export const EditorHeader = styled.div`
  width: 50%;
  padding: 5px 0 16px 0;
  color: #50fa7b;
  font-family: 'Fira Mono', 'Consolas', monospace;
  font-size: 1.1em;
  font-weight: bold;
  letter-spacing: 0.5px;
`;