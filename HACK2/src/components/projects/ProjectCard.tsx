import React from 'react';
import { Project } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete
}) => {
  const statusColors = {
    ACTIVE: 'bg-green-100 text-green-800',
    COMPLETED: 'bg-blue-100 text-blue-800',
    ON_HOLD: 'bg-yellow-100 text-yellow-800'
  };

  const statusText = {
    ACTIVE: 'Activo',
    COMPLETED: 'Completado',
    ON_HOLD: 'En espera'
  };

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {project.name}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[project.status]}`}>
              {statusText[project.status]}
            </span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
            {project.description}
          </p>
        </div>

        <div className="text-xs text-gray-500">
          <p>Creado: {new Date(project.createdAt).toLocaleDateString('es-ES')}</p>
          {project.tasks && (
            <p className="mt-1">Tareas: {project.tasks.length}</p>
          )}
        </div>

        <div className="flex space-x-2 pt-4 border-t">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onEdit(project)}
            className="flex-1"
          >
            Editar
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(project.id)}
            className="flex-1"
          >
            Eliminar
          </Button>
        </div>
      </div>
    </Card>
  );
};