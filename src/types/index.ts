export interface Lesson {
  id: string;
  title: string;
  description: string;
  steps: LessonStep[];
  completed: boolean;
}

export interface LessonStep {
  id: number;
  title: string;
  description: string;
  command?: string;
  completed: boolean;
}