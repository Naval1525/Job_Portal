import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";

function AdminJobs() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex items-center justify-between my-5 ">
          <Button
            className="bg-black text-white rounded-xl hover:bg-black "
            onClick={() => navigate("/admin/companies/create")}
          >
            Post New Jobs
          </Button>
          {/* <Input
            className="w-fit rounded-xl"
            placeholder="Filter by name"
          ></Input> */}
        </div>
        <CompaniesTable></CompaniesTable>
      </div>
    </div>
  );
}
export default AdminJobs;
