import "dotenv/config";
import express, { Express } from "express";
import connectDB from "./config/database";

import financialRecordRouter from "./routes/financial-route";
import mongoose from "mongoose";

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/v1/financial-records", financialRecordRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/health", async (req, res) => {
  // Check database connection status (assuming you are using Mongoose)
  const dbState =
    mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";

  // Respond with health check information
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: dbState,
  });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
