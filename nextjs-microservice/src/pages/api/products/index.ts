import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db/drizzle";
import { getMethodNotAllowedError } from "@/utils";
import corsMiddleware from "@/middleware/corsMiddleware";
import { products } from "@/db/schema";

export default async function productsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return corsMiddleware(req, res, async () => {
    if (req.method === "GET") {
      try {
        const productItems = await db
          .select()
          .from(products)
          .orderBy(products.id)
          .execute();
        return res.status(200).json(productItems);
      } catch (error) {
        return res.status(500).json(new Error("Error fetching products"));
      }
    } else {
      const allowedMethods = ["GET"];
      res.setHeader("Allow", allowedMethods);
      return res
        .status(405)
        .end(getMethodNotAllowedError(req.method, allowedMethods));
    }
  });
}
