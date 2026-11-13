import { Link, useNavigate, useParams } from "react-router";
import { useTask } from "../hooks/useTasksHooks";
import NotFoundPage from "./NotFoundPage"; 
import { capitalize, formatDate } from "../utils/formatUtils";
import { priorities } from "../data/taskOptions";
import useSaveTasks from "../hooks/saveTaskHooks";
import { useTimedNavigate } from "../hooks/useTimedNavigate";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { useState } from "react";

const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { task, isLoading, error } = useTask(id);
  const { deleteTask, error: deleteError, message: deleteMessage } = useSaveTasks();
  const { timedNavigate } = useTimedNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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
        <p className="form-error">
           Could not load task: {error} . Please check your internet connection or try again later.
        </p>
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

      <h2 className="task-title">{task.title}</h2>
      
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

      {!showDeleteConfirmation ? (
      <section className="action-buttons">

        <Link to={`/tasks/${task.id}/edit`}>
          <button className="edit-button">Edit</button>
        </Link>

        <button
          onClick={() => setShowDeleteConfirmation(true)}
          className="delete-button"
        >
          Delete
        </button>

        <button onClick={() => navigate("/")} className="back-button">
          Back to tasks
        </button>

      </section>
      ) : (
      
      <div className="task-detail-delete-confirmation">
        <DeleteConfirmation
          isOpen={showDeleteConfirmation}
          message={`Are you sure you want to delete task: ${task.title}?`}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirmation(false)}
        />

        {deleteError && (
          <p className="form-error">{deleteError}</p>
        )}

        {deleteMessage && (
          <p className="success-message">{deleteMessage}</p>
        )}
      </div>
      )}
    </article>
  );
};

export default TaskDetailPage;