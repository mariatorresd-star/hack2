import { api } from './api';
import { Task, PaginatedResponse } from '../types';

interface TaskFilters {
  projectId?: string;
  status?: string;
  priority?: string;
  page?: number;
  limit?: number;
}

export const taskService = {
  async getTasks(filters: TaskFilters = {}): Promise<PaginatedResponse<Task>> {
    const response = await api.get('/tasks', { params: filters });
    return {
      data: response.data.tasks,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage || 1,
      total: response.data.total || response.data.tasks.length
    };
  },

  async getTaskById(id: string): Promise<Task> {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  async createTask(task: Partial<Task>): Promise<Task> {
    const response = await api.post('/tasks', task);
    return response.data;
  },

  async updateTask(id: string, task: Partial<Task>): Promise<Task> {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },

  async updateTaskStatus(id: string, status: Task['status']): Promise<Task> {
    const response = await api.patch(`/tasks/${id}/status`, { status });
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  }
};