import Router from "express";
import {
  applicationFrom,
  createJobByCompany,
  isFirstSignIn,
  signup,
  sendEmail,
  addJob,
  updateJob,
  deleteJob,
  getJobs,
  eplogin,
} from "../controller/auth";
import { authenticateToken } from "../../middlewares/verifyGoogleToken";

const companyRoutes = Router();

companyRoutes.get("/is_first_signin", authenticateToken, isFirstSignIn);

companyRoutes.post("/google_login", authenticateToken, signup);

companyRoutes.post("/applicationForm", authenticateToken, applicationFrom);

companyRoutes.post("/create_job", authenticateToken, createJobByCompany);

companyRoutes.post("/send_email", authenticateToken, sendEmail);

companyRoutes.post("/addJob", addJob);
// companyRoutes.put("/updateJob", updateJob);
companyRoutes.put("/updateJob", updateJob); // Change POST → PUT

companyRoutes.delete("/deleteJob/:id", deleteJob);
companyRoutes.get("/getJobs", getJobs);

companyRoutes.post("/eplogin",eplogin)




export default companyRoutes;

// import Router from "express";
// import {
//   applicationFrom,
//   createJobByCompany,
//   isFirstSignIn,
//   signup,
//   sendEmail,
// } from "../controller/auth";
// import { authenticateToken } from "../../middlewares/verifyGoogleToken";

// const companyRoutes = Router();

// companyRoutes.get("/is_first_signin", authenticateToken, isFirstSignIn);

// companyRoutes.post("/google_login", authenticateToken, signup);

// companyRoutes.post("/applicationForm", authenticateToken, applicationFrom);

// companyRoutes.post("/create_job", authenticateToken, createJobByCompany);

// companyRoutes.post("/send_email", authenticateToken, sendEmail);


// export default companyRoutes;
