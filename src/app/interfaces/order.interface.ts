import { Cart } from "./CartModel";

export interface Order {
  cart: CartSummary[];
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhoneNumber: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  paymentMethod: string;
}

export interface CartSummary {
  productID: number;
  quantity: number;
}

export interface OrderComplete {
  cart: CartSummary[];
  cartComplete: Cart[];
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhoneNumber: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  paymentMethod: string;
}
