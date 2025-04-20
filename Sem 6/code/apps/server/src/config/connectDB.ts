// import mongoose, { Connection } from "mongoose";

// // Exporting database connection references but we will not reassign them directly
// export let primarydb: Connection;
// export let messagedb: Connection;

// const connectDB = async (): Promise<void> => {
//   try {
//     const primaryUri = process.env.MONGO_URI || "";
//     const messageUri = process.env.MESSAGE_MONGO_URI || "";

//     if (!primaryUri || !messageUri) {
//       throw new Error("Database URIs are not set in environment variables.");
//     }

//     // Create and assign connections to the variables
//     primarydb = await mongoose.createConnection(primaryUri).asPromise();
//     messagedb = await mongoose.createConnection(messageUri).asPromise();

//     console.log(
//       "Databases connected successfully:",
//       primarydb.id,
//       messagedb.id
//     );
//     return;
//   } catch (error: any) {
//     console.error("Error connecting to databases:", error.message);
//     throw error;
//   }
// };

// export default connectDB;
