import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db/drizzle";
import { InventoryItem, InventoryUpdate } from "../../../types";
import { products } from "@/db/schema";

export default async function productsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const products = await db.query.products.findMany();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching products" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
