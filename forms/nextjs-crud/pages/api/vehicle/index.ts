import { connectDb } from "../../../backend/databaseConnection/connection";
import { Vehicle } from "../../../backend/model/vehicleModel";
import { NextApiRequest, NextApiResponse } from "next";
import { IVehicle } from "../../../components/Interfaces/vehicle";

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
          const vehicle = await Vehicle.findById(req.query.id as string);
          // Check if the vehicle with the specified ID exists
          if (vehicle) {
            res.status(200).json(vehicle);
          } else {
            res.status(404).json({ error: "Vehicle not found" });
          }
        } else {
          // If no ID is provided, fetch all vehicles
          const vehicles = await Vehicle.find();
          res.status(200).json(vehicles);
        }
      } catch (error) {
        console.error((error as Error).message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "POST":
      try {
        const vehicle = await Vehicle.create(req.body as IVehicle);
        res.status(201).json(vehicle);
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
