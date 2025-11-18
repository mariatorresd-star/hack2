import { api } from './api';
import { Task, TaskStatus, TaskPriority } from '../types';

export const taskService = {
  async getTasks(filters?: {
    projectId?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    page?: number;
    limit?: number;
  }) {
    const response = await api.get('/tasks', { params: filters });
    return response.data;
  },

  async getTaskById(id: string): Promise<Task> {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  async createTask(data: {
    title: string;
    description: string;
    projectId: string;
    priority: TaskPriority;
    dueDate?: string;
    assignedTo?: string;
  }): Promise<Task> {
    const response = await api.post('/tasks', data);
    return response.data;
  },

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const response = await api.patch(`/tasks/${id}/status`, { status });
    return response.data;
  },

  async deleteTask(id: string) {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  }
};
