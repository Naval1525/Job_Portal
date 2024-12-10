import { ArrowLeft } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

function CompanySetup() {
    const { singleCompany } = useSelector(store => store.company);
  const param = useParams();


  useGetCompanyById(param.id);

  const navigate = useNavigate();




  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

//   const changeFileHandler = (e) => {
//     setInput({
//       ...input,
//       file: e.target.files[0],
//     });
//   };
const changeFileHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Optional: Add file type and size validation
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload an image.");
        return;
      }

      if (file.size > maxSize) {
        toast.error("File is too large. Maximum size is 5MB.");
        return;
      }

      setInput({
        ...input,
        file: file,
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.name.trim() || !input.description.trim()) {
      toast.error("Name and Description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website || "");
    formData.append("location", input.location || "");

    // Improved file handling
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);

      const response = await axios.put(
        `${COMPANY_API_END_POINT}/update/${param.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.status) {
        toast.success("Updated Successfully");
        navigate("/admin/companies");
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.error("Update Error:", err.response ? err.response.data : err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // const submitHandler = async (e) => {
  //     e.preventDefault();
  //     if (!input.name.trim() || !input.description.trim()) {
  //         toast.error("Name and Description are required.");
  //         return;
  //     }

  //     const formData = new FormData();
  //     formData.append("name", input.name);
  //     formData.append("description", input.description);
  //     formData.append("website", input.website);
  //     formData.append("location", input.location);

  //     if (input.file) {
  //         formData.append("file", input.file);
  //     }

  //     try {
  //         setLoading(true);
  //         console.log(param.id);
  //         const response = await axios.put(
  //             `${COMPANY_API_END_POINT}/update/${param.id}`,
  //             formData,
  //             {
  //                 headers: {
  //                     "Content-Type": "multipart/form-data",
  //                 },
  //                 withCredentials: true,
  //             }
  //         );

  //         if (response.data.status) {
  //             toast.success("Updated Successfully");
  //             navigate("/admin/companies");
  //         } else {
  //             toast.error("Update failed");
  //         }
  //     } catch (err) {
  //         console.error(err);
  //         toast.error("Something went wrong");
  //     } finally {
  //         setLoading(false);  // Ensure loading is reset
  //     }

  // };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany?.name || "",
        description: singleCompany?.description || "",
        website: singleCompany?.website || "",
        location: singleCompany?.location || "",
        file: null, // Reset file to null for new uploads
      });
    }
  }, [singleCompany]);

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen">
      <Navbar />
      <div className="max-w-xl mx-auto my-10 bg-white shadow-xl rounded-2xl p-8">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 mb-6">
            <Button
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-2 text-white font-semibold bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-800 rounded-2xl px-4 py-2"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl text-gray-800">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="block text-gray-700 text-sm font-semibold mb-2">
                Company Name
              </Label>
              <Input
                type="text"
                name="name"
                placeholder="Enter company name"
                className="rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full mt-2"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="block text-gray-700 text-sm font-semibold mb-2">
                Description
              </Label>
              <Input
                type="text"
                name="description"
                placeholder="Enter description"
                className="rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full mt-2"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="block text-gray-700 text-sm font-semibold mb-2">
                Website
              </Label>
              <Input
                type="text"
                name="website"
                placeholder="Enter website URL"
                className="rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full mt-2"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="block text-gray-700 text-sm font-semibold mb-2">
                Location
              </Label>
              <Input
                type="text"
                name="location"
                placeholder="Enter location"
                className="rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full mt-2"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div className="col-span-2">
              <Label className="block text-gray-700 text-sm font-semibold mb-2">
                Logo
              </Label>
              <Input
                type="file"
                name="file"
                accept="image/*"
                className="rounded-xl h-[5vh] border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full mt-2 file:bg-gray-100 file:border-0 file:py-2 file:px-4 file:text-gray-600 file:rounded-full file:cursor-pointer"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          <div className="mt-6">
            <Button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-semibold py-2 rounded-xl ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-blue-600 hover:to-indigo-500"
              }`}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanySetup;
