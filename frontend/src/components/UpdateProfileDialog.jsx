import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "@/utils/constant";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice"; // Adjust the import path for your Redux slice

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || "",
  });

  const changeEventHandler = (e) => {

    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    setInput({
      ...input,
      file: file, // Update the file field in your state
    });
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);

    formData.append("skills", input.skills);
    console.log(input.file);
    if (input.file) {
      formData.append("file", input.file);

    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.status) {
        console.log(res.data.user);
        setLoading(false);
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Operation was successful.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
    setOpen(false);
    setLoading(false);
    // console.log(input)
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="max-w-lg p-6 rounded-lg shadow-lg bg-white border border-gray-300"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold text-gray-900">
              Update Profile
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="fullname"
                  className="text-right font-medium text-gray-700"
                >
                  Name
                </Label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your name"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="email"
                  className="text-right font-medium text-gray-700"
                >
                  Email
                </Label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="phoneNumber"
                  className="text-right font-medium text-gray-700"
                >
                  Number
                </Label>
                <input
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your number"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="bio"
                  className="text-right font-medium text-gray-700"
                >
                  Bio
                </Label>
                <input
                  type="text"
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Write a short bio"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="skills"
                  className="text-right font-medium text-gray-700"
                >
                  Skills
                </Label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="List your skills (comma-separated)"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="file"
                  className="text-right font-medium text-gray-700"
                >
                  Resume
                </Label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  // value={input.file}
                  accept=".pdf"
                  onChange={fileChangeHandler}
                  className="col-span-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {loading ? (
                <Button
                  type="submit"
                  className="w-full my-4 flex items-center justify-center"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-md mt-4 my-4 hover:bg-gray-800"
                >
                  Update
                </button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
