import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {

    threadType: { type: String, enum: ["channel", "dm"], required: true },
    threadId: { type: mongoose.Schema.Types.ObjectId, required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, default: "" },
    attachments: [{ type: Object }],
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    },
    { timestamps: true }
);

export default mongoose.model("Message", messageSchema);