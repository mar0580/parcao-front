import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';
import { LoginRequestDTO } from '../models/login-request';
import { LoginResponseDTO } from '../models/login-response';
import { SignupRequestDTO } from '../models/signup-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.apiUrl}/signin`, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
        }
      })
    );
  }

  register(userData: {
    userName: string;
    email: string;
    password: string;
    nomeCompleto: string;
    filial: string[];
    role: string[]
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Implemente sua lógica de verificação de admin
    // Exemplo simples (adaptar conforme sua implementação real):
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles && payload.roles.includes('ROLE_ADMIN');
  }
}
