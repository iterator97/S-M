import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout, BaseLayout } from "../components/layouts";
import EditWorkTask from "../components/organisms/edit-work-task/EditWorkTask";
import { CreateNewTask, EditProject, SubProject } from "../components/pages";
import NewSpace from "../components/pages/new-project/NewProject";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "project/:id/subSpace/:id", element: <SubProject /> },
      { path: "project/:id", element: <EditProject /> },
      { path: "subSpace/:id/newTask", element: <CreateNewTask /> },
      { path: "subSpace/:id/editTask/:taskId", element: <EditWorkTask /> },
      { path: "newSpace", element: <NewSpace /> },
    ],
  },
]);
