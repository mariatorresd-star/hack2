import { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { TaskPriority, TaskStatus } from '../../types';

interface TaskFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    projectId: string;
    priority: TaskPriority;
    status: TaskStatus;
    dueDate?: string;
    assignedTo?: string;
  }) => Promise<void>;
  projectId?: string;
  initialData?: any;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, projectId, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState<TaskPriority>(initialData?.priority || 'MEDIUM');
  const [status, setStatus] = useState<TaskStatus>(initialData?.status || 'TODO');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
  const [selectedProjectId, setSelectedProjectId] = useState(projectId || initialData?.projectId || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({
        title,
        description,
        projectId: selectedProjectId,
        priority,
        status,
        dueDate: dueDate || undefined
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          required
        />
      </div>
      <Input
        label="ID del Proyecto"
        value={selectedProjectId}
        onChange={(e) => setSelectedProjectId(e.target.value)}
        required
        disabled={!!projectId}
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Prioridad</label>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
          >
            <option value="LOW">Baja</option>
            <option value="MEDIUM">Media</option>
            <option value="HIGH">Alta</option>
            <option value="URGENT">Urgente</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Estado</label>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
          >
            <option value="TODO">Por Hacer</option>
            <option value="IN_PROGRESS">En Progreso</option>
            <option value="COMPLETED">Completado</option>
          </select>
        </div>
      </div>
      <Input
        label="Fecha Límite"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <Button type="submit" isLoading={isLoading} className="w-full">
        {initialData ? 'Actualizar' : 'Crear'} Tarea
      </Button>
    </form>
  );
};
