import { Schema, model } from "mongoose";

import mongoose from "mongoose";
import { ICompany } from "./company";

export interface IJob_Offers extends Document {
  _id?: string;
  job_title: string;
  offer_date: Date;
  offer_status: string;
  job_location: string;
  job_salary: number;
  job_description: string;
  job_requirements: string[];
  job_posted_date: Date;
  yr_of_exp_req: number;
  job_timing: string;
  status: string;
  stud_id: string;
  comp_id: ICompany["_id"];
}
