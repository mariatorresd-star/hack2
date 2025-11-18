import { Task } from '../../types';
import { Card } from '../common/Card';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const statusColors = {
    TODO: 'bg-gray-100 text-gray-800',
    IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
    COMPLETED: 'bg-green-100 text-green-800'
  };

  const priorityColors = {
    LOW: 'bg-blue-100 text-blue-800',
    MEDIUM: 'bg-orange-100 text-orange-800',
    HIGH: 'bg-red-100 text-red-800',
    URGENT: 'bg-purple-100 text-purple-800'
  };

  return (
    <Card onClick={onClick}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{task.description}</p>
          <div className="flex gap-2 mt-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[task.status]}`}>
              {task.status}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          </div>
        </div>
        {task.dueDate && (
          <span className="text-xs text-gray-500">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </Card>
  );
};
