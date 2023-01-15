import { createBrowserRouter } from "react-router-dom";
import SpaceLayout from "../components/templates/spaceLayout/Space";
import DashboardLayout from "../components/templates/dashboardLayout/DashboardLayout";
import InitialLayout from "../components/templates/initialLayout/InitialLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <InitialLayout />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "space/:id", element: <SpaceLayout /> },
      { path: "user", element: <DashboardLayout /> },
    ],
  },
]);
