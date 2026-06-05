import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        // Token stocké automatiquement dans AuthService
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    });
  }
}