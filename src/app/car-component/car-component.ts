import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../models/Cars';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-car-component',
  imports: [CommonModule],
  templateUrl: './car-component.html',
  styleUrl: './car-component.scss',
})
export class CarComponent {

  @Input() car!: Car;

  @Output() addToCart = new EventEmitter<Car>();

  constructor(private router: Router) {}

  // ajouter au panier
  add() {
    this.addToCart.emit(this.car);
     alert('Voiture ajoutée au panier 🛒');
  }

  // détail voiture
  goToDetail(immatriculation: string) {
    this.router.navigate(['/car', immatriculation]);
  }
}