import { Product } from "./ProductModel";

export interface Cart{
  productID: number;
  product: Product;
  quantity: number;
}
