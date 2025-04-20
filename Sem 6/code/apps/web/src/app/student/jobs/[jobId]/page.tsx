"use client";

import ApplicationCard from "@/components/own/Dashboard/ApplicationCard";

import React from "react";

// Dummy profile insights
const profileInsights = {
  certifications: "Salesforce Certification",
  skills: ["React", "Software development", "Node.js"],
  education: "Bachelor's degree",
};

// Dummy job data
const jobData = {
  pay: "₹20,00,000 - ₹40,00,000 a year",
  jobType: "Full-time",
  shiftAndSchedule: "Evening shift\nUK shift\nMonday to Friday",
  location: "Mohali, Punjab",
  benefits: [
    "Health insurance",
    "Internet reimbursement",
    "Leave encashment",
    "Paid sick time",
    "Paid time off",
    "Provident Fund",
  ],
  description: `Job Description: We are looking for a highly skilled and experienced System Architect who will play a crucial role in setting the direction and leading the execution of our technology strategy. The successful candidate will architect and design highly scalable, robust, and performant systems to support the e-commerce platform, developed using technologies like React JS, NodeJS, Java, Salesforce, and Adobe Experience Manager (AEM).

Key Responsibilities:
- Design and implement end-to-end technical solutions for complex business problems.
- Ensure the architectural integrity and consistency across the entire product.
- Collaborate with stakeholders to understand business requirements and translate them into system requirements.
- Develop and manage a comprehensive architecture blueprint that outlines the structure and operation of our technology landscape.
- Evaluate and select appropriate software or hardware and suggest integration methods.
- Collaborate with various team members to implement designs and troubleshoot system issues.
- Oversee progress of the development team to ensure consistency with the initial design.
- Continuously analyze system architecture to recommend improvements and optimizations.
- Maintain technical knowledge and understanding of the latest industry trends and emerging technologies.

Basic Qualifications:
- Bachelor's degree or higher in Computer Science, Engineering, or a related field.
- Minimum of 7 years of experience in system architecture, software development, and/or a similar role.
- Strong experience in architecting and building applications with React JS, NodeJS, Java, Salesforce, and AEM.
- Experience in designing and deploying scalable, highly available, and fault-tolerant systems.
- Excellent understanding of architectural styles and design patterns.
- Experience in working with third-party APIs and understanding of system integration.
- Proven ability to lead and manage projects with cross-functional teams.

Preferred Qualifications:
- E-commerce industry experience.
- Excellent communication skills with the ability to clearly articulate complex technical issues to all levels of the organization (both technical and non-technical).
- Experience with Agile methodologies.
- Professional certifications related to System Architecture or the technologies used in our stack (like Salesforce Certified Architect, AEM Architect certification, etc.).

Benefits: 
We offer a competitive salary package along with excellent company benefits, including but not limited to health insurance, generous paid time off, and an inclusive work environment.

Equal Opportunity: 
Our company is an equal opportunity employer. We encourage diversity and are committed to creating an inclusive environment for all employees.

Remuneration: 
Best in the industry

Immediate Joiners will be preferred

Work Location: 
Mohali, Partial and full-time remote available

Job Type: 
Full-time

Benefits:
- Internet reimbursement
- Leave encashment
- Paid sick time
- Provident Fund

Schedule:
- Evening shift
- Monday to Friday

Supplemental Pay:
- Performance bonus
- Yearly bonus

Application Question(s):
- Are you comfortable working in UK Shift?
Experience:
- React: 5 years (Required)`,
};

const JobDetails = () => {
  return (
    <div className="p-6 max-w-screen mx-auto bg-primary_background">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4">Profile Insights</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Certifications</h2>
            <p>{profileInsights.certifications}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Skills</h2>
            <ul className="list-disc list-inside">
              {profileInsights.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Education</h2>
            <p>{profileInsights.education}</p>
          </div>
          <h1 className="text-2xl font-bold mb-4">Job Details</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Pay</h2>
            <p>{jobData.pay}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Job Type</h2>
            <p>{jobData.jobType}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Shift and Schedule</h2>
            <p>{jobData.shiftAndSchedule}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Location</h2>
            <p>{jobData.location}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Benefits</h2>
            <ul className="list-disc list-inside">
              {jobData.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>{/* <ApplicationCard job={sampleJob} /> */}</div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Description</h2>
        <div className="bg-gray-100 p-4 rounded-md">
          {jobData.description.split("\n").map((line, index) => {
            if (
              line.startsWith("Description:") ||
              line.startsWith("Key Responsibilities:") ||
              line.startsWith("Basic Qualifications:") ||
              line.startsWith("Preferred Qualifications:") ||
              line.startsWith("Benefits:") ||
              line.startsWith("Equal Opportunity:") ||
              line.startsWith("Remuneration:") ||
              line.startsWith("Immediate Joiners will be preferred") ||
              line.startsWith("Work Location:") ||
              line.startsWith("Job Type:") ||
              line.startsWith("Schedule:") ||
              line.startsWith("Supplemental Pay:") ||
              line.startsWith("Application Question(s):") ||
              line.startsWith("Experience:")
            ) {
              return (
                <p key={index} className="font-bold text-lg mt-2">
                  {line}
                </p>
              );
            }
            return (
              <p key={index} className="mt-1">
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
