import express from 'express';
import path from 'path';
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';
import cookieParser from 'cookie-parser';
import cors from "cors";

//Routers import
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

//port config
const PORT = ENV.PORT || 5001; //port config


// part and app declaration
const app = express();
const __dirname = path.resolve();

// user body parsing. 
app.use(express.json());
//cors 
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
//cookie parsing.
app.use(cookieParser());


// routings.
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);


// Ready for deployment.
if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    })
}

//Port access confirmation.
app.listen(PORT, () => {
    console.log('server is running on port' + PORT);
    connectDB();
})