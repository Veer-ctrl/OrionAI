import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

export default app;