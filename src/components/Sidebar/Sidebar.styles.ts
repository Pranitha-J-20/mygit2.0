import styled from 'styled-components';

interface SidebarContainerProps {
  expanded: boolean;
}

export const SidebarContainer = styled.div<SidebarContainerProps>`
  width: ${({ expanded }) => (expanded ? '250px' : '40px')};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  height: 100%;
  transition: width 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const SidebarHeader = styled.div`
  padding: 10px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Section = styled.div`
  margin-top: 10px;
`;

export const SectionTitle = styled.div`
  padding: 6px 10px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.7;
`;

export const FileTree = styled.div`
  padding-left: 10px;
`;

export const FileItem = styled.div`
  padding: 4px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 13px;
  border-radius: 3px;
  margin-right: 10px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const FileIcon = styled.div`
  width: 16px;
  height: 16px;
  background-color: #fff;
  opacity: 0.6;
`;

export const GitInfo = styled.div`
  padding: 6px 10px;
  font-size: 12px;
`;

export const GitInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 4px 0;
`;