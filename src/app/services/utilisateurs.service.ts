// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthentificationService } from './authentification.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class UtilisateursService {
//   private apiUrl = 'http://localhost:3000/user';

//   constructor(private http: HttpClient, private authService: AuthentificationService) { }

//   getUserInfo(): Observable<any> {
//     const authToken = this.authService.getAuthToken();
//     const headers = new HttpHeaders({'Authorization': `Bearer ${authToken}`});

//     return this.http.get(this.apiUrl, { headers: headers });
//   }

//   getUserIdFromAuthToken(authToken: string): string | null {
//     if (!authToken) {
//       return null;
//     }

//     try {
//       const tokenParts = authToken.split('.');
//       if (tokenParts.length !== 3) {
//         throw new Error('Format de jeton invalide.');
//       }

//       const payload = JSON.parse(atob(tokenParts[1]));
//       const userId = payload.userId;

//       return userId;
//     } catch (error) {
//       console.error('Erreur lors de l\'extraction de l\'ID utilisateur:', error);
//       return null;
//     }
//   }
// }
