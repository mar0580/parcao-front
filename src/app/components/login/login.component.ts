import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequestDTO } from '../../models/login-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-container">
      <form class="login-form" (ngSubmit)="onSubmit()">
        <h2>Login</h2>
        <div class="form-group">
          <label for="userName">Username</label>
          <input type="text" id="userName" [(ngModel)]="credentials.userName" name="userName" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" [(ngModel)]="credentials.password" name="password" required>
        </div>
        <button type="submit">Login</button>
        <p *ngIf="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p class="register-link">Don't have an account? <a routerLink="/auth/register">Register</a></p>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
    .login-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
    button:hover {
      background-color: #0056b3;
    }
    .error-message {
      color: #dc3545;
      margin-top: 1rem;
    }
    .register-link {
      margin-top: 1rem;
      text-align: center;
    }
    .register-link a {
      color: #007bff;
      text-decoration: none;
    }
  `]
})
export class LoginComponent {
  credentials: LoginRequestDTO = {
    userName: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        if (response.token) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = response.message || 'Login failed';
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed';
      }
    });
  }
}
