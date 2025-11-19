import { api } from './api';
import { Project, PaginatedResponse } from '../types';

export const projectService = {
  async getProjects(page = 1, limit = 10, search = ''): Promise<PaginatedResponse<Project>> {
    const response = await api.get('/projects', {
      params: { page, limit, search }
    });
    return {
      data: response.data.projects,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage,
      total: response.data.total
    };
  },

  async getProjectById(id: string): Promise<Project> {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  async createProject(project: Partial<Project>): Promise<Project> {
    const response = await api.post('/projects', project);
    return response.data;
  },

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    const response = await api.put(`/projects/${id}`, project);
    return response.data;
  },

  async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  }
};