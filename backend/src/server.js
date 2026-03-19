import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './lib/db.js';

//Routers import
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';

//dotenv config
dotenv.config({ path: path.resolve(process.cwd(), 'src/.env') });
console.log("MONGO_URI:", process.env.MONGO_URI);
const PORT = process.env.PORT || 5001; //port config


// part and app declaration
const app = express();
const __dirname = path.resolve();
// user body parsing. 
app.use(express.json());

// routings.
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);


// Ready for deployment.
if (process.env.NODE_ENV === 'production') {
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