import { NextApiRequest, NextApiResponse } from "next";
import { connectDb } from "../../../backend/databaseConnection/connection";
import { Contact } from "../../../backend/model/contactModel";
import { IContact } from "../../../components/Interfaces/contact";

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
          const contact = await Contact.findById(req.query.id as string);
          // Check if the contact with the specified ID exists
          if (contact) {
            res.status(200).json(contact);
          }
        } else {
          // If no ID is provided, fetch all contacts
          const contacts = await Contact.find();
          res.status(200).json(contacts);
        }
      } catch (error) {
        console.error((error as Error).message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "POST":
      try {
        const contact = await Contact.create(req.body as IContact);
        res.status(201).json(contact);
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
