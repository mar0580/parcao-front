import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequestDTO } from '../../models/login-request';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: LoginRequestDTO = {
    userName: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const validationError = this.validateCredentials();
    if (validationError) {
      this.errorMessage = validationError;
      return;
    }

    this.authenticateUser();
  }

  private validateCredentials(): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.credentials.userName)) {
      return 'Por favor, insira um e-mail válido.';
    }

    if (this.credentials.password.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres.';
    }

    if (this.credentials.password.length > 8) {
      return 'A senha deve ter no máximo 8 caracteres.';
    }

    return null;
  }

  private authenticateUser(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (err) => this.handleLoginError(err)
    });
  }

  private handleLoginSuccess(response: any): void {
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
      this.router.navigate(['/']);
    } else {
      this.errorMessage = response.message || 'Falha no login.';
    }
  }

  private handleLoginError(err: any): void {
    this.errorMessage = err.error?.message || 'Falha no login.';
  }
}
