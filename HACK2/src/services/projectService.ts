import { api } from './api';
import { Project, ProjectStatus } from '../types';

export const projectService = {
  async getProjects(page = 1, limit = 10, search = '') {
    const response = await api.get('/projects', {
      params: { page, limit, search }
    });
    return response.data;
  },

  async getProjectById(id: string): Promise<Project> {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  async createProject(data: { name: string; description: string; status: ProjectStatus }): Promise<Project> {
    const response = await api.post('/projects', data);
    return response.data;
  },

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },

  async deleteProject(id: string) {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  }
};
