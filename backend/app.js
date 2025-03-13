import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the User API" });
});

// Error handler
app.use(errorHandler);

// 404 - Not found
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
