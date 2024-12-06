import { useState } from "react";


import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";

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
  },
  {
    path: "/jobs",
    element: <Jobs></Jobs>,
  },
  {
    path: "/browse",
    element: <Browse></Browse>,
  },
  {
    path: "/profile",
    element: <Profile></Profile>
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
