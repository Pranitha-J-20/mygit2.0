import { v4 as uuid } from 'uuid';

export type FileType = 'file' | 'directory';

export interface FileSystemItem {
  id: string;
  name: string;
  type: FileType;
  content?: string;
  language?: string;
  children?: FileSystemItem[];
}

export const createFileSystem = (): FileSystemItem => {
  return {
    id: uuid(),
    name: 'root',
    type: 'directory',
    children: [
      {
        id: uuid(),
        name: 'index.html',
        type: 'file',
        content: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My Project</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>',
        language: 'html'
      },
      {
        id: uuid(),
        name: 'style.css',
        type: 'file',
        content: 'body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n}',
        language: 'css'
      },
      {
        id: uuid(),
        name: 'app.js',
        type: 'file',
        content: 'console.log("Hello from JavaScript");',
        language: 'javascript'
      },
      {
        id: uuid(),
        name: 'src',
        type: 'directory',
        children: []
      }
    ]
  };
};

export const findItemInTree = (
  tree: FileSystemItem,
  id: string
): FileSystemItem | null => {
  if (tree.id === id) return tree;
  if (tree.children) {
    for (const child of tree.children) {
      const found = findItemInTree(child, id);
      if (found) return found;
    }
  }
  return null;
};

export const addFileToDirectory = (
  tree: FileSystemItem,
  directoryId: string,
  item: Omit<FileSystemItem, 'id'>
): FileSystemItem => {
  const newTree = JSON.parse(JSON.stringify(tree));
  const directory = findItemInTree(newTree, directoryId);
  
  if (directory && directory.type === 'directory') {
    if (!directory.children) directory.children = [];
    directory.children.push({
      ...item,
      id: uuid()
    });
  }
  
  return newTree;
};

export const updateFileContent = (
  tree: FileSystemItem,
  fileId: string,
  content: string
): FileSystemItem => {
  const newTree = JSON.parse(JSON.stringify(tree));
  const file = findItemInTree(newTree, fileId);
  
  if (file && file.type === 'file') {
    file.content = content;
  }
  
  return newTree;
};