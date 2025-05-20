// src/types/fileTypes.ts
export interface File {
  id: string;
  name: string;
  type: 'file' | 'directory';
  language?: string;
  content?: string;
}