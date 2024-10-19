export interface OrderDetail {
  materialType: string;
  category: string;
  subcategory?: string; // The subcategory may be absent.
  quantity: number;
  cost: number;
}
