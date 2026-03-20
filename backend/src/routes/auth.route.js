import express from 'express';

//controllers import.
import { signup, login, logout, updateProfile } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

//routers
router.post('/signup', signup); //signup
router.post('/login', login); //login
router.post('/logout', logout); //logout
router.put('/update-profile', protectedRoute, updateProfile); // update profile
router.get('/check', protectedRoute,
    (req, res) => res.status(200).json(req.user)); //user logged in check

    
export default router;