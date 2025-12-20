import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"; // Fixed dotenv import
import errorMiddleware from "./middlewares/error.js"; // Added .js extension

// 1. Config: Load Environment Variables
dotenv.config();
// 2. Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

const app = express();

// 3. Middlewares
app.use(express.json()); // Replaces bodyParser.json()
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Replaces bodyParser.urlencoded()

// CORS Configuration
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// 4. Database Connection Logic
const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI)
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

// 5. Route Imports
import user from "./routes/userRoutes.js"; // Added .js extension

// 6. Mount Routes
app.use("/api/v1", user);

// 7. Error Middleware (Must be last)
app.use(errorMiddleware);

// 8. Connect to Database & Start Server
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// 9. Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});