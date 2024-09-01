import mongoose from "mongoose";

const mongoURI: string = process.env.MONGO_URI;

if (!mongoURI) {
  throw new Error("MONGO_URI environment variable is not defined");
}

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(mongoURI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
