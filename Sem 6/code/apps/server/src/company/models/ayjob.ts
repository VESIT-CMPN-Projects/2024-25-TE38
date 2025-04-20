const mongoose = require("mongoose");
import { primarydb } from "../..";

const ayJobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: String, required: true },
  postDate: { type: Date, default: Date.now },
});

const ayJob = primarydb.model("ayJob", ayJobSchema);

export default ayJob;