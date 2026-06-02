import { Injectable } from '@angular/core';
import { Car } from '../models/Cars';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //  panier privé
  private cart: Car[] = [];

  //  récupérer le panier
  getCart(): Car[] {
    return this.cart;
  }

  //  ajouter une voiture au panier
  addToCart(car: Car): void {

    this.cart.push(car);
  }

  // //supprimer une voiture du panier
  // removeFromCart(car: Car): void {
  //   this.cart = this.cart.filter(
  //     c => c.immatriculation !== car.immatriculation
  //   );
  // }

  // //  vider le panier
  // clearCart(): void {
  //   this.cart = [];
  // }

  // //  total du panier
  // getTotal(): number {
  //   return this.cart.reduce((total, car) => {
  //     return total + car.prix;
  //   }, 0);
  // }

  // // vérifier si une voiture est déjà dans le panier
  // isInCart(car: Car): boolean {
  //   return this.cart.some(
  //     c => c.immatriculation === car.immatriculation
  //   );
  // }
}