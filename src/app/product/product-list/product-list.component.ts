import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { OnInit } from '@angular/core';
import { NgForOf, NgFor, NgIf, CurrencyPipe } from '@angular/common';
import {MatCardModule} from '@angular/material/card'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-list',
  imports: [NgForOf, NgFor, NgIf, MatCardModule, CurrencyPipe, MatGridListModule, MatSnackBarModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products: Product[] = []
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackbar: MatSnackBar
  ){}
  ngOnInit(): void {
      this.productService.getProducts().subscribe(data => {
        console.log('Products:', data);
        this.products = data}
      )
  }

  addToCart(product: Product): void{
    this.cartService.addToCart(product).subscribe()
    this.snackbar.open(`added ${product.name} to cart`, "", {
        duration:2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      })
    }
}
