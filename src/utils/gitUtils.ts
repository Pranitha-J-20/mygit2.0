// src/utils/gitUtils.ts
import { GitCommit, GitStatus, GitBranchSummary } from '../types/gitTypes';

export class MockGit {
  private stagedFiles: string[] = [];
  private commits: GitCommit[] = [];
  private branches: Record<string, GitCommit[]> = { main: [] };
  private currentBranch = 'main';

  async init(): Promise<void> {
    this.stagedFiles = [];
    this.commits = [];
    this.branches = { main: [] };
    this.currentBranch = 'main';
  }

  async add(files: string[]): Promise<void> {
    this.stagedFiles = Array.from(new Set(this.stagedFiles.concat(files)));
  }

  async commit(message: string): Promise<void> {
    const newCommit: GitCommit = {
      hash: Math.random().toString(36).substring(2, 9),
      message,
      author: 'user',
      date: new Date().toISOString()
    };
    this.commits.unshift(newCommit);
    this.branches[this.currentBranch].unshift(newCommit);
    this.stagedFiles = [];
  }

  async status(): Promise<GitStatus> {
    return {
      current: this.currentBranch,
      files: this.stagedFiles.map(path => ({
        path,
        index: 'M',
        working_dir: 'M'
      }))
    };
  }

  async branch(args: string[]): Promise<GitBranchSummary> {
    if (args.length > 0) {
      const branchName = args[0];
      if (!this.branches[branchName]) {
        this.branches[branchName] = [...this.branches[this.currentBranch]];
      }
    }

    return {
      current: this.currentBranch,
      branches: Object.keys(this.branches).reduce((acc, name) => ({
        ...acc,
        [name]: {
          current: name === this.currentBranch,
          name,
          commit: this.branches[name][0]?.hash || '',
          label: name
        }
      }), {})
    };
  }

  async checkout(args: string[]): Promise<void> {
    const branchName = args[0];
    if (this.branches[branchName]) {
      this.currentBranch = branchName;
    } else {
      throw new Error(`Branch ${branchName} not found`);
    }
  }

  async log(): Promise<{ all: GitCommit[] }> {
    return { all: [...this.commits] };
  }
}