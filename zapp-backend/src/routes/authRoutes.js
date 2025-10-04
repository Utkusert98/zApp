import { Router } from "express";
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register
 */
import { register, login } from "../controllers/authController.js";
const router = Router();
router.post("/register", register);
router.post("/login", login);
export default router;