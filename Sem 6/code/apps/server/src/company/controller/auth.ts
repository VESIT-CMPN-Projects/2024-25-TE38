import company from "../models/company";
import { Request, Response } from "express";
import Job from "../models/job";
import { google } from "googleapis";
import College from "../../college/models/college";
const nodemailer = require("nodemailer");
import ayJob from "../models/ayjob"; // Ensure this file exists or correct the path
// import Company from "../models/company";
import ayCompany from "../models/aycompany";

// Add a new job
export const addJob = async (req: Request, res: Response) => {
  try {
    const newJob = new ayJob(req.body);
    await newJob.save();
    res.status(201).json(newJob);
    console.log("done")
  } catch (error: any) {
    res.status(500).json({ message: "Error adding job", error: error.message });
  }
};

// Get all jobs
export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await ayJob.find();
    res.json(jobs);
    console.log("d2")
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
};

// Update a job
// export const updateJob = async (req: Request, res: Response) => {
  export const updateJob = async (req: Request, res: Response) => {
    console.log("Received update job request:", req.body);
    try {
      const { _id, ...jobData } = req.body; // Ensure _id is used
  
      if (!_id) {
        return res.status(400).json({ message: "Job ID is required" });
      }
  
      const existingJob = await ayJob.findById(_id);
      if (!existingJob) {
        return res.status(404).json({ message: "Job not found in database" });
      }
  
      const updatedJob = await ayJob.findByIdAndUpdate(_id, jobData, { new: true });
  
      return res.json(updatedJob);
    } catch (error: any) {
      console.error("Error updating job:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
// Delete a job
export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // console.log(id)

    if (!id) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const deletedJob = await ayJob.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not a found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting job", error: error.message });
  }
};


export const eplogin = async (req: Request, res: Response) => {
  try {
    console.log("ser")
    const { name, email, password } = req.body;

    let company = await ayCompany.findOne({ email });
    console.log(company)
    if (!company) {
      // If company not found, create a new one
      company = new ayCompany({ name, email, password });
      await company.save();
      return res.status(201).json({ message: "Company registered and logged in", company });
    }

    // Check password
    if (company.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", company });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};



export const isFirstSignIn = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    console.log("afsa")
    const existingCompany = await company.findOne({ googleId: user.uid });

    return res
      .status(200)
      .json({ success: true, isFirstSignIn: !existingCompany });
  } catch (error: any) {
    console.log("Error in isFirstSignIn", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};


export const sendEmail = async (req: Request, res: Response) => {
 
console.log("hii:")
// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email (e.g., "youremail@gmail.com")
    pass: process.env.EMAIL_PASS, // App password (not your actual password)
  },
});


  const { to, subject, text, html } = req.body; // Add HTML support

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: text, // Plain text
    html: html || text, // HTML (if available)
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};






export const signup = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    console.log("signup")
    // const user = req.user;
    // res.status(200).json({ success: true, user });
  } catch (error: any) {
    console.log("Error in signup", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const applicationFrom = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user;
    //   _id?: string;
    // comp_name: string;
    // comp_start_date: Date;
    // comp_contact_person: string;
    // comp_email: string;
    // comp_industry: string;
    // com_positions_offered: string[];
    // comp_address: string;
    // comp_jobs_offered: string[];
    // comp_no_employs: number;
    // comp_website: string;
    // comp_location: string;
    // comp_contact_no: string;
    // comp_departments: string[];
    // comp_no_of_stud: number;
    // comp_courses_offered: string[];
    const {
      comp_name,
      comp_start_date,
      comp_contact_person,
      comp_email,
      comp_industry,
      com_positions_offered,
      comp_address,
      comp_jobs_offered,
      comp_no_employs,
      comp_website,
      comp_location,
      comp_contact_no,
      comp_departments,
      comp_no_of_stud,
      comp_courses_offered,
    } = req.body;
    if (
      [
        comp_name,
        comp_start_date,
        comp_contact_person,
        comp_email,
        comp_industry,
        com_positions_offered,
        comp_address,
        comp_jobs_offered,
        comp_no_employs,
        comp_website,
        comp_location,
        comp_contact_no,
        comp_departments,
        comp_no_of_stud,
        comp_courses_offered,
      ].some((field) => field === "")
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const existingCompany = await company.findOne({ comp_email });
    if (existingCompany) {
      return res
        .status(400)
        .json({ success: false, msg: "Company already exists" });
    }
    const newCompany = new company({
      comp_name,
      comp_start_date,
      comp_contact_person,
      comp_email,
      comp_industry,
      com_positions_offered,
      comp_address,
      comp_jobs_offered,
      comp_no_employs,
      comp_website,
      comp_location,
      comp_contact_no,
      comp_departments,
      comp_no_of_stud,
      comp_courses_offered,
    });
    await newCompany.save();
    return res.status(200).json({ success: true, msg: "Company created" });
  } catch (error: any) {
    console.log("Error in applicationFrom", error.message, error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getCompany = async (req: Request, res: Response) => {
  try {
    const companies = await company.find();
    return res.status(200).json({ success: true, companies });
  } catch (error: any) {
    console.log("Error in getCompany", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const companyDetails = await company.findById(id);
    return res.status(200).json({ success: true, companyDetails });
  } catch (error: any) {
    console.log("Error in getCompanyById", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [
      comp_name,
      comp_start_date,
      comp_contact_person,
      comp_email,
      comp_industry,
      com_positions_offered,
      comp_address,
      comp_jobs_offered,
      comp_no_employs,
      comp_website,
      comp_location,
      comp_contact_no,
      comp_departments,
      comp_no_of_stud,
      comp_courses_offered,
    ] = req.body;
    if (
      [
        comp_name,
        comp_start_date,
        comp_contact_person,
        comp_email,
        comp_industry,
        com_positions_offered,
        comp_address,
        comp_jobs_offered,
        comp_no_employs,
        comp_website,
        comp_location,
        comp_contact_no,
        comp_departments,
        comp_no_of_stud,
        comp_courses_offered,
      ].some((field) => field === "")
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const companyDetails = await company.findById(id);
    if (!companyDetails) {
      return res.status(400).json({ msg: "Company not found" });
    }
    await company.findByIdAndUpdate(id, {
      comp_name,
      comp_start_date,
      comp_contact_person,
      comp_email,
      comp_industry,
      com_positions_offered,
      comp_address,
      comp_jobs_offered,
      comp_no_employs,
      comp_website,
      comp_location,
      comp_contact_no,
      comp_departments,
      comp_no_of_stud,
      comp_courses_offered,
    });
    return res.status(200).json({ success: true, msg: "Company updated" });
  } catch (error: any) {
    console.log("Error in updateCompany", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const companyDetails = await company.findById(id);
    if (!companyDetails) {
      return res.status(400).json({ msg: "Company not found" });
    }
    await company.findByIdAndDelete(id);
    return res.status(200).json({ success: true, msg: "Company deleted" });
  } catch (error: any) {
    console.log("Error in deleteCompany", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const createJobByCompany = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const LogincollegeUser = req.user;
    const {
      job_title,
      job_type,
      job_location,
      job_salary,
      job_description,
      job_requirements,
      job_posted_date,
      yr_of_exp_req,
      job_timing,
      status,
      company_name,
    } = req.body;

    console.log(req.body); // Debugging output

    // Check for required fields, including company_name
    if (
      [
        job_title,
        job_type,
        job_location,
        job_salary,
        job_description,
        job_requirements,
        job_posted_date,
        yr_of_exp_req,
        job_timing,
        status,
        company_name, // Ensure company_name is checked
      ].some((field) => field === "" || field === undefined) // Check for empty or undefined fields
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check for existing job
    const existingJob = await Job.findOne({ job_title, job_location });

    if (existingJob) {
      return res.status(400).json({ msg: "Job already exists" });
    }

    // Find the college based on the logged-in user
    const foundCollege = await College.findOne({
      googleId: LogincollegeUser.uid,
    });

    if (!foundCollege) {
      return res.status(400).json({ msg: "College not found" });
    }

    // Create new job
    const newJob = new Job({
      job_title,
      job_type,
      job_location,
      company_name,
      job_salary,
      job_description,
      job_requirements,
      job_posted_date,
      yr_of_exp_req,
      job_timing,
      status,
      college: foundCollege._id, // Link to college
    });

    await newJob.save();
    return res.status(200).json({ success: true, msg: "Job created" });
  } catch (error: any) {
    console.log("Error in createJobByCompany", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// import company from "../models/company";
// import { Request, Response } from "express";
// import Job from "../models/job";
// import { google } from "googleapis";
// import College from "../../college/models/college";
// const nodemailer = require("nodemailer");

// export const isFirstSignIn = async (req: Request, res: Response) => {
//   try {
//     // @ts-ignore
//     const user = req.user;
//     const existingCompany = await company.findOne({ googleId: user.uid });

//     return res
//       .status(200)
//       .json({ success: true, isFirstSignIn: !existingCompany });
//   } catch (error: any) {
//     console.log("Error in isFirstSignIn", error.message);
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// };


// export const sendEmail = async (req: Request, res: Response) => {
 
// console.log("hii:")
// // Nodemailer Transporter Setup
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER, // Your email (e.g., "youremail@gmail.com")
//     pass: process.env.EMAIL_PASS, // App password (not your actual password)
//   },
// });


//   const { to, subject, text, html } = req.body; // Add HTML support

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     text: text, // Plain text
//     html: html || text, // HTML (if available)
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent successfully!");
//     res.status(200).json({ message: "Email sent successfully!" });
//   } catch (error) {
//     console.error("❌ Error sending email:", error);
//     res.status(500).json({ error: "Failed to send email" });
//   }
// };







// export const signup = async (req: Request, res: Response) => {
//   try {
//     // @ts-ignore
//     const user = req.user;
//     res.status(200).json({ success: true, user });
//   } catch (error: any) {
//     console.log("Error in signup", error.message);
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// };

// export const applicationFrom = async (req: Request, res: Response) => {
//   try {
//     // @ts-ignore
//     const user = req.user;
//     //   _id?: string;
//     // comp_name: string;
//     // comp_start_date: Date;
//     // comp_contact_person: string;
//     // comp_email: string;
//     // comp_industry: string;
//     // com_positions_offered: string[];
//     // comp_address: string;
//     // comp_jobs_offered: string[];
//     // comp_no_employs: number;
//     // comp_website: string;
//     // comp_location: string;
//     // comp_contact_no: string;
//     // comp_departments: string[];
//     // comp_no_of_stud: number;
//     // comp_courses_offered: string[];
//     const {
//       comp_name,
//       comp_start_date,
//       comp_contact_person,
//       comp_email,
//       comp_industry,
//       com_positions_offered,
//       comp_address,
//       comp_jobs_offered,
//       comp_no_employs,
//       comp_website,
//       comp_location,
//       comp_contact_no,
//       comp_departments,
//       comp_no_of_stud,
//       comp_courses_offered,
//     } = req.body;
//     if (
//       [
//         comp_name,
//         comp_start_date,
//         comp_contact_person,
//         comp_email,
//         comp_industry,
//         com_positions_offered,
//         comp_address,
//         comp_jobs_offered,
//         comp_no_employs,
//         comp_website,
//         comp_location,
//         comp_contact_no,
//         comp_departments,
//         comp_no_of_stud,
//         comp_courses_offered,
//       ].some((field) => field === "")
//     ) {
//       return res.status(400).json({ msg: "All fields are required" });
//     }
//     const existingCompany = await company.findOne({ comp_email });
//     if (existingCompany) {
//       return res
//         .status(400)
//         .json({ success: false, msg: "Company already exists" });
//     }
//     const newCompany = new company({
//       comp_name,
//       comp_start_date,
//       comp_contact_person,
//       comp_email,
//       comp_industry,
//       com_positions_offered,
//       comp_address,
//       comp_jobs_offered,
//       comp_no_employs,
//       comp_website,
//       comp_location,
//       comp_contact_no,
//       comp_departments,
//       comp_no_of_stud,
//       comp_courses_offered,
//     });
//     await newCompany.save();
//     return res.status(200).json({ success: true, msg: "Company created" });
//   } catch (error: any) {
//     console.log("Error in applicationFrom", error.message, error);
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// };

// export const getCompany = async (req: Request, res: Response) => {
//   try {
//     const companies = await company.find();
//     return res.status(200).json({ success: true, companies });
//   } catch (error: any) {
//     console.log("Error in getCompany", error.message);
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// };

// export const getCompanyById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const companyDetails = await company.findById(id);
//     return res.status(200).json({ success: true, companyDetails });
//   } catch (error: any) {
//     console.log("Error in getCompanyById", error.message);
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// };

// export const updateCompany = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const [
//       comp_name,
//       comp_start_date,
//       comp_contact_person,
//       comp_email,
//       comp_industry,
//       com_positions_offered,
//       comp_address,
//       comp_jobs_offered,
//       comp_no_employs,
//       comp_website,
//       comp_location,
//       comp_contact_no,
//       comp_departments,
//       comp_no_of_stud,
//       comp_courses_offered,
//     ] = req.body;
//     if (
//       [
//         comp_name,
//         comp_start_date,
//         comp_contact_person,
//         comp_email,
//         comp_industry,
//         com_positions_offered,
//         comp_address,
//         comp_jobs_offered,
//         comp_no_employs,
//         comp_website,
//         comp_location,
//         comp_contact_no,
//         comp_departments,
//         comp_no_of_stud,
//         comp_courses_offered,
//       ].some((field) => field === "")
//     ) {
//       return res.status(400).json({ msg: "All fields are required" });
//     }
//     const companyDetails = await company.findById(id);
//     if (!companyDetails) {
//       return res.status(400).json({ msg: "Company not found" });
//     }
//     await company.findByIdAndUpdate(id, {
//       comp_name,
//       comp_start_date,
//       comp_contact_person,
//       comp_email,
//       comp_industry,
//       com_positions_offered,
//       comp_address,
//       comp_jobs_offered,
//       comp_no_employs,
//       comp_website,
//       comp_location,
//       comp_contact_no,
//       comp_departments,
//       comp_no_of_stud,
//       comp_courses_offered,
//     });
//     return res.status(200).json({ success: true, msg: "Company updated" });
//   } catch (error: any) {
//     console.log("Error in updateCompany", error.message);
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// };

// export const deleteCompany = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const companyDetails = await company.findById(id);
//     if (!companyDetails) {
//       return res.status(400).json({ msg: "Company not found" });
//     }
//     await company.findByIdAndDelete(id);
//     return res.status(200).json({ success: true, msg: "Company deleted" });
//   } catch (error: any) {
//     console.log("Error in deleteCompany", error.message);
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// };

// export const createJobByCompany = async (req: Request, res: Response) => {
//   try {
//     // @ts-ignore
//     const LogincollegeUser = req.user;
//     const {
//       job_title,
//       job_type,
//       job_location,
//       job_salary,
//       job_description,
//       job_requirements,
//       job_posted_date,
//       yr_of_exp_req,
//       job_timing,
//       status,
//       company_name,
//     } = req.body;

//     console.log(req.body); // Debugging output

//     // Check for required fields, including company_name
//     if (
//       [
//         job_title,
//         job_type,
//         job_location,
//         job_salary,
//         job_description,
//         job_requirements,
//         job_posted_date,
//         yr_of_exp_req,
//         job_timing,
//         status,
//         company_name, // Ensure company_name is checked
//       ].some((field) => field === "" || field === undefined) // Check for empty or undefined fields
//     ) {
//       return res.status(400).json({ msg: "All fields are required" });
//     }

//     // Check for existing job
//     const existingJob = await Job.findOne({ job_title, job_location });

//     if (existingJob) {
//       return res.status(400).json({ msg: "Job already exists" });
//     }

//     // Find the college based on the logged-in user
//     const foundCollege = await College.findOne({
//       googleId: LogincollegeUser.uid,
//     });

//     if (!foundCollege) {
//       return res.status(400).json({ msg: "College not found" });
//     }

//     // Create new job
//     const newJob = new Job({
//       job_title,
//       job_type,
//       job_location,
//       company_name,
//       job_salary,
//       job_description,
//       job_requirements,
//       job_posted_date,
//       yr_of_exp_req,
//       job_timing,
//       status,
//       college: foundCollege._id, // Link to college
//     });

//     await newJob.save();
//     return res.status(200).json({ success: true, msg: "Job created" });
//   } catch (error: any) {
//     console.log("Error in createJobByCompany", error.message);
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// };


