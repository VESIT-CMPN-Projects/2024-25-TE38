"use client";

import { BackendUrl } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface StudentData {
  _id: string;
  stud_name: string;
  stud_department: string;
  stud_year: string;
  aggregateCGPI: number;
  stud_placement_status: string;
  isSystemVerified: boolean;
  isCollegeVerified: boolean;
  student: {};
}

export default function StudentList() {
  const router = useRouter();
  const [students, setStudents] = useState<StudentData[]>([]);
  const [aggregateCGPI, setAggregateCGPI] = useState<number[]>([]);
  const [placementStatus, setPlacementStatus] = useState<string[]>([]);
  const [stud_year, setStudYear] = useState<string[]>([]);
  const [filter, setFilter] = useState({
    placementStatus: "",
    verifiedStatus: "",
    branch: "",
  });

  const [isFilterApplied, setIsFilterApplied] = useState(false);

  // Fetching students based on filter
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const endpoint = isFilterApplied
          ? `${BackendUrl}/api/college/filter_students`
          : `${BackendUrl}/api/college/get_students`;

        const res = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: isFilterApplied ? filter : {}, // Send filter only if it's applied
        });

        if (res.data.success) {
          setStudents(
            res.data.students.map(
              (currstudent: StudentData) => currstudent.student
            )
          );
          setAggregateCGPI(
            res.data.students.map(
              (student: StudentData) => student.aggregateCGPI
            )
          );
          setPlacementStatus(
            res.data.students.map(
              (student: StudentData) => student.stud_placement_status
            )
          );
          setStudYear(
            res.data.students.map((student: StudentData) => student.stud_year)
          );
        } else {
          toast.error(res.data.msg);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch student data.");
      }
    };

    fetchStudents();
  }, [isFilterApplied, filter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const updatedFilter = {
      ...filter,
      [e.target.id]: e.target.value,
    };
    setFilter(updatedFilter);
    setIsFilterApplied(true);
  };

  const resetFilter = () => {
    setFilter({
      placementStatus: "",
      verifiedStatus: "",
      branch: "",
    });
    setIsFilterApplied(false);
  };

  const getStudentDataInExcel = async () => {
    try {
      const endpoint = isFilterApplied
        ? `${BackendUrl}/api/college/get_filtered_student_data_excel`
        : `${BackendUrl}/api/college/get_student_data_excel`;

      const res = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: isFilterApplied ? filter : {}, // Send filter only if it's applied
        responseType: "blob",
      });

      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "student_data.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the Excel file", error);
      toast.error("Failed to download the Excel file.");
    }
  };

  return (
    <div className="flex flex-col py-4 px-4 md:px-8">
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">
        Student List
      </h1>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4 w-full">
          <div className="w-full md:w-auto">
            <label htmlFor="placementStatus" className="block font-medium mb-1">
              Placement Status
            </label>
            <select
              id="placementStatus"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:border-blue-500"
              onChange={handleFilterChange}
            >
              <option value="">Select Type</option>
              <option value="true">Placed</option>
              <option value="false">Not Placed</option>
            </select>
          </div>
          <div className="w-full md:w-auto">
            <label htmlFor="verifiedStatus" className="block font-medium mb-1">
              Verified Status
            </label>
            <select
              id="verifiedStatus"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:border-blue-500"
              onChange={handleFilterChange}
            >
              <option value="">Select Type</option>
              <option value="1">Verified</option>
              <option value="2">System Verified</option>
              <option value="3">Not Verified</option>
            </select>
          </div>
          <div className="w-full md:w-auto">
            <label htmlFor="branch" className="block font-medium mb-1">
              Branch
            </label>
            <select
              id="branch"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:border-blue-500"
              onChange={handleFilterChange}
            >
              <option value="">Select Branch</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Artificial Intelligence and Data Science">
                Artificial Intelligence and Data Science
              </option>
              <option value="Automation and Robotics">
                Automation and Robotics
              </option>
              <option value="Electronic and Telecommunication">
                Electronic and Telecommunication
              </option>
            </select>
          </div>
        </div>
        <div className="w-full md:w-auto flex flex-row gap-4">
          <button
            className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
            onClick={getStudentDataInExcel}
          >
            Download Excel
          </button>
          <button
            className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
            onClick={resetFilter}
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-auto max-h-[68vh]">
        {" "}
        {/* Scroll only the table */}
        <table className="table-auto w-full text-left border border-gray-200">
          <thead className="bg-gray-200">
            <tr className="text-center text-sm md:text-base">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Branch</th>
              <th className="px-4 py-2 border">Year</th>
              <th className="px-4 py-2 border">CGPI</th>
              <th className="px-4 py-2 border">Placed</th>
              <th className="px-4 py-2 border">Verified</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student._id}
                className="text-center hover:bg-gray-100 cursor-pointer text-sm md:text-base"
                onClick={() =>
                  router.push(`/college/student_list/${student._id}`)
                }
              >
                <td className="px-4 py-2 border truncate">
                  {student._id.slice(0, 10)}
                </td>
                <td className="px-4 py-2 border">{student.stud_name}</td>
                <td className="px-4 py-2 border">{student.stud_department}</td>
                <td className="px-4 py-2 border">{stud_year[index]}</td>
                <td className="px-4 py-2 border">{aggregateCGPI[index]}</td>
                <td
                  className={`px-4 py-2 border ${
                    placementStatus[index] === "true"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {placementStatus[index] === "true" ? "Yes" : "No"}
                </td>
                <td
                  className={`px-4 py-2 border ${
                    student.isCollegeVerified
                      ? "text-green-500"
                      : student.isSystemVerified
                        ? "text-orange-400"
                        : "text-red-400"
                  }`}
                >
                  {student.isCollegeVerified
                    ? "Verified"
                    : student.isSystemVerified
                      ? "System Verified"
                      : "Not Verified"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
