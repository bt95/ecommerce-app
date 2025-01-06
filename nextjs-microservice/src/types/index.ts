export interface InventoryItem {
  id: string;
  name: string;
  inventory_count: number;
}

export interface InventoryUpdate {
  name: string;
  inventory_count: number;
}
