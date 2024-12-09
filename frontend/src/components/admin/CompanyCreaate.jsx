import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

function CompanyCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials:true

      })

      if (res?.data?.status) {
        dispatch(setSingleCompany(res.data.company));
        const companyId = res?.data?.company?._id;
        console.log(companyId);
        toast.success(res.data.message)||"Company Created Successfully";
        // Navigate to company list page after successful registration
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? You can change this
            later.
          </p>
        </div>
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="my-2 rounded-xl"
          placeholder="JobHunt, Microsoft etc."
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            className="border border-black text-black rounded-xl"
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button
            className="bg-black text-white rounded-xl hover:bg-black"
            onClick={registerNewCompany}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CompanyCreate;
