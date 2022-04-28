import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/ProductModel';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit(): void {
  }

  //TODO: Add redirect to single product function
  //TODO: Add add to cart functionality;

}
