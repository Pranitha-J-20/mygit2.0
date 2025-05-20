// src/components/Sidebar/Sidebar.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FiFolder,
  FiFile,
  FiGitBranch,
  FiPlus,
  FiTrash2,
  FiRefreshCw,
  FiCheckCircle,
  FiCircle,
  FiGitCommit
} from 'react-icons/fi';
import { File } from '../../types/filetypes';

interface SidebarProps {
  files: File[];
  gitStatus: {
    current: string;
    staged: string[];      // List of staged file names
    changed: string[];     // List of changed (unstaged) file names
    commits: {             // Simple commit graph data
      hash: string;
      message: string;
      branch?: string;
    }[];
  };
  onSelectFile: (fileName: string) => void;
  onAddFile: (fileName: string) => void;
  onDeleteFile: (fileName: string) => void;
  onRefresh: () => void;
}

const SidebarContainer = styled.div`
  width: 250px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  padding: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  font-weight: 600;
  font-size: 0.9em;
  text-transform: uppercase;
`;

const SectionContent = styled.div`
  padding: 4px 0;
`;

const FileItem = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  cursor: pointer;
  background-color: ${({ selected, theme }) => 
    selected ? theme.colors.accent : 'transparent'};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent}80;
  }
`;

const FileIcon = styled.span`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

const FileName = styled.span`
  flex: 1;
`;

const FileActions = styled.div`
  display: none;
  ${FileItem}:hover & {
    display: flex;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 2px;
  margin-left: 4px;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const GitStatusItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  font-size: 0.9em;
`;

const GitStatusIcon = styled.span`
  margin-right: 8px;
`;

const Sidebar: React.FC<SidebarProps> = ({
  files,
  gitStatus,
  onSelectFile,
  onAddFile,
  onDeleteFile,
  onRefresh,
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState('');

  const handleFileClick = (fileName: string) => {
    setSelectedFile(fileName);
    onSelectFile(fileName);
  };

  const handleAddFile = () => {
    if (newFileName.trim()) {
      onAddFile(newFileName);
      setNewFileName('');
    }
  };

  return (
    <SidebarContainer>
      {/* Explorer Section */}
      <Section>
        <SectionHeader>
          <span>Explorer</span>
          <div>
            <ActionButton onClick={onRefresh} title="Refresh">
              <FiRefreshCw size={14} />
            </ActionButton>
          </div>
        </SectionHeader>
        <SectionContent>
          {files.map((file) => (
            <FileItem 
              key={file.id}
              selected={selectedFile === file.name}
              onClick={() => handleFileClick(file.name)}
            >
              <FileIcon>
                {file.type === 'directory' ? <FiFolder /> : <FiFile />}
              </FileIcon>
              <FileName>{file.name}</FileName>
              <FileActions>
                <ActionButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteFile(file.name);
                  }}
                  title="Delete"
                >
                  <FiTrash2 size={14} />
                </ActionButton>
              </FileActions>
            </FileItem>
          ))}
          <div style={{ display: 'flex', padding: '8px' }}>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="New file name"
              style={{ flex: 1, marginRight: '4px' }}
            />
            <ActionButton onClick={handleAddFile} title="Add File">
              <FiPlus size={14} />
            </ActionButton>
          </div>
        </SectionContent>
      </Section>

      {/* Source Control Section */}
      <Section>
        <SectionHeader>
          <span>Source Control</span>
          <GitStatusIcon>
            <FiGitBranch />
          </GitStatusIcon>
        </SectionHeader>
        <SectionContent>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Staged Changes</div>
          {gitStatus?.staged?.length === 0 && <div style={{ color: '#888', fontSize: '0.9em' }}>No staged files</div>}
          {gitStatus?.staged?.map((file) => (
            <FileItem key={file}>
              <FileName>{file}</FileName>
              <span style={{ color: '#50fa7b' }}><FiCheckCircle size={14} /></span>
            </FileItem>
          ))}

          <div style={{ fontWeight: 600, margin: '8px 0 4px 0' }}>Uncommitted Changes</div>
          {gitStatus?.changed?.length === 0 && <div style={{ color: '#888', fontSize: '0.9em' }}>No changes</div>}
          {gitStatus?.changed?.map((file) => (
            <FileItem key={file}>
              <FileName>{file}</FileName>
              <span style={{ color: '#f1fa8c' }}><FiCircle size={14} /></span>
            </FileItem>
          ))}
        </SectionContent>
      </Section>

      {/* Git Graph Section */}
      <Section>
        <SectionHeader>
          <span>Graph</span>
          <FiGitCommit />
        </SectionHeader>
        <SectionContent>
          {gitStatus?.commits?.map((commit, idx) => (
            <div key={commit.hash} style={{ display: 'flex', alignItems: 'center', fontSize: '0.9em', marginBottom: 4 }}>
              <span style={{ color: '#bd93f9', marginRight: 6 }}>●</span>
              <span style={{ fontWeight: commit.branch ? 700 : 400 }}>{commit.message}</span>
              {commit.branch && (
                <span style={{ color: '#50fa7b', marginLeft: 8, fontSize: '0.8em', border: '1px solid #50fa7b', borderRadius: 4, padding: '0 4px' }}>
                  {commit.branch}
                </span>
              )}
            </div>
          ))}
        </SectionContent>
      </Section>
    </SidebarContainer>
  );
};

export default Sidebar;