import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/templates/dashboardLayout/DashboardLayout";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout/>,
      children: [

        { path: 'app', element: <DashboardLayout /> },
        { path: 'user', element: <DashboardLayout /> },
        { path: 'products', element: <DashboardLayout /> },
        { path: 'blog', element: <DashboardLayout /> },
      ],
    },
  ]);
