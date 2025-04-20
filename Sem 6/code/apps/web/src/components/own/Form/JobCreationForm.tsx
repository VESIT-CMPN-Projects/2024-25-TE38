"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { ChevronDownIcon, ArrowLeftIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface College {
  id: string;
  name: string;
}

interface EligibilityCriteria {
  criteria: string;
  value: string;
}

// Predefined options for select fields
const JOB_TYPES = ["Full-time", "Part-time", "Internship", "Contract", "Remote"];
const JOB_STATUS = ["Open", "Closed", "Draft", "Filled"];
const BRANCHES = ["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil", "Other"];
const PASSING_YEARS = ["2023", "2024", "2025", "2026"];
const ELIGIBILITY_CRITERIA_OPTIONS = [
  "English Proficiency",
  "Communication Skills",
  "Technical Skills",
  "Certifications",
  "Prior Internship Experience",
  "Projects Completed",
  "Leadership Experience",
  "Extracurricular Activities",
  "Portfolio Quality",
  "Other"
];

const CRITERIA_VALUE_OPTIONS = {
  "English Proficiency": ["Basic", "Intermediate", "Advanced", "Fluent"],
  "Communication Skills": ["Basic", "Good", "Excellent"],
  "Technical Skills": ["Beginner", "Intermediate", "Advanced", "Expert"],
  "Certifications": ["Required", "Preferred", "Not Required"],
  "Prior Internship Experience": ["Required", "Preferred", "Not Required"],
  "Projects Completed": ["At least 1", "2-3", "4+"],
  "Leadership Experience": ["Required", "Preferred", "Not Required"],
  "Extracurricular Activities": ["Required", "Preferred", "Not Required"],
  "Portfolio Quality": ["Basic", "Good", "Excellent"],
  "Other": ["Required", "Preferred", "Not Required"]
};

const JobCreationForm: React.FC = () => {
  const router = useRouter();
  const [colleges, setColleges] = useState<College[]>([]);
  const [formData, setFormData] = useState({
    job_title: "",
    job_type: "",
    job_location: "",
    job_salary: "",
    job_description: "",
    job_requirements: [] as string[],
    job_posted_date: new Date().toISOString().split('T')[0],
    yr_of_exp_req: "",
    job_timing: "",
    status: "Open",
    college: "",
    min_CGPI: "",
    max_no_dead_kt: "",
    max_no_live_kt: "",
    branch_allowed: "",
    passing_year: "",
    company_name: "",
    eligibility_criteria: [] as EligibilityCriteria[],
  });

  const [eligibility, setEligibility] = useState({
    criteria: "",
    value: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get(`${BackendUrl}/api/student/colleges`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setColleges(response.data.colleges);
        }
      } catch (error) {
        setError("Failed to load colleges. Please try again.");
      }
    };
    fetchColleges();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRequirementChange = (index: number, value: string) => {
    const updatedRequirements = [...formData.job_requirements];
    updatedRequirements[index] = value;
    setFormData({ ...formData, job_requirements: updatedRequirements });
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      job_requirements: [...formData.job_requirements, ""],
    });
  };

  const removeRequirement = (index: number) => {
    const updatedRequirements = [...formData.job_requirements];
    updatedRequirements.splice(index, 1);
    setFormData({ ...formData, job_requirements: updatedRequirements });
  };

  const handleEligibilityChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setEligibility({ ...eligibility, [e.target.name]: e.target.value });
  };

  const handleOtherCriteriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEligibility({
      ...eligibility,
      otherCriteria: e.target.value
    });
  };

  const addEligibilityCriteria = () => {
    if (eligibility.criteria && eligibility.value) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        eligibility_criteria: [
          ...prevFormData.eligibility_criteria,
          { criteria: eligibility.criteria, value: eligibility.value },
        ],
      }));
      setEligibility({ criteria: "", value: "" });
    }
  };

  const removeEligibilityCriteria = (index: number) => {
    const updatedCriteria = [...formData.eligibility_criteria];
    updatedCriteria.splice(index, 1);
    setFormData({ ...formData, eligibility_criteria: updatedCriteria });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `${BackendUrl}/api/college/create_job`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccess("Job created successfully!");
      // Reset formData
      setFormData({
        job_title: "",
        job_type: "",
        job_location: "",
        job_salary: "",
        job_description: "",
        job_requirements: [],
        job_posted_date: new Date().toISOString().split('T')[0],
        yr_of_exp_req: "",
        job_timing: "",
        status: "Open",
        college: "",
        min_CGPI: "",
        max_no_dead_kt: "",
        max_no_live_kt: "",
        branch_allowed: "",
        passing_year: "",
        company_name: "",
        eligibility_criteria: [],
      });
    } catch (error) {
      setError("Error creating job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Create New Job
        </h1>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-4 mb-6 rounded-md bg-red-50 border border-red-200 text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 mb-6 rounded-md bg-green-50 border border-green-200 text-green-700">
          {success}
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Job Details</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Fill in the information about the job position</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Job Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Job Title */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                required
                placeholder="e.g. Software Engineer"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
                placeholder="e.g. Tech Solutions Inc."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Job Type Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Job Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="job_type"
                  value={formData.job_type}
                  onChange={handleChange}
                  required
                  className="appearance-none w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white pr-10"
                >
                  <option value="" disabled>Select job type</option>
                  {JOB_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
              </div>
            </div>

            {/* Job Location */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Job Location
              </label>
              <input
                type="text"
                name="job_location"
                value={formData.job_location}
                onChange={handleChange}
                placeholder="e.g. Mumbai, India"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Job Salary */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Salary (LPA)
              </label>
              <input
                type="text"
                name="job_salary"
                value={formData.job_salary}
                onChange={handleChange}
                placeholder="e.g. 10"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Years of Experience */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Years of Experience Required
              </label>
              <input
                type="number"
                min="0"
                name="yr_of_exp_req"
                value={formData.yr_of_exp_req}
                onChange={handleChange}
                placeholder="e.g. 2"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Job Timing */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Job Timing
              </label>
              <input
                type="text"
                name="job_timing"
                value={formData.job_timing}
                onChange={handleChange}
                placeholder="e.g. 9 AM - 5 PM"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            {/* Status Dropdown */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="appearance-none w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white pr-10"
                >
                  {JOB_STATUS.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
              </div>
            </div>
            
            {/* Date Posted */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date Posted
              </label>
              <input
                type="date"
                name="job_posted_date"
                value={formData.job_posted_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="job_description"
              value={formData.job_description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe the job role, responsibilities, and other relevant details"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Academic Requirements Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Academic Requirements</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* College Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  College
                </label>
                <div className="relative">
                  <select
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="appearance-none w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white pr-10"
                  >
                    <option value="">All Colleges</option>
                    {colleges.map((college) => (
                      <option key={college.id} value={college.id}>{college.name}</option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
              </div>

              {/* Branch Allowed Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Branch Allowed
                </label>
                <div className="relative">
                  <select
                    name="branch_allowed"
                    value={formData.branch_allowed}
                    onChange={handleChange}
                    className="appearance-none w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white pr-10"
                  >
                    <option value="">All Branches</option>
                    {BRANCHES.map((branch) => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
              </div>

              {/* Passing Year Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Passing Year
                </label>
                <div className="relative">
                  <select
                    name="passing_year"
                    value={formData.passing_year}
                    onChange={handleChange}
                    className="appearance-none w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white pr-10"
                  >
                    <option value="">Select Year</option>
                    {PASSING_YEARS.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
              </div>

              {/* Minimum CGPI */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Minimum CGPI
                </label>
                <input
                  type="number"
                  name="min_CGPI"
                  value={formData.min_CGPI}
                  onChange={handleChange}
                  placeholder="e.g. 7.5"
                  step="0.1"
                  min="0"
                  max="10"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Maximum Dead KTs */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Maximum Dead KTs
                </label>
                <input
                  type="number"
                  name="max_no_dead_kt"
                  value={formData.max_no_dead_kt}
                  onChange={handleChange}
                  placeholder="e.g. 0"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Maximum Live KTs */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Maximum Live KTs
                </label>
                <input
                  type="number"
                  name="max_no_live_kt"
                  value={formData.max_no_live_kt}
                  onChange={handleChange}
                  placeholder="e.g. 0"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Job Requirements Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Job Requirements</h3>
              <button
                type="button"
                onClick={addRequirement}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PlusIcon className="h-4 w-4" />
                Add Requirement
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.job_requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    placeholder={`Requirement ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="p-2 text-gray-500 hover:text-red-500 focus:outline-none"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
              {formData.job_requirements.length === 0 && (
                <p className="text-sm text-gray-500 italic">No requirements added yet. Click "Add Requirement" to add one.</p>
              )}
            </div>
          </div>

          {/* Additional Eligibility Criteria Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Additional Eligibility Criteria</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Criteria Type
                </label>
                <div className="relative">
                  <select
                    name="criteria"
                    value={eligibility.criteria}
                    onChange={handleEligibilityChange}
                    className="appearance-none w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white pr-10"
                  >
                    <option value="" disabled>Select criteria</option>
                    {ELIGIBILITY_CRITERIA_OPTIONS.map((criteria) => (
                      <option key={criteria} value={criteria}>{criteria}</option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <select
                    name="value"
                    value={eligibility.value}
                    onChange={handleEligibilityChange}
                    disabled={!eligibility.criteria}
                    className="appearance-none w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white pr-10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="" disabled>Select value</option>
                    {eligibility.criteria && CRITERIA_VALUE_OPTIONS[eligibility.criteria]?.map((value) => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
                <button
                  type="button"
                  onClick={addEligibilityCriteria}
                  disabled={!eligibility.criteria || !eligibility.value}
                  className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {eligibility.criteria === "Other" && (
              <div className="mt-2">
                <input
                  type="text"
                  name="otherCriteria"
                  value={eligibility.otherCriteria || ""}
                  onChange={handleOtherCriteriaChange}
                  placeholder="Specify other criteria"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:text-white"
                />
              </div>
            )}

            <div className="space-y-3">
              {formData.eligibility_criteria.map((criteria, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/30 rounded-md border border-gray-200 dark:border-gray-700">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{criteria.criteria}: </span>
                    <span className="text-gray-600 dark:text-gray-400">{criteria.value}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeEligibilityCriteria(index)}
                    className="p-1 text-gray-500 hover:text-red-500 focus:outline-none"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
              {formData.eligibility_criteria.length === 0 && (
                <p className="text-sm text-gray-500 italic">No additional criteria added yet.</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobCreationForm;
