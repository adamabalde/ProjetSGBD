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
  selectedCoursId: number | null = null; // Propriété pour stocker l'ID du cours sélectionné par l'utilisateur
  avis = ''; // Propriété pour stocker le contenu de l'avis
  avisEtudiantList: any[] = [];

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
  envoyerAvis(): void {
    if (!this.selectedCoursId || !this.avis) {
      console.error('Veuillez sélectionner un cours et écrire votre avis.');
      return;
    }

    const idCours = this.selectedCoursId;
    const avis = this.avis;
    const idEtudiant = this.userData.id; // Récupération de l'idEtudiant depuis les données de l'utilisateur

    this.coursService.ajouterAvis(idCours, avis, idEtudiant).subscribe(
      (response) => {
        console.log('Avis ajouté avec succès:', response);
        // Réinitialiser les champs du formulaire après l'ajout de l'avis
        this.selectedCoursId = null;
        this.avis = '';
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'avis:', error);
      }
    );
  }


  getAvisEtudiants(): void {
    this.coursService.getAvisEtudiants().subscribe(avisEtudiantList => {
      console.log('Avis des étudiants récupérés:', avisEtudiantList);
      this.avisEtudiantList = avisEtudiantList;
    });
  }


  changeContent(menuItem: string , idCours?: number): void {
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

      this.getAvisEtudiants();



    }



     else if (menuItem === 'avis') {

      this.pageTitle = 'Donner avis';
      this.pageContent = 'Sélectionnez le cours sur lequel vous voulez donner votre avis.';

      this.userData = {};
      this.coursList = [];
      this.selectedCoursId = null; // Réinitialiser l'ID du cours sélectionné

      this.coursService.getAllCours().subscribe(cours => {
        console.log('Cours récupérés :', cours);
        this.coursList = cours;
      });
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
