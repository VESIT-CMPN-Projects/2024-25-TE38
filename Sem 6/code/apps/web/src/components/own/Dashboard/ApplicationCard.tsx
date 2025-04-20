"use client";

import { useState } from "react";
import { JobPosting } from "./ApplicationCards";
import { usePathname } from "next/navigation";

const ApplicationCard = ({ job }: { job: JobPosting }) => {
  const pathname = usePathname();
  const path = pathname.split("/")[1];

  const [isApplied, setIsApplied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isNotInterested, setIsNotInterested] = useState(false);

  return (
    <div className="p-6 bg-white dark:bg-dark_bg_card border border-gray-200 shadow-lg rounded-lg transition-transform hover:scale-105 hover:shadow-xl min-w-72 w-96 min-h-96 mb-6">
      {/* Job Title & Company */}
      <div className="mb-3">
        <h3 className="text-xl font-semibold text-black dark:text-white truncate">
          {job.title}
        </h3>
        <p className="text-sm text-gray-500">{job.company}</p>
      </div>
      {/* Location & Posted Date */}
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>{job.location}</span>
        <span>Posted: {job.postedDate}</span>
      </div>
      {/* Job Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {job.description}
      </p>
      <br />
      {/* Eligibility & Salary */}
      <div className="flex items-center justify-center mb-4">
        {path === "student" ? (
          <p
            className={`text-sm font-medium ${job.isEligible ? "text-green-600" : "text-red-500"}`}
          >
            Eligibility: {job.isEligible ? "Yes" : "No"}
          </p>
        ) : (
          ""
        )}
        </div>
        <div className="flex items-center justify-center mb-4">
          <p className="text-sm font-medium text-gray-800 dark:text-white">
            Salary: {job.salary} lpa
          </p>
      </div>
      {/* Interaction Buttons
      <div className="flex gap-4">
        <button
          onClick={() => setIsApplied(!isApplied)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isApplied
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {isApplied ? "Applied" : "Apply"}
        </button>
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isBookmarked
              ? "bg-yellow-100 text-yellow-600"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div> */}
    </div>
  );
};

export default ApplicationCard;
