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
  loading: boolean = false;

  //TODO: Add general Loading state;

  constructor(private apiservice: BasketapiService, private route: Router, private spinner: SpinnerVisibilityService, private cart: CartService) {}

  ngOnInit(): void {
    this.loading = true;
    this.GetProducts();
    this.cart.setCartCount();
    this.loading = false;
  }

  GetProducts() {

    this.spinner.show();

    this.apiservice.GetProducts().subscribe(
      (response) => {
        if (response?.code == 200) {
          this.products = response?.data;
        }
        this.spinner.hide();
        return;
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
        return;
      }
    );

  }
}
