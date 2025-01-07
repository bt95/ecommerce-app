export interface Product {
  id: string;
  name: string;
  inventory_count: number;
}

export interface UpdateProduct extends Partial<Omit<Product, "id">> {}
