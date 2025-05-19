import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Link } from 'react-router-dom';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      text: string;
      secondary: string;
      accent: string;
    };
  }
}

export const theme = {
  colors: {
    background: '#fff',
    text: '#222',
    secondary: '#f0f0f0', // Add a suitable color value for secondary
    accent: '#007bff',     // Optionally add accent if used elsewhere
  },
};

const HomeContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.text};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
`;

const LessonCard = styled(Link)`
  display: block;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const HomePage: React.FC = () => {
  // Mock lessons data - replace with your actual data source
  const lessons = [
    { id: '1', title: 'Introduction to Git', description: 'Learn basic version control' },
    { id: '2', title: 'Branching and Merging', description: 'Work with Git branches' }
  ];

  return (
    <HomeContainer>
      <Title>Welcome to MyGit2.0</Title>
      <h2>Available Lessons</h2>
      
      {lessons.map(lesson => (
        <LessonCard key={lesson.id} to={`/lesson/${lesson.id}`}>
          <h3>{lesson.title}</h3>
          <p>{lesson.description}</p>
        </LessonCard>
      ))}
    </HomeContainer>
  );
};

export default HomePage;