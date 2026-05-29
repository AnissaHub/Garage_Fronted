import { Component, OnInit } from '@angular/core';
import { Car } from '../models/Cars';
import { CarComponent } from '../car-component/car-component';

@Component({
  standalone: true,
  selector: 'app-list-car-component',
  imports: [CarComponent],
  templateUrl: './list-car-component.html',
  styleUrl: './list-car-component.scss',
})
export class ListCarComponent {
  
    cars: Car []= [{
      immatriculation: 'AA-123-BB',
      marque: 'Peugeot',
      modele: '208',
      annee: 2020,
      etat: 'diagnostic',
      dateEntree: '2026-01-10'
    },
    {
      immatriculation: 'CC-456-DD',
      marque: 'Renault',
      modele: 'Clio',
      annee: 2019,
      etat: 'en_reparation',
      dateEntree: '2026-01-12'
    },
    {
      immatriculation: 'EE-789-FF',
      marque: 'BMW',
      modele: 'X1',
      annee: 2021,
      etat: 'pret',
      dateEntree: '2026-01-15'
    }];
  
 
}
