import jwt from 'jsonwebtoken';
import { ENV } from "../lib/env.js";
import User from '../models/User.js';

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt

        // Invalid user
        if (!token) return res.status(401).json({ message: "Unauthorized" })

        const decode = jwt.verify(token, ENV.JWT_SECRET)
        if (!decode) return res.status(401).json({ message: "Invalid token" })

        //valid user
        const user = await User.findById(decode.userId).select('-password')
        if (!user) return res.status(404).json({ message: "User not found" })

        req.user = user
        next()

    } catch (error) {
        console.log("Error in protected route middleware: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};