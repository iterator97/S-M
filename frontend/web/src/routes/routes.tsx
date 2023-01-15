import { createBrowserRouter } from "react-router-dom";
import {
  DashboardLayout,
  InitialLayout,
  SpaceLayout,
} from "../components/layouts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <InitialLayout />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [{ path: "space/:id", element: <SpaceLayout /> }],
  },
]);
