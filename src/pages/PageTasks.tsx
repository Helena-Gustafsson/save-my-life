import { useState } from 'react'
import SelectDropdown from '../components/SelectDropdown'
import { categories, statuses, priorities } from '../data/taskOptions'
import { Link } from 'react-router'
import TaskList from '../components/TaskList'

function TasksPage() {
 const [category, setCategory] = useState('') 
 const [status, setStatus] = useState('')
 const [priority, setPriority] = useState('')
 

  return (
    <section>
      <h1>Tasks</h1>

      <Link to="/tasks/new"> 
        <button className="create-task-btn">Create Task</button>
      </Link>
      <div className="filter-container">
        <SelectDropdown
        label="Filter by category:"
        options={categories} 
        selectedValue={category} 
        onChange={setCategory} 
        defaultOptions="All categories"
        htmlId="category-dropdown"
      />
      <SelectDropdown
        label="Filter by status:"
        options={statuses}
        selectedValue={status}
        onChange={setStatus}
        defaultOptions="All statuses"
        htmlId="status-dropdown"
      />
      <SelectDropdown
        label="Filter by priority:"
        options={priorities}
        selectedValue={priority}
        onChange={setPriority}
        defaultOptions="All priorities"
        htmlId="priority-dropdown"
      />
    </div>

    <TaskList 
      category={category} status={status} priority={priority} 
    />    
    
    </section>
  )
}

export default TasksPage
