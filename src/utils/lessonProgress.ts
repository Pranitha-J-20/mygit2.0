import { Lesson, LessonStep } from '../types';

export const completeStep = (lessons: Lesson[], lessonId: string, stepId: number): Lesson[] => {
  return lessons.map(lesson => {
    if (lesson.id === lessonId) {
      const steps = lesson.steps.map(step => {
        if (step.id === stepId) {
          return { ...step, completed: true };
        }
        return step;
      });
      
      // Check if all steps are completed
      const allStepsCompleted = steps.every(step => step.completed);
      
      return {
        ...lesson,
        steps,
        completed: allStepsCompleted
      };
    }
    return lesson;
  });
};

export const getNextStep = (lessons: Lesson[], lessonId: string, currentStepId: number) => {
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) return null;
  
  const currentStepIndex = lesson.steps.findIndex(step => step.id === currentStepId);
  if (currentStepIndex === -1) return null;
  
  // Check if there's a next step in the current lesson
  if (currentStepIndex < lesson.steps.length - 1) {
    return {
      lessonId,
      stepId: lesson.steps[currentStepIndex + 1].id
    };
  }
  
  // Find the next lesson
  const currentLessonIndex = lessons.findIndex(l => l.id === lessonId);
  if (currentLessonIndex < lessons.length - 1) {
    const nextLesson = lessons[currentLessonIndex + 1];
    if (nextLesson.steps.length > 0) {
      return {
        lessonId: nextLesson.id,
        stepId: nextLesson.steps[0].id
      };
    }
  }
  
  return null;
};