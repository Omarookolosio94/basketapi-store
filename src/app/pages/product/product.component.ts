import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product, ReviewItem } from 'src/app/interfaces/ProductModel';
import { BasketapiService } from 'src/app/services/basketapi.service';
import { CartService } from 'src/app/services/cart.service';
import { isEmail } from 'src/app/utilities/helpers';
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

  reviewForm = this.formBuilder.group({
    customerName: '',
    customerReview: '',
    email: '',
    rating: new FormControl('5'),
    productID: 0,
  });

  constructor(
    private apiService: BasketapiService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
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
          this.isProductInCart = this.cartService.isInCart(
            response?.data?.productID
          );
          this.orderedQuantity = this.GetQuantity(response?.data?.productID);
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

  //TODO: Add comments to product functionality
  AddReview(): void {
    if (
      this.reviewForm.value.customerName == null ||
      this.reviewForm.value.customerName == ''
    ) {
      var nameError: any = document.getElementById('formNameError');

      nameError.classList.add('show');

      setTimeout(() => {
        nameError.classList.remove(`show`);
        return;
      }, 4000);
      return;
    }

    if (
      this.reviewForm.value.email != null &&
      this.reviewForm.value.email != ''
    ) {
      if (!isEmail(this.reviewForm.value.email)) {
        var emailError: any = document.getElementById('formEmailError');

        emailError.classList.add('show');

        setTimeout(() => {
          emailError.classList.remove(`show`);

          return;
        }, 4000);
        return;
      }
    }

    var review: ReviewItem = {
      ...this.reviewForm.value,
      rating: +this.reviewForm.value.rating,
    };

    this.apiService.AddReview(review).subscribe(
      (response) => {
        if (response) {
          if (response.code == 200) {
            alert(response.data);
            this.GetProduct(review.productID);

            this.reviewForm.reset({
              customerName: '',
              customerReview: '',
              email: '',
              rating: '5',
              productID: review.productID,
            });

            console.log(this.reviewForm.value);
          } else {
            alert(response.message);
          }
        }
        return;
      },
      (error) => {
        alert('An error occured. Please try again');
        return;
      }
    );
  }
}
