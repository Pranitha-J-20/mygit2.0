import React from 'react';
import { FiGitBranch, FiCircle } from 'react-icons/fi';
import * as S from './StatusBar.styles';


interface StatusBarProps {
  gitBranch: string;
  gitChanges: number;
  currentFile: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ gitBranch, gitChanges, currentFile }) => {
  return (
    <S.StatusBarContainer>
      <S.StatusBarSection>
        <S.StatusBarItem>
          <FiGitBranch />
          <span>{gitBranch}</span>
        </S.StatusBarItem>
        {gitChanges > 0 && (
          <S.StatusBarItem>
            <FiCircle />
            <span>{gitChanges}</span>
          </S.StatusBarItem>
        )}
      </S.StatusBarSection>
      
      <S.StatusBarSection>
        <S.StatusBarItem>
          <span>{currentFile}</span>
        </S.StatusBarItem>
      </S.StatusBarSection>
    </S.StatusBarContainer>
  );
};

export default StatusBar;