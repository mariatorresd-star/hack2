import { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { ProjectStatus } from '../../types';

interface ProjectFormProps {
  onSubmit: (data: { name: string; description: string; status: ProjectStatus }) => Promise<void>;
  initialData?: { name: string; description: string; status: ProjectStatus };
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState<ProjectStatus>(initialData?.status || 'ACTIVE');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({ name, description, status });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nombre del Proyecto"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Estado</label>
        <select
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={status}
          onChange={(e) => setStatus(e.target.value as ProjectStatus)}
        >
          <option value="ACTIVE">Activo</option>
          <option value="COMPLETED">Completado</option>
          <option value="ON_HOLD">En Espera</option>
        </select>
      </div>
      <Button type="submit" isLoading={isLoading} className="w-full">
        {initialData ? 'Actualizar' : 'Crear'} Proyecto
      </Button>
    </form>
  );
};
