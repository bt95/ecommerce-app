import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db/drizzle";
import { InventoryItem, InventoryUpdate } from "../../../types";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function getInventoryById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as Record<string, string>;

  switch (req.method) {
    case "GET": {
      try {
        const inventoryItems: InventoryItem[] = await db
          .select()
          .from(products)
          .where(eq(products.id, id))
          .limit(1)
          .execute();

        if (!inventoryItems) {
          res.status(404).json({ message: "Inventory item not found" });
        }

        res.status(200).json(inventoryItems[0]);
      } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
      }
      break;
    }

    case "POST": {
      const updateData: InventoryUpdate = req.body;
      try {
        const updatedProduct = await db
          .insert(products)
          .values({ ...updateData });
        // .set({ ...updateData })
        // .where(eq(products.id, id as string));

        // const updatedProduct = await db
        //   .update(products)
        //   .set({ ...updateData })
        //   .where(eq(products.id, id as string));
        res.status(200).json(updatedProduct);
      } catch (error) {
        console.log({ error });
        res.status(500).json({ message: "Error updating product" });
      }
      break;
    }
    default: {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}
