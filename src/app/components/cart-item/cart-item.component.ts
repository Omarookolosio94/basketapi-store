import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cart } from 'src/app/interfaces/CartModel';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cart: Cart;

  @Output() changeQuantity: EventEmitter<Cart> = new EventEmitter();

  @Output() removeCartItem: EventEmitter<Cart> = new EventEmitter();

  constructor(private navigation: NavigationService) {}

  ngOnInit(): void {}

  updateQty(qty: number) {
    this.changeQuantity.emit({
      quantity: qty,
      product: this.cart.product,
      productID: this.cart.productID,
    });
  }

  removeItemFromCart() {
    this.removeCartItem.emit(this.cart);
  }

  openProduct(productID: any) {
    this.navigation.navigateTo(`/product/${productID}`);
  }
}
