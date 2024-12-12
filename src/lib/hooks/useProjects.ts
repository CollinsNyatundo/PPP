import { useEffect } from 'react';
import { useProjectStore } from '../stores/projectStore';

export function useProjects(limit?: number) {
  const { projects, isLoading, error, initialize } = useProjectStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    projects: limit ? projects.slice(0, limit) : projects,
    isLoading,
    isError: error,
  };
}