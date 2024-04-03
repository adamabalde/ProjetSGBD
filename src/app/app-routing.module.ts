import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
// import { InscriptionComponent } from './pages/inscription/inscription.component';
const routes: Routes = [
  { path: '', component: AccueilComponent },
  {
    path: 'accueil', component: AccueilComponent
  },
  {
    path:'connexion', component: ConnexionComponent
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
