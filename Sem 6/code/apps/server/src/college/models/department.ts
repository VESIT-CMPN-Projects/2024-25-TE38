import { model, Schema } from "mongoose";
import mongoose from "mongoose";
import { IFaculty } from "./faculty";
import { primarydb } from "../..";

export interface IDepartment extends Document {
  _id?: string;
  dept_name: string;
  dept_hod: IFaculty["_id"];
}

const DepartmentSchema = new Schema<IDepartment>({
  dept_name: {
    type: String,
    required: true,
  },
  dept_hod: {
    type: Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
});

const Department = primarydb.model("Department", DepartmentSchema);
export default Department;
