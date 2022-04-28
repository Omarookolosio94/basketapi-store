import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/ProductModel';
import { BasketapiService } from 'src/app/services/basketapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  showProductName: boolean = false;
  products: Product[] = [];

  //TODO: Add general Loading state;

  constructor(private apiservice: BasketapiService, private route: Router) {}

  ngOnInit(): void {
    this.GetProducts();
  }

  GetProducts() {
    this.apiservice.GetProducts().subscribe(
      (response) => {
        if (response?.code == 200) {
          this.products = response?.data;
        }
        return;
      },
      (error) => {
        console.log(error);
        return;
      }
    );
  }
}
