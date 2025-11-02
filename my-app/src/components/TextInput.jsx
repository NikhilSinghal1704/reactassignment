import { useState } from 'react'

export default function TextInput({ onAddTask }) {
  const [text, setText] = useState('')

  const handleAddTask = () => {
    if (text.trim()) {
      onAddTask(text)
      setText('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAddTask()
  }

  return (
    <div className="w-full p-4">
      <div className="flex gap-2 items-center">
        <input
          id="text-input"
          type="text"
          className="w-4/5 p-3 rounded border border-gray-300 focus:outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your task..."
        />
        <button
          onClick={handleAddTask}
          className="w-1/5 p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
    </div>
  )
}