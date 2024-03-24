import { Driver } from "../../../backend/model/driverModel";
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
        const driverPut = await Driver.findByIdAndUpdate(
          id as string,
          req.body,
          { new: true }
        );
        res.status(200).json(driverPut);
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
      break;

    case "DELETE":
      try {
        const driverDelete = await Driver.findByIdAndDelete(id as string);
        res.status(200).json(driverDelete);
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
      break;

    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}
