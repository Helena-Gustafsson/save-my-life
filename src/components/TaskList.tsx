import TaskItem from "./TaskItem";
import { useTasks } from "../hooks/useTasksHooks";
import useSaveTasks from "../hooks/saveTaskHooks";

type TaskListProps = {
  category: string;
  status: string;
  priority: string;
};

const TaskList = ({ category, status, priority }: TaskListProps) => {
  const { tasks, setTasks, isLoading, error } = useTasks(category, status, priority);
  const { deleteTask: saveDeleteTask, error: saveError, message: saveMessage } = useSaveTasks();
  

const deleteTask = async (deleteId: string) => {
    
  const deletedTask = await saveDeleteTask(deleteId);
  if (deletedTask) {
        setTasks(tasks.filter(task => task.id !== deleteId));
        return true;
    }
    return false;
  };

    return (
        <section>
            <h3>TaskList</h3>

            {isLoading && <p className="loading-message">Loading tasks...</p>}
            {error && <p className="form-error">Could not load tasks: {error}</p>}
            {saveError && <p className="form-error">Something went wrong: {saveError}</p>}
            {saveMessage && <p className="success-message">{saveMessage}</p>}

            
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