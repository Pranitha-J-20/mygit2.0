import React from 'react';
import styled from 'styled-components';

const GraphContainer = styled.div`
  margin-top: 20px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  white-space: pre;
  line-height: 1.4;
  background-color: #1e1e1e;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
`;

interface GitGraphProps {
  logs: any[];
}

const GitGraph: React.FC<GitGraphProps> = ({ logs }) => {
  return (
    <GraphContainer>
      <h4>Commit History:</h4>
      {logs.length > 0 ? (
        logs.map((log, index) => (
          <div key={index}>{log.message}</div>
        ))
      ) : (
        <div>No commits yet</div>
      )}
    </GraphContainer>
  );
};

export default GitGraph;