import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        isPrivate: { type: Boolean, default: false },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

export default mongoose.model("Channel", channelSchema);

