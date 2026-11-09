import type { Task } from "../types/taskTypes";
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
  const { deleteTask: saveDeleteTask, editTask: saveEditTask, error: saveError, message: saveMessage } = useSaveTasks();
  

const deleteTask = async (deleteId: string) => {
    
  const deletedTask = await saveDeleteTask(deleteId);
  if (deletedTask) {
        setTasks(tasks.filter(task => task.id !== deleteId));
        return true;
    }
    return false;
  };

  const editTask = async (updatedTask: Task) => {
    const updatedTaskData = await saveEditTask(updatedTask);
    
    if (updatedTaskData) {
        setTasks (tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
        return true;
    }
    return false;
    
  };

    return (
        <section>
            <h3>TaskList</h3>

            {error && <p style={{color: 'green'}}>Loading tasks...</p>}
            {saveError && <p style={{color: 'red'}}>Something went wrong: {error}</p>}
            {saveMessage && <p>{saveMessage}</p>}
            
            <ul className="tasks">
            {!isLoading && !error &&
                tasks.map(task => (
                <TaskItem key={task.id} task={task} deleteTask={deleteTask} editTask={editTask} />
                ))
            }
            </ul>
        </section>
    );
}

export default TaskList;