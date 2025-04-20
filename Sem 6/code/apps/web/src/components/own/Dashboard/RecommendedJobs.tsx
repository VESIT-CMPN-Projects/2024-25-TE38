"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "@/utils/constants";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import useThemeStore from "@/store/store";

interface RecommededJobs {
  _id: string;
  job_title: string;
  company_name: string;
  job_location: string;
  job_salary: number;
  job_description: string;
  job_timing: string;
}

// interface RecommendedJobs {
//   _id: string;
//   app_cover_letter: string;
//   app_status: string;
// : Job;
// }

const RecommendedJob = () => {
  const router = useRouter();
  const [appliedJobs, setAppliedJobs] = useState<RecommededJobs[]>([]);
  const { darkMode }: any = useThemeStore();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(
          `${BackendUrl}/api/student/recommended_jobs`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          setAppliedJobs(response.data.jobs);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppliedJobs();
  }, []);

  return (
    <div
      className={`w-full mx-auto py-6 ${appliedJobs.length === 0 ? "hidden" : ""} my-4`}
    >
      <h2 className="text-2xl font-bold mb-6">Recommended Jobs</h2>

      <div className="max-h-[500px] overflow-auto space-y-4">
        {appliedJobs.map((appliedJob) => (
          <Card
            sx={{
              backgroundColor: darkMode ? "#121212" : "transparent", // Dark background for dark mode
              color: darkMode ? "#FFFFFF" : "#000000", // Text color for visibility
              border: "1px solid #E5E5E5",
              ...(darkMode && {
                border: "1px solid #06AED5",
              }),
              ":hover": {
                border: "1px solid #06AED5",
              },
            }}
            key={appliedJob._id}
            variant="outlined"
          >
            <button
              onClick={() => router.push(`/student/applyjob/${appliedJob._id}`)}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                color: "inherit",
                textAlign: "left",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    color: darkMode ? "#FFFFFF" : "#000000", // Title text color
                  }}
                >
                  {appliedJob.job_title}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    color: darkMode ? "#B3B3B3" : "inherit", // Subtitle text for dark mode
                  }}
                >
                  {appliedJob.company_name} - {appliedJob.job_location}
                </Typography>
                <Typography
                  variant="body2"
                  className="my-2"
                  sx={{
                    color: darkMode ? "#E0E0E0" : "inherit", // Body text color
                  }}
                >
                  {appliedJob.job_description}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: darkMode ? "#E0E0E0" : "inherit",
                  }}
                >
                  <strong>Salary: </strong> ₹{appliedJob.job_salary}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: darkMode ? "#E0E0E0" : "inherit",
                  }}
                >
                  <strong>Working Hours: </strong> {appliedJob.job_timing}
                </Typography>
              </CardContent>
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJob;
