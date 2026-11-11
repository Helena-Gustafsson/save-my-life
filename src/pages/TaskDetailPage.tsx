import { Link, useNavigate, useParams } from "react-router";
import { useTask } from "../hooks/useTasksHooks";
import NotFoundPage from "./NotFoundPage"; 
import { capitalize, formatDate } from "../utils/format";
import { priorities } from "../data/taskOptions";
import useSaveTasks from "../hooks/saveTaskHooks";
import { useTimedNavigate } from "../hooks/useTimedNavigate";

const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { task, isLoading, error } = useTask(id);
  const { deleteTask, error: deleteError, message: deleteMessage } = useSaveTasks();
  const { timedNavigate } = useTimedNavigate();

  const handleDelete = async () => {
  if (!task) return;

  const isDeleted = await deleteTask(task.id);
  if (isDeleted) {
    timedNavigate("/");
  }
};

  if (error && (error.includes("not found") || error.includes("404"))) {
    return <NotFoundPage />;
  }

  
  if (error) {
    return (
      <>
        <h2>Could not load task</h2>
        <p style={{ color: "red" }}>{error}</p>
        <Link to="/">Back to all tasks</Link>
      </>
    );
  }

  if (!task) {
    return <p className="loading-message">Loading task...</p>;
  }

  return (
    <article className="task-details">
      {isLoading && <p className="loading-message">Loading task details...</p>}
      {deleteError && <p className="form-error">{deleteError}</p>}
      {deleteMessage && <p className="success-message">{deleteMessage}</p>}

      <h2>{task.title}</h2>
      
      <p className="task-category"><strong>Category:</strong> {capitalize(task.category || "")}</p>
      <p className="task-deadline"><strong>Deadline:</strong> {formatDate(task.date || "")}</p>
      <p className="task-status"><strong>Status:</strong> {task.status}</p>
      <p className="task-priority">
      <strong>Priority:</strong> {priorities[task.rating - 1] || "Low"}
      </p> 
      <p className="task-notes"><strong>Notes:</strong> {task.notes || "No notes."}</p>

      <section className="task-timestamps" style={{ fontSize: "0.8rem", color: "gray" }}>
        <p>Created: {formatDate(task.createdAt || "")}</p>
        <p>Last Updated: {formatDate(task.updatedAt || "")}</p>
      </section>

      <section className="action-buttons">
        <Link to={`/tasks/${task.id}/edit`}>
          <button className="edit-button">Edit</button>
        </Link>
        <button onClick={handleDelete} className="delete-button">Delete</button>
        <button onClick={() => navigate(-1)} className="back-button">Back</button>
        
      </section>
    </article>
  );
};

export default TaskDetailPage;