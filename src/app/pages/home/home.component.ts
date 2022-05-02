import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/ProductModel';
import { BasketapiService } from 'src/app/services/basketapi.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
declare var $: any;

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
  currentPage: number = 1;
  totalPage: number = 1;
  documentCount: number = 1;

  perPage = environment.perPageCount;
  orderedQuantity: number = 1;

  constructor(
    private apiservice: BasketapiService,
    private route: Router,
    private spinner: SpinnerVisibilityService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.GetRandomProducts();
    this.cartService.setCartCount();
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

  GetProductsByPage(page: number, limit: number) {
    this.spinner.show();

    this.apiservice.GetProductsByPage(page, limit).subscribe(
      (response) => {
        if (response?.code == 200) {
          let fetchedProducts: Product[] = response?.data?.products;

          fetchedProducts = fetchedProducts.filter(
            (item) => item.productID != this.productOfTheDay?.productID
          );

          this.products = this.products.concat(fetchedProducts);
          this.currentPage = response?.data?.currentPage;
          this.totalPage = response?.data?.totalPages;
          this.documentCount = response?.data?.documentCount;
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

  GetQuantity(productID: number) {
    var cart = this.cartService.getItemFromCart(productID);
    if (cart.length > 0) {
      return cart[0].quantity;
    } else {
      return 1;
    }
  }

  GetRandomProducts() {
    this.spinner.show();

    this.apiservice.GetRandomProducts().subscribe(
      (response) => {
        if (response?.code == 200) {
          this.productOfTheDay = response?.data[0];
          this.isProductOfDayInCart = this.cartService.isInCart(
            this.productOfTheDay.productID
          );

          this.orderedQuantity = this.GetQuantity(response?.data[0].productID);
          //this.GetProducts(this.productOfTheDay?.productID);
          this.GetProductsByPage(1, this.perPage);
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

  LoadMorePage() {
    if (this.currentPage == this.totalPage) return;
    this.GetProductsByPage(this.currentPage + 1, this.perPage);
  }
}
