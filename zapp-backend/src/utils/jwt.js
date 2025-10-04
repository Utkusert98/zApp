import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export function signJwt(payload, opts = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d", ...opts });
}

export function verifyJwt(token) {
  return jwt.verify(token, JWT_SECRET);
}