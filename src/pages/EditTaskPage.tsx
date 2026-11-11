import { useParams } from "react-router";
import { useTask } from "../hooks/useTasksHooks";
import useSaveTasks from "../hooks/saveTaskHooks";
import { useTimedNavigate } from "../hooks/useTimedNavigate";
import TaskForm from "../components/TaskForm";
import { PRIORITIES } from "../data/taskOptions";

const EditTaskPage = () => {
  const { id } = useParams();
  const { task, isLoading, error } = useTask(id);
  const { editTask, error: saveError, message: saveMessage } = useSaveTasks();
  const { timedNavigate } = useTimedNavigate();

  const handleEditSubmit = async (
    title: string,
    category: string,
    status: string,
    priority: string,
    date: string,
    notes: string
  ) => {
    if (!id) return false;

    const ratingNumber = PRIORITIES[priority as keyof typeof PRIORITIES] || 1;

    const updatedTask = {
      id,
      title,
      category,
      status,
      rating: ratingNumber,
      date: date || undefined,
      notes,
      createdAt: task?.createdAt || "",
      updatedAt: new Date().toISOString(),

    };

    const success = await editTask(updatedTask);
    
    if (success) {
      timedNavigate(`/tasks/${id}`);
      return true;
    }
    return false;
  };

  if (isLoading) return <p>Loading task data...</p>;
  if (error || !task) return <p className="form-error">{error || "Task not found."}</p>;

  return (
    <section>
      <h2>Edit Task</h2>

      {saveError && <p className="form-error">{saveError}</p>}
      {saveMessage && (<p className="success-message">{saveMessage}</p>)}
      
      <TaskForm addTask={handleEditSubmit} initialData={task} />
    </section>
  );
};

export default EditTaskPage;
