"use client";
import { BackendUrl } from "@/utils/constants";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

const JobDetail = () => {
  const router = useRouter();
  const { job_id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `${BackendUrl}/api/college/company/${job_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Extract the job data and student information
        setJob(response.data.job);
        setStudents(response.data.jobApplicants); // Set the applicants as students
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [job_id]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Job Details */}
      <Button onClick={() => router.back()} variant="contained">
        Back
      </Button>
      {job && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">{job.job_title}</h2>
          <p>
            <strong>Company:</strong> {job.company_name}
          </p>
          <p>
            <strong>Location:</strong> {job.job_location}
          </p>
          <p>
            <strong>Salary:</strong> ₹{job.job_salary}
          </p>
          <p>
            <strong>Description:</strong> {job.job_description}
          </p>
          <p>
            <strong>Experience Required:</strong> {job.yr_of_exp_req} years
          </p>
          <p>
            <strong>Job Timing:</strong> {job.job_timing}
          </p>
          <p>
            <strong>Status:</strong> {job.status}
          </p>
          <p>
            <strong>Requirements:</strong>
          </p>
          <ul className="list-disc list-inside">
            {job.job_requirements.map((req: string, idx: number) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Job Applicants Table */}
      {students.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Applicants</h3>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-2 px-4 text-left">Student Name</th>

                <th className="py-2 px-4 text-left">Phone</th>
                <th className="py-2 px-4 text-left">Course</th>
                <th className="py-2 px-4 text-left">Department</th>
                <th className="py-2 px-4 text-left">Application Status</th>
                <th className="py-2 px-4 text-left">Cover Letter</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {students.map((applicant: any) => (
                <tr
                  key={applicant._id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-2 px-4">{applicant.student.stud_name}</td>

                  <td className="py-2 px-4">{applicant.student.stud_phone}</td>
                  <td className="py-2 px-4">{applicant.student.stud_course}</td>
                  <td className="py-2 px-4">
                    {applicant.student.stud_department}
                  </td>
                  <td className="py-2 px-4">{applicant.app_status}</td>
                  <td className="py-2 px-4">
                    <a
                      href={applicant.app_cover_letter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Cover Letter
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
