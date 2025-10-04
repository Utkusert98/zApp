import Channel from "../models/Channel.js";

export const listChannels = async (_req, res, next) => {
  try { res.json(await Channel.find().sort({ createdAt: -1 })); }
  catch (e) { next(e); }
};

export const createChannel = async (req, res, next) => {
  try {
    const ch = await Channel.create({
      name: req.body.name,
      isPrivate: !!req.body.isPrivate,
      members: [req.user.id],
      createdBy: req.user.id
    });
    res.status(201).json(ch);
  } catch (e) { next(e); }
};