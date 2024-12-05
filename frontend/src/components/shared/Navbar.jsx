import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User, LogOut } from "lucide-react";
import { Link, Links } from "react-router-dom";

const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white ">
      <div className="flex items-center justify-between mx-auto h-16 w-3/4">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-blue-700">Portal</span>
          </h1>
        </div>

        <div className="flex items-center gap-8">
          <nav>
            <ul className="flex font-medium items-center gap-5">
              <li className="hover:text-blue-700 cursor-pointer">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-blue-700 cursor-pointer">
                <Link to="/jobs">Jobs</Link>
              </li>
              <li className="hover:text-blue-700 cursor-pointer">
                <Link to="/browse">Browse</Link>
              </li>
            </ul>
          </nav>
          {!user ? (
            <>
              <Link to="/login">
                <Button
                  variant="solid"
                  className="bg-blue-700 text-white hover:bg-blue-900 "
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" className="text-blue-700">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User avatar"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="User avatar"
                      />
                    </Avatar>

                    <div className="flex-1">
                      <h4 className="font-medium">Naval</h4>
                      <p className="text-sm text-gray-500">
                        Hello, welcome to Job Portal!
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t">
                    <Button variant="ghost" className="justify-start gap-2">
                      <User size={16} />
                      View Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
