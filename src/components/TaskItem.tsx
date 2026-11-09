//task
//title
//category
//status
//priority
//date
//notes

import type { Task } from "../types/taskTypes"
import { capitalize, formatDate } from "../types/Format"

type TaskItemProps = {
  task: Task
  deleteTask: (deleteId: string) => void
  editTask: (task: Task) => void
}

const TaskItem = ({ task, deleteTask, editTask }: TaskItemProps) => {
  return (
    <li className="task">
      <p className="task-title">{task.title}</p>
      <p className="task-meta">
        <span className={`tag category-${task.category.toLowerCase().trim()}`}>{capitalize(task.category)}</span>
        <span className="task-date">{formatDate(task.date || "" )}</span>
      </p>
      <p className="task-notes-preview">{task.notes}</p>

      <section className="actions">
        <button className="edit-button" onClick={() => editTask(task)}>Edit</button>
        <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
      </section>

    </li>

    
  )
}

export default TaskItem