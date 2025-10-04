import Message from "../models/Message.js";

export const listChannelMessages = async (req, res, next) => {
  try {
    const { id } = req.params; // channelId
    const msgs = await Message.find({ threadType: "channel", threadId: id })
      .sort({ createdAt: -1 }).limit(50);
    res.json(msgs.reverse());
  } catch (e) { next(e); }
};
