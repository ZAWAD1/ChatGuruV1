import express from 'express';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';

//controllers import.
import { signup, login, logout, updateProfile } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';
import arcjet from '@arcjet/node';

const router = express.Router();

// //Test route of rate limit 
// router.get('/test', arcjetProtection, (req, res) => {
//     res.status(200).json({ message: "This is a test route." });
// });

// Arcjet protection 
router.use(arcjetProtection);

//routers
router.post('/signup', signup); //signup
router.post('/login', login); //login
router.post('/logout', logout); //logout
router.put('/update-profile', protectedRoute, updateProfile); // update profile
router.get('/check', protectedRoute,
    (req, res) => res.status(200).json(req.user)); //user logged in check


export default router;