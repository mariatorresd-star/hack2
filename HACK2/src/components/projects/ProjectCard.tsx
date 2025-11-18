import { Project } from '../../types';
import { Card } from '../common/Card';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const statusColors = {
    ACTIVE: 'bg-green-100 text-green-800',
    COMPLETED: 'bg-blue-100 text-blue-800',
    ON_HOLD: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <Card onClick={onClick}>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusColors[project.status]}`}>
          {project.status}
        </span>
      </div>
    </Card>
  );
};
