import { Project } from '../../types';
import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  onProjectClick: (id: string) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects, onProjectClick }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No hay proyectos disponibles
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          onClick={() => onProjectClick(project.id)}
        />
      ))}
    </div>
  );
};
