import { Component } from '@angular/core';
import { CartService } from '../services/cart-service';
import { CartItem } from '../models/Cars';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
   imports: [RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.scss',
})
export class CartComponent {

  constructor(private cartService: CartService) {}

  get cart(): CartItem[] {
    return this.cartService.getCart();
  }

  get total(): number {
    return this.cartService.getTotal();
  }

  increment(immatriculation: string): void {
    this.cartService.increment(immatriculation);
  }

  decrement(immatriculation: string): void {
    this.cartService.decrement(immatriculation);
  }

  remove(immatriculation: string): void {
    this.cartService.removeFromCart(immatriculation);
  }

  clear(): void {
    this.cartService.clearCart();
  }
}