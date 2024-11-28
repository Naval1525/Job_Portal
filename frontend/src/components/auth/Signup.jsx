import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function Signup() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form className="w-1/2 border-2 border-gray-200 rounded-xl p-6 my-10 shadow-md">
          <h2 className="font-bold text-2xl mb-6 text-center">Signup</h2>

          <div className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                placeholder="Enter your full name"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="mt-2"
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                type="text"
                placeholder="Enter your phone number"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Create password"
                className="mt-2"
              />
            </div>
            <div className="flex justify-between items-center">

            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
