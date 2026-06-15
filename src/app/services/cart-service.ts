import { Injectable } from '@angular/core';
import { Car, CartItem } from '../models/Cars';


@Injectable({ providedIn: 'root' })
export class CartService {

  private cart: CartItem[] = [];

  addToCart(car: Car): void {
      console.log('CAR REÇU :', car);
  console.log('PRIX :', car.prix);
    const existing = this.cart.find(i => i.car.immatriculation === car.immatriculation);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ car, quantity: 1 });
    }
  }

  increment(immatriculation: string): void {
    const item = this.cart.find(i => i.car.immatriculation === immatriculation);
    if (item) item.quantity++;
  }

  decrement(immatriculation: string): void {
    const item = this.cart.find(i => i.car.immatriculation === immatriculation);
    if (!item) return;
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeFromCart(immatriculation); // supprime si quantité = 0
    }
  }

  removeFromCart(immatriculation: string): void {
    this.cart = this.cart.filter(i => i.car.immatriculation !== immatriculation);
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  getTotal(): number {
  return this.cart.reduce((acc, i) => {
   
    return acc + Number(i.car.prix) * i.quantity;
  }, 0);
}

  getCount(): number {
    return this.cart.reduce((acc, i) => acc + i.quantity, 0);
  }

  clearCart(): void {
    this.cart = [];
  }
}