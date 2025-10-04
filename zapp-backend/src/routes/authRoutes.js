import { Router } from "express";
import { body, validationResult } from "express-validator";
import { register, login, me } from "../controllers/authController.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

const validate = (checks) => [
  ...checks,
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    next();
  },
];

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, example: "Utku" }
 *               email: { type: string, format: email, example: "utku@example.com" }
 *               password: { type: string, minLength: 6, example: "Passw0rd!" }
 *     responses:
 *       201:
 *         description: Created
 */
router.post(
  "/register",
  validate([
    body("name").isString().isLength({ min: 2 }),
    body("email").isEmail(),
    body("password").isString().isLength({ min: 6 }),
  ]),
  register
);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Log in
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email, example: "utku@example.com" }
 *               password: { type: string, example: "Passw0rd!" }
 *     responses:
 *       200:
 *         description: OK
 */
router.post(
  "/login",
  validate([body("email").isEmail(), body("password").isString().notEmpty()]),
  login
);

/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/me", requireAuth, me);

export default router;
