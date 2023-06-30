import { createHashRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import CreateData from './pages/CreateData';
import ReadData from "./pages/ReadData";

const router = createHashRouter([{
  path: "",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Home />
    },
    {
      path: "create",
      element: <CreateData />
    },
    {
      path: "load",
      element: <ReadData />
    }
  ]
}])


function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
