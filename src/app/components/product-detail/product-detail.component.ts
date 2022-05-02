import { Component, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/interfaces/ProductModel';
import { CartService } from 'src/app/services/cart.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  @Input() title: string;
  @Input() showProductName: boolean;
  @Input() product: Product;
  @Input() isInCart: boolean = false;
  @Input() orderedQty: number = 1;

  constructor(
    private navigation: NavigationService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.isInCart = this.cartService.isInCart(this.product?.productID);
    var cart = this.cartService.getItemFromCart(this.product?.productID);
    if (cart.length > 0) {
      this.orderedQty = cart[0].quantity;
    }
  }

  openProduct(productID: any) {
    this.navigation.navigateTo(`/product/${productID}`);
  }

  addToCart(qty: number = this.orderedQty) {
    this.isInCart = this.cartService.addToCart(this.product, qty);
    this.cartService.setCartCount();
  }

  removeFromCart() {
    if (
      window.confirm(
        `You are about to remove ${this.product?.name} from your cart?`
      )
    ) {
      this.isInCart = !this.cartService.removeFromCart(this.product?.productID);
      this.cartService.setCartCount();
    }
  }

  updateQty(qty: number) {
    if (this.isInCart) {
      this.cartService.updateQuantity(this.product, qty);
      this.orderedQty = qty;
    } else {
      this.orderedQty = qty;
    }
  }
}
