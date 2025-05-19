// src/types/lessonTypes.ts
export interface LessonStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  command?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  steps: LessonStep[];
  completed: boolean;
}