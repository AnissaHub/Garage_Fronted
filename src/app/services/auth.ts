import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // Service disponible dans toute l'application
})
export class AuthService {

  // URL de base de l'API Symfony
  private apiUrl = 'http://localhost:8000/api';

  // Injection du service HTTP Angular
  constructor(private http: HttpClient) {}

  /**
   * Connexion utilisateur
   * Envoie email + mot de passe à Symfony
   */
  login(email: string, password: string) {

    return this.http.post<any>(
      `${this.apiUrl}/login`,
      {
        email: email,
        password: password
      }
    ).pipe(

      // Exécuté lorsque la réponse est reçue
      tap(response => {

        console.log('Connexion réussie');
        console.log('Token reçu :', response.token);

        // Sauvegarde du JWT dans le navigateur
        localStorage.setItem(
          'token',
          response.token
        );

      })

    );
  }

  /**
   * Déconnexion
   * Supprime le token JWT
   */
  logout(): void {

    localStorage.removeItem('token');

    console.log('Utilisateur déconnecté');

  }

  /**
   * Récupère le token stocké
   * localStorage.getItem('token')-> Récupère le token stocké au moment du login. Retourne null si aucun token n'existe.
   */
  getToken(): string | null {

    return localStorage.getItem('token');

  }

  /**
   * Vérifie si l'utilisateur est connecté
   */
  isLoggedIn(): boolean {

    return this.getToken() !== null;

  }

  // isAdmin(): boolean {
  // const user = this.getUser();
  // return user?.roles?.includes('ROLE_ADMIN') ?? false;
//}

}