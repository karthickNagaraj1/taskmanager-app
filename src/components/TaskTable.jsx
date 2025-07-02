import { useState } from 'react';

export default function TaskTable({ tasks, onEdit, onDelete }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [page, setPage] = useState(0);

  const itemsPerPage = 5;

  const filtered = tasks
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  const paginated = filtered.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="mt-6">
      <input
        className="border p-2 rounded mb-4 w-full max-w-sm"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-blue-100">
            <th className="cursor-pointer p-2" onClick={() => setSortBy('title')}>Title</th>
            <th className="cursor-pointer p-2">Description</th>
            <th className="cursor-pointer p-2" onClick={() => setSortBy('dueDate')}>Due Date</th>
            <th className="cursor-pointer p-2" onClick={() => setSortBy('priority')}>Priority</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((task) => (
            <tr key={task.id} className="border-t">
              <td className="p-2">{task.title}</td>
              <td className="p-2">{task.description}</td>
              <td className="p-2">{task.dueDate}</td>
              <td className="p-2">{task.priority}</td>
              <td className="p-2 space-x-2">
                <button className="text-blue-600" onClick={() => onEdit(task.id)}>Edit</button>
                <button className="text-red-600" onClick={() => onDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {paginated.length === 0 && (
            <tr><td className="p-2" colSpan="5">No tasks found.</td></tr>
          )}
        </tbody>
      </table>
      <div className="flex gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-3 py-1 rounded ${page === i ? 'bg-blue-600 text-white' : 'bg-blue-200'}`}
          >{i + 1}</button>
        ))}
      </div>
    </div>
  );
}