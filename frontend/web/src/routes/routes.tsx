import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/pages/dashboard/Dashboard";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard/>,
    },
  ]);
