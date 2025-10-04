import { verifyJwt } from "../utils/jwt.js";

export function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    let token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token && req.cookies?.token) token = req.cookies.token; // cookie fallback

    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const payload = verifyJwt(token);
    req.user = payload; // { id, email }
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
