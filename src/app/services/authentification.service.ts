import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private apiUrl = 'http://localhost:3000/login';
  private userRole: string = '';
  private userData: any = {};
  private userDataKey = 'userData'; // Clé pour stocker les données de l'utilisateur dans le localStorage
  private tokenExpirationTimer: any; // Minuteur pour vérifier l'expiration du jeton

  constructor(private http: HttpClient) { }

  // Méthode pour mettre à jour les données de l'utilisateur à partir du localStorage
  updateUserData(): void {
    const storedUserData = localStorage.getItem(this.userDataKey);
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
    }
  }

  login(email: string, mdp: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { email: email, mdp: mdp };

    return this.http.post(this.apiUrl, body, { headers: headers }).pipe(
      map((response: any) => {
        if (response && response.userData) {
          // Stocker les données d'authentification dans le localStorage
          localStorage.setItem(this.userDataKey, JSON.stringify(response.userData));
          localStorage.setItem('userRole', response.role); // Stocker le rôle de l'utilisateur dans le localStorage

          console.log('Données utilisateur stockées dans le localStorage :', response.userData);
          console.log('Rôle utilisateur stocké dans le localStorage :', response.role);

          // Mettre à jour les données et le rôle dans le service
          this.setUserData(response.userData);
          this.setUserRole(response.role);

          // Démarrer le minuteur pour vérifier l'expiration du jeton
          this.startTokenExpirationTimer();
        }

        return response; // Retourne la réponse de la requête HTTP
      })
    );
  }

  // Autres méthodes du service...

  setUserRole(role: string): void {
    this.userRole = role;
  }

  getUserRole(): string {
    return this.userRole;
  }

  setUserData(data: any): void {
    this.userData = data;
  }

  getUserData(): any {
    return this.userData;
  }

  // Nouvelle méthode pour démarrer le minuteur de vérification d'expiration du jeton
  private startTokenExpirationTimer(): void {
    const tokenExpirationTime = this.userData.tokenExpirationTime; // Récupérer le temps d'expiration du jeton depuis les données de l'utilisateur
    const currentTime = Date.now(); // Obtenir l'heure actuelle

    // Définir le minuteur pour expirer après le délai restant du jeton
    this.tokenExpirationTimer = setTimeout(() => {
      this.onTokenExpiration(); // Appeler la fonction de gestion de l'expiration du jeton
    }, tokenExpirationTime - currentTime);
  }

  // Nouvelle méthode pour gérer l'expiration du jeton
  private onTokenExpiration(): void {
    console.log('Jeton dauthentification expiré !');

    // Renouveler le jeton d'authentification
    // ...

    // Si le renouvellement du jeton échoue, rediriger vers la page de connexion
    // ...
  }
}
