"use client";

import FacultySidebar from "@/components/own/CompanySidebar";
import MainNav from "@/components/own/Nav/MainNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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