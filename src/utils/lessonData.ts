import { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Git',
    description: 'Learn the basics of Git version control',
    completed: false,
    steps: [
      {
        id: 1,
        title: 'Initialize a repository',
        description: 'Create a new Git repository',
        command: 'git init',
        completed: false,
      },
      {
        id: 2,
        title: 'Check repository status',
        description: 'View the status of your repository',
        command: 'git status',
        completed: false,
      },
    ],
  },
  {
    id: '2',
    title: 'Making Commits',
    description: 'Learn how to commit changes to your repository',
    completed: false,
    steps: [
      {
        id: 1,
        title: 'Stage changes',
        description: 'Add files to the staging area',
        command: 'git add .',
        completed: false,
      },
      {
        id: 2,
        title: 'Create a commit',
        description: 'Commit your staged changes',
        command: 'git commit -m "Your message"',
        completed: false,
      },
    ],
  },
];