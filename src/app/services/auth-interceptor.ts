import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
   // Récupère le service sans constructeur (syntaxe fonctionnelle)
  const authService = inject(AuthService);

  // Récupère le token depuis localStorage
  const token = authService.getToken();

  // Si token présent, on ajoute le header Authorization à chaque requête
  if (token) {

    // Les requêtes sont immuables — on clone avec le header ajouté
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    // On envoie la requête clonée avec le token
    return next(clonedReq);
  }

  // Pas de token — on envoie la requête sans modification
  return next(req);
};