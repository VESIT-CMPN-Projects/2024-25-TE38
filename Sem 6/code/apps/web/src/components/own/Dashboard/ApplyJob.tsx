import Sidebar from "../StudentSidebar";
import JobList from "./ApplicationCard";
import ApplicationCards from "./ApplicationCards";

const StudentInfo = [
  {
    name: "Mrunal",
    description: "A student of vesit",
  },
  {
    name: "Verma",
    description: "A student of vesit",
  },
];

export default function MainDashboard() {
  return (
    <div className="bg-primary_background h-full w-full">
      <ApplicationCards />
      <ApplicationCards />
    </div>
  );
}
