import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/ProductModel';
import { CartService } from 'src/app/services/cart.service';
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  loading: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  //TODO: calculate total price of cart
}
