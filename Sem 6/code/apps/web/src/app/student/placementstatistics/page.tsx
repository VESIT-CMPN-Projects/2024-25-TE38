// "use client";
// import DepartmentStatistics from "@/components/own/Dashboard/College/Department_Statistics";
// import MainDashboard from "@/components/own/Dashboard/MainDashboard";
// import StudentStatisticsChart from "@/components/own/Dashboard/StudentStatisticsChart";
// import { BackendUrl } from "@/utils/constants";
// import axios from "axios";
// import { headers } from "next/headers";
// import { useEffect, useState } from "react";

// export default function Dashboard() {
//   return (
//     <div className="flex flex-col gap-4">
//       <StudentStatisticsChart />
//       <DepartmentStatistics />
//     </div>
//   );
// }
"use client";
import DepartmentStatistics from "@/components/own/Dashboard/College/Department_Statistics";
import MainDashboard from "@/components/own/Dashboard/MainDashboard";
import StudentStatisticsChart from "@/components/own/Dashboard/StudentStatisticsChart";
import DoubleBarChart from "@/components/own/Dashboard/FacultyStatistics2";
import LineChart from "@/components/own/Dashboard/BarChart";
import PieChart from "@/components/own/Dashboard/PieCharts";
import PlacementData from "@/components/own/PlacementData"


export default function Dashboard() {
  return (
    <div>
      {/* <PlacementData/> */}
      <DoubleBarChart />
      <LineChart />
      <PieChart />
      
    </div>
  );
}


