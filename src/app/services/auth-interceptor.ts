import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // Récupère les services
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  // Si token présent, on clone la requête avec le header Authorization
  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    // On envoie la requête clonée et on écoute les erreurs
    return next(clonedReq).pipe(
      catchError((error) => {

        if (error.status === 401) {
  console.log('401 détecté → logout + redirect');
  authService.logout();
  router.navigate(['/login']);
}

        // On relaie l'erreur pour que le composant puisse la gérer aussi
        return throwError(() => error);
      })
    );
  }

  // Pas de token → requête normale sans modification
  // Pas de token → requête normale mais on écoute quand même les erreurs
return next(req).pipe(
  catchError((error) => {
    if (error.status === 401) {
      console.log('401 détecté → logout + redirect');
      authService.logout();
      router.navigate(['/login']);
    }
    return throwError(() => error);
  })
);


  // Token expiré
  // → Angular envoie requête avec vieux token
  //   → Symfony retourne 401
  //     → catchError détecte le 401
  //       → logout() supprime le token
  //         → redirect vers /login
};