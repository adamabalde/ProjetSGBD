import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { EnseignantComponent } from './pages/enseignant/enseignant.component';
import { EtudiantComponent } from './pages/etudiant/etudiant.component';
// import { InscriptionComponent } from './pages/inscription/inscription.component';
const routes: Routes = [
  { path: '', component: AccueilComponent },
  {
    path: 'accueil', component: AccueilComponent
  },
  {
    path:'connexion', component: ConnexionComponent
  },
  {
    path:'etudiant', component: EtudiantComponent
  },
  {
    path:'enseignant', component: EnseignantComponent
  },
  // {
  //   path:'inscription', component: InscriptionComponent
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
