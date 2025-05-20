import styled from 'styled-components';

// EditorContainer should have a fixed height or its parent should
export const EditorContainer = styled.div`
  width: 100%;
  height: 400px; // or 100vh, or whatever fits your layout
  overflow: hidden;
  background: #23272e;
  border: 2px solid #44475a;
  padding: 16px;
  box-sizing: border-box;
`;

export const EditorHeader = styled.div`
  width: 100%;
  padding: 8px 0 16px 0;
  color: #50fa7b;
  font-family: 'Fira Mono', 'Consolas', monospace;
  font-size: 1.1em;
  font-weight: bold;
  letter-spacing: 0.5px;
`;