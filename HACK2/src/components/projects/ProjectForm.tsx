import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface ProjectFormProps {
  project: Project | null;
  onSubmit: (project: Partial<Project>) => void;
  onCancel: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'ACTIVE' as Project['status']
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        status: project.status
      });
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nombre del Proyecto"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Ej: Rediseño de la aplicación"
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe el proyecto..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Estado
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as Project['status'] })}
        >
          <option value="ACTIVE">Activo</option>
          <option value="ON_HOLD">En espera</option>
          <option value="COMPLETED">Completado</option>
        </select>
      </div>

      <div className="flex space-x-3 pt-4">
        <Button type="submit" className="flex-1">
          {project ? 'Actualizar' : 'Crear'} Proyecto
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
      </div>
    </form>
  );
};
