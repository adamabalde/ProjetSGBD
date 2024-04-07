import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
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
    if (this.userEmail === 'adja@esp.sn' && this.userRole === 'etudiant') {
      // Mettre à jour la propriété isEtudiantResponsable si l'utilisateur est un étudiant responsable
      this.isEtudiantResponsable = true;

      this.pageTitle = 'Bienvenue Étudiant Responsable';
      this.pageContent = 'Vous êtes connecté en tant qu\'étudiant responsable.';
    }
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

    } else if (menuItem === 'recueillir_avis' && this.isEtudiantResponsable) {
      this.pageTitle = 'Recueillir avis';
      this.pageContent = 'Collectez les avis des étudiants sur nos cours en vous rendant chez votre Responsable pédagogique pour obtenir les formulaires à soumettre aux étudiants. Une fois remplis, veuillez les lui retourner.'

      this.userData = {};
      this.coursList = [];

    } else if (menuItem === 'avis') {
      this.pageTitle = 'Donner avis';
      this.pageContent = 'Le responsable de classe vous remettra un formulaire à la fin de chaque module pour vos impressions.';
      this.userData = {};
      this.coursList = [];

    }
    else if (menuItem === 'cours') {
      this.pageTitle = 'Cours';
      this.pageContent= 'Contenu spécifique aux cours pour les étudiants.';

      this.userData = {};

      this.coursService.getAllCours().subscribe(cours => {
        console.log('Cours récupérés :', cours);
        this.coursList = cours;

      });
    } else if (menuItem === 'retour') {
      this.router.navigate(['/accueil']);
    }
  }
}
