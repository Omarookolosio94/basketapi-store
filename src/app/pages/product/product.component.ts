import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/ProductModel';
import { BasketapiService } from 'src/app/services/basketapi.service';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product: Product;
  isProductInCart: boolean = false;
  orderedQuantity: number = 1;
  showProductName: boolean = false;


  constructor(
    private apiService: BasketapiService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let productID = this.activatedRoute.snapshot.params.id;
    this.GetProduct(productID);
  }

  GetProduct(productID: number) {
    this.apiService.GetProducts(productID).subscribe(
      (response) => {
        if (response?.code == 200) {
          this.product = response.data;
          this.isProductInCart = this.cartService.isInCart(response?.data?.productID);
          this.orderedQuantity = this.GetQuantity(response?.data?.productID);
          this.cartService.setCartCount();
        }
        return;
      },
      (error) => {
        return;
      }
    );
  }

  GetQuantity(productID: number) {
    var cart = this.cartService.getItemFromCart(productID);
    if (cart.length > 0) {
      return cart[0].quantity;
    } else {
      return 1;
    }
  }
}
