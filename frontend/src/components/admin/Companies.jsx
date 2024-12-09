import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";

function Companies() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit rounded-xl"
            placeholder="Filter by name"
          ></Input>
          <Button
            className="bg-black text-white rounded-xl hover:bg-black "
            onClick={() => navigate("/admin/companies/create")}
          >
            New Company
          </Button>
        </div>
        <CompaniesTable></CompaniesTable>
      </div>
    </div>
  );
}
export default Companies;
