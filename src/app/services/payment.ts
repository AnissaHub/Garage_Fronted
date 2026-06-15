import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  private apiUrl = 'https://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Créer un PaymentIntent — POST /api/payment/create-intent
  createPaymentIntent(amount: number): Observable<{ clientSecret: string }> {
    return this.http.post<{ clientSecret: string }>(
      `${this.apiUrl}/payment/create-intent`,
      { amount }
    );
  }
  createCommande(total: number, items: any[]): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/commandes`, { total, items });
}
}