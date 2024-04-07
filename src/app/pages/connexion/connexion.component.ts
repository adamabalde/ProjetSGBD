import { Component } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  email: string = '';
  mdp: string = '';
  errorMessage: string = '';

  constructor(
    private authentificationService: AuthentificationService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.authentificationService.login(this.email, this.mdp).subscribe(
      (response) => {
        console.log('Réponse du serveur :', response);
        if (response && response.message && response.role) {
          // Stockage des informations de l'utilisateur connecté dans le sessionStorage
          sessionStorage.setItem('userRole', response.role); // Stocke le rôle de l'utilisateur

          // Redirection en fonction du rôle de l'utilisateur
          if (response.role === 'etudiant') {
            this.router.navigate(['/etudiant']);
          } else if (response.role === 'enseignant') {
            this.router.navigate(['/enseignant']);
          }
        }
      },
      (error) => {
        console.error('Erreur lors de la connexion', error);
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Une erreur est survenue lors de la connexion.';
        }
      }
    );
  }
}
