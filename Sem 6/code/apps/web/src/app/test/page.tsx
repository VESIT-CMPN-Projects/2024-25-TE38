// "use client";
// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import axios from "axios";
// import { BackendUrl } from "@/utils/constants";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const DepartmentPlacementChart = ({ chartData }: any) => {
//   const options = {
//     plugins: {
//       title: {
//         display: true,
//         text: "Department-Wise Placement Status",
//       },
//       legend: {
//         display: true,
//         position: "top" as const,
//       },
//     },
//     responsive: true,
//     scales: {
//       x: {
//         stacked: true, // Stack the bars on the x-axis
//       },
//       y: {
//         stacked: true, // Stack the bars on the y-axis
//         title: {
//           display: true,
//           text: "Number of Students",
//         },
//       },
//     },
//   };

//   return <Bar data={chartData} options={options} />;
// };

// export default function TestPage() {
//   const [chartData, setChartData] = useState<any>({
//     labels: [],
//     datasets: [],
//   });
//   const [years, setYears] = useState<number[]>([]);
//   const [selectedYear, setSelectedYear] = useState<number | null>(null);

//   useEffect(() => {
//     const getStatistics = async () => {
//       try {
//         const response = await axios.get(
//           `${BackendUrl}/api/college/get_department_statistics`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         const { years, departments } = response.data;
//         setYears(years);
//         setSelectedYear(years[0]); // Default to the first year

//         // Extract department names, placed, and not placed counts
//         const labels = Object.keys(departments);
//         const placedData = labels.map((dept) => departments[dept].placed);
//         const notPlacedData = labels.map((dept) => departments[dept].notPlaced);

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: "Placed",
//               data: placedData,
//               backgroundColor: "rgba(75, 192, 192, 0.7)", // Bar color for "Placed"
//             },
//             {
//               label: "Not Placed",
//               data: notPlacedData,
//               backgroundColor: "rgba(255, 99, 132, 0.7)", // Bar color for "Not Placed"
//             },
//           ],
//         });
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     getStatistics();
//   }, []);

//   const handleYearChange = async (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const year = Number(event.target.value);
//     setSelectedYear(year);

//     try {
//       const response = await axios.get(
//         `${BackendUrl}/api/college/get_department_statistics?year=${year}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       const { departments } = response.data;

//       // Extract department names, placed, and not placed counts
//       const labels = Object.keys(departments);
//       const placedData = labels.map((dept) => departments[dept].placed);
//       const notPlacedData = labels.map((dept) => departments[dept].notPlaced);

//       setChartData({
//         labels,
//         datasets: [
//           {
//             label: "Placed",
//             data: placedData,
//             backgroundColor: "rgba(75, 192, 192, 0.7)", // Bar color for "Placed"
//           },
//           {
//             label: "Not Placed",
//             data: notPlacedData,
//             backgroundColor: "rgba(255, 99, 132, 0.7)", // Bar color for "Not Placed"
//           },
//         ],
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       {/* Dropdown for year selection */}
//       <div>
//         <label htmlFor="year-select">Select Year:</label>
//         <select
//           id="year-select"
//           value={selectedYear || ""}
//           onChange={handleYearChange}
//         >
//           {years.map((year) => (
//             <option key={year} value={year}>
//               {year}
//             </option>
//           ))}
//         </select>
//       </div>
//       <DepartmentPlacementChart chartData={chartData} />
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import useLoadingStore from "@/store/loadingStore";

export default function TestPage() {
  const { setLoading } = useLoadingStore();

  useEffect(() => {
    // Set loading to true when the component mounts
    setLoading(true);

    // Simulate a 10-second loading process
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Test Page</h1>
    </div>
  );
}
