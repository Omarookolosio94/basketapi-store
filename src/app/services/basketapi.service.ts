import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralResponse } from '../interfaces/ResponseModel';

var httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    Authorization: '',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class BasketapiService {

  private basketapi: string = environment.basketapi;
  //httpOptions.headers.append('Authorization' , 'Bearer ' + token)

  constructor(private http: HttpClient) { }

  GetProducts(productID: number = 0) {
    return this.http.get<GeneralResponse>(`${this.basketapi}/api/v1/products?productID=${productID}`);
  }

  GetRandomProducts(count: number = 1) {
    return this.http.get<GeneralResponse>(`${this.basketapi}/api/v1/products/random?count=${count}`);
  }
}
