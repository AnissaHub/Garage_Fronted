import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Créer un PaymentIntent
  createPaymentIntent(amount: number): Observable<{ clientSecret: string }> {
    return this.http.post<{ clientSecret: string }>(
      `${this.apiUrl}/payment/create-intent`,
      { amount }
    );
  }

  // Créer une commande
  createCommande(total: number, items: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/commandes`, { total, items });
  }

  // Récupérer les commandes
  getOrders(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/commandes`).pipe(
      map(response => response.data)
    );
  }
}