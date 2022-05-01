import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/ProductModel';
import { BasketapiService } from 'src/app/services/basketapi.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showProductName: boolean = false;
  products: Product[] = [];
  productOfTheDay: Product = {
    productID: 0,
    unitPrice: 0,
    name: '',
    reviews: [],
    unitsInStock: 0,
    summary: '',
    gallery: [],
    isAvailable: false,
    dateAdded: new Date(),
    lastUpdateDate: new Date(),
    addedBy: '',
    updatedBy: '',
    rating: '5',
  };
  loading: boolean = false;
  isProductOfDayInCart = false;

  //TODO: Add general Loading state;

  constructor(
    private apiservice: BasketapiService,
    private route: Router,
    private spinner: SpinnerVisibilityService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.GetRandomProducts();
    this.cart.setCartCount();
    this.loading = false;
  }

  GetProducts(productID: number) {
    this.spinner.show();

    this.apiservice.GetProducts().subscribe(
      (response) => {
        if (response?.code == 200) {
          this.products = response?.data;

          this.products = this.products.filter(
            (item) => item.productID != productID
          );
        }
        this.spinner.hide();
        return;
      },
      (error) => {
        this.spinner.hide();
        return;
      }
    );
  }

  GetRandomProducts() {
    this.spinner.show();

    this.apiservice.GetRandomProducts().subscribe(
      (response) => {
        if (response?.code == 200) {
          this.productOfTheDay = response?.data[0];
          this.isProductOfDayInCart = this.cart.isInCart(
            this.productOfTheDay.productID
          );

          this.GetProducts(this.productOfTheDay?.productID);
        } else {
          this.spinner.hide();
          return;
        }
      },
      (error) => {
        this.spinner.hide();
        return;
      }
    );
  }
}
