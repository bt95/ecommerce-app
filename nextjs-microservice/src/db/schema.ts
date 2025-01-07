import { pgTable, varchar, integer, uuid } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  inventory_count: integer("inventory_count").notNull(),
});
