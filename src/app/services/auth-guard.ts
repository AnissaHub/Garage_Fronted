import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // Vérifier la connexion
  if (authService.isLoggedIn()) {
    return true;    // accés autorisé
  } else {
    // redirection vers login
    router.navigate(['/login']);
    return false;
  }
 
 

};
