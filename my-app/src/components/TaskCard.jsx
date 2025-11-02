import React from 'react'

export default function TaskCard({ task, onDelete, onToggle }) {
  const formatted = new Date(task.date).toLocaleString()

  return (
    <div className={`flex items-center justify-between p-3 border rounded ${task.completed ? 'bg-green-50 line-through' : 'bg-white'}`}>
      <div>
        <div className="font-medium">{task.text}</div>
        <div className="text-xs text-gray-500">Added: {formatted}</div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggle}
          className={`px-3 py-1 rounded text-sm ${task.completed ? 'bg-yellow-500 text-white' : 'bg-green-600 text-white'}`}
        >
          {task.completed ? 'Mark Uncomplete' : 'Complete'}
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 rounded bg-red-500 text-white text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
