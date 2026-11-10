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

type TaskItemProps = {
  task: Task
  deleteTask: (deleteId: string) => void
}

const TaskItem = ({ task, deleteTask}: TaskItemProps) => {
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
        <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
      </section>

    </li>
  )
}

export default TaskItem