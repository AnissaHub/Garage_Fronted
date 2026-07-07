import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../services/cart-service';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
  

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatButtonModule, MatBadgeModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  get cartCount(): number {
    return this.cartService.getCount();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get isAdmin(): boolean {
  return this.authService.isAdmin();
}

  get userEmail(): string {
    return this.authService.getUser()?.email ?? '';
  }

  logout(): void {
    this.cartService.clearCart();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}