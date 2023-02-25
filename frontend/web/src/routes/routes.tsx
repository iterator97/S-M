import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout, BaseLayout } from "../components/layouts";
import EditWorkTask from "../components/organisms/edit-work-task/EditWorkTask";
import { CreateNewTask, SubProject } from "../components/pages";
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
      { path: "subSpace/:id", element: <SubProject /> },
      { path: "subSpace/:id/newTask", element: <CreateNewTask /> },
      { path: "subSpace/:id/editTask/:taskId", element: <EditWorkTask /> },
      { path: "newSpace", element: <NewSpace /> },
    ],
  },
]);
