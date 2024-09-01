import "dotenv/config";
import express, { Express } from "express";
import connectDB from "./config/database";

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
