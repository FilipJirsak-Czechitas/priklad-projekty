import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { App } from "./App.jsx";
import "./global.scss";
import { NewTask } from "./pages/NewTask/index.jsx";
import { ProjectDetail } from "./pages/ProjectDetail/index.jsx";
import { ProjectEdit } from "./pages/ProjectEdit/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "new",
        element: <NewTask />,
      },
      {
        path: "project/:projectId",
        element: <ProjectDetail />,
      },
      {
        path: "project/:projectId/edit",
        element: <ProjectEdit />,
      },
    ],
  },
]);

createRoot(document.querySelector("#app")).render(<RouterProvider router={router} />);
