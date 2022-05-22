import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReviewItem } from '../interfaces/ProductModel';
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
  providedIn: 'root',
})
export class BasketapiService {
  private basketapi: string = environment.basketapi;
  //httpOptions.headers.append('Authorization' , 'Bearer ' + token)

  constructor(private http: HttpClient) {}

  GetProducts(productID: number = 0): Observable<GeneralResponse> {
    return this.http.get<GeneralResponse>(
      `${this.basketapi}/api/v1/products?productID=${productID}`
    );
  }

  async GetProductsAsync(
    productID: number = 0
  ): Promise<Observable<GeneralResponse>> {
    return this.http.get<GeneralResponse>(
      `${this.basketapi}/api/v1/products?productID=${productID}`
    );
  }

  GetProductsByPage(
    page: number = 1,
    limit: number = 8
  ): Observable<GeneralResponse> {
    return this.http.get<GeneralResponse>(
      `${this.basketapi}/api/v1/products/page?limit=${limit}&page=${page}`
    );
  }

  GetRandomProducts(count: number = 1): Observable<GeneralResponse> {
    return this.http.get<GeneralResponse>(
      `${this.basketapi}/api/v1/products/random?count=${count}`
    );
  }

  AddReview(review: ReviewItem): Observable<GeneralResponse> {
    return this.http.put<GeneralResponse>(
      `${this.basketapi}/api/v1/products/review`,
      review
    );
  }
}
