import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllCours(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cours`);
  }

  getCoursByEnseignant(idEnseignant: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/enseignant/${idEnseignant}/cours`);
  }


  // Autres méthodes pour la gestion des cours si nécessaire
}
