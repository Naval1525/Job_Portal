import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

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
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        });

        // Return success response
        return res.status(201).json({
            message: "User registered successfully",

            status: true,
        });

    } catch (err) {
        console.error('Registration error:', err);
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
        };

        // Set cookie and send response
        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
                httpOnly: true,
                sameSite: "strict", // Corrected from 'samSite'
                secure: process.env.NODE_ENV === 'production' // Optional: only send in HTTPS in production
            })
            .json({
                message: "User logged in successfully",
                status: true,
                user: userResponse
            });

    } catch (err) {
        console.error('Login error:', err);
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
            sameSite: "strict"
        });

        return res.status(200).json({
            message: "User logged out successfully",
            status: true,
        });
    } catch (err) {
        console.error('Logout error:', err);
        return res.status(500).json({
            error: "Internal server error",
            details: err.message,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file; // If you're handling file upload

        // Validate input fields
        if (!fullname || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({
                error: "All fields are required",
                status: false,
            });
        }

        // Split skills string into array
        const skillsArray = skills.split(",").map(skill => skill.trim());

        // Find user (using the authenticated user's ID from middleware)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                error: "User not found",
                status: false,
            });
        }

        // Update user profile
        await User.findOneAndUpdate(
            { email },
            {
                fullname,
                email,
                phoneNumber,
                profile: {
                    bio,
                    skills: skillsArray,
                },
                // If handling file upload, you'd add profile picture logic here
            },
            { new: true } // Return the updated document
        );

        return res.status(200).json({
            message: "User updated successfully",
            status: true,
        });
    } catch (err) {
        console.error('Profile update error:', err);
        return res.status(500).json({
            error: "Internal server error",
            details: err.message,
        });
    }
};