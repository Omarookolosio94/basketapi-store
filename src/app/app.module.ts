import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AboutComponent } from './pages/about/about.component';
import { CartComponent } from './pages/cart/cart.component';
import { NewItemsComponent } from './pages/new-items/new-items.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { QtyBtnComponent } from './components/qty-btn/qty-btn.component';
import { ProductComponent } from './pages/product/product.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';

const navRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cart', component: CartComponent },
  { path: 'new', component: NewItemsComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', pathMatch: 'full', component: NotfoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    NotfoundComponent,
    CartComponent,
    NewItemsComponent,
    ProductDetailComponent,
    ProductBoxComponent,
    QtyBtnComponent,
    ProductComponent,
    CartItemComponent,
    CheckoutComponent,
    CartSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(navRoutes, { enableTracing: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
