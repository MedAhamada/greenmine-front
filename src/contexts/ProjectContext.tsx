import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Employee, FilterOptions } from '../types';
import { projects as initialProjects, employees as initialEmployees } from '../data/mockData';
import { filterProjects } from '../utils';

interface ProjectContextProps {
  projects: Project[];
  employees: Employee[];
  filteredProjects: Project[];
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  getProjectById: (id: string) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  console.log('ProjectContext - initializing with projects:', projects);
  console.log('ProjectContext - initializing with employees:', employees);
  // Apply filters whenever projects or filters change
  useEffect(() => {
    setFilteredProjects(filterProjects(projects, filters));
  }, [projects, filters]);

  // Add a new project
  const addProject = (project: Project) => {
    setProjects([...projects, { ...project, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]);
  };

  // Update an existing project
  const updateProject = (updatedProject: Project) => {
    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id
          ? { ...updatedProject, updatedAt: new Date().toISOString() }
          : project
      )
    );
  };

  // Delete a project
  const deleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  // Get a project by ID
  const getProjectById = (id: string): Project | undefined => {
    return projects.find((project) => project.id === id);
  };

  console.log('ProjectContext - projects:', projects);
  console.log('ProjectContext - filteredProjects:', filteredProjects);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        employees,
        filteredProjects,
        filters,
        setFilters,
        addProject,
        updateProject,
        deleteProject,
        getProjectById,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};