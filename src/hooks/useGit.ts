// src/hooks/useGit.ts
import { useState, useEffect, useCallback } from 'react';
import { MockGit } from '../utils/gitUtils';
import { GitStatus, GitCommit, GitBranchSummary } from '../types/gitTypes';

export const useGit = () => {
  const [git] = useState<MockGit>(new MockGit());
  const [status, setStatus] = useState<GitStatus | null>(null);
  const [branches, setBranches] = useState<GitBranchSummary | null>(null);
  const [logs, setLogs] = useState<GitCommit[]>([]);
  const [error, setError] = useState<string | null>(null);

  const refreshGitState = useCallback(async () => {
    try {
      const [status, branchSummary, log] = await Promise.all([
        git.status(),
        git.branch([]),
        git.log()
      ]);
      
      setStatus(status);
      setBranches(branchSummary);
      setLogs(log.all || []);
    } catch (err) {
      setError('Failed to refresh Git state');
      console.error(err);
    }
  }, [git]);

  useEffect(() => {
    refreshGitState();
  }, [refreshGitState]);

  const executeCommand = async (command: string, args: string[] = []): Promise<string> => {
    try {
      let result = '';
      switch (command) {
        case 'init':
          await git.init();
          result = 'Initialized empty Git repository';
          break;
        case 'add':
          await git.add(args);
          result = `Added ${args.length ? args.join(', ') : 'all files'}`;
          break;
        case 'commit':
          const message = args.join(' ').replace(/^-m\s*"?|"?$/g, '');
          await git.commit(message);
          result = `[${(await git.branch([])).current}] ${message}`;
          break;
        case 'status':
          result = JSON.stringify(await git.status(), null, 2);
          break;
        case 'branch':
          if (args.length > 0) {
            await git.branch(args);
            result = `Created branch ${args[0]}`;
          } else {
            result = JSON.stringify(await git.branch([]), null, 2);
          }
          break;
        case 'checkout':
          await git.checkout(args);
          result = `Switched to branch '${args[0]}'`;
          break;
        case 'log':
          result = JSON.stringify(await git.log(), null, 2);
          break;
        default:
          throw new Error(`Command not recognized: ${command}`);
      }

      await refreshGitState();
      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  return { 
    git,
    status, 
    branches,
    logs,
    error,
    executeCommand,
    refreshGitState
  };
};