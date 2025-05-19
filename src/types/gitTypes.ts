// src/types/gitTypes.ts
export interface GitStatus {
  current: string;
  files: GitFileStatus[];
  ahead?: number;
  behind?: number;
}

export interface GitFileStatus {
  path: string;
  index: string;
  working_dir: string;
}

export interface GitCommit {
  hash: string;
  message: string;
  author: string;
  date: string;
}

export interface GitBranchSummary {
  current: string;
  branches: Record<string, GitBranchInfo>;
}

export interface GitBranchInfo {
  current: boolean;
  name: string;
  commit: string;
  label: string;
}