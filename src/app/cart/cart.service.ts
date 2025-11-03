import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) {}

  private apiUrl = environment.apiUrl + "/cart"
  private apiCheckoutUrl = environment.apiUrl + "/checkout"

  addToCart(product: Product): Observable<Product>{
    return this.httpClient.post<Product>(this.apiUrl, product)
  }

  getCartItems(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.apiUrl)
  }

  clearCart(): Observable<void>{
    return this.httpClient.delete<void>(this.apiUrl)
  }

  checkout(products: Product[]): Observable<void>{
    return this.httpClient.post<void>(this.apiCheckoutUrl, products)
  } 
}
