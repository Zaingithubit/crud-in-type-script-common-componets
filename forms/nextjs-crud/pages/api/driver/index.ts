import { connectDb } from "../../../backend/databaseConnection/connection";
import { Driver } from "../../../backend/model/driverModel";
import { IDriver } from "../../../components/Interfaces/driver";
import { NextApiRequest, NextApiResponse } from "next";

connectDb();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  
  switch (req.method) {
    case "GET":
      try {
        // Check if an ID parameter is present in the request
        if (req.query.id) {
          const driver = await Driver.findById(req.query.id as string);
          // Check if the vehicle with the specified ID exists
          if (driver) {
            res.status(200).json(driver);
          }
        } else {
          // If no ID is provided, fetch all vehicles
          const driveres = await Driver.find();
          res.status(200).json(driveres);
        }
      } catch (error) {
        console.error((error as Error).message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "POST":
      try {
        const driver = await Driver.create(req.body as IDriver);
        res.status(201).json(driver);
      } catch (error) {
        console.error((error as Error).message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;
    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}
