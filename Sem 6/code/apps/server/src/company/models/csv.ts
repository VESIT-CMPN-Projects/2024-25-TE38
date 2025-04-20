import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { primarydb } from "../..";
// import { IJob } from "./job";
import { ICompany } from "./company";

export interface IJobApplication extends Document {
  student_name: string;
  email: string;
  job: string;
//   job: IJob["_id"]; // Reference to the Job model
  salary: number;
  company: ICompany["_id"]; // Reference to the Company model
  uploaded_at: Date;
}

const JobApplicationSchema = new Schema<IJobApplication>({
  student_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures unique email per application
  },
  job: {
    type: String,
    ref: "Job",
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "company",
    required: true,
  },
  uploaded_at: {
    type: Date,
    default: Date.now,
  },
});

const JobApplication = primarydb.model("JobApplication", JobApplicationSchema);

export default JobApplication;
