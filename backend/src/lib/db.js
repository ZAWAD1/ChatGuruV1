import mongoose from 'mongoose';
import { ENV } from '../lib/env.js';

export const connectDB = async () => {
    try {
        const { MONGO_URI } = ENV;

        const conn = await mongoose.connect(ENV.MONGO_URI)
        console.log("MONGODB CONNECTED:", conn.connection.host)
        console.log("MONGODB URI: ", ENV.MONGO_URI)
    } catch (error) {
        console.error("Error connecting to MONGODB: ", error)
        process.exit(1);
    }
}