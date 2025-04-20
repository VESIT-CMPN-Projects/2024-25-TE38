"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
);

const BarChart: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [selectedDepartment, setSelectedDepartment] = useState("Engineering");

  useEffect(() => {
    const departmentData: Record<string, number[]> = {
      Engineering: [9.5, 15.5, 13.5, 18.5, 17.0, 10.5, 19.0, 19.5, 20.0],
      Marketing: [10.0, 14.0, 15.0, 16.0, 16.5, 17.0, 17.5, 18.0, 18.5],
      Finance: [11.0, 13.0, 14.0, 15.0, 16.0, 16.5, 17.0, 17.5, 18.0],
    };

    const years = [
      "2024-2025", "2023-2024", "2022-2023", "2021-2022", "2020-2021",
      "2019-2020", "2018-2019", "2017-2018", "2016-2017"
    ];

    const chartData = {
      labels: years,
      datasets: [
        {
          label: "Max Salary (LPA)",
          data: departmentData[selectedDepartment],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          barThickness: 30,
        },
      ],
    };

    setData(chartData);
  }, [selectedDepartment]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw as number;
            return `Max Salary: ${value} LPA`;
          },
        },
      },
      legend: {
        display: true,
        position: "top",
      },
      datalabels: {
        display: true,
        align: "top",
        anchor: "end",
        formatter: (value: number) => `${value} LPA`,
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `${value} LPA`,
        },
      },
    },
  };

  return (
    <div className="container mx-auto p-4 md:px-10 lg:px-8">
      <h1 className="text-lg font-bold mb-6">Maximum Salary from 2015 to 2023</h1>
      <div className="mb-4">
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger>
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-8 lg:w-400">
        <Bar style={{ width: 400 }} data={data} options={barOptions} />
      </div>
    </div>
  );
};

export default BarChart;
