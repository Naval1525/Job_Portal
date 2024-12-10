import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventhandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.status) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      dispatch(setLoading(false));
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
          <h2 className="font-bold text-2xl mb-6 text-center">Login</h2>

          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                value={input.email}
                name="email"
                onChange={changeEventhandler}
                type="email"
                placeholder="Enter your email"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                value={input.passwoerd}
                name="password"
                onChange={changeEventhandler}
                type="password"
                placeholder="Enter password"
                className="mt-2"
              />
            </div>
            <div className="flex justify-between items-center">
              <RadioGroup className="flex items-center gap-4 my-5">
                <div className="flex items-center space-x-2">
                  <Input
                    checked={input.role === "student"}
                    onChange={changeEventhandler}
                    type="radio"
                    name="role"
                    value="student"
                    className="cursor-pointer"
                    id="r1"
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    checked={input.role === "recruiter"}
                    onChange={changeEventhandler}
                    type="radio"
                    name="role"
                    value="recruiter"
                    className="cursor-pointer"
                    id="r2"
                  />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h4 w-4 animate-spin"></Loader2>Please
                wait{" "}
              </Button>
            ) : (
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md mt-4 my-4"
              >
                Login
              </button>
            )}

            <div className="mt-3">
              <span className="text-sm my-4">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-500 hover:text-blue-700">
                  Signup
                </a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
