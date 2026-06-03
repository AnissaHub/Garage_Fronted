import { Injectable } from '@angular/core';
import { Car } from '../models/Cars';

@Injectable({
  providedIn: 'root',
})
export class CarService {

  private cars: Car[] = [
    
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
  },
  {
    immatriculation: 'EE-789-FF',
    marque: 'Renault',
    modele: 'Clio',
    annee: 2019,
    kilometrage: 62000,
    prix: 9800,
    etat: 'en_stock'
  },
  {
    immatriculation: 'GG-101-HH',
    marque: 'Toyota',
    modele: 'Yaris',
    annee: 2022,
    kilometrage: 15000,
    prix: 16500,
    etat: 'en_stock'
  },
  {
    immatriculation: 'II-202-JJ',
    marque: 'Audi',
    modele: 'A3',
    annee: 2020,
    kilometrage: 38000,
    prix: 22900,
    etat: 'reservee'
  },
  {
    immatriculation: 'KK-303-LL',
    marque: 'Mercedes',
    modele: 'Classe A',
    annee: 2021,
    kilometrage: 25000,
    prix: 31500,
    etat: 'en_stock'
  },
  {
    immatriculation: 'MM-404-NN',
    marque: 'Volkswagen',
    modele: 'Golf',
    annee: 2018,
    kilometrage: 78000,
    prix: 14200,
    etat: 'vendue'
  },
  {
    immatriculation: 'OO-505-PP',
    marque: 'Ford',
    modele: 'Puma',
    annee: 2022,
    kilometrage: 18000,
    prix: 19900,
    etat: 'en_stock'
  }
];

  getCars(): Car[] {
    return this.cars;
  }

  getCarByImmatriculation(immatriculation: string): Car | undefined {
    return this.cars.find(c => c.immatriculation === immatriculation);
  }
}