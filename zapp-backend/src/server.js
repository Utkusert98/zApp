import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const { MONGODB_URI, PORT = 4000, NODE_ENV } = process.env;

try {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Mongo connected");
  app.listen(PORT, () => {
    console.log(`✅ API running (${NODE_ENV}) → http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("❌ Mongo connection error:", err.message);
  process.exit(1);
}
