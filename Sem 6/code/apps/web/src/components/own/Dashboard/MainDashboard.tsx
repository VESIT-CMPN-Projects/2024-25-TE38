"use client";

import { useEffect } from "react";
import Sidebar from "../StudentSidebar";
import JobList from "./ApplicationCard";
import ApplicationCards from "./ApplicationCards";
import axios from "axios";
import { BackendUrl } from "@/utils/constants";

export default function MainDashboard() {
  // useEffect(() => {
  //   const getStudentStatistics = async () => {
  //     const res = await axios.get(`${BackendUrl}/api/student/statistics`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     console.log(res.data);
  //   };
  //   getStudentStatistics();
  // }, []);

  return (
    <div className="bg-primary_background h-full">
      <h1 className="">Student Statistics</h1>
    </div>
  );
}
