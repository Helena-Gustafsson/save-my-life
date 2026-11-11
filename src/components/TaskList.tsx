import TaskItem from "./TaskItem";
import { useTasks } from "../hooks/useTasksHooks";
import useSaveTasks from "../hooks/saveTaskHooks";
import { useState } from "react";


type TaskListProps = {
  category: string;
  status: string;
  priority: string;
};

const TaskList = ({ category, status, priority }: TaskListProps) => {
  const { tasks, setTasks, isLoading, error } = useTasks(category, status, priority);
  const { deleteTask: saveDeleteTask, error: saveError } = useSaveTasks();
  const [showSaveError, setShowSaveError] = useState(false);

  const deleteTask = async (deleteId: string) => {
    setShowSaveError(false);
    const deletedTask = await saveDeleteTask(deleteId);

    if (deletedTask) {
      setTimeout(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== deleteId));
      }, 3000);
      return true;
    }

    setShowSaveError(true);
    setTimeout(() => {
      setShowSaveError(false);
    }, 4000);
    return false;
  };

    return (
        <section>
            <h3>TaskList</h3>

            {isLoading && <p className="loading-message">Loading tasks...</p>}
            {error && <p className="form-error">Could not load tasks: {error}</p>}
            {showSaveError && saveError && (<p className="form-error">Something went wrong: {saveError}</p>)}

            <ul className="tasks">
            {!isLoading && !error &&
                tasks.map(task => (
                <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
                ))
            }
            </ul>
        </section>
    );
}

export default TaskList;