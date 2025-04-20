// "use client";

// import { BackendUrl } from "@/utils/constants";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// const withCollegeAuth = (WrappedComponent: any) => {
//   return function AuthenticatedComponent(props: any) {
//     const router = useRouter();

//     useEffect(() => {
//       const authenticateUser = async () => {
//         try {
//           const res = await axios.get(`${BackendUrl}/api/college/auth`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           });

//           if (!res.data.success) {
//             router.push("/authentication/facultyLogin");
//           }
//         } catch (error) {
//           console.error("Authentication failed:", error);
//           router.push("/authentication/facultyLogin");
//         }
//       };

//       authenticateUser();
//     }, [router]);

//     return <WrappedComponent {...props} />;
//   };
// };

// export default withCollegeAuth;
