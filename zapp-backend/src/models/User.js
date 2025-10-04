import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, minlength: 2, maxlength: 50 },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    avatarUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
