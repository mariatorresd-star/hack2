export const API_BASE_URL = 'https://cs2031-2025-2-hackathon-2-backend-production.up.railway.app/v1';

export const PROJECT_STATUS = {
  ACTIVE: 'Activo',
  COMPLETED: 'Completado',
  ON_HOLD: 'En Espera'
} as const;

export const TASK_STATUS = {
  TODO: 'Por Hacer',
  IN_PROGRESS: 'En Progreso',
  COMPLETED: 'Completado'
} as const;

export const TASK_PRIORITY = {
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
  URGENT: 'Urgente'
} as const;

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROJECTS: '/projects',
  TASKS: '/tasks',
  PROFILE: '/profile'
} as const;
