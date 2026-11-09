import { useState } from "react";
import type { SubmitEvent } from "react";
import SelectDropdown from "./SelectDropdown";
import { categories, statuses, priorities } from "../data/taskOptions";

type TaskFormProps = {
  addTask: (
    title: string,
    category: string,
    status: string,
    rating: string,
    date: string,
    notes: string
  ) => Promise<boolean>;
};

const TaskForm = ({addTask}: TaskFormProps) => {

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [status, setStatus] = useState('')
    const [priority, setPriority] = useState('')
    const [date, setDate] = useState('')
    const [notes, setNotes] = useState('')

    
    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isAdded = await addTask(title, category, status, priority, date, notes);
        if (isAdded) {
            setTitle('');
            setCategory('');
            setStatus('');
            setPriority('');
            setDate('');
            setNotes('');
        }
      }
    
  return (
    
    <form id="task-form" onSubmit={handleSubmit}>
      <label htmlFor="addtask-taskform">Add a new task:
        <textarea 
          value={title} 
          onChange={(e) => 
          setTitle(e.target.value)} 
          id="addtask-taskform"
          name="task" 
          placeholder="Enter a task" />
      </label>
      <SelectDropdown 
          label="Select a category:"
          options={categories} 
          selectedValue={category} 
          onChange={setCategory} 
          defaultOptions="Choose a category"
          htmlId="categories"
        />
        <SelectDropdown 
          label="Status:" 
          options={statuses} 
          selectedValue={status} 
          onChange={setStatus} 
          defaultOptions="Choose a status" 
          htmlId="status" 
        />
        <SelectDropdown 
          label="Priority:" 
          options={priorities}
          selectedValue={priority} 
          onChange={setPriority} 
          defaultOptions="Choose a priority" 
          htmlId="priority" 
        />
      <label htmlFor="date">
        Due Date (optional):
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label htmlFor="notes">
        Notes:
        <textarea 
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Describe your task here..."
        />
      </label>

      <button type="submit">Add Task</button>
    </form>
  )
}

export default TaskForm;