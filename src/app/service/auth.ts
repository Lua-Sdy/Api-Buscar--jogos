import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private backendUrl = 'http://localhost:3005'; // Usando o proxy configurado

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/auth/cadastro`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/auth/login`, credentials);
  }

  // Método para verificar se o usuário está logado (baseado na existência do token)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Método para fazer logout
  logout() {
    localStorage.removeItem('token');
  }
}
