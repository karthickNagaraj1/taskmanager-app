import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskTable from '../components/TaskTable';
import { getTasks, saveTasks } from '../utils/storage';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const handleDelete = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveTasks(updated);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Task Manager</h1>
      <button
        onClick={() => navigate('/create')}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      > Add Task</button>
      <TaskTable tasks={tasks} onEdit={(id) => navigate(`/edit/${id}`)} onDelete={handleDelete} />
    </div>
  );
}
