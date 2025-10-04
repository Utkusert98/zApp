import { Router } from "express";
/**
 * @swagger
 * /api/channels:
 *   get:
 *     summary: List channels
 */
import { protect } from "../middlewares/authMiddleware.js";
import { listChannels, createChannel } from "../controllers/channelController.js";
const router = Router();
router.get("/", protect, listChannels);
router.post("/", protect, createChannel);
export default router;
