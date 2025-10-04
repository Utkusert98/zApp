import http from "http";
import "dotenv/config"; // .env'i en başta yükle
import { Server } from "socket.io";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { registerChatHandlers } from "./sockets/chatSocket.js";

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CORS_ORIGIN, credentials: true },
});

io.on("connection", (socket) => registerChatHandlers(io, socket));

const start = async () => {
  const mongoUri = process.env.MONGODB_URI; // <-- DOĞRU ENV İSMİ
  if (!mongoUri) {
    console.error("❌ MONGODB_URI yok. .env dosyanı ve değişken adını kontrol et.");
    process.exit(1);
  }
  await connectDB(mongoUri);
  server.listen(PORT, () =>
    console.log(`🚀 Server on http://localhost:${PORT}`)
  );
};

start();
