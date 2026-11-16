import authRoutes from "./routes/authRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());
app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({
      status: "success",
      message: "Backend and MySQL are connected!"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Database connection failed"
    });
  }
});
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Campus Companion API!"
  });
});

app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");

    res.json({
      status: "success",
      message: "Backend and MySQL are connected!"
    });
  } catch (error) {
    console.error("Database error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Database connection failed"
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Campus Companion API running on port ${PORT}`);
});
