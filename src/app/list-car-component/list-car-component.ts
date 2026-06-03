import { Component, OnInit } from '@angular/core';
import { Car } from '../models/Cars';
import { CarComponent } from '../car-component/car-component';
import { CarService } from '../services/car-service';
import { CartService } from '../services/cart-service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-list-car-component',
  imports: [CarComponent, RouterLink],
  templateUrl: './list-car-component.html',
  styleUrl: './list-car-component.scss',
})
export class ListCarComponent implements OnInit {

  cars: Car[] = [];

  constructor(
    private carService: CarService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.cars = this.carService.getCars();
  }

  onAddToCart(car: Car): void {
    this.cartService.addToCart(car);
  }
}