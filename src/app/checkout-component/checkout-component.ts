import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CartService } from '../services/cart-service';
import { PaymentService } from '../services/payment';
import { CartItem } from '../models/Cars';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

@Component({
  selector: 'app-checkout-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './checkout-component.html',
  styleUrl: './checkout-component.scss',
})
export class CheckoutComponent implements OnInit {

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  cardElement: StripeCardElement | null = null;

  orderConfirmed = false;
  isLoading = false;
  errorMessage = '';

  private stripePublicKey = 'pk_test_51Th35hJO1V9rsJskbj5RXriT6xwVOIjJbkwAXO9ib3tejuq6fFJAaY8iUprSKBG6m4xK4qQOZ8Yc8bD89Uc3T3Pi00Mw33jwti';

  constructor(
    private cartService: CartService,
    private paymentService: PaymentService
  ) {}

  async ngOnInit(): Promise<void> {
    this.stripe = await loadStripe(this.stripePublicKey);
    setTimeout(() => this.mountCardElement(), 300);
  }

  mountCardElement(): void {
    if (!this.stripe) return;

    this.elements = this.stripe.elements();
    this.cardElement = this.elements.create('card', {
      hidePostalCode: true,
      style: {
        base: {
          fontSize: '16px',
          color: '#1a1a2e',
          '::placeholder': { color: '#aab7c4' }
        }
      }
    });

    const container = document.getElementById('card-element');
    if (container) {
      this.cardElement.mount(container);
    } else {
      console.error('❌ #card-element introuvable dans le DOM');
    }
  }

  get cart(): CartItem[] {
    return this.cartService.getCart();
  }

  get total(): number {
    return this.cartService.getTotal();
  }

  async confirmOrder(): Promise<void> {
    if (!this.stripe || !this.cardElement) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      // 1. Créer le PaymentIntent
      const payment = await firstValueFrom(
        this.paymentService.createPaymentIntent(this.total)
      );

      if (!payment?.clientSecret) {
        throw new Error('Client secret manquant');
      }

      // 2. Confirmer le paiement avec Stripe
      const result = await this.stripe.confirmCardPayment(
        payment.clientSecret,
        { payment_method: { card: this.cardElement } }
      );

      if (result.error) {
        this.errorMessage = result.error.message ?? 'Paiement refusé';
        this.isLoading = false;
        return;
      }

      // 3. Créer la commande en BDD
      const items = this.cart.map(i => ({
        immatriculation: i.car.immatriculation,
        quantite: i.quantity,
        prix: Number(i.car.prix)
      }));

      await firstValueFrom(
        this.paymentService.createCommande(this.total, items)
      );

      // 4. Succès
      this.orderConfirmed = true;
      this.cartService.clearCart();
      this.isLoading = false;

    } catch (err) {
      console.error(err);
      this.errorMessage = 'Erreur lors de la commande';
      this.isLoading = false;
    }
  }
}