import React from 'react';
import { Task } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  const priorityColors = {
    LOW: 'bg-gray-100 text-gray-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-orange-100 text-orange-800',
    URGENT: 'bg-red-100 text-red-800'
  };

  const statusColors = {
    TODO: 'bg-gray-100 text-gray-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-green-100 text-green-800'
  };

  const priorityText = {
    LOW: 'Baja',
    MEDIUM: 'Media',
    HIGH: 'Alta',
    URGENT: 'Urgente'
  };

  const statusText = {
    TODO: 'Por hacer',
    IN_PROGRESS: 'En progreso',
    COMPLETED: 'Completado'
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'COMPLETED';

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
              {task.title}
            </h3>
            {isOverdue && (
              <span className="ml-2 px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-800">
                Vencida
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
            {task.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className={`px-2 py-1 text-xs font-medium rounded ${priorityColors[task.priority]}`}>
            {priorityText[task.priority]}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[task.status]}`}>
            {statusText[task.status]}
          </span>
        </div>

        {task.dueDate && (
          <div className="text-xs text-gray-500">
            <p>Vence: {new Date(task.dueDate).toLocaleDateString('es-ES')}</p>
          </div>
        )}

        {/* Botones de cambio de estado rápido */}
        <div className="flex gap-2">
          {task.status !== 'TODO' && (
            <button
              onClick={() => onStatusChange(task.id, 'TODO')}
              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              → Por hacer
            </button>
          )}
          {task.status !== 'IN_PROGRESS' && (
            <button
              onClick={() => onStatusChange(task.id, 'IN_PROGRESS')}
              className="text-xs px-2 py-1 bg-blue-100 hover:bg-blue-200 rounded transition-colors"
            >
              → En progreso
            </button>
          )}
          {task.status !== 'COMPLETED' && (
            <button
              onClick={() => onStatusChange(task.id, 'COMPLETED')}
              className="text-xs px-2 py-1 bg-green-100 hover:bg-green-200 rounded transition-colors"
            >
              → Completar
            </button>
          )}
        </div>

        <div className="flex space-x-2 pt-4 border-t">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onEdit(task)}
            className="flex-1"
          >
            Editar
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(task.id)}
            className="flex-1"
          >
            Eliminar
          </Button>
        </div>
      </div>
    </Card>
  );
};