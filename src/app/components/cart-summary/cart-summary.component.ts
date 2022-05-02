import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/interfaces/CartModel';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  @Input() cart: Cart;

  constructor() { }

  ngOnInit(): void {
  }

}
