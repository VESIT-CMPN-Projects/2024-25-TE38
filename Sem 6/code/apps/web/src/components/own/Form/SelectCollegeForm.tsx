"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // Use your backend URL here

interface College {
  _id: string;
  coll_name: string;
}

const SelectCollegeForm = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [id, setId] = useState("");
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle college search input changes
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${BackendUrl}/api/college/colleges`, {
          params: { query: value },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setColleges(response.data.colleges); // Assuming API returns an array of college names
      } catch (error: any) {
        console.error("Error fetching colleges:", error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setColleges([]); // Clear suggestions when query is too short
    }
  };

  const handleCreateCollege = () => {
    router.push("/forms/collegeForm");
  };

  // Handle form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query) {
      alert("Please select a college.");
      return;
    }

    try {
      const res = await axios.post(
        `${BackendUrl}/api/faculty/select-college`,
        {
          collegeId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        router.push("/college/dashboard");
      }
    } catch (error: any) {
      console.error("Error selecting college:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center  gap-4">
      <div className="max-w-md mx-auto mt-12 p-4 rounded-lg bg-white dark:bg-gray-800 flex flex-col gap-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Select Your College
        </h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Start typing your college name..."
              className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
            />
            {isLoading && (
              <p className="absolute top-full mt-1 text-sm text-gray-500 dark:text-gray-400">
                Loading...
              </p>
            )}
            {colleges.length > 0 && (
              <ul className="absolute top-full mt-1 w-full border bg-white dark:bg-gray-700 rounded shadow-md max-h-40 overflow-auto z-10">
                {colleges.map((college, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setQuery(college.coll_name);
                      setId(college._id);
                      setColleges([]); // Clear the dropdown
                    }}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-gray-200"
                  >
                    {college.coll_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-transparent border-2 border-light_primary_background text-black hover:text-white p-2 rounded hover:bg-light_primary_background dark:hover:text-white  dark:text-white dark:hover:bg-light_primary_background"
          >
            Submit
          </button>
        </form>
      </div>
      <div>OR</div>
      <button
        className="w-full bg-transparent border-2 border-light_primary_background text-black hover:text-white p-2 rounded hover:bg-light_primary_background dark:hover:text-white  dark:text-white dark:hover:bg-light_primary_background"
        onClick={handleCreateCollege}
      >
        Create College
      </button>
    </div>
  );
};

export default SelectCollegeForm;
