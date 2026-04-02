import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";

//User signup controller.
export const signup = async (req, res) => {

    const { fullName, email, password } = req.body

    try {
        //fields validation
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //password length validation 
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        //email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        //check if user already exists.
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" })
        }


        //password encryption.
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            const savedUser = await newUser.save()
            generateToken(savedUser._id, res)

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });


            // welcome email sending.
            try {
                await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
            } catch (error) {
                console.error("Error sending welcome email: ", error);
            }

        } else {
            res.status(400).json({ message: "Invalid user data" })
        }
    } catch (error) {
        console.log("Error in sighnup controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//User login controller.
export const login = async (req, res) => {
    const { email, password } = req.body

    //Empty fields flag
    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required" });
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid Credancials" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credancials" })
        }


        generateToken(user._id, res)

        //Back to client. json body.
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in login controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//User logout controller.
export const logout = (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "Logout successful" })
}

//Update profile
export const updateProfile = async (_, res) => {

    try {
        const { profilePic } = req.body

        if (!profilePic) return res.status(400).json({ message: "Profile picture is required" });

        const userId = req.user._id;
        await cloudinary.uploader.upload(profilePic)
        await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })

        res.status(200).json(updatedUser)
    } catch (error) {
        console.error("Error in updateProfile controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}