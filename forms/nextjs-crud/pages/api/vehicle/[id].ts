import { Vehicle } from "../../../backend/model/vehicleModel";
import { connectDb } from "../../../backend/databaseConnection/connection";
import { NextApiRequest, NextApiResponse } from "next";

connectDb();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

  const { id } = req.query;
  switch (req.method) {
    case "PUT":
      try {
        const vehiclePut = await Vehicle.findByIdAndUpdate(
          id as string,
          req.body,
          { new: true }
        );
        res.status(200).json(vehiclePut);
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
      break;

    case "DELETE":
      try {
        const vehicleDelete = await Vehicle.findByIdAndDelete(id as string);
        res.status(200).json(vehicleDelete);
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
      break;

    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}
