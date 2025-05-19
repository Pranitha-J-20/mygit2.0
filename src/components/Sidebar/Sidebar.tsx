// src/components/Sidebar/Sidebar.tsx
import React from 'react';
import styled from 'styled-components';
import { File } from '../../types/filetypes'

interface SidebarProps {
  files: File[];
  onSelectFile: (fileName: string) => void; // Add this prop
  gitStatus?: any;
}

const SidebarContainer = styled.div`
  width: 250px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  height: 100%;
  overflow-y: auto;
`;

const FileItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ files, onSelectFile, gitStatus }) => {
  return (
    <SidebarContainer>
      {files.map((file) => (
        <FileItem 
          key={file.id} 
          onClick={() => onSelectFile(file.name)}
        >
          {file.name}
        </FileItem>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;