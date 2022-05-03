import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/CartModel';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: Cart[] = [];
  loading: boolean = false;
  cartTotal: number = 0;

  constructor(private cartService: CartService, private route: Router) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    if (this.cart.length < 1) {
      this.route.navigate(['/home']);
    }
    this.CalculateCartTotal();
  }

  CalculateCartTotal() {
    this.cartTotal = this.cartService.calculateCartTotal();
    return;
  }

  //TODO: Create CheckOut Logic

  //TODO: Always update product in cart with api

}
