import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function PostJob() {
    const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    jobType: "",
    position: "",
    experience: "",
    salary: "",
    company: "", // To store the selected company ID
  });

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch companies when component loads
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true, // This sends cookies with the request
        });
        if (response.data.status) {
          setCompanies(response.data.companies);
        } // Assuming the backend sends an array of companies
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []); // Empty array means this will run only once, on mount

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${JOB_API_END_POINT}/postjob`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status) {

        navigate("/admin/companies");
        toast.success("Job posted successfully!");
      }

    } catch (error) {
      console.error("Network error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="">
    <Navbar />
    <div className="flex justify-center items-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-10 rounded-2xl shadow-xl border border-gray-200 transform transition-transform hover:shadow-2xl hover:scale-101"
      >
        <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-6">
          Post a Job
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Fill out the details below to post your job listing and attract the best talent.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Render input fields */}
          {[
            { label: "Title", name: "title", placeholder: "Enter job title" },
            {
              label: "Description",
              name: "description",
              placeholder: "Enter job description",
            },
            {
              label: "Requirements",
              name: "requirements",
              placeholder: "Enter requirements (comma-separated)",
            },
            {
              label: "Location",
              name: "location",
              placeholder: "Enter location",
            },
            {
              label: "Job Type",
              name: "jobType",
              placeholder: "Enter job type",
            },
            {
              label: "Position",
              name: "position",
              placeholder: "Enter position",
            },
            {
              label: "Experience",
              name: "experience",
              placeholder: "Enter required experience",
            },
            { label: "Salary", name: "salary", placeholder: "Enter salary" },
          ].map(({ label, name, placeholder }) => (
            <div key={name}>
              <Label className="block text-sm font-semibold text-blue-600 mb-2">
                {label}
              </Label>
              <Input
                type="text"
                name={name}
                value={input[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
            </div>
          ))}

          {/* Render Select for Companies */}
          {loading ? (
            <p className="text-center text-blue-500">Loading companies...</p>
          ) : (
            companies.length > 0 && (
              <div>
                <Label className="block text-sm font-semibold text-blue-600 mb-2">
                  Select Company
                </Label>
                <Select
                  onValueChange={(value) =>
                    setInput((prev) => ({ ...prev, companyId: value }))
                  }
                >
                  <SelectTrigger className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-lg shadow-md">
                    {companies.map((company) => (
                      <SelectItem key={company._id} value={company._id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )
          )}
        </div>

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="rounded-2xl w-full max-w-xs bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 px-6 shadow-lg hover:bg-gradient-to-l hover:scale-110 transition-all transform"
          >
            Submit Job
          </button>
        </div>
      </form>
    </div>
  </div>

  );
}

export default PostJob;
