import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import Queue from "bull";
import mongoose, { Schema, Document } from "mongoose";
import connectDB from "./config/connectdb";
import { body, validationResult } from "express-validator";

dotenv.config();

const app = express();
const port = process.env.PORT || 8081;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  });

// Define the Notification model
interface INotification extends Document {
  userId: string;
  message: string;
  date: Date;
}

const NotificationSchema = new Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const Notification = mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);

// Create queues for notifications and emails
export const notificationQueue = new Queue("notificationQueue");
export const emailQueue = new Queue("emailQueue");

// Controller functions
const sendNotificationToUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { userId, message } = req.body;
    const notification = new Notification({ userId, message });

    await notification.save(); // Save the notification to the database
    await notificationQueue.add({ userId, message }); // Add notification to the queue
    console.log("Notification added to send to user");

    return res
      .status(200)
      .json({ success: true, message: "Notification sent to user" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const sendEmailToUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { userId, message } = req.body;
    await emailQueue.add({ userId, message }); // Add email to the queue

    return res
      .status(200)
      .json({ success: true, message: "Email sent to user" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Routes
const notificationRoutes = express.Router();
notificationRoutes.post(
  "/send_notification",
  [
    body("userId").notEmpty().withMessage("User ID is required"),
    body("message").notEmpty().withMessage("Message is required"),
  ],
  sendNotificationToUser
);
notificationRoutes.post(
  "/send_email",
  [
    body("userId").notEmpty().withMessage("User ID is required"),
    body("message").notEmpty().withMessage("Message is required"),
  ],
  sendEmailToUser
);

// Use the notification routes
app.use("/notifications", notificationRoutes);

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Worker for processing notification jobs
notificationQueue.process(async (job) => {
  const { userId, message } = job.data;
  try {
    // Implement the actual notification sending logic here
    console.log(`Notification sent to user ${userId}: ${message}`);
    job.moveToCompleted(); // Mark job as completed
  } catch (error) {
    console.error("Failed to send notification:", error);
    job.moveToFailed({ message: error.message }); // Mark job as failed
  }
});

// Worker for processing email jobs
emailQueue.process(async (job) => {
  const { userId, message } = job.data;
  try {
    // Implement the actual email sending logic here
    console.log(`Email sent to user ${userId}: ${message}`);
    job.moveToCompleted(); // Mark job as completed
  } catch (error) {
    console.error("Failed to send email:", error);
    job.moveToFailed({ message: error.message }); // Mark job as failed
  }
});
