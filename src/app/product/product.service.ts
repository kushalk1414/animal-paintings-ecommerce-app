import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl + "/products"
  constructor(private httpClient: HttpClient) {}
  
  //send http get request to the /products route at localhost:3000 or our backend and get observable of type prod[]
  getProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.apiUrl)
  }
}
