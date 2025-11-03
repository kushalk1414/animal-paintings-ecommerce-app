import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../../models/product';
import { OnInit } from '@angular/core';
import {MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list'
import {MatButtonModule} from '@angular/material/button'
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";



@Component({
  selector: 'app-cart',
  imports: [MatListModule, MatCardModule, CurrencyPipe, NgFor, NgIf, MatButtonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Product[] = []
  totalPrice: number = 0
  constructor(private service: CartService){}
  
  ngOnInit(): void {
      this.service.getCartItems().subscribe(data => {
        console.log('Cart - Products:', data)
        this.cartItems = data
        this.totalPrice = this.getTotalPrice()
      })
  }

  getTotalPrice(): number{
    let total: number = 0
    this.cartItems.forEach(prod => total += prod.price)
    return total
  }
  clearCart(){
    this.service.clearCart().subscribe()
  }
  checkout(){
    this.service.checkout(this.cartItems).subscribe()
  }
}
