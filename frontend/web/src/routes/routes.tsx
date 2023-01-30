import { createBrowserRouter } from "react-router-dom";
import {
  CreateNewTaskLayout,
  DashboardLayout,
  InitialLayout,
  SubSpaceLayout,
} from "../components/layouts";
import EditWorkTask from "../components/organisms/edit-work-task/EditWorkTask";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <InitialLayout />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "subSpace/:id", element: <SubSpaceLayout /> },
      { path: "subSpace/:id/newTask", element: <CreateNewTaskLayout /> },
      { path: "subSpace/:id/editTask/:taskId", element: <EditWorkTask /> },
    ],
  },
]);
