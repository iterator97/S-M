import { createBrowserRouter } from "react-router-dom";
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
      // { path: "app", element: <DashboardLayout /> },
      // { path: "user", element: <DashboardLayout /> },
      // { path: "products", element: <DashboardLayout /> },
      // { path: "blog", element: <DashboardLayout /> },
    ],
  },
]);
