import { Injectable } from '@angular/core';
import { Product } from '../interfaces/ProductModel';
declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() { }

  getCart() {
    let cartSession: any = localStorage.getItem('CART');
    let cart: Product[] = [];

    if (cartSession == null || cartSession == '') {
      return cart;
    } else {
      cart = JSON.parse(cartSession);
      return cart;
    }
  }

  addToCart(product: Product) {
    //get existing cart
    let cartSession: any = localStorage.getItem('CART');
    let cart: Product[] = [];

    //TODO: Update cart count

    if (cartSession == null || cartSession == '') {
      cart.push(product);
      localStorage.setItem('CART', JSON.stringify(cart));
    } else {
      cart = JSON.parse(cartSession);

      if (this.isInCart(product?.productID)) {
        alert('Product already in cart');
      } else {
        cart.push(product);
        localStorage.setItem('CART', JSON.stringify(cart));
      }
    }
    return true;
  }

  isInCart(productID: number) {
    let cartSession: any = localStorage.getItem('CART');
    let cart: Product[] = [];

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
    let cart: Product[] = [];

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
    let cart: Product[] = [];

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

  //TODO: Update Cart Functionality to increase or decrease QTY
}
