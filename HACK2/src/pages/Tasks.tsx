import { useEffect, useState } from 'react';
import { TaskList } from '../components/tasks/TaskList';
import { TaskForm } from '../components/tasks/TaskForm';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { taskService } from '../services/taskService';
import { Task } from '../types';

export const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadTasks = async () => {
    setIsLoading(true);
    try {
      const data = await taskService.getTasks();
      setTasks(data.tasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask = async (data: any) => {
    await taskService.createTask(data);
    setIsModalOpen(false);
    loadTasks();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tareas</h1>
        <Button onClick={() => setIsModalOpen(true)}>Nueva Tarea</Button>
      </div>

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <TaskList 
          tasks={tasks} 
          onTaskClick={(id) => console.log('Task clicked:', id)} 
        />
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Crear Tarea"
      >
        <TaskForm onSubmit={handleCreateTask} />
      </Modal>
    </div>
  );
};
