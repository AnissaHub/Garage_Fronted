import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // Vérifier si admin
  if (authService.isAdmin()) {
    return true;    // accés autorisé
  } else {
    // redirection vers login
    router.navigate(['/login']);
    return false;
  }
 
 

}
