export interface Car {
  immatriculation: string;
  marque: string;
  modele: string;
  annee: number;

  kilometrage: number;
  prix: number;

  etat: 'en_stock' | 'reservee' | 'vendue';

  description?: string;
  image?: string;
}