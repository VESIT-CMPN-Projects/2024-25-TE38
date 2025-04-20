"use client";

import AppliedJobs from "@/components/own/Dashboard/AppliedJobs";
import CompanyStatsChart from "@/components/own/Dashboard/CompanyStatsChart";
import JobEligibilityPieChart from "@/components/own/Dashboard/JobEligibilityPieChart";
import MainDashboard from "@/components/own/Dashboard/MainDashboard";
import RecommendedJob from "@/components/own/Dashboard/RecommendedJobs";
import { BackendUrl } from "@/utils/constants";
import JobRecommendation from "@/components/own/JobRecommendation";
import axios from "axios";
import { useEffect, useState } from "react";

import useLoadingStore from "@/store/loadingStore";

export default function Dashboard() {
  const { setLoading } = useLoadingStore();

  const [companiesCameToCollege, setCompaniesCameToCollege] = useState(0);
  const [companiesAppliedTo, setCompaniesAppliedTo] = useState(0);
  const [eligibleCount, setEligibleCount] = useState(0);
  const [ineligibleCount, setIneligibleCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Student Statistics
        const statisticsRes = await axios.get(
          `${BackendUrl}/api/student/statistics`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCompaniesCameToCollege(
          statisticsRes.data.companiesCameToCollege?.length || 0
        );
        setCompaniesAppliedTo(statisticsRes.data.appliedJobs?.length || 0);

        // Fetch Job Statistics
        const jobStatisticsRes = await axios.get(
          `${BackendUrl}/api/student/job_statistics`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (jobStatisticsRes.data.success) {
          setEligibleCount(jobStatisticsRes.data.eligibleCount);
          setIneligibleCount(jobStatisticsRes.data.notEligibleCount);
        }

        // Fetch Applied Jobs
        const appliedJobsRes = await axios.get(
          `${BackendUrl}/api/student/applied_jobs`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(appliedJobsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLoading]);

  return (
    <div className="mt-20 h-full w-full scroll-smooth p-10 flex flex-col">
      <MainDashboard />
      <div className="flex flex-col md:flex-row h-full items-center justify-between">
        <CompanyStatsChart
          companiesCame={companiesCameToCollege}
          companiesApplied={companiesAppliedTo}
        />
        <JobEligibilityPieChart
          eligibleCount={eligibleCount}
          notEligibleCount={ineligibleCount}
        />
      </div>
      <AppliedJobs />
      {/* <JobRecommendation/> */}
      <RecommendedJob />
    </div>
  );
}
