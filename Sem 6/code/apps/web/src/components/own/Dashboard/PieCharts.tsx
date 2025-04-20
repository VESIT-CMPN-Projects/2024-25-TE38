"use client";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const SalaryRangePieChart: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [selectedYear, setSelectedYear] = useState<string>("2024-2025");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [selectedCompany, setSelectedCompany] = useState<string>("All");

  const salaryData: Record<string, Record<string, Record<string, number[]>>> = {};

  // Correct year range format
  const years = [
    "2024-2025",
    "2023-2024",
    "2022-2023",
    "2021-2022",
    "2020-2021",
    "2019-2020",
  ];

  const departments = ["All", "Computer Engineering", "Information technology", "Electronics", "Electronics and Telecommunication", "Automation and Robotics","AI and Data Science"];
  const companies = ["All", "Accenture", "Adobe", "Google", "Microsoft", "Amazon", "IBM"];

  // Fill in mock salary data for the sake of this example
  years.forEach((year) => {
    salaryData[year] = {};
    departments.forEach((dept) => {
      salaryData[year][dept] = {};
      companies.forEach((comp) => {
        salaryData[year][dept][comp] = [
          Math.floor(Math.random() * 20) + 5,
          Math.floor(Math.random() * 20) + 10,
          Math.floor(Math.random() * 20) + 15,
          Math.floor(Math.random() * 20) + 10,
          Math.floor(Math.random() * 20) + 5,
        ];
      });
    });
  });

  useEffect(() => {
    const chartData = {
      labels: [
        "Less than 3 LPA",
        "3 - 5 LPA",
        "5 - 7 LPA",
        "7 - 10 LPA",
        "More than 10 LPA",
      ],
      datasets: [
        {
          label: "Percentage of Students by Salary Range",
          data:
            salaryData[selectedYear]?.[selectedDepartment]?.[selectedCompany] ||
            [0, 0, 0, 0, 0],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    setData(chartData);
  }, [selectedYear, selectedDepartment, selectedCompany]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const pieOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw as number;
            return `${tooltipItem.label}: ${value}%`;
          },
        },
      },
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div className="container mx-auto p-4 md:px-10 lg:px-8">
      <h1 className="text-lg font-bold mb-6">
        Salary Range Distribution ({selectedYear})
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year} {/* Display the year range like 2024-2025 */}
            </option>
          ))}
        </select>

        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          {companies.map((comp) => (
            <option key={comp} value={comp}>
              {comp}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-8 lg:w-[400px] lg:h-[400px]">
        <Pie style={{ width: 200 }} data={data} options={pieOptions} />
      </div>
    </div>
  );
};

export default SalaryRangePieChart;