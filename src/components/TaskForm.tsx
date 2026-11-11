import { useState } from "react";
import type { SubmitEvent } from "react";
import SelectDropdown from "./SelectDropdown";
import { categories, statuses, priorities } from "../data/taskOptions";
import type { Task } from "../types/taskTypes";
import { useNavigate } from "react-router";


type TaskFormProps = {
  addTask: (
    title: string,
    category: string,
    status: string,
    rating: string,
    date: string,
    notes: string
  ) => Promise<boolean>;
  initialData?: Task | null;
};

const TaskForm = ({addTask, initialData}: TaskFormProps) => {

  const [title, setTitle] = useState(initialData ? initialData.title : "");
  const [category, setCategory] = useState(initialData ? initialData.category : "");
  const [status, setStatus] = useState(initialData ? initialData.status : "");
  const [priority, setPriority] = useState(
    initialData ? priorities[initialData.rating - 1] || "" : ""
  );
  const [date, setDate] = useState(initialData && initialData.date ? initialData.date : "");
  const [notes, setNotes] = useState(initialData ? initialData.notes : "");
  const navigate = useNavigate();
  
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isAdded = await addTask(title, category, status, priority, date, notes);
      if (isAdded && !initialData) {
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

      <div className="action-buttons">
        <button className="task-form-btn" type="submit">
          {initialData?.id ? "Save Changes" : "Add Task"}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="back-button">Back
        </button>
      </div>
      
    </form>
  )
}

export default TaskForm;