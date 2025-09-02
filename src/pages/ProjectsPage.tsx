import React from 'react';
import Layout from '../components/layout/Layout';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectFilter from '../components/projects/ProjectFilter';
import { useProjects } from '../contexts/ProjectContext';

const ProjectsPage: React.FC = () => {
  const { filteredProjects, employees, filters, setFilters } = useProjects();

  return (
    <Layout title="Projects">
      <ProjectFilter 
        onFilterChange={setFilters}
        currentFilters={filters}
      />
      
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600">
            Try adjusting your filters or create a new project.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              employees={employees} 
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default ProjectsPage;