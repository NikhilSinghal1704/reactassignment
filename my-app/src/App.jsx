import { useState, useMemo } from 'react'
import TextInput from './components/TextInput'
import TaskCard from './components/TaskCard'

function App() {
  const [tasks, setTasks] = useState([])
  const [filterDate, setFilterDate] = useState('')
  const [showUncompleted, setShowUncompleted] = useState(false)

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      date: new Date().toISOString(),
      completed: false,
    }
    setTasks(prev => [...prev, newTask])
  }

  const removeTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
  }

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteAllCompleted = () => {
    setTasks(prev => prev.filter(t => !t.completed))
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filterDate) {
        
        const taskDate = task.date.slice(0, 10)
        if (taskDate !== filterDate) return false
      }
      if (showUncompleted && task.completed) return false
      return true
    })
  }, [tasks, filterDate, showUncompleted])

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
      
      <TextInput onAddTask={addTask} />

      <div className="mt-4 grid grid-cols-4 gap-4">
        <div className="col-span-1 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Filters</h3>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Filter by date</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
            />
            <button
              onClick={() => setFilterDate('')}
              className="mt-2 text-sm text-gray-600 hover:underline"
            >
              Clear date
            </button>
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showUncompleted}
                onChange={(e) => setShowUncompleted(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">Show only uncompleted</span>
            </label>
          </div>

          <div>
            <button
              onClick={deleteAllCompleted}
              className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Delete All Completed
            </button>
          </div>
        </div>

        <div className="col-span-3 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Tasks</h3>
          {filteredTasks.length === 0 ? (
            <p className="text-sm text-gray-500">No tasks to show.</p>
          ) : (
            <div className="space-y-2">
              {filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={() => removeTask(task.id)}
                  onToggle={() => toggleTask(task.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
