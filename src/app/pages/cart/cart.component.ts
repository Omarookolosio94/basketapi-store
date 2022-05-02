import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/interfaces/CartModel';
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
  cartTotal: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.CalculateCartTotal();
  }

  CalculateCartTotal() {
    this.cartTotal = this.cartService.calculateCartTotal();
    return;
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
      this.CalculateCartTotal();
      return;
    }
  }

  emptyCart() {
    if (window.confirm('You are about to empty your cart?')) {
      this.cartService.emptyCart();
      this.cartService.setCartCount();
      this.cart = [];
    }
  }

  updateQty(cart: Cart) {
    if (cart.quantity < 1) {
      this.removeFromCart(cart);
      return;
    } else {
      this.cartService.updateQuantity(cart.product, cart.quantity);
      this.cartTotal = this.cartService.calculateCartTotal();
      return;
    }
  }
}
