import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { OnInit } from '@angular/core';
import { NgForOf, NgFor, NgIf, CurrencyPipe } from '@angular/common';
import {MatCardModule} from '@angular/material/card'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { CartService } from '../../cart/cart.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-list',
  imports: [NgForOf, NgFor, NgIf, MatCardModule, CurrencyPipe, MatGridListModule, 
    MatSnackBarModule, MatInputModule, MatSelectModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products: Product[] = []
  sortOrder:string = ""
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackbar: MatSnackBar
  ){}
  ngOnInit(): void {
      this.productService.getProducts().subscribe(data => {
        console.log('Products:', data);
        this.products = data
      }
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

    applySearchFilter(searchEvent: Event):void{
      let searchInput = (searchEvent.target as HTMLInputElement).value.toLowerCase()
      this.productService.getProducts().subscribe(data => {
        console.log('Products:', data);
        this.products = data.filter(prod => prod.name.toLowerCase().includes(searchInput))}
      )
    } 

    sortProducts(sortValue:string){
      this.sortOrder = sortValue
      if(this.sortOrder === "priceHighLow"){
        this.products.sort((a: Product ,b: Product) => b.price - a.price )
      }
            if(this.sortOrder === "priceLowHigh"){
        this.products.sort((a: Product ,b: Product) => a.price - b.price )
      }
    }
  
  }
