import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/CartModel';
import { Product } from '../interfaces/ProductModel';
declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  getCart() {
    let cartSession: any = localStorage.getItem('CART');
    let cart: Cart[] = [];

    if (cartSession == null || cartSession == '') {
      return cart;
    } else {
      cart = JSON.parse(cartSession);
      return cart;
    }
  }

  addToCart(product: Product, qty: number = 1) {
    //get existing cart
    let cartSession: any = localStorage.getItem('CART');
    let cart: Cart[] = [];

    if (cartSession == null || cartSession == '') {
      cart.push({
        product: product,
        productID: product?.productID,
        quantity: qty,
      });

      localStorage.setItem('CART', JSON.stringify(cart));
    } else {
      cart = JSON.parse(cartSession);

      if (this.isInCart(product?.productID)) {
        alert('Product already in cart');
      } else {
        cart.push({
          product: product,
          productID: product?.productID,
          quantity: qty,
        });

        localStorage.setItem('CART', JSON.stringify(cart));
      }
    }
    return true;
  }

  isInCart(productID: number) {
    let cartSession: any = localStorage.getItem('CART');
    let cart: Cart[] = [];

    if (cartSession == null || cartSession == '') {
      return false;
    } else {
      cart = JSON.parse(cartSession);

      if (cart.some((item) => item.productID == productID)) {
        return true;
      } else {
        return false;
      }
    }
  }

  removeFromCart(productID: number) {
    let cartSession: any = localStorage.getItem('CART');
    let cart: Cart[] = [];

    if (cartSession == null || cartSession == '') {
      return true;
    } else {
      cart = JSON.parse(cartSession);
      cart = cart.filter((item) => item.productID != productID);
      localStorage.setItem('CART', JSON.stringify(cart));
      return true;
    }
  }

  setCartCount(cartSession: any = localStorage.getItem('CART')) {
    let cart: Cart[] = [];

    if (cartSession == null || cartSession == '') {
      $('#cart-count').css('opacity', 0);
      $('#cart-count').text('');
      $('#cart-count-nav').css('opacity', 0);
      $('#cart-count-nav').text('');
      return;
    } else {
      cart = JSON.parse(cartSession);
      if (cart.length > 0) {
        $('#cart-count').css('opacity', 1);
        $('#cart-count').text(cart.length);
        $('#cart-count-nav').css('opacity', 1);
        $('#cart-count-nav').text(cart.length);

        return;
      } else {
        $('#cart-count').css('opacity', 0);
        $('#cart-count').text('');
        $('#cart-count-nav').css('opacity', 0);
        $('#cart-count-nav').text('');
        return;
      }
    }
  }

  getItemFromCart(productID: number) {
    if (!this.isInCart(productID)) {
      return [];
    } else {
      let cartSession: any = localStorage.getItem('CART');
      let cart: Cart[] = [];

      if (cartSession) {
        cart = JSON.parse(cartSession);

        let product = cart.filter((item) => item.productID == productID);
        return product;
      }
      return [];
    }
  }

  updateQuantity(product: Product, qty: number) {
    if (!this.isInCart(product?.productID)) {
      return;
    } else {
      let cartSession: any = localStorage.getItem('CART');
      let cart: Product[] = [];

      if (cartSession) {
        cart = JSON.parse(cartSession);

        var newCart = cart.map((item) =>
          item.productID == product?.productID
            ? { ...item, quantity: qty }
            : item
        );

        localStorage.setItem('CART', JSON.stringify(newCart));
      }
      return;
    }
  }

  updateProductInCart(product: Product) {
    if (!this.isInCart(product?.productID)) {
      return;
    } else {
      let cartSession: any = localStorage.getItem('CART');
      let cart: Product[] = [];

      if (cartSession) {
        cart = JSON.parse(cartSession);

        var newCart = cart.map((item) =>
          item.productID == product?.productID
            ? { ...item, product: product }
            : item
        );

        localStorage.setItem('CART', JSON.stringify(newCart));
      }
      return;
    }
  }

  calculateCartTotal() {
    var cart = this.getCart();

    if (cart.length > 0) {
      let total = 0;

      cart.forEach((cartItem) => {
        total = total + (cartItem.quantity * cartItem?.product?.unitPrice);
      });

      return total;
    } else {
      return 0;
    }
  }

  calculateCartTotalWithCart(cart: Cart[]) {
    if (cart.length > 0) {
      let total = 0;

      cart.forEach((cartItem) => {
        total = total + (cartItem.quantity * cartItem?.product?.unitPrice);
      });

      return total;
    } else {
      return 0;
    }
  }

  emptyCart() {
    localStorage.setItem('CART', JSON.stringify([]));
  }
}
