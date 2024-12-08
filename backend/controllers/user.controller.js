import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// export const register = async (req, res) => {
//     try {
//         // Destructure and validate required fields
//         const { fullname, email, phoneNumber, password, role } = req.body;

//         // Validate input fields
//         if (!fullname || !email || !phoneNumber || !password || !role) {
//             return res.status(400).json({
//                 error: "All fields are required",
//                 status: false,
//             });
//         }
//         const file = req.file;

//                 const fileUri = dataUri(file);
//                 let cloudResponse = await cloudinary.uploader.upload(fileUri.content);

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({
//                 error: "User already exists",
//                 status: false,
//             });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         await User.create({
//             fullname,
//             email,
//             phoneNumber,
//             password: hashedPassword,
//             role,
//             profile:{
//                 profilePhoto:cloudResponse.secure_url,

//             }
//         });

//         // Return success response
//         return res.status(201).json({
//             message: "User registered successfully",

//             status: true,
//         });

//     } catch (err) {
//         console.error('Registration error:', err);
//         return res.status(500).json({
//             error: "Internal server error",
//             details: err.message,
//         });
//     }
// };
export const register = async (req, res) => {
  try {
    // Destructure and validate required fields
    const { fullname, email, phoneNumber, password, role } = req.body;

    // Validate input fields
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        error: "All fields are required",
        status: false,
      });
    }

    const file = req.file;

    // Upload profile photo to cloud storage (e.g., Cloudinary)
    const fileUri = dataUri(file);
    let cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
        status: false,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    // Return success response with the full user object
    return res.status(201).json({
      message: "User registered successfully",
      status: true,
      user: newUser, // Include the entire user object in the response
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    // Destructure and validate required fields
    const { email, password, role } = req.body;

    // Validate input fields
    if (!email || !password || !role) {
      return res.status(400).json({
        error: "All fields are required",
        status: false,
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "User not found",
        status: false,
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid credentials",
        status: false,
      });
    }

    // Verify role
    if (user.role !== role) {
      return res.status(400).json({
        error: "Invalid role",
        status: false,
      });
    }

    // Generate token
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Prepare user response (exclude sensitive information)
    const userResponse = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // Set cookie and send response
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        httpOnly: true,
        sameSite: "strict", // Corrected from 'samSite'
        secure: process.env.NODE_ENV === "production", // Optional: only send in HTTPS in production
      })
      .json({
        message: "User logged in successfully",
        status: true,
        user: userResponse,
      });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "User logged out successfully",
      status: true,
    });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { email, fullname, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    // Log incoming data for debugging

    // Validate required fields
    if (!email) {
      return res.status(400).json({
        error: "Email is required",
        status: false,
      });
    }

    // Find existing user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
        status: false,
      });
    }

    // Process skills
    let skillsArray = [];
    if (skills) {
      skillsArray = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
    }

    // Prepare update data
    // Prepare update data
    const updateData = {
      fullname,
      phoneNumber,
      profile: {
        bio: bio || user.profile.bio,
        skills: skillsArray.length > 0 ? skillsArray : user.profile.skills,
        // Retain the existing profile photo if no file is uploaded
        profilePhoto: user.profile.profilePhoto || null, // Retains the existing photo or null if none
      },
    };

    // Handle file upload
    let cloudResponse;
    if (file) {
      try {
        // Ensure file exists before processing
        const fileUri = dataUri(file);
        cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // Add resume details to update
        updateData.profile.resume = cloudResponse.secure_url;
        updateData.profile.resumeOriginalName = file.originalname;
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError);
        return res.status(500).json({
          error: "File upload failed",
          details: uploadError.message,
          status: false,
        });
      }
    }

    // Update user document
   // Update user document
const updatedUser = await User.findOneAndUpdate(
  { email },
  { $set: updateData },
  {
    new: true, // Return the updated document
    runValidators: true, // Run model validation
  }
);


    // Check if user was found and updated
    if (!updatedUser) {
      return res.status(404).json({
        error: "User not found",
        status: false,
      });
    }

    console.log("Updated User:", updatedUser);

    // Return updated user details
    console.log(user);
    return res.status(200).json({
      message: "User updated successfully",
      status: true,
      user: {
        email: updatedUser.email,
        fullname: updatedUser.fullname,
        phoneNumber: updatedUser.phoneNumber,
        profile: updatedUser.profile, // Ensure the full profile, including profilePhoto, is returned
      },
    });

  } catch (err) {
    console.error("Profile update error:", err);

    // Handle specific MongoDB validation errors
    if (err.name === "ValidationError") {
      return res.status(400).json({
        error: "Validation Error",
        details: Object.values(err.errors).map((error) => error.message),
        status: false,
      });
    }

    // Generic server error
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
      status: false,
    });
  }
};

// export const updateProfile = async (req, res) => {
//     try {
//         const { email, fullname, phoneNumber, bio, skills } = req.body;
//         const file = req.file;
//         console.log(file);
//         const fileUri = dataUri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

//         let skillsArray;
//         if(skills){
//             skillsArray = skills.split(",");

//         }

//         // Validate input
//         if (!email) {
//             return res.status(400).json({
//                 error: "Email is required",
//                 status: false
//             });
//         }

//         // Ensure skills is an array, defaulting to empty array if not provided
//         if(cloudResponse){
//             User.profile.resume=cloudResponse.secure_url //ur from cloudinary
//             User.profile.resumeOriginalName=file.originalname //original name of file
//         }

//         const updatedUser = await User.findOneAndUpdate(
//             { email },
//             {
//                 fullname,
//                 email,
//                 phoneNumber,
//                 profile:User.profile,
//                 // If handling file upload, you'd add profile picture logic here
//             },
//             {
//                 new: true,  // Return the updated document
//                 runValidators: true  // Run model validation
//             }
//         );

//         // Check if user was found and updated
//         if (!updatedUser) {
//             return res.status(404).json({
//                 error: "User not found",
//                 status: false
//             });
//         }

//         console.log('Updated User:', updatedUser);

//         return res.status(200).json({
//             message: "User updated successfully",
//             status: true,
//             user: {
//                 email: updatedUser.email,
//                 fullname: updatedUser.fullname,
//                 phoneNumber: updatedUser.phoneNumber,
//                 profile: updatedUser.profile,
//                 skills:updatedUser.profile.skills,
//                 bio:updatedUser.profile.bio,
//                 resume:updatedUser.profile.resume

//             }
//         });
//     } catch (err) {
//         console.error('Profile update error:', err);

//         // Handle specific MongoDB validation errors
//         if (err.name === 'ValidationError') {
//             return res.status(400).json({
//                 error: "Validation Error",
//                 details: Object.values(err.errors).map(error => error.message),
//                 status: false
//             });

//     }
// }};

// export const updateProfile = async (req, res) => {
//     try {
//         const { email, fullname, phoneNumber, bio, skills } = req.body;
//         const file = req.file;

//         // Validate required fields
//         if (!email) {
//             return res.status(400).json({
//                 error: "Email is required",
//                 status: false
//             });
//         }

//         // Find the user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({
//                 error: "User not found",
//                 status: false
//             });
//         }

//         // Process skills
//         let skillsArray = [];
//         if (skills) {
//             skillsArray = skills.split(",").map(skill => skill.trim()).filter(skill => skill);
//         }

//         // Handle file upload (resume/profile picture)
//         let cloudResponse = null;
//         if (file) {
//             try {
//                 // Convert file to data URI
//                 const fileUri = new dataUri().format(file.originalname, file.buffer);

//                 // Upload to Cloudinary
//                 cloudResponse = await cloudinary.v2.uploader.upload(fileUri.content, {
//                     folder: 'resumes',
//                     resource_type: 'raw' // for handling different file types
//                 });
//             } catch (uploadError) {
//                 console.error('Cloudinary Upload Error:', uploadError);
//                 return res.status(500).json({
//                     error: "File upload failed",
//                     status: false
//                 });
//             }
//         }
//         console.log('Cloudinary Upload Response:', cloudResponse);
//         console.log('Resume URL:', cloudResponse.secure_url);

//         // Prepare update object
//         const updateData = {
//             fullname,
//             phoneNumber,
//             profile: {
//                 bio: bio || user.profile.bio,
//                 skills: skillsArray.length > 0 ? skillsArray : user.profile.skills
//             }
//         };

//         // Update resume if a new file was uploaded
//         if (cloudResponse) {
//             updateData.profile.resume = cloudResponse.secure_url;
//             updateData.profile.resumeOriginalName = file.originalname;
//         }

//         // Update user document
//         const updatedUser = await User.findOneAndUpdate(
//             { email },
//             { $set: updateData },
//             {
//                 new: true,  // Return the updated document
//                 runValidators: true  // Run model validation
//             }
//         );

//         // Prepare response
//         return res.status(200).json({
//             message: "Profile updated successfully",
//             status: true,
//             user: {
//                 email: updatedUser.email,
//                 fullname: updatedUser.fullname,
//                 phoneNumber: updatedUser.phoneNumber,
//                 profile: {
//                     bio: updatedUser.profile.bio,
//                     skills: updatedUser.profile.skills,
//                     resume: updatedUser.profile.resume,
//                     resumeOriginalName: updatedUser.profile.resumeOriginalName
//                 }
//             }
//         });

//     } catch (err) {
//         console.error('Profile update error:', err);

//         // Handle specific error types
//         if (err.name === 'ValidationError') {
//             return res.status(400).json({
//                 error: "Validation Error",
//                 details: Object.values(err.errors).map(error => error.message),
//                 status: false
//             });
//         }

//         // Generic server error
//         return res.status(500).json({
//             error: "Internal Server Error",
//             message: err.message,
//             status: false
//         });
//     }
// };

// // Optional: Get User Profile
// export const getProfile = async (req, res) => {
//     try {
//         const { email } = req.query;

//         if (!email) {
//             return res.status(400).json({
//                 error: "Email is required",
//                 status: false
//             });
//         }

//         const user = await User.findOne({ email }).select('-password');

//         if (!user) {
//             return res.status(404).json({
//                 error: "User not found",
//                 status: false
//             });
//         }

//         return res.status(200).json({
//             status: true,
//             user: {
//                 email: user.email,
//                 fullname: user.fullname,
//                 phoneNumber: user.phoneNumber,
//                 profile: user.profile
//             }
//         });
//     } catch (err) {
//         console.error('Get profile error:', err);
//         return res.status(500).json({
//             error: "Internal Server Error",
//             message: err.message,
//             status: false
//         });
//     }
// };
