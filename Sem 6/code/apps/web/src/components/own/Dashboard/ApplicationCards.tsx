"use client";

import Link from "next/link";
import ApplicationCard from "./ApplicationCard";
import { usePathname } from "next/navigation";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "@/utils/constants";
import { useRouter } from "next/navigation";

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  postedDate: string;
  deadline: string;
  salary: string;
  isEligible?: boolean;
  workingHours: string;
  basicRequirements: string[];
}

const ApplicationCards = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobPosting[]>([]);

  const pathname = usePathname();
  const currentPath = pathname;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${BackendUrl}/api/student/companies`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          const jobsData = response.data.jobs.map((job: any) => ({
            id: job._id,
            title: job.job_title,
            company: job.company_name,
            location: job.job_location,
            postedDate: new Date(job.job_posted_date).toLocaleDateString(),
            deadline: job.job_deadline || "Not Specified",
            isEligible: job.isEligible,
            description: job.job_description,
            salary: `₹${job.job_salary}`,
            workingHours: job.job_timing,
            basicRequirements: job.job_requirements,
          }));
          console.log(jobsData);
          setJobs(jobsData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="w-full mx-auto py-4 m-2">
      <h2 className="text-2xl font-bold mb-6">Job Postings</h2>
      {currentPath === "/college/jobs" && (
        <Button
          variant="contained"
          color="primary"
          href="/college/jobs/job_create"
        >
          Create Job
        </Button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {jobs.map((job) => (
          <Button
            key={job.id}
            className="w-full"
            onClick={() => router.push(`/student/applyjob/${job.id}`)}
          >
            <ApplicationCard job={job} />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ApplicationCards;
