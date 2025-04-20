"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { BackendUrl } from "@/utils/constants";

export interface ICollege {
  _id?: string;
  coll_name: string;
  coll_address: string;
  coll_no_employs: number;
  coll_website: string;
  coll_location: string;
  colLcontact_no: string;
  coll_affiliated_to: string;
  coll_departments: string[];
  coll_no_of_stud: number;
  coll_courses_offered: string[];
  googleId: string;
}

export default function FacultyProfile() {
  const [college, setCollege] = useState<ICollege | null>(null);

  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        const response = await axios.get(
          `${BackendUrl}/api/college/facultyProfile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setCollege(response.data.faculty);
        }
      } catch (error) {
        console.error("Failed to fetch college data:", error);
      }
    };

    fetchCollegeData();
  }, []);

  if (!college) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-primary_background h-full p-6">
      <h1 className="text-3xl font-bold mb-4">Faculty Profile</h1>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">{college.coll_name}</h2>
        <p>
          <strong>Address:</strong> {college.coll_address}
        </p>
        <p>
          <strong>Number of Employees:</strong> {college.coll_no_employs}
        </p>
        <p>
          <strong>Website:</strong>{" "}
          <a href={college.coll_website} className="text-blue-500">
            {college.coll_website}
          </a>
        </p>
        <p>
          <strong>Location:</strong> {college.coll_location}
        </p>
        <p>
          <strong>Contact Number:</strong> {college.colLcontact_no}
        </p>
        <p>
          <strong>Affiliated To:</strong> {college.coll_affiliated_to}
        </p>
        <p>
          <strong>Number of Students:</strong> {college.coll_no_of_stud}
        </p>

        <div>
          <h3 className="font-semibold mt-4">Departments:</h3>
          <ul className="list-disc pl-6">
            {college.coll_departments.map((department, index) => (
              <li key={index}>{department}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mt-4">Courses Offered:</h3>
          <ul className="list-disc pl-6">
            {college.coll_courses_offered.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
