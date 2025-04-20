// export default function AssignedFacultyList() {
//   return;
//   <div className="overflow-auto max-h-[68vh]">
//     {" "}
//     {/* Scroll only the table */}
//     <table className="table-auto w-full text-left border border-gray-200">
//       <thead className="bg-gray-200">
//         <tr className="text-center text-sm md:text-base">
//           <th className="px-4 py-2 border">ID</th>
//           <th className="px-4 py-2 border">Name</th>
//           <th className="px-4 py-2 border">Branch</th>
//           <th className="px-4 py-2 border">Role</th>
//         </tr>
//       </thead>
//       <tbody>
//         {faculties.map((faculty, index) => (
//           <tr
//             key={faculty._id}
//             className="text-center hover:bg-gray-100 cursor-pointer text-sm md:text-base"
//             onClick={() => router.push(`/college/student_list/${faculty._id}`)}
//           >
//             <td className="px-4 py-2 border truncate">
//               {faculty._id.slice(0, 10)}
//             </td>
//             <td className="px-4 py-2 border">{faculty.fac_name}</td>
//             <td className="px-4 py-2 border">{faculty.fac_department}</td>

//             <td
//               className={`px-4 py-2 border ${
//                 placementStatus[index] === "true"
//                   ? "text-green-600"
//                   : "text-red-600"
//               }`}
//             >
//               {placementStatus[index] === "true" ? "Yes" : "No"}
//             </td>
//             <td
//               className={`px-4 py-2 border ${
//                 student.isCollegeVerified
//                   ? "text-green-500"
//                   : student.isSystemVerified
//                     ? "text-orange-400"
//                     : "text-red-400"
//               }`}
//             >
//               {student.isCollegeVerified
//                 ? "Verified"
//                 : student.isSystemVerified
//                   ? "System Verified"
//                   : "Not Verified"}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>;
// }
