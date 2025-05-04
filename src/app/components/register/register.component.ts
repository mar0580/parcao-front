import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SignupRequestDTO } from '../../models/signup-request';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="register-container">
      <form class="register-form" (ngSubmit)="onSubmit()">
        <h2>Register</h2>
        <div class="form-group">
          <label for="userName">Username</label>
          <input type="text" id="userName" [(ngModel)]="userData.userName" name="userName" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" [(ngModel)]="userData.email" name="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" [(ngModel)]="userData.password" name="password" required>
        </div>
        <button type="submit">Register</button>
        <p *ngIf="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p *ngIf="successMessage" class="success-message">{{ successMessage }}</p>
        <p class="login-link">Already have an account? <a routerLink="/auth/login">Login</a></p>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
    .register-form {
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
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
    button:hover {
      background-color: #218838;
    }
    .error-message {
      color: #dc3545;
      margin-top: 1rem;
    }
    .success-message {
      color: #28a745;
      margin-top: 1rem;
    }
    .login-link {
      margin-top: 1rem;
      text-align: center;
    }
    .login-link a {
      color: #007bff;
      text-decoration: none;
    }
  `]
})
export class RegisterComponent {
  userData: SignupRequestDTO = {
    userName: '',
    email: '',
    password: ''
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.userData).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! You can now login.';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = err.error || 'Registration failed';
        this.successMessage = '';
      }
    });
  }
}
