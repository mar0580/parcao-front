import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequestDTO } from '../../models/login-request';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ValidationService } from '../../services/validation.service';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private validationService: ValidationService
  ) {}

  onSubmit(): void {
    this.errorMessage = '';

    const emailError = this.validationService.validateEmail(this.credentials.userName);
    if (emailError) {
      this.errorMessage = emailError;
      return;
    }

    const passwordError = this.validationService.validatePassword(this.credentials.password);
    if (passwordError) {
      this.errorMessage = passwordError;
      return;
    }

    this.authenticateUser();
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
