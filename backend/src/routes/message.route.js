import express from 'express';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { getAllContacts, sendMessage, getMessageByUserId, getAllPartners } from '../controllers/message.controller.js';


const router = express.Router();

router.use(arcjetProtection, protectedRoute);

// Content retrival
router.get("/contacts", getAllContacts);
router.get("/chats", getAllPartners);
router.get("/:id", getMessageByUserId);
router.post("/send/:id", sendMessage);

export default router;