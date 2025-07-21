import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrl = 'https://api-backsql.onrender.com';

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/api/auth/cadastro`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/api/auth/login`, credentials).pipe(
      tap(response => {
        if (response && response.token && response.nome) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.nome);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}
