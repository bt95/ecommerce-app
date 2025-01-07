import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db/drizzle";
import { Product, UpdateProduct } from "../../../types";
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
        const productItems: Product[] = await db
          .select()
          .from(products)
          .where(eq(products.id, id))
          .limit(1)
          .execute();

        if (!productItems?.length) {
          return res.status(404).json(new Error("Inventory item not found"));
        }

        return res.status(200).json(productItems[0]);
      } catch (error) {
        console.log({ error });
        return res.status(500).json(new Error("Internal server error"));
      }
      break;
    }

    case "POST": {
      const updateProductData: UpdateProduct = req.body;
      try {
        // db.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);
        // db.execute(`USE ${process.env.DB_NAME};`);
        // const result1 = await db.execute("DROP TABLE IF EXISTS products");
        // console.log({ result1 });
        // const result = await db.execute(
        //   "CREATE TABLE IF NOT EXISTS products (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name VARCHAR(255), inventory_count INT)"
        // );
        // console.log({ result });

        // const updatedProduct = await db
        //   .insert(products)
        //   .values({ ...updateData });
        // // .set({ ...updateData })
        // // .where(eq(products.id, id as string));

        const inventoryItems: Product[] = await db
          .select()
          .from(products)
          .where(eq(products.id, id))
          .limit(1)
          .execute();

        if (!inventoryItems?.length) {
          res.status(404).json({ message: "Inventory item not found" });
        }

        await db
          .update(products)
          .set({ ...updateProductData })
          .where(eq(products.id, id as string));

        const updatedProduct = await db
          .select()
          .from(products)
          .where(eq(products.id, id))
          .limit(1)
          .execute();

        return res.status(200).json(updatedProduct[0]);
      } catch (error) {
        console.log({ error });
        return res.status(500).json({ message: "Error updating product" });
      }
      break;
    }
    default: {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}
