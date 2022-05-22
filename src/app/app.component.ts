import { Component, isDevMode, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'basketapi-store';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    if (!isDevMode()) {
      console.log = function () {};
    }

    this.cartService.setCartCount();
  }
}
