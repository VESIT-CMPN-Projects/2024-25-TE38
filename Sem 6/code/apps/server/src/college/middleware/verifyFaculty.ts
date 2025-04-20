import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Faculty from "../models/faculty";

const verifyFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get user from req
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Access Denied" });
    }

    // verify token
    const user = jwt.verify(token, process.env.JWT_ACCESS_TOKEN!);
    if (!user) {
      return res.status(401).json({ message: "Access Denied" });
    }
    //@ts-ignore
    const userFaculty = await Faculty.findById(user._id);
    if (!userFaculty) {
      return res.status(404).json({ message: "User not found" });
    }
    //@ts-ignore
    req.faculty = userFaculty;
    next();
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyFaculty;
