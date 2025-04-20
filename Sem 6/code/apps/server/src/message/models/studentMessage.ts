import mongoose, { Document, Schema } from "mongoose";

interface IStudentMessage extends Document {
  message: string;
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
}

const MessageSchema = new Schema<IStudentMessage>({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
