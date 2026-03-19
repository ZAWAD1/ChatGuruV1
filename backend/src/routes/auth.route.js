import express from 'express';

//controllers import.
import { signup, login, logout } from '../controllers/auth.controller.js';

const router = express.Router();

//routers
router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

export default router;