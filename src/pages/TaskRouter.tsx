import { createBrowserRouter, RouterProvider } from 'react-router';
import RootLayout from './RootLayout';
import TasksPage from './PageTasks';
import NewTaskPage from './NewTaskPage';
import TaskDetailPage from './TaskDetailPage';
//import EditTaskPage from 
import NotFoundPage from './NotFoundPage'; 

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: TasksPage },
      { path: "tasks/new", Component: NewTaskPage },
      { path: "tasks/:id", Component: TaskDetailPage },
      //{ path: "tasks/:id/edit", Component: EditTaskPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

const TaskRouter = () => {
  return <RouterProvider router={router} />
}

export default TaskRouter;