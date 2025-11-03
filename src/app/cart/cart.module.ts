import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import {MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list'
import {MatButtonModule} from '@angular/material/button'
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    CartComponent
  ]
})
export class CartModule { }
