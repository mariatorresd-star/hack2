import React, { useEffect, useState } from 'react';
import { projectService } from '../services/projectService';
import { Project } from '../types';
import { ProjectList } from '../components/projects/ProjectList';
import { ProjectForm } from '../components/projects/ProjectForm';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProjects();
  }, [currentPage, searchTerm]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await projectService.getProjects(currentPage, 10, searchTerm);
      setProjects(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (project: Partial<Project>) => {
    try {
      if (selectedProject) {
        await projectService.updateProject(selectedProject.id, project);
      } else {
        await projectService.createProject(project);
      }
      setIsModalOpen(false);
      setSelectedProject(null);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error al guardar el proyecto');
    }
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este proyecto?')) {
      try {
        await projectService.deleteProject(id);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error al eliminar el proyecto');
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Proyectos</h1>
        <Button onClick={() => {
          setSelectedProject(null);
          setIsModalOpen(true);
        }}>
          Nuevo Proyecto
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <Input
          type="text"
          placeholder="Buscar proyectos..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <ProjectList
            projects={projects}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* Paginación */}
          <div className="flex justify-center space-x-2">
            <Button
              variant="secondary"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <span className="flex items-center px-4">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="secondary"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
        title={selectedProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
      >
        <ProjectForm
          project={selectedProject}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedProject(null);
          }}
        />
      </Modal>
    </div>
  );
};
