// components/JobEligibilityPieChart.js
import { Pie } from "react-chartjs-2";

const JobEligibilityPieChart = ({ eligibleCount, notEligibleCount }: any) => {
  // Prepare data for the pie chart
  const data = {
    labels: ["Eligible", "Not Eligible"],
    datasets: [
      {
        data: [eligibleCount, notEligibleCount],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Options for the pie chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": " + context.raw;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "90%", maxWidth: "400px", height: "400px" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default JobEligibilityPieChart;
