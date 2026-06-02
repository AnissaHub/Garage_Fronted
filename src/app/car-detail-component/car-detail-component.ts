import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../services/car-service';
import { Car } from '../models/Cars';

@Component({
  selector: 'app-car-detail-component',
  standalone: true,
  imports: [],
  templateUrl: './car-detail-component.html',
  styleUrl: './car-detail-component.scss',
})
export class CarDetailComponent implements OnInit {

  car?: Car;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService
  ) {}

  ngOnInit(): void {

    const immatriculation =
      this.route.snapshot.paramMap.get('immatriculation');

    // if (immatriculation) {
    //   this.car =
    //     this.carService.getCarByImmatriculation(immatriculation);
    // }
  }
  
}