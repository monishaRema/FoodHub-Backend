import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { router } from "./router/index.js";
import { globalErrorHandler } from "./middleware/globalErrorHandler.middleware.js";
import { notFound } from "./middleware/notFound.middleware.js";
import { config } from "./config/env.js";

export const app = express()

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts, please try again later",
  },
});



app.use(helmet())
app.use(cors(
    {
    origin: config.FRONTEND_URL,
    credentials: true,
  }
))
app.use(express.json())
app.use(cookieParser())


app.use(globalLimiter);
app.use("/api/auth", authLimiter);

app.use("/api",router)


app.use(notFound)
app.use(globalErrorHandler)
