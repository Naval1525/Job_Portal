import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";

import { useState } from "react";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";

import useGetAdminAllJobs from "@/hooks/useGetAllAdmin";

function AdminJobs() {
  useGetAdminAllJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex items-center justify-between my-5 ">
          {/* <Input
            className="w-fit rounded-xl"
            placeholder="Filter by name"
            onChange={(e)=>setInput(e.target.value)}
          ></Input> */}
          <Button
            className="bg-black text-white rounded-xl hover:bg-black "
            onClick={() => navigate("/admin/jobs/post")}
          >
            Post New Jobs
          </Button>
        </div>
        <AdminJobsTable></AdminJobsTable>
      </div>
    </div>
  );
}
export default AdminJobs;
