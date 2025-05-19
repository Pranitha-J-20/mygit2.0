import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        sizes: {
            statusBarHeight: string;
        };
        colors: {
            background: string;
            text: string;
            secondary: string;
            accent: string;
            // add other color properties if needed
        };
    }
}

export const StatusBarContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    color: #fff;
    height: ${({ theme }) => theme.sizes.statusBarHeight};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 12px;
`;

export const StatusBarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const StatusBarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;