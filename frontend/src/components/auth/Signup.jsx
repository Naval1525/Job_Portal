import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student", // Default role
    file: null,
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files[0],
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(res.data);

      // if (res.data.status) {
      //   navigate("/login");
      //   toast.success(res.data.message);
      // }
      if (res.data.status) {  // Check if the status is true
        toast.success(res.data.message || "Operation was successful.");  // Show success message from server
        navigate("/login");  // Navigate to the login page
      } else {
        toast.error(res.data.message || "Something went wrong. Please try again.");  // Handle failure
      }

    } catch (err) {
      console.error(err.response);
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          className="w-1/2 border-2 border-gray-200 rounded-xl p-6 my-10 shadow-md"
          onSubmit={submitHandler}
        >
          <h2 className="font-bold text-2xl mb-6 text-center">Signup</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                type="text"
                placeholder="Enter your full name"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                type="email"
                placeholder="Enter your email"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                type="text"
                placeholder="Enter your phone number"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                type="password"
                placeholder="Create password"
                className="mt-2"
              />
            </div>

            <RadioGroup
              value={input.role}
              onValueChange={(value) =>
                setInput((prev) => ({ ...prev, role: value }))
              }
              className="flex items-center gap-4 my-5"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="student"
                  id="r1"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="recruiter"
                  id="r2"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <Label htmlFor="profile">Profile</Label>
              <Input
                id="profile"
                accept="image/*"
                type="file"
                name="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md mt-4 my-4"
            >
              Sign Up
            </button>

            <div className="mt-3 gap-2">
              <span className="text-sm my-4">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500 hover:text-blue-700">
                  Login
                </a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
