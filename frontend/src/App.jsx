import { useState } from "react";


import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import AdminJobs from "./components/admin/AdminJobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreaate from "./components/admin/CompanyCreaate";
import CompanySetup from "./components/admin/CompanySetup";
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
  },
  {
    path: "/description/:id",
    element: <JobDescription></JobDescription>
  },
  {
    path: "/browse",
    element: <Browse></Browse>,
  },
  {
    path: "/profile",
    element: <Profile></Profile>
  },
  //admin
  {
    path:'/admin/companies',
    element:<Companies></Companies>

  },
  {
    path:'/admin/companies/create',
    element:<CompanyCreaate></CompanyCreaate>
  },
  {
    path:'/admin/companies/:id',
    element:<CompanySetup></CompanySetup>
  },
  {
    path:'/admin/jobs',
    element:<AdminJobs></AdminJobs>
  },


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
