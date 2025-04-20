"use client";
import { useRef } from "react";
import pptxgen from "pptxgenjs";
import DepartmentStatistics from "@/components/own/Dashboard/College/Department_Statistics";
import StudentStatisticsChart from "@/components/own/Dashboard/StudentStatisticsChart";
import DoubleBarChart from "@/components/own/Dashboard/FacultyStatistics2";
import LineChart from "@/components/own/Dashboard/BarChart";
import PieChart from "@/components/own/Dashboard/PieCharts";

export default function Dashboard() {
  // Define types for the chart references
  const doubleBarRef = useRef<HTMLDivElement | null>(null);
  const lineChartRef = useRef<HTMLDivElement | null>(null);
  const pieChartRef = useRef<HTMLDivElement | null>(null);

  // Function to capture chart as an image
  const exportChartAsImage = async (chartRef: React.RefObject<HTMLDivElement>) => {
    if (!chartRef.current) return null;
    const canvas = chartRef.current.querySelector("canvas") as HTMLCanvasElement | null;
    return canvas ? canvas.toDataURL("image/png") : null;
  };

  const generatePPT = async () => {
    let pptx = new pptxgen();

    // Slide 1: Title
    let slide1 = pptx.addSlide();
    slide1.addText("Placement Report", { x: 1, y: 1, fontSize: 32, bold: true });
    slide1.addText("Jobs vs Students Placed (Last 5 Years)", { x: 1, y: 2, fontSize: 20 });

    // Get chart images
    const doubleBarImage = await exportChartAsImage(doubleBarRef);
    const lineChartImage = await exportChartAsImage(lineChartRef);
    const pieChartImage = await exportChartAsImage(pieChartRef);

    // Slide 2: Jobs vs Students Placed
    let slide2 = pptx.addSlide();
    slide2.addText("Jobs vs Students Placed (Last 5 Years)", { x: 1, y: 0.5, fontSize: 24, bold: true });
    if (doubleBarImage) {
      slide2.addImage({ data: doubleBarImage, x: 1, y: 1.5, w: 6, h: 3 });
    }

    // Slide 3: Maximum Salary
    let slide3 = pptx.addSlide();
    slide3.addText("Maximum Salary from 2015 to 2023", { x: 1, y: 0.5, fontSize: 24, bold: true });
    if (lineChartImage) {
      slide3.addImage({ data: lineChartImage, x: 1, y: 1.5, w: 6, h: 3 });
    }

    // Slide 4: Salary Range Distribution
    let slide4 = pptx.addSlide();
    slide4.addText("Salary Range Distribution (2023)", { x: 1, y: 0.5, fontSize: 24, bold: true });
    if (pieChartImage) {
      slide4.addImage({ data: pieChartImage, x: 1, y: 1.5, w: 6, h: 3 });
    }

    // Download PPT
    pptx.writeFile({ fileName: "Placement_Report.pptx" });
  };

  return (
    <div className="p-4">
      <h1>data</h1>
      <h1>data</h1>
      <h1>data</h1>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={generatePPT}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download PPT Report
        </button>
      </div>

      {/* Chart Components with Refs */}
      <div ref={doubleBarRef}>
        <DoubleBarChart />
      </div>
      <div ref={lineChartRef}>
        <LineChart />
      </div>
      <div ref={pieChartRef}>
        <PieChart />
      </div>
    </div>
  );
}
