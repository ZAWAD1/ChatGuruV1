import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";

//User registration controller.
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