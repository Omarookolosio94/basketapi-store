import { Component, OnInit } from '@angular/core';
import { OrderComplete } from 'src/app/interfaces/order.interface';
import { CartService } from 'src/app/services/cart.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  orderComplete: OrderComplete;
  cartTotal: number = 0;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private navigation: NavigationService
  ) {}

  ngOnInit(): void {
    this.GetOrders();
  }

  GetOrders() {
    var response = this.orderService.getOrder();

    if (response == null) {
      this.navigation.navigateTo('/home');
      return;
    } else {
      this.orderComplete = response;
      this.cartTotal = this.cartService.calculateCartTotalWithCart(
        response?.cartComplete
      );
      return;
    }
  }
}
