import mongoose from "mongoose";

const directThreadSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    lastMessageAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("DirectThread", directThreadSchema);
