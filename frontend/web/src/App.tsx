import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";

function App() {
  let temp = process.env.REACT_APP_API_URL;
  return (
    <>
    <RouterProvider router={router} /></>
  );
}

export default App;
