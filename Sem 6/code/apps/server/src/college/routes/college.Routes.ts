import Router from "express";
import {
  acceptStudent,
  applicationFrom,
  collegeAuth,
  createJobByCollege,
  facultyProfile,
  getAllStudentList,
  getCollegeJob,
  getCollegeJobs,
  getColleges,
  getDepartmentStatistics,
  getFilteredStudentDetailsInExcel,
  getFilteredStudentList,
  getJobDetailsById,
  getStudentById,
  getStudentDetailsInExcel,
  getStudentStatistics,
  isFirstSignIn,
  placeStudent,
  rejectStudent,
  signup,
} from "../controller/college.controller";
import { authenticateToken } from "../../middlewares/verifyGoogleToken";
import { create_faculty } from "../controller/faculty.controller";

const collegeRoutes = Router();

collegeRoutes.get("/is_first_signin", authenticateToken, isFirstSignIn);

collegeRoutes.get("/auth", authenticateToken, collegeAuth);

collegeRoutes.post("/google_login", authenticateToken, signup);

collegeRoutes.post("/applicationForm", authenticateToken, applicationFrom);

// student routes
collegeRoutes.get("/get_students", authenticateToken, getAllStudentList);
collegeRoutes.get("/get_student/:id", authenticateToken, getStudentById);
collegeRoutes.post("/accept_student", authenticateToken, acceptStudent);
collegeRoutes.post("/reject_student", authenticateToken, rejectStudent);
collegeRoutes.get(
  "/get_students_statistics",
  authenticateToken,
  getStudentStatistics
);

// general routes

// college job routes

collegeRoutes.get("/get_jobs", authenticateToken, getCollegeJobs);
collegeRoutes.get("/get_job/:id", authenticateToken);

collegeRoutes.post("/create_job", authenticateToken, createJobByCollege);

collegeRoutes.get("/companies", authenticateToken, getCollegeJob);
collegeRoutes.get("/company/:id", authenticateToken, getJobDetailsById);

// role base access routes
collegeRoutes.post("/create_faculty", authenticateToken, create_faculty);

collegeRoutes.get(
  "/filter_students",
  authenticateToken,
  getFilteredStudentList
);

// getting student data
collegeRoutes.get(
  "/get_student_data_excel",
  authenticateToken,
  getStudentDetailsInExcel
);

collegeRoutes.get(
  "/get_filtered_student_data_excel",
  authenticateToken,
  getFilteredStudentDetailsInExcel
);

collegeRoutes.get("/colleges", authenticateToken, getColleges);

collegeRoutes.get("/facultyProfile", authenticateToken, facultyProfile);

collegeRoutes.post("/place_student", authenticateToken, placeStudent);

collegeRoutes.get(
  "/get_department_statistics",
  authenticateToken,
  getDepartmentStatistics
);

export default collegeRoutes;
