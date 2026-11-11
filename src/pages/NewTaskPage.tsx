import TaskForm from "../components/TaskForm";
import useSaveTasks from "../hooks/saveTaskHooks";
import { useTimedNavigate } from "../hooks/useTimedNavigate";

const NewTaskPage = () => {

  const {
    addTask,
    error,
    message
  } = useSaveTasks();

  const { timedNavigate } = useTimedNavigate();

  const handleAddTask = async (title: string, category: string, status: string, rating: string, date: string, notes: string) => {
    const data = await addTask(title, category, status, rating, date, notes);

    if (data && data.id) {
      const newTaskId = data.id;
      timedNavigate(`/tasks/${newTaskId}`);
      return true;
    }
    return false;
  };

  return (
    <section>
      <h2>Add a New Task</h2>

      {error && (
        <p className="form-error">
          {error}
        </p>
      )}

      {message && (
        <p className="success-message">{message}</p>
      )}

      <TaskForm addTask={handleAddTask} />

    </section>
  );
};

export default NewTaskPage;
