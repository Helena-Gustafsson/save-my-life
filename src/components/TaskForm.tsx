import { useState, useEffect } from "react";
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

type FormErrors = {
  title?: string;
  category?: string;
  status?: string;
  priority?: string;
  notes?: string;
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
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormErrorVisible, setIsFormErrorVisible] = useState(false);

  useEffect(() => {
    if (isFormErrorVisible) {
      const timer = setTimeout(() => {
        setIsFormErrorVisible(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isFormErrorVisible]);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();

       const validationErrors: FormErrors = {};
    if (!title.trim()) validationErrors.title = "Title is required.";
    if (!category) validationErrors.category = "Please choose a category.";
    if (!status) validationErrors.status = "Please choose a status.";
    if (!priority) validationErrors.priority = "Please choose a priority.";
    if (!notes.trim()) validationErrors.notes = "Notes are required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsFormErrorVisible(true);
      return;
    }
    setErrors({});
    setIsFormErrorVisible(false);

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

      {isFormErrorVisible && (
      <p className="form-error">Please fill in all required fields.</p>
      )}

      <label htmlFor="addtask-taskform">
        Add a new task:
        <textarea 
          value={title} 
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors((prev) => ({ ...prev, title: undefined }));
          }} 
          id="addtask-taskform"
          name="task" 
          placeholder="Enter a task" 
        />
        {errors.title && <p className="field-error">{errors.title}</p>}
      </label>

      <SelectDropdown 
          label="Select a category:"
          options={categories} 
          selectedValue={category} 
          onChange={(value) => {
          setCategory(value);
          setErrors((prev) => ({ ...prev, category: undefined }));
          }}
          defaultOptions="Choose a category"
          htmlId="categories"
        />
        {errors.category && <p className="field-error">{errors.category}</p>}

        <SelectDropdown 
          label="Status:" 
          options={statuses} 
          selectedValue={status} 
          onChange={(value) => {
          setStatus(value);
          setErrors((prev) => ({ ...prev, status: undefined }));
        }}

          defaultOptions="Choose a status" 
          htmlId="status" 
        />
        {errors.status && <p className="field-error">{errors.status}</p>}

        <SelectDropdown 
          label="Priority:" 
          options={priorities}
          selectedValue={priority} 
         onChange={(value) => {
          setPriority(value);
          setErrors((prev) => ({ ...prev, priority: undefined }));
          }}
          defaultOptions="Choose a priority" 
          htmlId="priority" 
        />
        {errors.priority && <p className="field-error">{errors.priority}</p>}

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
          onChange={(e) => {
            setNotes(e.target.value);
            setErrors((prev) => ({ ...prev, notes: undefined }));
          }}
          placeholder="Describe your task here..."
        />
        {errors.notes && <p className="field-error">{errors.notes}</p>}

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