import useTaskForm from '../hooks/useTaskForm';

export default function TaskForm({ initialData = {}, onSubmit }) {
  const { values, errors, handleChange, validate } = useTaskForm({
    title: initialData.title || '',
    description: initialData.description || '',
    dueDate: initialData.dueDate || '',
    priority: initialData.priority || 'Medium',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow max-w-xl mx-auto">
      <div>
        <label className="block font-semibold">Title</label>
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>
      <div>
        <label className="block font-semibold">Description</label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>
      <div>
        <label className="block font-semibold">Due Date</label>
        <input type="date" name="dueDate" value={values.dueDate} onChange={handleChange} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block font-semibold">Priority</label>
        <select name="priority" value={values.priority} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Task</button>
    </form>
  );
}