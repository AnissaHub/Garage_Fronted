import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Car } from '../models/Cars';

@Injectable({
  providedIn: 'root',
})
export class CarService {

  private apiUrl = 'https://127.0.0.1:8000/api';

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
}
