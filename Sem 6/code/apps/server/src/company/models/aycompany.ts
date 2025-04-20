import mongoose from "mongoose";
import { primarydb } from "../..";

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed password
  industry: { type: String }, // Optional field
});

const ayCompany = primarydb.model("ayCompany", CompanySchema);
export default ayCompany;