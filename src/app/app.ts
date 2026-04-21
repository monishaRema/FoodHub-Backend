import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./router";
import { globalErrorHandler } from "./middleware/globalErrorHandler.middleware";
import { notFound } from "./middleware/notFound.middleware";

export const app = express()

app.use(helmet())
app.use(cors(
    {
    origin: "*",
    credentials: true,
  }
))
app.use(express.json())
app.use(cookieParser())


app.use("/api",router)


app.use(notFound)
app.use(globalErrorHandler)
