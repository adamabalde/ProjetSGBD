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

  ajouterAvis(idCours: number, avis: string, idEtudiant: number): Observable<any> {
    const url = `${this.apiUrl}/avis`;
    const body = { idCours, avis, idEtudiant }; // Ajout de l'idEtudiant dans le corps de la requête
    return this.http.post<any>(url, body);
  }
  getAvisEtudiants(): Observable<any[]> {
    const url = `${this.apiUrl}/avisEtudiants`;
    return this.http.get<any[]>(url);
  }

}
