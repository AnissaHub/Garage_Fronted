import { Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart-service';
import { CartItem } from '../models/Cars';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

@Component({
  selector: 'app-checkout-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './checkout-component.html',
  styleUrl: './checkout-component.scss',
})
export class CheckoutComponent implements OnInit{

  // Stripe
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  cardElement: StripeCardElement | null = null;

  // Etat
  orderConfirmed: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  // Clé publique Stripe ───────────────────────────
  private stripePublicKey = 'pk_test_51Th35hJO1V9rsJskbj5RXriT6xwVOIjJbkwAXO9ib3tejuq6fFJAaY8iUprSKBG6m4xK4qQOZ8Yc8bD89Uc3T3Pi00Mw33jwti';

  constructor(private cartService: CartService) {}

  async ngOnInit(): Promise<void> {
    this.stripe = await loadStripe(this.stripePublicKey);
    this.mountCardElement();
  }


  mountCardElement(): void {
    if (!this.stripe) return;

    this.elements = this.stripe.elements();
    this.cardElement = this.elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#1a1a2e',
          '::placeholder': { color: '#aab7c4' }
        }
      }
    });

    this.cardElement.mount('#card-element');
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

    setTimeout(() => {
      this.orderConfirmed = true;
      this.cartService.clearCart();
      this.isLoading = false;
    }, 2000);
  }
}