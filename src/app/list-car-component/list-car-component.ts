import { Component, OnInit } from '@angular/core';
import { Car } from '../models/Cars';
import { CarComponent } from '../car-component/car-component';
import { CarService } from '../services/car-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart-service';

@Component({
  standalone: true,
  selector: 'app-list-car-component',
  imports: [CarComponent],
  templateUrl: './list-car-component.html',
  styleUrl: './list-car-component.scss',
})
export class ListCarComponent {
   
  cars: Car[] = [
  {
    immatriculation: 'AA-123-BB',
    marque: 'Peugeot',
    modele: '208',
    annee: 2020,
    kilometrage: 45000,
    prix: 12500,
    etat: 'en_stock'
  },
  {
    immatriculation: 'CC-456-DD',
    marque: 'BMW',
    modele: 'X1',
    annee: 2021,
    kilometrage: 30000,
    prix: 28900,
    etat: 'reservee'
  }
];
  constructor(private router: Router,
    private carService: CarService,
    private cartService: CartService,
  ) {}

goToDetail(immatriculation: string) {
  this.router.navigate(['/car', immatriculation]);
  }
  
  onAddToCart(car: Car): void {
  this.cartService.addToCart(car);
}
//   constructor(private carService: CarService) {}
//   ngOnInit() {
//   this.cars = this.carService.getCars();
// }
}