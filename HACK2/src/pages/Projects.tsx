import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectList } from '../components/projects/ProjectList';
import { ProjectForm } from '../components/projects/ProjectForm';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { projectService } from '../services/projectService';
import { Project } from '../types';

export const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const data = await projectService.getProjects();
      setProjects(data.projects);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateProject = async (data: any) => {
    await projectService.createProject(data);
    setIsModalOpen(false);
    loadProjects();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Proyectos</h1>
        <Button onClick={() => setIsModalOpen(true)}>Nuevo Proyecto</Button>
      </div>

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <ProjectList 
          projects={projects} 
          onProjectClick={(id) => navigate(`/projects/${id}`)} 
        />
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Crear Proyecto"
      >
        <ProjectForm onSubmit={handleCreateProject} />
      </Modal>
    </div>
  );
};
