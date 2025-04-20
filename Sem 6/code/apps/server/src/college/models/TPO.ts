import { Schema, model } from "mongoose";

import mongoose from "mongoose";
import { IFaculty } from "./faculty";
import { primarydb } from "../..";

export interface ITPO extends Document {
  _id?: string;
  tpo_no_of_companies: number;
  tpo_success_rate: number;
  tpo_specialization: string[];
  no_of_placement_drives: number;
  no_of_students_placed: number;
  no_reports_generated: number;
  faculty_id: IFaculty["_id"];
}

const TPOSchema = new Schema<ITPO>({
  tpo_no_of_companies: {
    type: Number,
    required: true,
  },
  tpo_success_rate: {
    type: Number,
    required: true,
  },
  tpo_specialization: {
    type: [String],
    required: true,
  },
  no_of_placement_drives: {
    type: Number,
    required: true,
  },
  no_of_students_placed: {
    type: Number,
    required: true,
  },
  no_reports_generated: {
    type: Number,
    required: true,
  },
  faculty_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
});

const TPO = primarydb.model("TPO", TPOSchema);
export default TPO;
