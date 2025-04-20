
import React from "react";
import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="container mx-auto py-6 px-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600 mr-1">Place</div>
              <div className="text-2xl font-bold text-gray-800">Next</div>
            </div>
          </div>
          <Outlet />
        </div>
      </main>
      <Toaster />
    </div>
  );
}
