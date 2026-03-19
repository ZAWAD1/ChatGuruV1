import express from 'express';

//controllers import.
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

//routers
router.get('/signup', signup);

router.get('/login', (req, res) => {
    res.send('login route');
});

router.get('/logout', (req, res) => {
    res.send('logout route');
});

export default router;