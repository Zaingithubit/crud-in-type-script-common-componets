import { Contact } from "../../../backend/model/contactModel";
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
        const contactPut = await Contact.findByIdAndUpdate(
          id as string,
          req.body,
          { new: true }
        );
        res.status(200).json(contactPut);
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
      break;

    case "DELETE":
      try {
        const contactDelete = await Contact.findByIdAndDelete(id as string);
        res.status(200).json(contactDelete);
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
      break;

    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}
