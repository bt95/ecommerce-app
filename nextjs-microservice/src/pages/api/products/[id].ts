import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db/drizzle";
import { Product, UpdateProduct } from "../../../types";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getMethodNotAllowedError, productNotFoundError } from "@/utils";

export default async function getOrUpdateProductById(
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
          return res.status(404).json(productNotFoundError);
        }

        return res.status(200).json(productItems[0]);
      } catch (error) {
        console.log({ error });
        return res
          .status(500)
          .json(new Error(`Error fetching product with id ${id}`));
      }
      break;
    }

    case "POST": {
      const updateProductData: UpdateProduct = req.body;
      try {
        const productItems: Product[] = await db
          .select()
          .from(products)
          .where(eq(products.id, id))
          .limit(1)
          .execute();

        if (!productItems?.length) {
          return res.status(404).json(productNotFoundError);
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
        return res
          .status(500)
          .json(new Error(`Error updating product with id ${id}`));
      }
      break;
    }
    default: {
      const allowedMethods = ["GET", "POST"];
      res.setHeader("Allow", allowedMethods);
      return res
        .status(405)
        .end(getMethodNotAllowedError(req.method, allowedMethods));
    }
  }
}
