import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import jobsRouter from "./routes/jobs.js";
import productsRouter from "./routes/products.js";
import industriesRouter from "./routes/industries.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(helmet());
app.use(cors({
  origin: ["http://localhost:5173", "https://your-frontend-domain.com"]
}));
app.use(express.json());

// Routes
app.use("/api/jobs", jobsRouter);
app.use("/api/products", productsRouter);
app.use("/api/industries", industriesRouter);

// Health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Error handler
app.use(errorHandler);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
