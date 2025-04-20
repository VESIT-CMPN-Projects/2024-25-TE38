"use client";

import FacultySidebar from "@/components/own/FacultySidebar";
import MainNav from "@/components/own/Nav/MainNav";
import { BackendUrl } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState("none");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRole = async () => {
      try {
        const res = await axios.get(`${BackendUrl}/api/faculty/check_role`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Role response:", res.data);
        setRole(res.data.role);
      } catch (error) {
        console.error("Error fetching role:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRole();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (role === "none") {
    return <NotRoleAssigned />;
  }

  return (
    <div className="flex flex-row w-full h-full">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 z-50 lg:relative lg:block">
        <FacultySidebar />
      </aside>

      {/* Main Content */}
      <main className="flex flex-col w-full h-full bg-primary_background">
        {/* Navbar */}
        <header className="fixed top-0 z-30 w-full">
          <MainNav />
        </header>

        {/* Page Content */}
        <section className="pt-20 max-h-screen overflow-auto">
          {children}
        </section>
      </main>
    </div>
  );
}

function NotRoleAssigned() {
  return (
    <div className="flex flex-col items-center justify-center px-10 w-full h-screen">
      <h1 className="text-lg font-bold">Role Not Assigned</h1>
      <p>
        Waiting for the admin to assign your role. Please contact the admin of
        your college.
      </p>
    </div>
  );
}
