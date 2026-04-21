import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./router";

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


app.use("/api/v1",router)
