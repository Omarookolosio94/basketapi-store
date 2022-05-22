import { Injectable } from "@angular/core";
import { Order, OrderComplete } from "../interfaces/order.interface";

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() { }

  getOrder() {
    let orderSession: any = localStorage.getItem('ORDERS');
    let order: OrderComplete;

    if (orderSession == null || orderSession == '') {
      return null;
    } else {
      order = JSON.parse(orderSession);
      return order;
    }
  }
}
