import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { Router , RouterLink} from '@angular/router';

@Component({
  selector: 'app-register-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  onRegister() {
  // vérifier avant d'appeler l'API
  if (this.password !== this.confirmPassword) {
    this.errorMessage = 'Les mots de passe ne correspondent pas';
    return;
  }

  this.authService.register(this.email, this.password).subscribe({
    next: () => {
      this.successMessage = 'Inscription réussie !';
      // rediriger vers login après 2 secondes
      setTimeout(() => this.router.navigate(['/login']), 2000);
    },
    error: () => {
      this.errorMessage = 'Email déjà utilisé';
    }
  });
}
}
