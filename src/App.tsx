import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/globalStyles';
import { theme } from './styles/theme';
import HomePage from './pages/HomePage/HomePage';
import LessonPage from './pages/LessonPage/LessonPage';
import { Lesson, LessonStep } from './types/lessonTypes';


// Temporary mock data for development

const mockLesson: Lesson = {
  id: '1',
  title: 'Introduction to Git',
  description: 'Learn the basics of version control',
  completed: false,
  steps: [
    {
      id: 1,
      title: 'Initialize repository',
      description: 'Create a new Git repository',
      completed: false,
      command: 'git init'
    }
  ]
};

const mockStep: LessonStep = mockLesson.steps[0];


const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/lesson/:id"
            element={
              <LessonPage
                lesson={mockLesson}
                currentStep={mockLesson.steps[0]}
                onCompleteStep={() => console.log('Step completed')}
                onNextStep={() => console.log('Next step')}
              />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;