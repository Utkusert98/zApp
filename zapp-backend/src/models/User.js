import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true },
    passwordHash: { type: String, required: true },
    displayName: { type: String, required: true },
    avatarUrl: String,
    roles: { type: [String], default: ["user"] },
    lastSeenAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

