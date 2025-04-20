// import { Router, Request, Response } from "express";
// import { notificationQueue } from "..";
// import { Notification } from "..";
// const notificationRoutes = Router();

// notificationRoutes.post(
//   "/send_notification",
//   async (req: Request, res: Response) => {
//     try {
//       console.log(req.body);

//       const { email, userId, message } = req.body;
//       const notification = new Notification({ userId, message });

//       await notification.save();
//       await notificationQueue.add({ userId, message });

//       res.status(200).json({ message: "Notification sent to user" });
//     } catch (error: any) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// );
