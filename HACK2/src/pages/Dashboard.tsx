import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <h3 className="text-gray-600 text-sm">Total Tareas</h3>
          <p className="text-3xl font-bold">{stats.total}</p>
        </Card>
        <Card>
          <h3 className="text-gray-600 text-sm">Completadas</h3>
          <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
        </Card>
        <Card>
          <h3 className="text-gray-600 text-sm">Pendientes</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </Card>
        <Card>
          <h3 className="text-gray-600 text-sm">Vencidas</h3>
          <p className="text-3xl font-bold text-red-600">{stats.overdue}</p>
        </Card>
      </div>

      <div className="flex gap-4 mb-8">
        <Button onClick={() => navigate('/tasks')}>Ver Tareas</Button>
        <Button onClick={() => navigate('/projects')} variant="secondary">
          Ver Proyectos
        </Button>
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4">Actividad Reciente</h2>
        <p className="text-gray-500">No hay actividad reciente</p>
      </Card>
    </div>
  );
};
