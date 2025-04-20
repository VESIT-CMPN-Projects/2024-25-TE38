"use client";

import { zodResolver } from "@hookform/resolvers/zod";


import axios from "axios";

import { BackendUrl } from "@/utils/constants";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { StudentDetailFormValidations } from "@/utils/validations/StudentDetailFormValidations";

const ApplicationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(StudentDetailFormValidations),
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post(`${BackendUrl}/api/customers/signup`, data);
      // @ts-ignore

      // @ts-ignore
      if (res.data.success) navigator("/email-sent");
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
    <div className="max-w-md mx-auto mt-12 p-5  rounded-lg bg-transparent flex-col gap-4">
      <h2 className="text-2xl font-bold mb-6">Student Detail Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
          <input
            {...register("universityPRN")}
            placeholder="universityPRN"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("division")}
            placeholder="division"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>
        
        <div className="mb-4">
          <input
            {...register("rollNumber")}
            placeholder="rollNumber"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            {...register("email")}
            placeholder="email"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            {...register("passportSizePhoto")}
            placeholder="passportSizePhoto"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("firstName")}
            placeholder="firstName"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>


        <div className="mb-4">
          <input
            {...register("lastName")}
            placeholder="lastName"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("fatherName")}
            placeholder="fatherName"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("motherName")}
            placeholder="motherName"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            {...register("fullName")}
            placeholder="fullName"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("dateOfBirth")}
            placeholder="dateOfBirth"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("gender")}
            placeholder="gender"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            {...register("phoneNumber")}
            placeholder="phoneNumber"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("alternatePhoneNo")}
            placeholder="alternatePhoneNo"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("alternateEmail")}
            placeholder="alternateEmail"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("address")}
            placeholder="address"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("pincode")}
            placeholder="pincode"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("state")}
            placeholder="state"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("country")}
            placeholder="country"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            {...register("admissionYear")}
            placeholder="admissionYear"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("admissionCategory")}
            placeholder="admissionCategory"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("religion")}
            placeholder="religion"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("caste")}
            placeholder="caste"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("gapInEducation")}
            placeholder="gapInEducation"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("areYouSpeaciallyAbled")}
            placeholder="areYouSpeaciallyAbled"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("sem1Sgpi")}
            placeholder="sem1Sgpi"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            {...register("liveKt")}
            placeholder="liveKt"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("deadKt")}
            placeholder="deadKt"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("aggregateCgpi")}
            placeholder="aggregateCgpi"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("tenthPercentage")}
            placeholder="tenthPercentage"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("twelfthPercentage")}
            placeholder="twelfthPercentage"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("cetPercentile")}
            placeholder="cetPercentile"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("admissionType")}
            placeholder="admissionType"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register("signature")}
            placeholder="signature"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#56B280]  "
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {getErrorMessage(errors.name)}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-[#56B280] text-white p-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
      <p>
        Already have an account?
        <Link className="text-[#56B280] px-2" href="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default ApplicationForm;
