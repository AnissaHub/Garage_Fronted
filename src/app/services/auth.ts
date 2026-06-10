import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // Service disponible dans toute l'application
})
export class AuthService {

  // URL de base de l'API Symfony
  private apiUrl = 'https://127.0.0.1:8000/api';

  // Injection du service HTTP Angular
  constructor(private http: HttpClient) { }
  
  // inscription utilisateur
  register(email: string, password: string) {
  return this.http.post<any>(`${this.apiUrl}/register`, { email, password });
  }
   
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
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

      })

    );
  }

  /**
   * Déconnexion
   * Supprime le token JWT
   */
 logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user'); 
  console.log('Utilisateur déconnecté');
}

  /**
   * Récupère le token stocké
   * localStorage.getItem('token')-> Récupère le token stocké au moment du login. Retourne null si aucun token n'existe.
   */
  getToken(): string | null {

    return localStorage.getItem('token');

  }
   //  récupérer les infos de l'utilisateur connecté depuis le localStorage.
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Vérifie si l'utilisateur est connecté
   */
  isLoggedIn(): boolean {

    return this.getToken() !== null;

  }


  isAdmin(): boolean {
  const user = this.getUser();
  return user?.roles?.includes('ROLE_ADMIN') ?? false;
}

}