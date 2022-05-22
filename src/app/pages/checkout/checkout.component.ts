import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/CartModel';
import {
  CartSummary,
  Order,
  OrderComplete,
} from 'src/app/interfaces/order.interface';
import { BasketapiService } from 'src/app/services/basketapi.service';
import { CartService } from 'src/app/services/cart.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { isEmail } from 'src/app/utilities/helpers';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cart: Cart[] = [];
  loading: boolean = false;
  cartTotal: number = 0;
  phoneNoRegex = /^\d{11}$/;

  orderForm = this.formBuilder.group({
    customerName: '',
    customerEmail: '',
    customerPhoneNumber: '',
    shippingAddress: '',
  });

  constructor(
    private cartService: CartService,
    private apiService: BasketapiService,
    private formBuilder: FormBuilder,
    private route: Router,
    private navigation: NavigationService
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    if (this.cart.length < 1) {
      this.route.navigate(['/home']);
    }
    this.CalculateCartTotal();
  }

  CalculateCartTotal() {
    this.cartTotal = this.cartService.calculateCartTotal();
    return;
  }

  //TODO: Create CheckOut Logic
  PlaceOrder() {
    var customerName = this.orderForm.value.customerName;
    var customerEmail = this.orderForm.value.customerEmail;
    var customerPhoneNumber = this.orderForm.value.customerPhoneNumber;
    var shippingAddress = this.orderForm.value.shippingAddress;

    if (
      customerEmail == '' ||
      customerEmail == null ||
      customerName == '' ||
      customerName == null ||
      customerPhoneNumber == '' ||
      customerPhoneNumber == null ||
      shippingAddress == '' ||
      shippingAddress == null
    ) {
      alert('Please pass in all required information');
      return;
    }

    if (!isEmail(customerEmail)) {
      var emailError: any = document.getElementById('formEmailError');

      emailError.classList.add('show');

      setTimeout(() => {
        emailError.classList.remove(`show`);

        return;
      }, 4000);
      return;
    }

    if (!customerPhoneNumber.match(this.phoneNoRegex)) {
      var phoneNumberError: any = document.getElementById(
        'formPhoneNumberError'
      );

      phoneNumberError.classList.add('show');

      setTimeout(() => {
        phoneNumberError.classList.remove(`show`);

        return;
      }, 4000);
      return;
    }

    var names = customerName.trim().split(' ');

    var fullnames = names.filter((name: any) => name.length > 0);

    if (names.length < 2) {
      var nameError: any = document.getElementById('formNameError');

      nameError.classList.add('show');

      setTimeout(() => {
        nameError.classList.remove(`show`);

        return;
      }, 4000);
      return;
    }

    //create order object
    let cart: CartSummary[] = [];

    this.cart.forEach((item) => {
      cart.push({
        productID: item.productID,
        quantity: item.quantity,
      });
    });

    var order: Order = {
      cart: cart,
      customerEmail: customerEmail,
      customerFirstName: fullnames[0],
      customerLastName: fullnames.length > 1 ? fullnames[1] : 'null',
      customerPhoneNumber: customerPhoneNumber,
      paymentMethod: 'Pay On Delivery(POD)',
      shippingAddress: shippingAddress,
      shippingCity: 'Lagos',
      shippingPostalCode: '100001',
      shippingState: 'Lagos',
    };

    //save order to sessions

    this.apiService.PlaceOrder(order).subscribe(
      (response) => {
        if (response) {
          if (response.code == 200) {
            this.orderForm.reset({
              customerName: '',
              customerEmail: '',
              customerPhoneNumber: '',
              shippingAddress: '',
            });

            var completeOrder: OrderComplete = {
              ...order,
              cartComplete: this.cart,
            };

            localStorage.setItem('ORDERS', JSON.stringify(completeOrder));

            this.cartService.emptyCart();

            this.navigation.navigateTo(`/confirmation`);
            return;
          } else {
            alert(response.message);
            return;
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
