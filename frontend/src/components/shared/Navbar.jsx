// import React from "react";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { User, LogOut } from "lucide-react";
// import { Link, Links, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import { USER_API_END_POINT } from "@/utils/constant";
// import axios from "axios";
// import { setUser } from "@/redux/authSlice";

// const Navbar = () => {
//   // const user = false;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
// const loggoutHandler = async () =>{
//   try {
//     const res = await axios.get(`${USER_API_END_POINT}/logout`,{
//       withCredentials:true
//     })
//     if(res.data.status){
//     dispatch(setUser(null))
//     toast.success('Logged out successfully')
//     navigate('/')
//     }

//   } catch (error) {
//     console.log(error);
//     toast.error('Failed to logout')
//   }
// }
// const {user}= useSelector(store=>store.auth)
//   return (
//     <div className="bg-white ">
//       <div className="flex items-center justify-between mx-auto h-16 w-3/4">
//         <div>
//           <h1 className="text-2xl font-bold">
//             Job <span className="text-blue-700">Portal</span>
//           </h1>
//         </div>

//         <div className="flex items-center gap-8">
//           <nav>
//             <ul className="flex font-medium items-center gap-5">
//               <li className="hover:text-blue-700 cursor-pointer">
//                 <Link to="/">Home</Link>
//               </li>
//               <li className="hover:text-blue-700 cursor-pointer">
//                 <Link to="/jobs">Jobs</Link>
//               </li>
//               <li className="hover:text-blue-700 cursor-pointer">
//                 <Link to="/browse">Browse</Link>
//               </li>
//             </ul>
//           </nav>
//           {!user ? (
//             <>
//               <Link to="/login">
//                 <Button
//                   variant="solid"
//                   className="bg-blue-700 text-white hover:bg-blue-900 "
//                 >
//                   Login
//                 </Button>
//               </Link>
//               <Link to="/signup">
//                 <Button variant="outline" className="text-blue-700">
//                   Signup
//                 </Button>
//               </Link>
//             </>
//           ) : (
//             <Popover>
//               <PopoverTrigger>
//                 <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
//                   <AvatarImage
//                     src="https://github.com/shadcn.png"
//                     alt="User avatar"
//                   />
//                 </Avatar>
//               </PopoverTrigger>

//               <PopoverContent className="w-80 p-4">
//                 <div className="flex flex-col gap-4">
//                   <div className="flex gap-4">
//                     <Avatar>
//                       <AvatarImage
//                         src="https://github.com/shadcn.png"
//                         alt="User avatar"
//                       />
//                     </Avatar>

//                     <div className="flex-1">
//                       <h4 className="font-medium">Naval</h4>
//                       <p className="text-sm text-gray-500">
//                         Hello, welcome to Job Portal!
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex flex-col gap-2 pt-2 border-t">
//                   <Link to="/profile">
//                     <Button variant="ghost" className="justify-start gap-2">

//                       <User size={16} />
//                       View Profile

//                     </Button>
//                     </Link>

//                     <Button
//                       onClick={loggoutHandler}
//                       variant="ghost"
//                       className="justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
//                     >
//                       <LogOut size={16} />
//                       Logout
//                     </Button>
//                   </div>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
// import React, { useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { useEffect } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  // Ensure user is loaded from localStorage when the page is refreshed
  // useEffect(() => {
  //   const savedUser = JSON.parse(localStorage.getItem("user"));
  //   if (savedUser) {
  //     dispatch(setUser(savedUser));
  //   }
  // }, [dispatch]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.status) {
        dispatch(setUser(null));
        localStorage.removeItem("user"); // Clear user data from localStorage
        navigate("/");
        toast.success("Logged out successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

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
              {user && user.role === "recruiter" ? (
                <>
                  <li className="hover:text-blue-700 cursor-pointer">
                    <Link to="/admin/companies">Companies</Link>
                  </li>
                  <li className="hover:text-blue-700 cursor-pointer">
                    <Link to="/admin/jobs">Jobs</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="hover:text-blue-700 cursor-pointer">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="hover:text-blue-700 cursor-pointer">
                    <Link to="/jobs">Jobs</Link>
                  </li>
                  <li className="hover:text-blue-700 cursor-pointer">
                    <Link to="/browse">Browse</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          {!user ? (
            <>
              <Link to="/login">
                <Button
                  variant="solid"
                  className="bg-blue-700 text-white hover:bg-blue-900 "
                >
                  Recruiter
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" className="text-blue-700">
                  Candidate
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="User avatar"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="User avatar"
                      />
                    </Avatar>

                    <div className="flex-1">
                      <h4 className="font-medium">
                        {user?.fullname || "User"}
                      </h4>
                      <p className="text-sm text-gray-500">
                        <>
                          {user?.profile?.bio ||
                            "Hello, welcome to Job Portal!"}
                        </>
                      </p>
                    </div>
                  </div>
                  {user.role === "recruiter" ? (
                    <>
                      <Button
                        onClick={logoutHandler}
                        variant="ghost"
                        className="justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <LogOut size={16} />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-2 pt-2 border-t">
                        <Link to="/profile">
                          <Button
                            variant="ghost"
                            className="justify-start gap-2"
                          >
                            <User size={16} />
                            View Profile
                          </Button>
                        </Link>

                        <Button
                          onClick={logoutHandler}
                          variant="ghost"
                          className="justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <LogOut size={16} />
                          Logout
                        </Button>
                      </div>
                    </>
                  )}

                  {/* <div className="flex flex-col gap-2 pt-2 border-t">
                    <Link to="/profile">
                      <Button variant="ghost" className="justify-start gap-2">
                        <User size={16} />
                        View Profile
                      </Button>
                    </Link>

                    <Button
                      onClick={logoutHandler}
                      variant="ghost"
                      className="justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <LogOut size={16} />
                      Logout
                    </Button>
                  </div> */}
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
