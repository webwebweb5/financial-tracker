import "dotenv/config";
import express, { Express, NextFunction, Request, Response } from "express";
import connectDB from "./config/database";

import financialRecordRouter from "./routes/financial-route";
import categoryRouter from "./routes/category.route";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { Webhook } from "svix";
import User from "./schema/user.model";
import CategoryModel from "./schema/category.model";

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

const initialCategories = [
  { name: "Food/Drink" },
  { name: "Rent" },
  { name: "Salary" },
  { name: "Utilities" },
  { name: "Entertainment" },
];

interface SvixHeaders {
  "svix-id": string;
  "svix-timestamp": string;
  "svix-signature": string;
}

interface WebhookEvent {
  id: string;
  type: string;
  data: any; // Adjust this based on the actual data structure of your event
}

const webhookSecret = process.env.WEBHOOK_SECRET as string;

if (!webhookSecret) {
  throw new Error("Missing WEBHOOK_SECRET in environment variables");
}

const createCategoriesForUser = async (userId: string) => {
  try {
    // Create categories for the new user
    const categories = initialCategories.map((category) => ({
      ...category,
      userId,
    }));

    // Save categories to the database
    await CategoryModel.insertMany(categories);
    console.log("Initial categories created for user:", userId);
  } catch (err) {
    console.error("Error creating categories:", err);
  }
};

const deleteCategoriesForUser = async (userId: string) => {
  try {
    await CategoryModel.deleteMany({ userId });
    console.log("Categories deleted for user:", userId);
  } catch (err) {
    console.error("Error deleting categories:", err);
  }
};

app.post(
  "/api/webhooks",
  bodyParser.raw({ type: "application/json" }), // Parse raw body as Buffer
  async (req: Request, res: Response) => {
    const headers = req.headers as unknown as SvixHeaders;
    const payload = req.body; // req.body is a Buffer because of bodyParser.raw()

    // Extract Svix headers for verification
    const svix_id = headers["svix-id"];
    const svix_timestamp = headers["svix-timestamp"];
    const svix_signature = headers["svix-signature"];

    // If any of the Svix headers are missing, return an error
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({
        success: false,
        message: "Error occurred -- missing Svix headers",
      });
    }

    // Create a new Svix Webhook instance
    const wh = new Webhook(webhookSecret);

    try {
      // Verify the incoming webhook using the raw payload (Buffer) and headers
      const evt = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent; // Cast evt to WebhookEvent type

      // Log the event data from the verified webhook
      const { id, ...attributes } = evt.data;
      const eventType = evt.type;

      if (eventType === "user.created") {
        console.log("userId:", id);

        const firstName = attributes.first_name || "";
        const lastName = attributes.last_name || "";
        const email = attributes.email_addresses[0]?.email_address;
        const username = firstName;
        const photo = attributes.image_url || "";

        const user = new User({
          clerkId: id,
          email: email,
          username: username,
          firstName: firstName,
          lastName: lastName,
          photo: photo,
        });

        await user.save();

        console.log("User saved to database");

        // After saving the user, create initial categories
        await createCategoriesForUser(id);

        console.log("Initial categories created for user:", id);
      }

      if (eventType === "user.deleted") {
        console.log("userId to delete:", id);

        // Delete the user from the database
        const user = await User.findOneAndDelete({ clerkId: id });
        if (user) {
          console.log("User deleted from the database:", user);

          // Delete the associated categories
          await deleteCategoriesForUser(id);

          console.log("Categories deleted for user:", id);
        } else {
          console.log("User not found in the database:", id);
        }
      }

      // Return a success response
      return res.status(200).json({
        success: true,
        message: "Webhook received",
      });
    } catch (err) {
      const errorMessage = (err as Error).message;
      console.error("Error verifying webhook:", errorMessage);
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }
  }
);

app.use(express.json());

app.use("/api/v1/financial-records", financialRecordRouter);
app.use("/api/v1/category", categoryRouter);

app.get("/", (_req: Request, res: Response) => {
  res.send("API is running...");
});

app.get("/health", async (_req: Request, res: Response) => {
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
