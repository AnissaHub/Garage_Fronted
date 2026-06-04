import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarService } from '../services/car-service';
import { CartService } from '../services/cart-service';
import { Car } from '../models/Cars';

@Component({
  selector: 'app-car-detail-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './car-detail-component.html',
  styleUrl: './car-detail-component.scss',
})
export class CarDetailComponent implements OnInit {

  car?: Car;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private cartService: CartService
  ) {}

 ngOnInit(): void {
  const immatriculation = this.route.snapshot.paramMap.get('immatriculation');
  if (immatriculation) {
    this.carService.getCarByImmatriculation(immatriculation).subscribe({
      next: (car) => {
        this.car = car;
      },
      error: (err) => {
        console.error('Voiture introuvable', err);
      }
    });
  }
}
  addToCart(): void {
    if (this.car) {
      this.cartService.addToCart(this.car);
      alert('Voiture ajoutée au panier 🛒');
    }
  }
}