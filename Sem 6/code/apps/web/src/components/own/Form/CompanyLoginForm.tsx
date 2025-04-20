"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignValidation } from "@/utils/validations/SignValidation";
import { useRouter } from "next/navigation";

import axios from "axios";

import { BackendUrl } from "@/utils/constants";
import Link from "next/link";
import { useForm } from "react-hook-form";
import firebase, {
  signInWithGoogle,
  signUpAndVerifyEmail,
} from "@/config/firebase-config";

import { useEffect, useState } from "react";
import { IoLogoApple } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

const SignUpFormCompany = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      //@ts-ignore
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLoginWithGoogle = async () => {
    try {
      const { token, refreshToken } = await signInWithGoogle();
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      const signCheckResponse = await axios.get(
        `${BackendUrl}/api/company/is_first_signin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (token) {
        console.log("tokne founf 2")
        console.log("ID Token:", token);
        const response = await axios.post(  
          `${BackendUrl}/api/company/google_login`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("res "+response)
        if (signCheckResponse.data.success === true) {
          if (signCheckResponse.data.isFirstSignIn) {
            router.push("/company/applicationForm");
          }
        }

        if (response.data.success === true) {
          console.log("User logged in successfully");
          router.push("/company/dashboard");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignValidation),
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BackendUrl}/api/company/eplogin`, { name, email, password });
      console.log("Login successful:", response.data);
      alert("Login successful!");
      router.push("/company/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password.");
    }
  };
  const onSubmit = async (data: any) => {
    try {
      console.log("jr")
      const res = await axios.post(
       ` ${BackendUrl}/api/company/is_first_signin_with_email`,
        data
      );

      // @ts-ignore
      if (res.data.success) navigator("/company/verifyemail");
    } catch (error: any) {
      console.error("Signup error:", error.message);
    }
  };

  const getErrorMessage = (error: any) => {
    if (error?.message) {
      return error.message;
    }
    return "Invalid value";
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-2 rounded-lg bg-transparent md:p-5 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-6">Faculty Signup</h2>
      <form onSubmit={handleLogin} className="max-w-sm mx-auto p-4 border rounded">
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Company Name" 
        className="w-full p-2 mb-2 border rounded"
      />
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        className="w-full p-2 mb-2 border rounded"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        className="w-full p-2 mb-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
    </form>
      <div className="mt-4">
        <button
          onClick={handleLoginWithGoogle}
          className="w-full bg-white text-gray-700 border border-gray-300 p-2 rounded hover:bg-gray-100 flex items-center justify-center gap-2 font-semibold shadow-sm"
        >
          <FcGoogle size={20} />
          Login with Google
        </button>
      </div>

      <p>
        Don&apos;t have an Account?
        <Link className="text-primary px-2" href="/signup">
          Sign Up
        </Link>
      </p>
      <p className="text-[12px]">
        <span className="text-red-500 font-bold">Note:</span> that the email you
        are using to register Company will be the admin email.
      </p>
    </div>
  );
};

export default SignUpFormCompany;
// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { SignValidation } from "@/utils/validations/SignValidation";
// import { useRouter } from "next/navigation";

// import axios from "axios";

// import { BackendUrl } from "@/utils/constants";
// import Link from "next/link";
// import { useForm } from "react-hook-form";
// import firebase, {
//   signInWithGoogle,
//   signUpAndVerifyEmail,
// } from "@/config/firebase-config";

// import { useEffect, useState } from "react";
// import { IoLogoApple } from "react-icons/io5";
// import { FcGoogle } from "react-icons/fc";

// const SignUpFormCompany = () => {
//   const router = useRouter();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
//       //@ts-ignore
//       setUser(currentUser);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleLoginWithGoogle = async () => {
//     try {
//       const { token, refreshToken } = await signInWithGoogle();
//       localStorage.setItem("token", token);
//       localStorage.setItem("refreshToken", refreshToken);

//       const signCheckResponse = await axios.get(
//         `${BackendUrl}/api/company/is_first_signin`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (token) {
//         console.log("ID Token:", token);
//         const response = await axios.post(
//           `${BackendUrl}/api/company/google_login`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (signCheckResponse.data.success === true) {
//           if (signCheckResponse.data.isFirstSignIn) {
//             router.push("/company/applicationForm");
//           }
//         }

//         if (response.data.success === true) {
//           console.log("User logged in successfully");
//           router.push("/company/dashboard");
//         }
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(SignValidation),
//   });

//   const onSubmit = async (data: any) => {
//     try {
//       const res = await axios.post(
//         `${BackendUrl}/api/company/is_first_signin_with_email`,
//         data
//       );

//       // @ts-ignore
//       if (res.data.success) navigator("/company/verifyemail");
//     } catch (error: any) {
//       console.error("Signup error:", error.message);
//     }
//   };

//   const getErrorMessage = (error: any) => {
//     if (error?.message) {
//       return error.message;
//     }
//     return "Invalid value";
//   };

//   return (
//     <div className="max-w-md mx-auto mt-12 p-2 rounded-lg bg-transparent md:p-5 flex flex-col gap-4">
//       <h2 className="text-2xl font-bold mb-6">Faculty Signup</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="mb-4 min-w-40 md:min-w-60 lg:min-w-80">
//           <input
//             {...register("email")}
//             placeholder="Email"
//             type="text"
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">
//               {getErrorMessage(errors.email)}
//             </p>
//           )}
//         </div>
//         <div className="mb-4 min-w-40 md:min-w-60 lg:min-w-80">
//           <input
//             type="password"
//             {...register("password")}
//             placeholder="Password"
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
//           />
//           {errors.password && (
//             <p className="text-red-500 text-sm mt-1">
//               {getErrorMessage(errors.password)}
//             </p>
//           )}
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-primary text-white p-2 rounded hover:bg-blue-700"
//         >
//           Submit
//         </button>
//       </form>
//       <div className="mt-4">
//         <button
//           onClick={handleLoginWithGoogle}
//           className="w-full bg-white text-gray-700 border border-gray-300 p-2 rounded hover:bg-gray-100 flex items-center justify-center gap-2 font-semibold shadow-sm"
//         >
//           <FcGoogle size={20} />
//           Login with Google
//         </button>
//       </div>

//       <p>
//         Don&apos;t have an Account?
//         <Link className="text-primary px-2" href="/signup">
//           Sign Up
//         </Link>
//       </p>
//       <p className="text-[12px]">
//         <span className="text-red-500 font-bold">Note:</span> that the email you
//         are using to register Company will be the admin email.
//       </p>
//     </div>
//   );
// };

// export default SignUpFormCompany;
