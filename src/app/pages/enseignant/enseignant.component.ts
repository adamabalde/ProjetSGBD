import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-etudiant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.css']
})
export class EnseignantComponent implements OnInit {
  pageTitle: string = 'Bienvenue dans votre tableau de bord';
  pageContent: string = 'Ce contenu.';
  userRole: string = '';
  userEmail: string = '';
  userData: any = {}; // Propriété pour stocker les données de l'utilisateur
  coursList: any[] = []; // Propriété pour stocker la liste des cours
  isEtudiantResponsable: boolean = false; // Nouvelle propriété pour déterminer si l'utilisateur est un étudiant responsable

  constructor(
    private authService: AuthentificationService,
    private router: Router,
    private coursService: CoursService // Assurez-vous d'avoir injecté le service ici
  ) {}

  ngOnInit(): void {
    // Vérifier si l'utilisateur est authentifié
    const storedUserRole = localStorage.getItem('userRole');
    if (!storedUserRole) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
      this.router.navigate(['/connexion']);
      return;
    }

    // Récupération du rôle de l'utilisateur au chargement de la page
    this.userRole = storedUserRole;
    // Mettre à jour les informations de l'utilisateur au chargement de la page
    this.updateUserData();
      this.coursList = [];

    // Ajoutez une console.log ici pour vérifier l'identifiant de l'enseignant
    console.log('ID Enseignant:', this.userData.idEnseignant);

    // Ensuite, appelez la méthode pour récupérer les cours de l'enseignant
    if (this.userRole === 'enseignant') {
      this.getCoursByEnseignant();
    }
  }

  getCoursByEnseignant(): void {
    this.coursService.getCoursByEnseignant(this.userData.idEnseignant).subscribe(cours => {
      console.log('Cours récupérés :', cours);
      this.coursList = cours;
    });
  }


  private updateUserData(): void {
    // Récupération des données de l'utilisateur depuis le service
    this.userData = this.authService.getUserData();
    this.userEmail = this.userData.email;

    console.log('Données utilisateur récupérées dans le service :', this.userData);
  }

  changeContent(menuItem: string): void {
    if (menuItem === 'accueil') {
      this.pageTitle = 'Accueil';
      this.pageContent = 'Bienvenue dans votre tableau de bord.';
      // Mettre à jour les informations de l'utilisateur lors du changement de contenu
      this.updateUserData();
      this.coursList = [];
    }
    else if (menuItem === 'mes_cours' && this.userRole === 'enseignant') {
      this.pageTitle = 'Mes Cours';
      this.pageContent = 'Liste des cours que vous dispensez.';

      // Assurez-vous que userData contient l'identifiant de l'enseignant
      if (this.userData.idEnseignant) {
        this.coursService.getCoursByEnseignant(this.userData.idEnseignant).subscribe(cours => {
          console.log('Cours récupérés :', cours);
          this.coursList = cours;
          this.userData = {};

        });
      } else {
        console.error('Identifiant de l\'enseignant non disponible.');
      }
    }
    else if (menuItem === 'retour') {
      this.router.navigate(['/accueil']);
    }
  }

}
