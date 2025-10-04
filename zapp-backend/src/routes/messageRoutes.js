import { Router } from "express";
/**
 * @swagger
 * /api/channels/{id}/messages:
 *   get:
 *     summary: List channel messages
 */
import { protect } from "../middlewares/authMiddleware.js";
import { listChannelMessages } from "../controllers/messageController.js";
const router = Router();
router.get("/channel/:id", protect, listChannelMessages);
export default router;