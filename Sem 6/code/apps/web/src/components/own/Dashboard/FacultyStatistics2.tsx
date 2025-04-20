// components/DoubleBarChart.tsx
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
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the data labels plugin
import { useEffect, useState } from "react";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels // Register the data labels plugin
);

const DoubleBarChart: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Updated dummy data where Jobs Offered is always greater than Students Placed
    const chartData = {
      labels: ["2019-20", "2020-21", "2021-22", "2022-23", "2023-24"], // Last 5 years on x-axis

      datasets: [
        {
          label: "Jobs Offered",
          data: [300, 250, 280, 320, 350], // Jobs Offered data
          backgroundColor: "rgba(75, 192, 192, 0.6)", // Color for the first dataset
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Students Placed",
          data: [200, 180, 220, 260, 300], // Students Placed data (always less than Jobs Offered)
          backgroundColor: "rgba(153, 102, 255, 0.6)", // Color for the second dataset
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    };

    setData(chartData);
  }, []);

  if (!data) {
    return <div>Loading...</div>; // Loading state
  }

  // Bar chart options with reduced size
  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw as number;
            return `${tooltipItem.label}: ${value}`;
          },
        },
      },
      legend: {
        display: true,
        position: "top",
      },
      datalabels: {
        display: true,
        align: "end",
        anchor: "end",
        formatter: (value: number) => {
          return `${value}`; // Display count
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        stacked: false,
      },
      y: {
        beginAtZero: true,
        stacked: false,
      },
    },
  };

  return (
    <div className="container mx-auto p-4 md:px-10 lg:px-8">
      <h1 className="text-lg font-bold mb-6">Jobs vs Students Placed (last 5 years)</h1>
      <div className="mb-8 lg:w-400">
        <Bar style={{ width: 400 }} data={data} options={barOptions} />
      </div>
    </div>
  );
};

export default DoubleBarChart;

