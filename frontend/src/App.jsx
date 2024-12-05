import { useState } from "react";


import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs></Jobs>,
  }
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Only use RouterProvider for routing */}
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
