import { useContext } from 'react';
import { ProjectsFilterContext } from '@/contexts/ProjectsFilterContext';

export const useProjectsFilter = () => {
  const context = useContext(ProjectsFilterContext);
  if (!context) {
    throw new Error('useProjectsFilter must be used within a ProjectsFilterProvider');
  }
  return context;
}; 