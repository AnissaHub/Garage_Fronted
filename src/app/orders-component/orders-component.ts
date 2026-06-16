import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './orders-component.html',
  styleUrl: './orders-component.scss',
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.paymentService.getOrders().subscribe({
      next: (data: any[]) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur chargement commandes';
        this.isLoading = false;
      }
    });
  }
}