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

  constructor(
    private navigation: NavigationService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.isInCart = this.cart.isInCart(this.product?.productID);
  }

  openProduct(productID: any) {
    this.navigation.navigateTo(`/product/${productID}`);
  }

  addToCart() {
    this.isInCart = this.cart.addToCart(this.product);
    this.cart.setCartCount();
  }

  removeFromCart() {
    if (
      window.confirm(
        `You are about to remove ${this.product?.name} from your cart?`
      )
    ) {
      this.isInCart = !this.cart.removeFromCart(this.product?.productID);
      this.cart.setCartCount();
    }
  }
}
