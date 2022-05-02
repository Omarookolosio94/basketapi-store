import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/interfaces/CartModel';
import { Product } from 'src/app/interfaces/ProductModel';
import { CartService } from 'src/app/services/cart.service';
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart[] = [];
  loading: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  removeFromCart(cart: Cart) {
    if (
      window.confirm(
        `You are about to remove ${cart.product?.name} from your cart?`
      )
    ) {
      this.cartService.removeFromCart(cart.product?.productID);
      this.cartService.setCartCount();
      this.cart = this.cartService.getCart();
      return;
    }
  }

  updateQty(cart: Cart) {
    if (cart.quantity < 1) {
      this.removeFromCart(cart);
    } else {
      this.cartService.updateQuantity(cart.product, cart.quantity);
    }
  }
}
