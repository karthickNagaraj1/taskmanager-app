import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { getTasks, saveTasks, generateId } from '../utils/storage';

export default function CreateTask() {
  const navigate = useNavigate();
  const handleCreate = (task) => {
    const tasks = getTasks();
    const newTask = { ...task, id: generateId() };
    saveTasks([...tasks, newTask]);
    navigate('/');
  };
  return (
    <div className="bg-blue-100 min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-4 ">Create Task</h2>
      <TaskForm onSubmit={handleCreate} />
    </div>
  );
}