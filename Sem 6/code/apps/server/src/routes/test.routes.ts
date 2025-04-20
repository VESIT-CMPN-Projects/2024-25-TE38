import express from "express";
import { redis } from "../index";
import College from "../college/models/college";
import Department from "../college/models/department";

const testRoutes = express.Router();

testRoutes.get("/", async (req, res) => {
  try {
    const { collegeId } = req.query; // Use query parameters

    if (!collegeId) {
      return res.status(400).send("College ID is required");
    }

    // Fetch data from Redis
    const cachedCollege = await redis.get(collegeId);
    if (cachedCollege) {
      console.log("From Redis");

      return res.status(200).send(cachedCollege); // Parse and send cached data
    }

    // If not in Redis, fetch from MongoDB
    const college = await College.findById(collegeId);

    if (!college) {
      return res.status(404).send("College not found");
    }

    // Fetch associated departments
    const departments = college.coll_departments || [];
    const collegeWithDepartment = await Promise.all(
      departments.map(async (departmentId: string) => {
        return await Department.findById(departmentId);
      })
    );

    // Attach department data to the college object
    //@ts-ignore
    college.coll_departments = collegeWithDepartment;

    console.log("From MongoDB");

    // Cache the result in Redis for future requests
    await redis.set(collegeId, JSON.stringify(college), { EX: 3600 }); // TTL set to 1 hour

    return res.status(200).send(college);
  } catch (error) {
    console.error("Error fetching college data:", error);
    return res.status(500).send("Internal Server Error");
  }
});

export default testRoutes;
