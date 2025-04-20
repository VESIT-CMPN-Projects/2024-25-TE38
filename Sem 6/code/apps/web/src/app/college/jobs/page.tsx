"use client";
import ApplicationCards from "@/components/own/Dashboard/ApplicationCards";
import CollegeApplicationCards from "@/components/own/Dashboard/CollegeApplicationCards";
import { usePathname } from "next/navigation";

export default function CollegeJob() {
  return (
    <div className="bg-primary_background h-full">
      <CollegeApplicationCards />
    </div>
  );
}
