import dotenv from "dotenv";
import { initialzeRedis } from "./config/redis";
import mongoose from "mongoose";

dotenv.config(); // Load environment variables

const port = process.env.PORT || 8000;
export let redis: any; // Global Redis instance
export let primarydb: any;
export let messagedb: any;

const connectDB = async () => {
  try {
    primarydb = mongoose.createConnection(process.env.MONGO_URI || "");
    messagedb = mongoose.createConnection(process.env.MESSAGE_MONGO_URI || "");

    if (primarydb) {
      console.log("Primary DB connected");
    } else {
      console.log("Primary DB not connected");
    }
    if (messagedb) {
      console.log("Message DB connected");
    } else {
      console.log("Message DB not connected");
    }
  } catch (error: any) {
    console.error("Error connecting to databases:", error.message);
    throw error;
  }
};

connectDB();
import app from "./app";

const startServer = async () => {
  try {
    // Initialize MongoDB
    // await connectDB();

    // Initialize Redis
    redis = await initialzeRedis();

    // Start Express server
    app.listen(port, () => {
      console.log(`Server started on port ${port}: http://localhost:${port}`);
    });
  } catch (error: any) {
    console.error("Error starting the server:", error.message);
    process.exit(1); // Exit the process on failure
  }
};

startServer();
