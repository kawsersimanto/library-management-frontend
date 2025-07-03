import App from "@/App";
import Tasks from "@/app/tasks/Tasks";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/tasks",
        element: <Tasks />,
      },
    ],
  },
]);
