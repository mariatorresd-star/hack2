import React, { useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import { projectService } from '../services/projectService';
import { teamService } from '../services/teamService';
import { Task, Project, TeamMember } from '../types';
import { TaskList } from '../components/tasks/TaskList';
import { TaskForm } from '../components/tasks/TaskForm';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  const [filters, setFilters] = useState({
    projectId: '',
    status: '',
    priority: '',
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchInitialData = async () => {
    try {
      const [projectsRes, membersRes] = await Promise.all([
        projectService.getProjects(1, 100),
        teamService.getMembers()
      ]);
      setProjects(projectsRes.data);
      setTeamMembers(membersRes);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await taskService.getTasks(filters);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (task: Partial<Task>) => {
    try {
      if (selectedTask) {
        await taskService.updateTask(selectedTask.id, task);
      } else {
        await taskService.createTask(task);
      }
      setIsModalOpen(false);
      setSelectedTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Error al guardar la tarea');
    }
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      try {
        await taskService.deleteTask(id);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error al eliminar la tarea');
      }
    }
  };

  const handleStatusChange = async (id: string, status: Task['status']) => {
    try {
      await taskService.updateTaskStatus(id, status);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Error al actualizar el estado');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Tareas</h1>
        <Button onClick={() => {
          setSelectedTask(null);
          setIsModalOpen(true);
        }}>
          Nueva Tarea
        </Button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Proyecto
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.projectId}
              onChange={(e) => setFilters({ ...filters, projectId: e.target.value })}
            >
              <option value="">Todos los proyectos</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">Todos los estados</option>
              <option value="TODO">Por hacer</option>
              <option value="IN_PROGRESS">En progreso</option>
              <option value="COMPLETED">Completado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prioridad
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            >
              <option value="">Todas las prioridades</option>
              <option value="LOW">Baja</option>
              <option value="MEDIUM">Media</option>
              <option value="HIGH">Alta</option>
              <option value="URGENT">Urgente</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <TaskList
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        title={selectedTask ? 'Editar Tarea' : 'Nueva Tarea'}
      >
        <TaskForm
          task={selectedTask}
          projects={projects}
          teamMembers={teamMembers}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
        />
      </Modal>
    </div>
  );
};
