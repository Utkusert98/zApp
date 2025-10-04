// src/controllers/authController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signJwt } from "../utils/jwt.js";

// KESİNLİKLE: Bu dosyada KENDİSİNİ import ETME!
// import authController from "../controllers/authController.js";  <-- BUNU SİL

export async function register(req, res) {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already in use" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });

  const token = signJwt({ id: user._id, email: user.email });
  return res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email, avatarUrl: user.avatarUrl },
    token,
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signJwt({ id: user._id, email: user.email });
  return res.json({
    user: { id: user._id, name: user.name, email: user.email, avatarUrl: user.avatarUrl },
    token,
  });
}

export async function me(req, res) {
  const user = await User.findById(req.user.id).select("-passwordHash");
  return res.json({ user });
}
