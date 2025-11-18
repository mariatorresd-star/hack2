import { api } from './api';
import { User, LoginResponse } from '../types';

export const authService = {
  async register(data: { name: string; email: string; password: string }) {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async login(data: { email: string; password: string }): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get<User>('/auth/profile');
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  }
};
