import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Car } from '../models/Cars';

@Injectable({
  providedIn: 'root',
})
export class CarService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Liste — GET /api/cars
  getCars(): Observable<Car[]> {
    return this.http.get<any>(`${this.apiUrl}/cars`).pipe(
      map(response => response.data)
    );
  }

  // Détail — GET /api/cars/:immatriculation
  getCarByImmatriculation(immatriculation: string): Observable<Car> {
    return this.http.get<any>(`${this.apiUrl}/cars/${immatriculation}`).pipe(
      map(response => response.data)
    );
  }

  // Création — POST /api/cars
  createCar(data: Partial<Car>): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cars`, data);
  }

  // Suppression — DELETE /api/cars/:immatriculation
  deleteCar(immatriculation: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cars/${immatriculation}`);
  }

  // Modification — PUT /api/cars/:immatriculation
  updateCar(immatriculation: string, data: Partial<Car>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cars/${immatriculation}`, data);
  }

  updateEtat(immatriculation: string, etat: string): Observable<any> {
  return this.http.patch<any>(`${this.apiUrl}/cars/${immatriculation}/etat`, { etat });
}
}
