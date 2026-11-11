//task
//title
//category
//status
//priority
//date
//notes

import type { Task } from "../types/taskTypes"
import { capitalize, formatDate } from "../utils/format"
import { Link } from "react-router"
import { useState } from "react";

type TaskItemProps = {
  task: Task
  deleteTask: (deleteId: string) => Promise<boolean>
}

const TaskItem = ({ task, deleteTask}: TaskItemProps) => {

  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = async () => {
  setIsDeleting(true);
  const success = await deleteTask(task.id);
  setIsDeleting(false);
  if (success) {
    setIsDeleted(true);
  }
};


  return (
    <li className="task">

      <p className="task-title"><Link to={`/tasks/${task.id}`}><strong>{task.title}</strong></Link></p>
      <p className="task-meta">
        <span className={`tag category-${task.category.toLowerCase().trim()}`}>{capitalize(task.category)}</span>
        <span className="task-date">{formatDate(task.date || "" )}</span>
      </p>
      <p className="task-notes-preview">{task.notes}</p>

      <section className="actions">
        <Link to={`/tasks/${task.id}/edit`}>
          <button className="edit-button">Edit</button>
        </Link>
        <button className="delete-button" 
          onClick={handleDeleteClick}
          disabled={isDeleted || isDeleting}
          >Delete</button>
      </section>

      {isDeleting && <p className="loading-message">Deleting task...</p>}
      {isDeleted && <p className="success-message">Task deleted successfully!</p>}

    </li>
  )
}

export default TaskItem