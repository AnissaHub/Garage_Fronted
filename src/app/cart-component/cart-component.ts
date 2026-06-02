import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart-service';
import { Car } from '../models/Cars';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart-component.html',
})
export class CartComponent implements OnInit {

  cart: Car[] = [];
  

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    
  }
}