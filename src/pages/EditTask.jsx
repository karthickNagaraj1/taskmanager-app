import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import { getTasks, saveTasks } from '../utils/storage';

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const found = getTasks().find((t) => t.id === id);
    if (found) setTask(found);
    else navigate('/');
  }, [id, navigate]);

  const handleUpdate = (updatedTask) => {
    const tasks = getTasks().map((t) => (t.id === id ? { ...updatedTask, id } : t));
    saveTasks(tasks);
    navigate('/');
  };

  return (
    <div className="bg-blue-100 min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
      {task ? <TaskForm initialData={task} onSubmit={handleUpdate} /> : <p>Loading...</p>}
    </div>
  );
}