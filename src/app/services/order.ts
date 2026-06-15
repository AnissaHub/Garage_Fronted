import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  createOrder(data: { total: number; cars: number[] }): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, data);
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders`);
  }
}