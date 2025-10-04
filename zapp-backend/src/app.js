import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
// import dotenv from "dotenv"; // GEREK YOK, server.js env yüklüyor
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import authRoutes from "./routes/authRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

// dotenv.config(); // GEREK YOK

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// Health
app.get("/api/health", (_req, res) => res.json({ status: "OK" }));

// Root -> Swagger
app.get("/", (_req, res) => {
  res.redirect("/api/docs"); // <-- /api/docs olarak düzeltildi
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/messages", messageRoutes);

// Swagger
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Zapp API", version: "1.0.0" },
    servers: [{ url: "http://localhost:4000" }],
  },
  apis: ["./src/routes/*.js"], // nodemon kökten çalıştığı sürece doğru
});
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 (Not Found)
app.use((_req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handler
app.use(errorHandler);

export default app;
