"use client";

import ApplicationCards from "@/components/own/Dashboard/ApplicationCards";
import withAuth from "@/config/services/Student_Auth_service";
import { BackendUrl } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";

import useLoadingStore from "@/store/loadingStore";

export default function MainDashboard() {
  const { setLoading } = useLoadingStore();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true); // Start loading
      try {
        const res = await axios.get(`${BackendUrl}/api/student/companies`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data); // Handle job data as needed
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchJobs();
  }, [setLoading]);

  return (
    <div className="bg-primary_background overflow-scroll w-full h-full">
      <ApplicationCards />
    </div>
  );
}
