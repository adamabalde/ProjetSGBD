import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) { }

  signIn(): void {

    if (this.email === 'test@example.com' && this.password === 'password') {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Mot de passe ou email invalide';
    }
  }
}




