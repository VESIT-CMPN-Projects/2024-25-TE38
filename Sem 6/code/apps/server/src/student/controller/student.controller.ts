import { Request, Response } from "express";
import Department from "../../college/models/department";
import College from "../../college/models/college";
export const getDeparments = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = req.user;
    const { collegeId } = req.body;
    console.log(collegeId);

    const { coll_departments }: any = await College.findById(collegeId);
    console.log(coll_departments);

    if (!coll_departments) {
      return res.status(404).send("No departments found");
    }
    res.status(200).json({ departments: coll_departments });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};
