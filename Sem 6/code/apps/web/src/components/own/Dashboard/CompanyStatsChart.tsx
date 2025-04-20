import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const CompanyStatsChart = ({ companiesCame, companiesApplied }: any) => {
  const chartRef = useRef(null);

  useEffect(() => {
    //@ts-ignore
    const ctx = chartRef.current.getContext("2d");

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Companies Came to College", "Companies Applied To"],
        datasets: [
          {
            label: "Statistics",
            data: [companiesCame, companiesApplied],
            backgroundColor: [
              "rgba(75, 192, 192, 0.8)",
              "rgba(255, 99, 132, 0.8)",
            ],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
            // Optional: Adding hover effects
            hoverBackgroundColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 99, 132, 1)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Optional: Makes the chart responsive
        plugins: {
          tooltip: {
            enabled: true,
            mode: "index",
            intersect: false,
          },
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Number of Companies",
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [companiesCame, companiesApplied]);

  return (
    <div style={{ width: "90%", maxWidth: "400px", height: "400px" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default CompanyStatsChart;
