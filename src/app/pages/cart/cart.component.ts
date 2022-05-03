import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/CartModel';
import { Product } from 'src/app/interfaces/ProductModel';
import { BasketapiService } from 'src/app/services/basketapi.service';
import { CartService } from 'src/app/services/cart.service';
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart[] = [];
  loading: boolean = true;
  cartTotal: number = 0;
  newCart: Cart[] = [];

  constructor(
    private cartService: CartService,
    private apiService: BasketapiService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.GetLatestCart();
    this.cart = this.newCart;
    this.CalculateCartTotal();
  }

  CalculateCartTotal() {
    this.cartTotal = this.cartService.calculateCartTotal();
    return;
  }

  GetLatestCart() {
    let cart = this.cartService.getCart();

    if (cart.length > 0) {
      cart.forEach((item) => {
        this.setCart(item);
      });

      return;
    } else {
      this.loading = false;
      this.cartService.setCartCount();
      return;
    }
  }

  setCart(item: Cart) {
    this.apiService.GetProducts(item.productID).subscribe(
      (response) => {
        if (response?.code == 200) {
          let product: Product = response?.data;

          this.newCart.push({
            product: product,
            productID: item.productID,
            quantity: item.quantity,
          });

          localStorage.setItem('CART', JSON.stringify(this.newCart));

          this.cartService.setCartCount();
          this.loading = false;
          return;
        } else {
          this.cartService.removeFromCart(item.productID);

          localStorage.setItem('CART', JSON.stringify(this.newCart));

          this.cartService.setCartCount();
        }
      },
      (error) => {
        return;
      }
    );
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
