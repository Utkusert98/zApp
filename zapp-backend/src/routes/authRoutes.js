// src/routes/authRoutes.js
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

router.post(
  "/register",
  validate([
    body("name").isString().isLength({ min: 2 }),
    body("email").isEmail(),
    body("password").isString().isLength({ min: 6 }),
  ]),
  register
);

router.post(
  "/login",
  validate([body("email").isEmail(), body("password").isString().notEmpty()]),
  login
);

router.get("/me", requireAuth, me);

export default router;
